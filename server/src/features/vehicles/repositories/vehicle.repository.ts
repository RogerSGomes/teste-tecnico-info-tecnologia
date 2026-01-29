import { Vehicle } from 'generated/prisma/client';
import { CreateVehicleDto } from '../dtos/create-vehicle.dto';
import { UpdateVehicleDto } from '../dtos/update-vehicle.dto';

export abstract class VehicleRepository {
  abstract create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
  abstract findAll(): Promise<Vehicle[]>;
  abstract findById(id: string): Promise<Vehicle | null>;
  abstract update(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle>;
  abstract delete(id: string): Promise<Vehicle>;
}
