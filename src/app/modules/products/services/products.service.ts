import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Product } from '../models/products.models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getFinancialProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}products`);
  }

  getExistFinancialProduct(id: string) {
    return this.http.get<boolean>(`${this.baseUrl}products/verification?id=${ id }`);
  }

  deleteFinancialProduct(id: string) {
    return this.http.delete(`${this.baseUrl}products?id=${ id }`, { responseType: 'text' });
  }

  saveFinancialProduct(product: Product, isEdition: boolean) {
    return isEdition ? this._updateFinancialProduct(product) : this._createFinancialProduct(product);
  }

  private _createFinancialProduct(product: Product) {
    return this.http.post<Product>(`${this.baseUrl}products`, product);
  }

  private _updateFinancialProduct(product: Product) {
    return this.http.put<Product>(`${this.baseUrl}products`, product);
  }
}
