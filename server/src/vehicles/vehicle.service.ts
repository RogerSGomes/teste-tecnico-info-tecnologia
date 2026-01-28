import { Injectable } from '@nestjs/common';
import { Vehicle } from 'generated/prisma/client';
import { IVehicleService } from './interfaces/vehicle-service.interface';
import { VehicleRepository } from './repositories/vehicle.repository';

@Injectable()
export class VehicleService implements IVehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  createVehicle(): Vehicle {
    return this.vehicleRepository.create();
  }

  getAllVehicles(): Vehicle[] {
    return this.vehicleRepository.findAll();
  }

  getVehicleById(id: string): Vehicle {
    return this.vehicleRepository.findById(id);
  }

  updateVehicleById(id: string): Vehicle {
    return this.vehicleRepository.update(id);
  }

  deleteVehicleById(id: string): Vehicle {
    return this.vehicleRepository.delete(id);
  }
}
