import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financial-products-list',
  templateUrl: './financial-products-list.component.html',
  styleUrls: ['./financial-products-list.component.css']
})
export class FinancialProductsListComponent {

  showConfirmModal : boolean = false;

  constructor(private router: Router) {}

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
