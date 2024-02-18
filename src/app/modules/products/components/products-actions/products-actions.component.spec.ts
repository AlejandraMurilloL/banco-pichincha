import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsActionsComponent } from './products-actions.component';
import { FormsModule } from '@angular/forms';

describe('ProductsActionsComponent', () => {
  let component: ProductsActionsComponent;
  let fixture: ComponentFixture<ProductsActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsActionsComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(ProductsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search on click', () => {
    jest.spyOn(component.search, 'emit');
    component.filterText = 'Test';
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.product-actions__search')
    ;
    button.dispatchEvent(new Event('keyup')); 
    fixture.detectChanges();
 
    expect(component.search.emit).toHaveBeenCalledWith('Test');
  });

  it('should emit create on click', () => {
    jest.spyOn(component.create, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.product-actions__create')
    ;
    button.dispatchEvent(new Event('click')); 
    fixture.detectChanges();
 
    expect(component.create.emit).toHaveBeenCalled();
  });
});
