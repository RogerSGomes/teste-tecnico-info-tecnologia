import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideNgxMask } from 'ngx-mask';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgxMask({
      thousandSeparator: '.',
      decimalMarker: ',',
    }),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
};
