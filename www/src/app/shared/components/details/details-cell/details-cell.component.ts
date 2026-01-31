import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-details-cell',
  templateUrl: './details-cell.component.html',
})
export class DetailsCellComponent {
  title = input.required<string>();
  description = input.required<string | number>();

  isLoading = input(false, { transform: booleanAttribute });
}
