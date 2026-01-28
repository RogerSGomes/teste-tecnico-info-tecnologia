import { Module } from '@nestjs/common';
import { VehicleRepositoryProvider } from 'src/providers/vehicle-repository.provider';
import { VehicleServiceProvider } from 'src/providers/vehicle-service.provider';
import { VehicleController } from './vehicle.controller';

@Module({
  controllers: [VehicleController],
  providers: [VehicleServiceProvider, VehicleRepositoryProvider],
})
export class VehicleModule {}
