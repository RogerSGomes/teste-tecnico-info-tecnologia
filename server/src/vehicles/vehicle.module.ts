import { Module } from '@nestjs/common';
import { VehicleServiceProvider } from 'src/providers/vehicle-service.provider';
import { VehicleController } from './vehicle.controller';

@Module({
  controllers: [VehicleController],
  providers: [VehicleServiceProvider],
})
export class VehicleModule {}
