import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
import { FormErrorContainerComponent } from './components/form-error-container/form-error-container.component';
import { FormErrorMessageComponent } from './components/form-error-message/form-error-message.component';

@NgModule({
  declarations: [
    ModalComponent,
    FormErrorContainerComponent,
    FormErrorMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    FormErrorContainerComponent,
    FormErrorMessageComponent
  ]
})
export class SharedModule { }
