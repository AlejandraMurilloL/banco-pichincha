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

  constructor(
    private router: Router,
    private financialProductsServices: FinancialProductsService
  ) {}

  ngOnInit(): void {
    this.financialProductsServices
      .getFinancialProducts()
      .subscribe(data => this.financialProducts = data);
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
}
