import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, finalize, map, switchMap, tap } from 'rxjs';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { SHARED_IMPORTS } from '../../../../shared';
import { APP_ROUTES } from '../../../../shared/constants/app-routes.const';
import { MASKS } from '../../../../shared/constants/masks.const';
import { VehicleModel } from '../../models/vehicle.model';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  imports: [SHARED_IMPORTS],
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css',
})
export class VehicleDetailsComponent implements OnInit {
  // -------------- Refs --------------
  private readonly destroyRef = inject(DestroyRef);

  // -------------- Constants --------------
  readonly MASKS = MASKS;

  // -------------- Services --------------
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly vehiclesService = inject(VehiclesService);
  private readonly snackbarService = inject(SnackbarService);

  // -------------- Component states --------------
  isLoading = false;
  vehicle: VehicleModel | null = null;

  // -------------- Component lifecycle --------------
  ngOnInit() {
    this.loadVehicleDetails();
  }

  // -------------- Component methods --------------
  loadVehicleDetails() {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        tap((id) => (this.isLoading = !!id)),
        filter((id): id is string => !!id),
        switchMap((id) =>
          this.vehiclesService
            .getVehicleById(id)
            .pipe(finalize(() => (this.isLoading = false))),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (vehicle) => {
          this.vehicle = vehicle;
        },
        error: () => {
          this.snackbarService.showMessage(
            'Failed to load vehicle details. Please try again later.',
          );
          this.handleGoBack();
        },
      });
  }

  handleGoBack() {
    this.router.navigate([APP_ROUTES.VEHICLES], { replaceUrl: true });
  }
}
