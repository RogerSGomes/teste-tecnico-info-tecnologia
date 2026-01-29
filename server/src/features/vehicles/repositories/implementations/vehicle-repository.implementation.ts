import { Injectable } from '@nestjs/common';
import { Vehicle } from 'generated/prisma/client';
import { PrismaService } from 'src/core/services/prisma.service';
import { CreateVehicleDto } from '../../dtos/create-vehicle.dto';
import { UpdateVehicleDto } from '../../dtos/update-vehicle.dto';
import { VehicleRepository } from '../vehicle.repository';

@Injectable()
export class VehicleRepositoryImpl implements VehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    try {
      return await this.prisma.vehicle.create({
        data: createVehicleDto,
      });
    } catch (error) {
      console.log('Error creating vehicle:', error);
      throw error;
    }
  }

  async findAll(): Promise<Vehicle[]> {
    try {
      return await this.prisma.vehicle.findMany();
    } catch (error) {
      console.log('Error retrieving vehicles:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<Vehicle | null> {
    try {
      return await this.prisma.vehicle.findUnique({
        where: { id },
      });
    } catch (error) {
      console.log('Error retrieving vehicle:', error);
      throw error;
    }
  }

  async update(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    try {
      return await this.prisma.vehicle.update({
        where: { id },
        data: updateVehicleDto,
      });
    } catch (error) {
      console.log('Error updating vehicle:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<Vehicle> {
    try {
      return await this.prisma.vehicle.delete({
        where: { id },
      });
    } catch (error) {
      console.log('Error deleting vehicle:', error);
      throw error;
    }
  }
}
