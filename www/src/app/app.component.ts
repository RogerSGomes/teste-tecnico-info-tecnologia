import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { COMPONENTS_IMPORTS } from './shared/components';

@Component({
  imports: [RouterOutlet, ...COMPONENTS_IMPORTS],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
