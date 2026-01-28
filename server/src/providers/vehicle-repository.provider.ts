import { Provider } from '@nestjs/common';
import { VehicleRepositoryImpl } from 'src/vehicles/repositories/implementations/vehicle-repository.implementation';
import { VehicleRepository } from 'src/vehicles/repositories/vehicle.repository';

export const VehicleRepositoryProvider: Provider = {
  provide: VehicleRepository,
  useClass: VehicleRepositoryImpl,
};
