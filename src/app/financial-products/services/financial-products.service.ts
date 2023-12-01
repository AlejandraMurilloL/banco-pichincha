import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FinancialProduct } from '../models/financial-products.models';

@Injectable({
  providedIn: 'root'
})
export class FinancialProductsService {

  baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getFinancialProducts() {
    return this.http.get<FinancialProduct[]>(`${this.baseUrl}products`);
  }

  getExistFinancialProduct(id: string) {
    return this.http.get<boolean>(`${this.baseUrl}products/verification?id=${ id }`);
  }
}
