import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/products.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  @Input() financialProductsFiltered : Product[] = [];
  @Output() openDeleteModal: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() selectPageSize: EventEmitter<number> = new EventEmitter<number>();

  pageSizes : number[] = [5, 10, 20];
  pageSize  : number = 5;

  constructor(private router: Router) {
    
  }
  
  editProduct(product: Product): void  {
    this.router.navigate([`/products/update/${product.id}`], { state: product });
  }

  openConfirmModal(product: Product) {
    this.openDeleteModal.emit(product);
  }

  pageSizeSelected() {
    this.selectPageSize.emit(this.pageSize);
  }
}
