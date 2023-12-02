import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @Input() content: string = '';
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() modalConfirm: EventEmitter<void> = new EventEmitter<void>();

  closeModal(): void {
    this.modalClosed.emit();
  }

  confirm(): void {
    this.modalConfirm.emit();
  }
}
