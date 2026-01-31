import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-loadable-title',
  templateUrl: './loadable-title.component.html',
})
export class LoadableTitleComponent {
  title = input.required<string>();
  description = input<string>('');

  isLoading = input(false, { transform: booleanAttribute });
}
