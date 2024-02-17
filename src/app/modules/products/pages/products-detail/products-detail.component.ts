import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/products.models';
import { ProductsService } from '../../services/products.service';
import { productIdValidator } from '../../validators/product-id.validator';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnDestroy, OnInit {
  form!     : FormGroup;
  todayDate : Date = new Date();
  isEdition : boolean = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private location: Location,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this._initializeForm();
    this._onFormValuesChanges();
  }

  saveFinancialProduct(product: Product): void {
    this.productService
      .saveProduct(product, this.isEdition)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['/financial-products/list']));
  }

  resetForm() {
    this.form.patchValue({ id: '', name: '', description: '', logo: '', date_release: '',  date_revision: ''});
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _initializeForm() {
    const { id, name, description, logo, date_release, date_revision } = this.location.getState() as Product;

    this.form = this.formBuilder.group({
      id            : [id, { validators: [ Validators.required, Validators.minLength(3), Validators.maxLength(10) ], 
                             asyncValidators: [productIdValidator(this.productService)], 
                             updateOn: 'blur' }],
      name          : [name, [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ]],
      description   : [description, [ Validators.required, Validators.minLength(10), Validators.maxLength(200) ]],
      logo          : [logo, Validators.required],
      date_release  : [this.datePipe.transform(date_release, "yyyy-MM-dd", 'UTC'), Validators.required],
      date_revision : [{ value: this.datePipe.transform(date_revision, "yyyy-MM-dd", 'UTC'), disabled: true }, Validators.required]
    });

    this.isEdition = !!id ? true : false;
    this._disableFields(id);
  }
  
  private _disableFields(productId: string) {    
    if (!!productId) 
      this.form.get('id')?.disable();

    this.form.get('date_revision')?.disable()
  }
  
  private _onFormValuesChanges(): void {
    this.form.get('date_release')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => this._calculateReviewDate(val));
  }

  private _calculateReviewDate(releaseDateStr: string): void {
    const releaseDate = new Date(releaseDateStr);
    const reviewDate = new Date(releaseDate.getFullYear() + 1, releaseDate.getMonth(), releaseDate.getDate() + 1);
    this.form.patchValue({ date_revision: this.datePipe.transform(reviewDate, "yyyy-MM-dd") });
  }
}
