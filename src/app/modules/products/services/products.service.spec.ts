import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { ProductsService } from "./products.service";
import { mockProducts } from "../const/mocks.const";
import { environment } from "../../../../environments/environment";

describe("ProductsService", () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should retrieve the products list", (done) => {
    service.getProducts().subscribe((response) => {
      expect(response).toEqual(mockProducts);
      done();
    });

    const url = `${environment.apiUrl}products`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");

    req.flush(mockProducts);
  });

  it("should retrieve product exist true", (done) => {
    const productId = '1234';
    service.getExistProduct(productId).subscribe((response) => {
      expect(response).toEqual(false);
      done();
    });

    const url = `${environment.apiUrl}products/verification?id=${ productId }`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");

    req.flush(false);
  });

  it("should delete product", (done) => {
    const productId = '1234';
    service.deleteProduct(productId).subscribe((response) => {
      expect(response).toBe('Product successfully removed');
      done();
    });

    const url = `${environment.apiUrl}products?id=${ productId }`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("DELETE");

    req.flush('Product successfully removed');
  });

  it("should create product", (done) => {
    const isEdition = false;
    const product = {
        id: '1234',
        name: 'Producto 1',
        description: 'Descripción producto 1',
        logo: '',
        date_release: new Date(),
        date_revision: new Date()
    };

    service.saveProduct(product, isEdition).subscribe((response) => {
      expect(response).toBe(product);
      done();
    });

    const url = `${environment.apiUrl}products`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("POST");

    req.flush(product);
  });

  it("should create product", (done) => {
    const isEdition = true;
    const product = {
        id: '1234',
        name: 'Producto 1 Actualizado',
        description: 'Descripción producto 1',
        logo: '',
        date_release: new Date(),
        date_revision: new Date()
    };

    service.saveProduct(product, isEdition).subscribe((response) => {
      expect(response).toBe(product);
      done();
    });

    const url = `${environment.apiUrl}products`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("PUT");

    req.flush(product);
  });
});
