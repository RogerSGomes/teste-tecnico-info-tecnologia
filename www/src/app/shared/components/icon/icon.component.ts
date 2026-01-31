import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [MatIcon, CommonModule],
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
export class IconComponent {
  name = input.required<string>();

  type = input<'contained' | 'outlined' | 'rounded'>('contained');
  size = input<'xs' | 'sm' | 'base' | 'lg' | 'xl'>('base');

  getFontSet() {
    const fontsSets = {
      contained: 'material-icons',
      outlined: 'material-symbols-outlined',
      rounded: 'material-icons-round',
    };

    return fontsSets[this.type()] || 'material-icons';
  }
}
