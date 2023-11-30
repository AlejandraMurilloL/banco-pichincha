import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'financial-products',
    loadChildren: () => import('./financial-products/financial-products.module').then(m => m.FinancialProductsModule) 
  },
  {
    path: '**',
    redirectTo: 'financial-products'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
