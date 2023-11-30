import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FinancialProductsListComponent } from './financial-products-list/financial-products-list.component';
import { FinancialProductsRoutingModule } from './financial-products-routing.module';
import { FinancialProductsCreateComponent } from './financial-products-create/financial-products-create.component';


@NgModule({
  declarations: [
    FinancialProductsListComponent,
    FinancialProductsCreateComponent
  ],
  imports: [
    CommonModule,
    FinancialProductsRoutingModule
  ]
})
export class FinancialProductsModule { }
