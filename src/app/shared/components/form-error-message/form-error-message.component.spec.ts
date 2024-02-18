import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorMessageComponent } from './form-error-message.component';
import { FormErrorContainerComponent } from '../form-error-container/form-error-container.component';

describe('FormErrorMessageComponent', () => {
  let component: FormErrorMessageComponent;
  let fixture: ComponentFixture<FormErrorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [FormErrorMessageComponent]
    }).overrideComponent(FormErrorMessageComponent, {
      add: {
        providers: [
          { provide: FormErrorContainerComponent }
        ]
      }
    });

    fixture = TestBed.createComponent(FormErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return custom message', () => {
    const customMessage = 'Mensaje de error personalizado';
    component.customMessage = customMessage;

    const result = component.errorMsg;
    expect(result).toBe(customMessage);
  });

  it('should return required message', () => {
    component.errorCode = 'required';

    const result = component.errorMsg;
    expect(result).toBe('Este campo es requerido!');
  });

  it('should return default message', () => {
    const code = 'codeNotExist';
    component.errorCode = code;

    const result = component.errorMsg;
    expect(result).toBe(`Hay un error en el campo. (code: ${code})`);
  });
});
