import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorContainerComponent } from './form-error-container.component';

describe('FormErrorContainerComponent', () => {
  let component: FormErrorContainerComponent;
  let fixture: ComponentFixture<FormErrorContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormErrorContainerComponent]
    });
    fixture = TestBed.createComponent(FormErrorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
