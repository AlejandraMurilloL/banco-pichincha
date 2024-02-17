import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/products.models';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnChanges {

  private readonly router: Router = inject(Router);
  private readonly productsService: ProductsService = inject(ProductsService);

  @Input() filterText: string = '';

  products$: Observable<Product[]> = new Observable<Product[]>();
  pageSizes: number[] = [5, 10, 20];
  pageSize: number = 5;
  showDeleteModal: boolean = false;
  productToDelete!: Product;

  ngOnInit(): void {
    this._loadProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterText = changes['filterText'].currentValue;
  }
  
  editProduct(product: Product): void  {
    this.router.navigate([`/products/update/${product.id}`], { state: product });
  }

  deleteProduct(product: Product): void {
    this.productToDelete = product;
    this.showDeleteModal = true;
  }

  confirmDeleteProduct(): void {
    this.productsService
      .deleteProduct(this.productToDelete.id)
      .subscribe(() => {
        this._loadProducts();
        this.closeDeleteModal();
      });
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  private _loadProducts(): void {
    this.products$ = this.productsService.getProducts();
  }
}
