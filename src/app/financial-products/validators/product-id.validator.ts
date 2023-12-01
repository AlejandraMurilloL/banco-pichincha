import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FinancialProductsService } from '../services/financial-products.service';

export function productIdValidator(
    financialProductService: FinancialProductsService,
): AsyncValidatorFn {
    console.log('Validando ID.......');
    return (control: AbstractControl) => {
        return financialProductService
          .getExistFinancialProduct(control.value)
          .pipe(
            map((result: boolean) =>
              result ? { idAlreadyExists: true } : null
            )
          );
      };
}