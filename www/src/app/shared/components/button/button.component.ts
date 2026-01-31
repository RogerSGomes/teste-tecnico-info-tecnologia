import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { buttonVariants } from './button.variants';

@Component({
  imports: [CommonModule, IconComponent],
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  readonly buttonVariants = buttonVariants;

  label = input.required<string>();
  size = input<'xsmall' | 'small' | 'normal'>('small');
  variant = input<'info' | 'success' | 'error'>('info');
  appearance = input<
    | 'contained'
    | 'outlined'
    | 'outlined_background'
    | 'outlined_white'
    | 'text'
    | 'text_white'
  >('contained');

  icon = input<string>('');
  iconType = input<'contained' | 'outlined'>('contained');
  iconPosition = input<'left' | 'right' | null>(null);

  disabled = input(false, { transform: booleanAttribute });
}
