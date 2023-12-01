import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinancialProduct } from '../../models/financial-products.models';
import { FinancialProductsService } from '../../services/financial-products.service';

@Component({
  selector: 'app-financial-products-list',
  templateUrl: './financial-products-list.component.html',
  styleUrls: ['./financial-products-list.component.css']
})
export class FinancialProductsListComponent implements OnInit {

  showConfirmModal : boolean = false;
  financialProducts: FinancialProduct[] = [];
  financialProductsFiltered: FinancialProduct[] = [];
  filterText: string = '';

  pageSizes: number[] = [1, 2, 3];
  pageSize: number = 2;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private financialProductsServices: FinancialProductsService
  ) {}

  ngOnInit(): void {
    this.financialProductsServices
      .getFinancialProducts()
      .subscribe(data => {
        this.financialProducts = data;
        this.financialProductsFiltered = data.slice(0, this.pageSize);
      });
  }

  addFinancialProduct(): void {
    this.router.navigate(['/financial-products/create']);
  }

  openConfirmModal(): void {
    this.showConfirmModal = true;
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
  }

  pageSizeSelected(): void {
    this.filterProducts();
    this.financialProductsFiltered = this.financialProductsFiltered.slice(0, this.pageSize);
  }

  filterProducts() {
    if (!this.filterText) {
      this.financialProductsFiltered = this.financialProducts;
      return;
    }
  
    this.financialProductsFiltered = this.financialProducts.filter(
      item => item.id.toLowerCase().includes(this.filterText.toLowerCase()) ||
              item.name.toLowerCase().includes(this.filterText.toLowerCase()) || 
              item.description.toLowerCase().includes(this.filterText.toLowerCase()) || 
              this.datePipe.transform(item.date_release, "dd/MM/yyyy", 'UTC')?.includes(this.filterText.toLowerCase()) || 
              this.datePipe.transform(item.date_revision, "dd/MM/yyyy", 'UTC')?.includes(this.filterText.toLowerCase()) 
    ).slice(0, this.pageSize);
  }
}
