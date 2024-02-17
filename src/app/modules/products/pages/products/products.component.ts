import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/products.models';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  showConfirmModal          : boolean = false;
  financialProducts         : Product[] = [];
  financialProductsFiltered : Product[] = [];
  productToDelete!          : Product;

  pageSize: number = 5;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private productsServices: ProductsService
  ) {}

  ngOnInit(): void {
    this._loadFinancialProducts();
  }

  addFinancialProduct(): void {
    this.router.navigate(['/products/create']);
  }

  openConfirmModal(product: Product): void {
    this.productToDelete = product;
    this.showConfirmModal = true;
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
  }

  confirmDelete(): void {
    this._deleteFinancialProduct();
    this.showConfirmModal = false;
  }

  pageSizeSelected(pageSize: number): void {
    this.pageSize = pageSize;
    this.filterProducts('');
    this.financialProductsFiltered = this.financialProductsFiltered.slice(0, this.pageSize);
  }

  filterProducts(filterText: string) {
    if (!filterText) {
      this.financialProductsFiltered = this.financialProducts;
      return;
    }
  
    this.financialProductsFiltered = this.financialProducts
    .filter(item => item.id.toLowerCase().includes(filterText.toLowerCase()) ||
              item.name.toLowerCase().includes(filterText.toLowerCase()) || 
              item.description.toLowerCase().includes(filterText.toLowerCase()) || 
              this.datePipe.transform(item.date_release, "dd/MM/yyyy", 'UTC')?.includes(filterText.toLowerCase()) || 
              this.datePipe.transform(item.date_revision, "dd/MM/yyyy", 'UTC')?.includes(filterText.toLowerCase()) 
    ).slice(0, this.pageSize);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _loadFinancialProducts(): void {
    this.productsServices
      .getFinancialProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.financialProducts = data;
        this.financialProductsFiltered = data.slice(0, this.pageSize);
      });
  }

  private _deleteFinancialProduct(): void {
    this.productsServices
      .deleteFinancialProduct(this.productToDelete.id)
      .subscribe(() => this._loadFinancialProducts());
  }
}
