import { Provider } from '@nestjs/common';
import { VehicleRepositoryImpl } from '../repositories/implementations/vehicle-repository.implementation';
import { VehicleRepository } from '../repositories/vehicle.repository';

export const VehicleRepositoryProvider: Provider = {
  provide: VehicleRepository,
  useClass: VehicleRepositoryImpl,
};
