import { Component, Host, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormErrorContainerComponent } from '../form-error-container/form-error-container.component';
import { errorsDictionary } from '../../dictionaries/errors.dictionary';

@Component({
  selector: 'app-form-error-message',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.scss']
})
export class FormErrorMessageComponent {
  @Input() errorCode!: string;
  @Input() customMessage!: string;
  control!: AbstractControl | null;

  get errorMsg(): string {
    if (this.customMessage) {
      return this.customMessage;
    }

    if (errorsDictionary[this.errorCode] !== undefined) {
      return errorsDictionary[this.errorCode];
    }

    return `Hay un error en el campo. (code: ${this.errorCode})`;
  }

  constructor(@Host() private errorContainer: FormErrorContainerComponent) {}

  ngOnInit(): void {
    this.control = this.errorContainer.control;
  }
}
