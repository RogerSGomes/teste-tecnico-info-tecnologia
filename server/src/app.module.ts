import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VehicleModule } from './vehicles/vehicle.module';

@Module({
  imports: [ConfigModule.forRoot(), VehicleModule],
})
export class AppModule {}
