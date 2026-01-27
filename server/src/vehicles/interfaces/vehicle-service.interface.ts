import { VehicleModel } from 'src/models/vehicle.model';

export interface IVehicleService {
  createVehicle(): VehicleModel;
  getAllVehicles(): VehicleModel[];
  getVehicleById(id: string): VehicleModel;
  updateVehicleById(id: string): VehicleModel;
  deleteVehicleById(id: string): VehicleModel;
}
