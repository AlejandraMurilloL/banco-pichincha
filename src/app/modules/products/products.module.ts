import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsDetailComponent } from './pages/products-detail/products-detail.component';
import { ProductsActionsComponent } from './components/products-actions/products-actions.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsDetailComponent,
    ProductsActionsComponent
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
