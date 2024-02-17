import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ProductsService } from '../services/products.service';

export function productIdValidator(financialProductService: ProductsService): AsyncValidatorFn {
    return (control: AbstractControl) => {
        return financialProductService
          .getExistProduct(control.value)
          .pipe(
            map((result: boolean) =>
              result ? { idAlreadyExists: true } : null
            )
          );
      };
}