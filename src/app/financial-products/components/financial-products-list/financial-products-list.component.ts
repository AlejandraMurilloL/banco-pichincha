import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FinancialProduct } from '../../models/financial-products.models';
import { FinancialProductsService } from '../../services/financial-products.service';

@Component({
  selector: 'app-financial-products-list',
  templateUrl: './financial-products-list.component.html',
  styleUrls: ['./financial-products-list.component.css']
})
export class FinancialProductsListComponent implements OnInit, OnDestroy {

  showConfirmModal          : boolean = false;
  financialProducts         : FinancialProduct[] = [];
  financialProductsFiltered : FinancialProduct[] = [];
  filterText                : string = '';
  productToDelete!          : FinancialProduct;

  pageSizes : number[] = [5, 10, 20];
  pageSize  : number = 5;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private financialProductsServices: FinancialProductsService
  ) {}

  ngOnInit(): void {
    this._loadFinancialProducts();
  }

  addFinancialProduct(): void {
    this.router.navigate(['/financial-products/create']);
  }

  openConfirmModal(financialProduct: FinancialProduct): void {
    this.productToDelete = financialProduct;
    this.showConfirmModal = true;
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
  }

  confirmDelete(): void {
    this._deleteFinancialProduct();
    this.showConfirmModal = false;
  }

  pageSizeSelected(): void {
    this.filterProducts();
    this.financialProductsFiltered = this.financialProductsFiltered.slice(0, this.pageSize);
  }

  editProduct(product: FinancialProduct): void  {
    this.router.navigate([`/financial-products/update/${product.id}`], { state: product });
  }

  filterProducts() {
    if (!this.filterText) {
      this.financialProductsFiltered = this.financialProducts;
      return;
    }
  
    this.financialProductsFiltered = this.financialProducts
    .filter(item => item.id.toLowerCase().includes(this.filterText.toLowerCase()) ||
              item.name.toLowerCase().includes(this.filterText.toLowerCase()) || 
              item.description.toLowerCase().includes(this.filterText.toLowerCase()) || 
              this.datePipe.transform(item.date_release, "dd/MM/yyyy", 'UTC')?.includes(this.filterText.toLowerCase()) || 
              this.datePipe.transform(item.date_revision, "dd/MM/yyyy", 'UTC')?.includes(this.filterText.toLowerCase()) 
    ).slice(0, this.pageSize);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _loadFinancialProducts(): void {
    this.financialProductsServices
      .getFinancialProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.financialProducts = data;
        this.financialProductsFiltered = data.slice(0, this.pageSize);
      });
  }

  private _deleteFinancialProduct(): void {
    this.financialProductsServices
      .deleteFinancialProduct(this.productToDelete.id)
      .subscribe(() => this._loadFinancialProducts());
  }
}
