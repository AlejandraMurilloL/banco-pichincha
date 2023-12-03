import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FinancialProductsService } from '../services/financial-products.service';

export function productIdValidator(
    financialProductService: FinancialProductsService,
): AsyncValidatorFn {
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