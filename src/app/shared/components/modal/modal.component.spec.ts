import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent]
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit modalClosed on click', () => {
    jest.spyOn(component.modalClosed, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.modal__button--cancel')
    ;
    button.dispatchEvent(new Event('click')); 
    fixture.detectChanges();
 
    expect(component.modalClosed.emit).toHaveBeenCalled();
  });

  it('should emit modalConfirm on click', () => {
    jest.spyOn(component.modalConfirm, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.modal__button--confirm')
    ;
    button.dispatchEvent(new Event('click')); 
    fixture.detectChanges();
 
    expect(component.modalConfirm.emit).toHaveBeenCalled();
  });
});
