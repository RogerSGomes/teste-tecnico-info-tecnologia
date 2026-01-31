import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SubscriptSizing } from '@angular/material/form-field';
import { MATERIAL_IMPORTS } from '../../material';

export interface SelectInputOption<T> {
  id: string;
  label: string;
  value: T;
}

@Component({
  imports: [CommonModule, ReactiveFormsModule, MATERIAL_IMPORTS],
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css',
})
export class SelectInputComponent<T> {
  control = input.required<FormControl>();
  subscriptSizing = input<SubscriptSizing>('fixed');

  label = input.required<string>();
  placeholder = input.required<string>();
  options = input.required<SelectInputOption<T>[]>();

  hintLabel = input('');
  errorLabel = input('');

  clearable = input(false, { transform: booleanAttribute });
}
