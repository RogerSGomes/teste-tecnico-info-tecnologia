import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { BaseForm } from '../../../../core/tools/base-form.tool';
import { SHARED_IMPORTS } from '../../../../shared';
import { APP_ROUTES } from '../../../../shared/constants/app-routes.const';
import { BrandModel } from '../../models/brand.model';
import { VehicleModel } from '../../models/vehicle.model';
import { BrandsService } from '../../services/brands.service';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  imports: [SHARED_IMPORTS, ReactiveFormsModule],
  selector: 'app-vehicle-upsert',
  templateUrl: './vehicle-upsert.component.html',
  styleUrl: './vehicle-upsert.component.css',
})
export class VehicleUpsertComponent
  extends BaseForm<VehicleModel>
  implements OnInit
{
  // -------------- Refs --------------
  private readonly destroyRef = inject(DestroyRef);

  // -------------- Services --------------
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly vehiclesService = inject(VehiclesService);
  private readonly brandsService = inject(BrandsService)
  private readonly snackbarService = inject(SnackbarService);

  // -------------- Component states --------------
  isEdit = false;
  currentYear = new Date().getFullYear();

  // -------------- Form options --------------
  brands: BrandModel[] = [];
  models: string[] = [];

  // -------------- BaseForm implementation --------------
  override defaultFormValue: VehicleModel = {
    id: '',
    placa: '',
    chassi: '',
    renavam: '',
    modelo: '',
    marca: '',
    ano: new Date().getFullYear(),
  };

  override buildForm() {
    const { id, placa, chassi, renavam, modelo, marca, ano } =
      this.defaultFormValue;

    this.form = this.formBuilder.group({
      id: [id],
      placa: [placa, [Validators.required]],
      chassi: [
        chassi,
        [Validators.required, Validators.pattern(/^[A-HJ-NPR-Z0-9]{17}$/)],
      ],
      renavam: [renavam, [Validators.required]],
      modelo: [modelo, [Validators.required]],
      marca: [marca, [Validators.required]],
      ano: [ano, [Validators.required]],
    });

    this.getControl('marca')
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((newBrand) => {
        this.loadModelsByBrand(newBrand);
      });
  }

  // -------------- Component lifecycle --------------

  ngOnInit() {
    this.loadMetadata();
    this.buildForm();
    this.loadVehicleDetails();
  }

  // -------------- Component methods --------------
  loadMetadata() {
    this.loadBrands();
  }

  loadBrands() {
    this.brandsService
      .getBrands()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (brands) => {
          this.brands = brands;
          this.enableControl('marca');
        },
        error: () => {
          this.snackbarService.showMessage(
            'Failed to load vehicle brands. Please try again later.',
          );

          this.disableControl('marca');
          this.brands = [];
        },
      });
  }

  loadModelsByBrand(brand: string) {
    this.setControlValue('modelo', '');

    if (!brand) {
      this.models = [];
      this.disableControl('modelo');
      return;
    }

    this.brandsService
      .getModelsByBrand(brand)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (models) => {
          this.models = models;
          this.enableControl('modelo');
        },
        error: () => {
          this.snackbarService.showMessage(
            'Failed to load vehicle models. Please try again later.',
          );

          this.disableControl('modelo');
          this.models = [];
        },
      });
  }

  loadVehicleDetails() {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((id): id is string => !!id),
        switchMap((id) => this.vehiclesService.getVehicleById(id)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (vehicle) => {
          this.isEdit = true;
          this.patchFormValue(vehicle);
        },
        error: () => {
          this.snackbarService.showMessage(
            'Failed to load vehicle details. Please try again later.',
          );
          this.handleGoBack();
        },
      });
  }

  handleSubmit() {
    if (this.isFormInvalid()) {
      return;
    }

    if (this.isEdit) {
      this.handleUpdateVehicle();
      return;
    }

    this.handleCreateVehicle();
  }

  handleCreateVehicle() {
    this.vehiclesService.createVehicle(this.getFormValue()).subscribe({
      next: () => {
        this.snackbarService.showMessage('Vehicle created successfully!');
        this.handleGoBack();
      },
    });
  }

  handleUpdateVehicle() {
    const vehicleId = this.getControlValue('id') as string;
    this.vehiclesService
      .updateVehicle(vehicleId, this.getFormValue())
      .subscribe({
        next: () => {
          this.snackbarService.showMessage('Vehicle updated successfully!');
          this.handleGoBack();
        },
      });
  }

  handleGoBack() {
    this.router.navigate([APP_ROUTES.VEHICLES], { replaceUrl: true });
  }
}
