import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { VehicleRepositoryProvider } from 'src/features/vehicles/providers/vehicle-repository.provider';
import { VehicleServiceProvider } from 'src/features/vehicles/providers/vehicle-service.provider';
import { BrandModule } from '../brands/brand.module';
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [BrandModule],
  controllers: [VehicleController],
  providers: [PrismaService, VehicleServiceProvider, VehicleRepositoryProvider],
})
export class VehicleModule {}
