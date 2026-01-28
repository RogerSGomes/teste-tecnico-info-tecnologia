import { Vehicle } from 'generated/prisma/client';

export interface IVehicleService {
  createVehicle(): Vehicle;
  getAllVehicles(): Vehicle[];
  getVehicleById(id: string): Vehicle;
  updateVehicleById(id: string): Vehicle;
  deleteVehicleById(id: string): Vehicle;
}
