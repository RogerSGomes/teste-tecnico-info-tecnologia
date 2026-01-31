import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SubscriptSizing } from '@angular/material/form-field';
import { NgxMaskDirective } from 'ngx-mask';
import { MATERIAL_IMPORTS } from '../../material';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MATERIAL_IMPORTS,
    NgxMaskDirective,
  ],
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  control = input.required<FormControl>();
  name = input.required<string>();
  label = input.required<string>();
  placeholder = input.required<string>();
  subscriptSizing = input<SubscriptSizing>('fixed');

  minLength = input(0);
  maxLength = input(0);

  hintLabel = input('');
  errorLabel = input('');

  mask = input('');
  prefix = input('');
  suffix = input('');
}
