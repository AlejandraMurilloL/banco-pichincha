import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { ProductsService } from '../../services/products.service';
import { mockProducts } from '../../const/mocks.const';
import { of } from 'rxjs';
import { FilterPipe } from '../../pipes/filter.pipe';
import { CUSTOM_ELEMENTS_SCHEMA, NgZone, SimpleChanges, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('ProductsActionsComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productsMock: Partial<ProductsService>;
  let router: Router;
  let ngZone: NgZone;

  beforeEach(() => {

    productsMock = {
        getProducts: jest.fn(() => of(mockProducts)),
        deleteProduct: jest.fn(() => of('Success'))
    };

    TestBed.configureTestingModule({
      declarations: [ProductsListComponent, FilterPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ FormsModule],
      providers: [
        { provide: ProductsService, useValue: productsMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to edit product', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    ngZone.run(() => component.editProduct(mockProducts[0]));
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should set product to delete and show modal', () => {
    component.deleteProduct(mockProducts[0]);
    expect(component.productToDelete).toBe(mockProducts[0]);
    expect(component.showDeleteModal).toBeTruthy();
  });

  it('should set false show modal', () => {
    component.closeDeleteModal();
    expect(component.showDeleteModal).toBeFalsy();
  });

  it('should call delete product and set false show modal', () => {
    component.productToDelete = mockProducts[0];
    jest.spyOn(productsMock, 'deleteProduct');
    component.confirmDeleteProduct();
    expect(productsMock.deleteProduct).toHaveBeenCalled();
    expect(component.showDeleteModal).toBeFalsy();
  });

  it('should set filterText', () => {
    const changes: SimpleChanges = {
        filterText: {
            currentValue: 'Test',
            previousValue: '',
            firstChange: true,
            isFirstChange: () => true
        }
    };

    component.ngOnChanges(changes);
    expect(component.filterText).toBe('Test');
  });
});
