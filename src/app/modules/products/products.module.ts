import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsActionsComponent } from './components/products-actions/products-actions.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsDetailComponent } from './pages/products-detail/products-detail.component';
import { ProductsComponent } from './pages/products/products.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ProductsRoutingModule } from './products-routing.module';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsDetailComponent,
    ProductsActionsComponent,
    ProductsListComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    DatePipe,
  ]
})
export class ProductsModule { }
