import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialProductsDetailsComponent } from './components/financial-products-details/financial-products-details.component';
import { FinancialProductsListComponent } from './components/financial-products-list/financial-products-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: FinancialProductsDetailsComponent
      },
      {
        path: 'update/:id',
        component: FinancialProductsDetailsComponent
      },
      {
        path: 'list',
        component: FinancialProductsListComponent
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
export class FinancialProductsRoutingModule { }
