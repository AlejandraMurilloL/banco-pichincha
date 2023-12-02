import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  form!     : FormGroup;
  todayDate : Date = new Date();
  isEdition : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private location: Location,
    private financialProductService: FinancialProductsService
  ) {
    // const product = this.location.getState() as FinancialProduct;
    // this.isEdition = product ? true : false;
    // this.financialProduct = product;
  }

  ngOnInit(): void {
    const { id, name, description, logo, date_release, date_revision } = this.location.getState() as FinancialProduct;

    this.form = this.formBuilder.group({
      id            : [
                        id, 
                        { 
                          validators: [ Validators.required, Validators.minLength(3), Validators.maxLength(10) ], 
                          asyncValidators: [productIdValidator(this.financialProductService)], 
                          updateOn: 'blur'
                        }
                      ],
      name          : [name, [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ]],
      description   : [description, [ Validators.required, Validators.minLength(10), Validators.maxLength(200) ]],
      logo          : [logo, Validators.required],
      date_release  : [this.datePipe.transform(date_release, "yyyy-MM-dd", 'UTC'), Validators.required],
      date_revision : [{ value: this.datePipe.transform(date_revision, "yyyy-MM-dd", 'UTC'), disabled: true }, Validators.required]
    });

    if (!!id)  {
      this.form.get('id')?.disable();
      this.isEdition = true;
    }

    this.onChanges();
  }

  saveFinancialProduct(financialProduct: FinancialProduct): void {
    this.financialProductService
      .saveFinancialProduct(financialProduct, this.isEdition)
      .subscribe(() => this.router.navigate(['/financial-products/list']));
  }

  resetForm() {
    this.form.patchValue({ id: '', name: '', description: '', logo: '', date_release: '',  date_revision: ''});
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
