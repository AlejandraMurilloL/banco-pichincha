import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FinancialProductsDetailsComponent } from './components/financial-products-details/financial-products-details.component';
import { FinancialProductsListComponent } from './components/financial-products-list/financial-products-list.component';
import { FinancialProductsRoutingModule } from './financial-products-routing.module';


@NgModule({
  declarations: [
    FinancialProductsListComponent,
    FinancialProductsDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FinancialProductsRoutingModule,
    SharedModule
  ]
})
export class FinancialProductsModule { }
