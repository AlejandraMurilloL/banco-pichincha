import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-actions',
  templateUrl: './products-actions.component.html',
  styleUrls: ['./products-actions.component.scss']
})
export class ProductsActionsComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() create: EventEmitter<void> = new EventEmitter<void>();

  filterText: string = '';

  onSearch(): void {
    this.search.emit(this.filterText);
  }

  onCreate(): void {
    this.create.emit();
  }
}
