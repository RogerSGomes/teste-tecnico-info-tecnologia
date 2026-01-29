import { Vehicle } from 'generated/prisma/client';
import { CreateVehicleDto } from '../dtos/create-vehicle.dto';
import { UpdateVehicleDto } from '../dtos/update-vehicle.dto';

export interface IVehicleService {
  createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
  getAllVehicles(): Promise<Vehicle[]>;
  getVehicleById(id: string): Promise<Vehicle>;
  updateVehicleById(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle>;
  deleteVehicleById(id: string): Promise<Vehicle>;
}
