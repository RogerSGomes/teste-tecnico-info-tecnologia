import { Injectable } from '@nestjs/common';
import { Brand, Prisma } from 'generated/prisma/client';
import { PrismaConsultException } from 'src/common/exceptions/prisma-consult.exception';
import { PrismaGeneralException } from 'src/common/exceptions/prisma-general.exception';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateBrandDto } from '../../dtos/create-brand.dto';
import { UpdateBrandDto } from '../../dtos/update-brand.dto';
import { BrandRepository } from '../brand.repository';

@Injectable()
export class BrandRepositoryImpl implements BrandRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      // Cria a marca vinculando modelos disponíveis
      return await this.prisma.brand.create({
        data: {
          name: createBrandDto.name,
          brandModels: {
            create: createBrandDto.models.map((model) => ({
              name: model,
            })),
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaGeneralException(error);
      }

      throw error;
    }
  }

  async findAll(): Promise<Brand[]> {
    try {
      return await this.prisma.brand.findMany({
        include: {
          brandModels: true,
        },
      });
    } catch (error) {
      throw new PrismaConsultException(error);
    }
  }

  async findById(id: string): Promise<Brand | null> {
    try {
      return await this.prisma.brand.findUnique({
        where: { id },
        include: {
          brandModels: true,
        },
      });
    } catch (error) {
      throw new PrismaConsultException(error);
    }
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    try {
      const updateData: Prisma.BrandUpdateInput = {
        brandModels: {
          // adiciona novos modelos pelo nome
          create: updateBrandDto.modelsToAdd?.map((modelName) => ({
            name: modelName,
          })),
          // remove modelos pelo ID
          deleteMany: updateBrandDto.modelsToRemove?.map((modelId) => ({
            id: modelId,
          })),
        },
      };

      if (updateBrandDto.name) {
        updateData.name = updateBrandDto.name;
      }

      return await this.prisma.brand.update({
        where: { id },
        data: updateData,
        include: {
          brandModels: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaGeneralException(error);
      }

      throw error;
    }
  }

  async delete(id: string): Promise<Brand> {
    try {
      return await this.prisma.brand.delete({
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
