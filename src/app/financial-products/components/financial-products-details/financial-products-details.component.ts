import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      date_revision : ['', Validators.required]
    })
  }

  saveFinancialProduct(financialProduct: FinancialProduct): void {
    console.log(financialProduct);
  }

  checkForErrorsIn(formControlName: string): string {

    if (!this.form.get(formControlName)?.touched || 
        !this.form.get(formControlName)?.invalid) 
        return '';

    if (this.form.get(formControlName)?.errors?.['required']) {
      return 'Este campo es requerido!'
    }

    if (this.form.get(formControlName)?.errors?.['minlength']) {
      const min = this.form.get(formControlName)?.errors?.['minlength']?.['requiredLength'] || '';
      return `El campo debe tener mínimo ${min} caracteres`;
    }

    if (this.form.get(formControlName)?.errors?.['maxlength']) {
      const max = this.form.get(formControlName)?.errors?.['maxlength']?.['requiredLength'] || '';
      return `El campo debe tener máximo ${max} caracteres`;
    }    

    if (this.form.get(formControlName)?.errors?.['idAlreadyExists']) {
      return 'El ID indicado ya existe';
    }

    return '';
  }
}
