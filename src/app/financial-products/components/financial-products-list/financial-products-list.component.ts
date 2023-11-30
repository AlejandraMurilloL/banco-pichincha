import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financial-products-list',
  templateUrl: './financial-products-list.component.html',
  styleUrls: ['./financial-products-list.component.css']
})
export class FinancialProductsListComponent {

  constructor(private router: Router) {}

  addFinancialProduct() {
    console.log(this.router);
    this.router.navigate(['/financial-products/create']);
  }
}
