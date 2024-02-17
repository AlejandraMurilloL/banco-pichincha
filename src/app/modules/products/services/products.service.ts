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

  getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}products`);
  }

  getExistProduct(id: string) {
    return this.http.get<boolean>(`${this.baseUrl}products/verification?id=${ id }`);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.baseUrl}products?id=${ id }`, { responseType: 'text' });
  }

  saveProduct(product: Product, isEdition: boolean) {
    return isEdition ? this._updateProduct(product) : this._createProduct(product);
  }

  private _createProduct(product: Product) {
    return this.http.post<Product>(`${this.baseUrl}products`, product);
  }

  private _updateProduct(product: Product) {
    return this.http.put<Product>(`${this.baseUrl}products`, product);
  }
}
