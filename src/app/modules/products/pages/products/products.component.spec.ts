import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { NO_ERRORS_SCHEMA, NgZone } from '@angular/core';
import { Router } from '@angular/router';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let router: Router;
  let ngZone: NgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to create product', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    ngZone.run(() => component.createProduct());
    expect(navigateSpy).toHaveBeenCalledWith(['/products/create']);
  });

  it('should filterText changed', () => {
    const newText = 'Test';
    component.filterTextChanged(newText);
    expect(component.filterText).toBe(newText);
  });
});
