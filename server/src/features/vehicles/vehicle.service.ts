import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Vehicle } from 'generated/prisma/client';
import { PROVIDERS_INSTANCE } from 'src/constants/providers-instance.constant';
import type { IBrandService } from '../brands/interfaces/brand-service.interface';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { IVehicleService } from './interfaces/vehicle-service.interface';
import { VehicleRepository } from './repositories/vehicle.repository';

@Injectable()
export class VehicleService implements IVehicleService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    @Inject(PROVIDERS_INSTANCE.BRAND_SERVICE)
    private readonly brandService: IBrandService,
  ) {}

  async createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    await this.validateIfBrandExists(createVehicleDto.brandId);
    return await this.vehicleRepository.create(createVehicleDto);
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    return await this.vehicleRepository.findAll();
  }

  async getVehicleById(id: string): Promise<Vehicle> {
    const foundVehicle = await this.vehicleRepository.findById(id);

    // Throw not found exception if vehicle does not exist
    if (!foundVehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return foundVehicle;
  }

  async updateVehicleById(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return await this.vehicleRepository.update(id, updateVehicleDto);
  }

  async deleteVehicleById(id: string): Promise<Vehicle> {
    return await this.vehicleRepository.delete(id);
  }

  private async validateIfBrandExists(brandId: string): Promise<void> {
    // Use the BrandService validation to check if the brand exists
    await this.brandService.getBrandById(brandId);
  }
}
