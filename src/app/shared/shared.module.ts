import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { ConfirmModalComponent } from './modal/confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    ConfirmModalComponent
  ]
})
export class SharedModule { }
