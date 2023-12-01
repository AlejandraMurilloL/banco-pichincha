import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FinancialProduct } from '../../models/financial-products.models';
import { FinancialProductsService } from '../../services/financial-products.service';
import { productIdValidator } from '../../validators/product-id.validator';

@Component({
  selector: 'app-financial-products-details',
  templateUrl: './financial-products-details.component.html',
  styleUrls: ['./financial-products-details.component.css']
})
export class FinancialProductsDetailsComponent implements OnInit {
  @Input() financialProduct: FinancialProduct = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: new Date(),
    date_revision: new Date(),
  }

  form!: FormGroup;
  todayDate: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private financialProductService: FinancialProductsService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id            : ['', { 
        validators: [ Validators.required, Validators.minLength(3), Validators.maxLength(10) ], 
        asyncValidators: [productIdValidator(this.financialProductService)], 
        updateOn: 'blur'
      }],
      name          : ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ]],
      description   : ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(200) ]],
      logo          : ['', Validators.required],
      date_release  : ['', Validators.required],
      date_revision : [{ value:  '', disabled: true }, Validators.required]
    });

    this.onChanges();
  }

  saveFinancialProduct(financialProduct: FinancialProduct): void {
    this.financialProductService
      .createFinancialProduct(financialProduct)
      .subscribe(() => this.router.navigate(['/financial-products/list']));
  }

  onChanges(): void {
    this.form.get('date_release')?.valueChanges.subscribe(val => {
      const releaseDate = new Date(val);
      const reviewDate = new Date(releaseDate.getFullYear() + 1, releaseDate.getMonth(), releaseDate.getDate() + 1);
      this.form.patchValue({ date_revision: this.datePipe.transform(reviewDate, "yyyy-MM-dd") });
    });
  }

  checkForErrorsIn(control: string): string {
    if (!this.form.get(control)?.touched || 
        !this.form.get(control)?.invalid) 
        return '';

    if (this.form.get(control)?.errors?.['required']) {
      return 'Este campo es requerido!'
    }

    if (this.form.get(control)?.errors?.['minlength']) {
      const min = this.form.get(control)?.errors?.['minlength']?.['requiredLength'] || '';
      return `El campo debe tener mínimo ${min} caracteres`;
    }

    if (this.form.get(control)?.errors?.['maxlength']) {
      const max = this.form.get(control)?.errors?.['maxlength']?.['requiredLength'] || '';
      return `El campo debe tener máximo ${max} caracteres`;
    }    

    if (this.form.get(control)?.errors?.['idAlreadyExists']) {
      return 'El ID indicado ya existe';
    }

    return '';
  }
}
