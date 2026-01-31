import { VehicleModelModel } from './vehicle-model.model';

export interface BrandModel {
  id: string;
  name: string;
  brandModels?: VehicleModelModel[];
}
