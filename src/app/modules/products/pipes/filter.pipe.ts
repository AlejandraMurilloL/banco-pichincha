import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/products.models';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], filterText: string): Product[] {
    if (!filterText) {
      return products;
    }

    return products.filter((item) => 
      JSON.stringify(item, ['name', 'description', 'date_release', 'date_revision'])
        .replace(/("\w+":)/g, '')
        .toLowerCase()
        .includes(filterText.toLocaleLowerCase())
    );
  }
}
