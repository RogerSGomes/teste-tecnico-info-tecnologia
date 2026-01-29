import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BrandModule } from './features/brands/brand.module';
import { VehicleModule } from './features/vehicles/vehicle.module';

@Module({
  imports: [ConfigModule.forRoot(), VehicleModule, BrandModule],
})
export class AppModule {}
