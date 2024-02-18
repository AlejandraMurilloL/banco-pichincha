import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-container',
  templateUrl: './form-error-container.component.html',
  styleUrls: ['./form-error-container.component.scss']
})
export class FormErrorContainerComponent {
  @Input('forControl') control!: AbstractControl | null;
}
