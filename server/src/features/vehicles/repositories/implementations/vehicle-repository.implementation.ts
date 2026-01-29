import { Injectable } from '@nestjs/common';
import { Prisma, Vehicle } from 'generated/prisma/client';
import { PrismaConsultException } from 'src/common/exceptions/prisma-consult.exception';
import { PrismaGeneralException } from 'src/common/exceptions/prisma-general.exception';
import { PrismaService } from 'src/common/services/prisma.service';
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaGeneralException(error);
      }

      throw error;
    }
  }

  async findAll(): Promise<Vehicle[]> {
    try {
      return await this.prisma.vehicle.findMany();
    } catch (error) {
      throw new PrismaConsultException(error);
    }
  }

  async findById(id: string): Promise<Vehicle | null> {
    try {
      return await this.prisma.vehicle.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new PrismaConsultException(error);
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaGeneralException(error);
      }

      throw error;
    }
  }

  async delete(id: string): Promise<Vehicle> {
    try {
      return await this.prisma.vehicle.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaGeneralException(error);
      }

      throw error;
    }
  }
}
