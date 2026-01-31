import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { SHARED_IMPORTS } from '../../../../shared';
import { APP_ROUTES } from '../../../../shared/constants/app-routes.const';
import { VehicleModel } from '../../models/vehicle.model';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  imports: [SHARED_IMPORTS],
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css',
})
export class VehicleListComponent implements OnInit {
  // -------------- Refs --------------
  private readonly destroyRef = inject(DestroyRef);

  // -------------- Services --------------
  private readonly router = inject(Router);
  private readonly vehiclesService = inject(VehiclesService);
  private readonly snackbarService = inject(SnackbarService);

  // -------------- Component states --------------
  isLoading = false;
  vehicles: VehicleModel[] = [];
  vehiclesLength = 0;

  // -------------- Component lifecycle --------------
  ngOnInit() {
    this.loadVehicles();
  }

  // -------------- Component methods --------------
  loadVehicles() {
    this.isLoading = true;
    this.vehiclesService
      .getVehicles()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (vehicles) => {
          this.vehicles = vehicles;
          this.vehiclesLength = vehicles.length;
        },
        error: () => {
          this.snackbarService.showMessage(
            'Failed to load vehicles. Please try again later.',
          );

          this.isLoading = false;
          this.vehicles = [];
          this.vehiclesLength = 0;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  handleCreateVehicle() {
    this.router.navigate([APP_ROUTES.VEHICLE_CREATE]);
  }

  handleViewDetails(vehicle: VehicleModel) {
    this.router.navigate([APP_ROUTES.VEHICLE_DETAILS(vehicle.id)]);
  }

  handleEditVehicle(vehicle: VehicleModel) {
    this.router.navigate([APP_ROUTES.VEHICLE_EDIT(vehicle.id)]);
  }

  handleDeleteVehicle(vehicle: VehicleModel) {
    this.vehiclesService
      .deleteVehicle(vehicle.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loadVehicles();
          this.snackbarService.showMessage('Vehicle deleted successfully.');
        },
        error: () => {
          this.snackbarService.showMessage(
            'Failed to delete vehicle. Please try again later.',
          );
        },
      });
  }
}
