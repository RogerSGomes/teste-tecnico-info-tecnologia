import { BrandModel } from './brand.model';
import { VehicleModelModel } from './vehicle-model.model';

export interface VehicleModel {
  id: string;
  brandId: string;
  modelId: string;
  licensePlate: string;
  chassis: string;
  renavam: string;
  year: number;
  brand?: BrandModel;
  model?: VehicleModelModel;
}
