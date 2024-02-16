import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsDetailComponent } from './pages/products-detail/products-detail.component';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsDetailComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ]
})
export class ProductsModule { }
