import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
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
