import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private readonly router: Router = inject(Router);
  
  filterText: string = '';

  createProduct(): void {
    this.router.navigate(['/products/create']);
  }

  filterTextChanged(filterText: string): void {
    this.filterText = filterText;
  }
}
