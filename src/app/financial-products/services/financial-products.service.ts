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

  deleteFinancialProduct(id: string) {
    this.http.delete(`${this.baseUrl}products?id=${ id }`);
  }

  saveFinancialProduct(product: FinancialProduct, isEdition: boolean) {
    return isEdition ? this._updateFinancialProduct(product) : this._createFinancialProduct(product);
  }

  private _createFinancialProduct(product: FinancialProduct) {
    return this.http.post<FinancialProduct>(`${this.baseUrl}products`, product);
  }

  private _updateFinancialProduct(product: FinancialProduct) {
    return this.http.put<FinancialProduct>(`${this.baseUrl}products`, product);
  }
}
