import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, finalize, map, switchMap, tap } from 'rxjs';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { BaseForm } from '../../../../core/tools/base-form.tool';
import { SHARED_IMPORTS } from '../../../../shared';
import { SelectInputOption } from '../../../../shared/components/inputs/select-input/select-input.component';
import { APP_ROUTES } from '../../../../shared/constants/app-routes.const';
import { BrandModel } from '../../models/brand.model';
import { VehicleModelModel } from '../../models/vehicle-model.model';
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
  private readonly brandsService = inject(BrandsService);
  private readonly snackbarService = inject(SnackbarService);

  // -------------- Component states --------------
  isEdit = false;
  isLoading = false;
  vehicle: VehicleModel | null = null;

  // -------------- Form options --------------
  brandOptions: SelectInputOption<BrandModel>[] = [];
  modelOptions: SelectInputOption<VehicleModelModel>[] = [];

  // -------------- BaseForm implementation --------------
  override defaultFormValue: VehicleModel = {
    id: '',
    licensePlate: '',
    chassis: '',
    renavam: '',
    brandId: '',
    modelId: '',
    year: new Date().getFullYear(),
  };

  override buildForm() {
    const { id, licensePlate, chassis, renavam, brandId, modelId, year } =
      this.defaultFormValue;

    this.form = this.formBuilder.group({
      id: [id],
      licensePlate: [licensePlate, [Validators.required]],
      chassis: [
        chassis,
        [Validators.required, Validators.pattern(/^[A-HJ-NPR-Z0-9]{17}$/)],
      ],
      renavam: [renavam, [Validators.required]],
      brandId: [brandId, [Validators.required]],
      modelId: [modelId, [Validators.required]],
      year: [
        year,
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ],
      ],
    });

    this.getControl('brandId')
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((brandId) => {
        const selectedBrand = this.brandOptions.find(
          (brand) => brand.id === brandId,
        );

        this.modelOptions =
          selectedBrand?.value?.brandModels?.map((model) => ({
            id: model.id,
            label: model.name,
            value: model,
          })) || [];

        this.getControl('modelId').setValue('');
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
          this.brandOptions = brands.map((brand) => ({
            id: brand.id,
            label: brand.name,
            value: brand,
          }));
          this.enableControl('modelId');
        },
        error: () => {
          this.brandOptions = [];
          this.disableControl('modelId');
          this.snackbarService.showMessage(
            'Falha ao carregar marcas de veículos. Por favor, tente novamente mais tarde.',
          );
        },
      });
  }

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
          this.isEdit = true;
          this.vehicle = vehicle;
          this.patchFormValue(vehicle);
        },
        error: () => {
          this.handleGoBack();
          this.snackbarService.showMessage(
            'Falha ao carregar detalhes do veículo. Por favor, tente novamente mais tarde.',
          );
        },
      });
  }

  handleSubmit() {
    if (this.isFormInvalid()) return;
    this.isEdit ? this.handleUpdateVehicle() : this.handleCreateVehicle();
  }

  handleCreateVehicle() {
    this.vehiclesService.createVehicle(this.getFormValue()).subscribe({
      next: () => {
        this.handleGoBack();
        this.snackbarService.showMessage('Veículo criado com sucesso!');
      },
    });
  }

  handleUpdateVehicle() {
    const vehicleId = this.getControlValue('id') as string;
    this.vehiclesService
      .updateVehicle(vehicleId, this.getFormValue())
      .subscribe({
        next: () => {
          this.handleGoBack();
          this.snackbarService.showMessage('Veículo atualizado com sucesso!');
        },
      });
  }

  handleGoBack() {
    this.router.navigate([APP_ROUTES.VEHICLES], { replaceUrl: true });
  }
}
