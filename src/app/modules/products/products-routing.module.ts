import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsDetailComponent } from './pages/products-detail/products-detail.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: ProductsDetailComponent
      },
      {
        path: 'update/:id',
        component: ProductsDetailComponent
      },
      {
        path: 'list',
        component: ProductsListComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
