import { Injectable } from '@nestjs/common';
import { Brand, Prisma } from 'generated/prisma/client';
import { PrismaConsultException } from 'src/common/exceptions/prisma-consult.exception';
import { PrismaGeneralException } from 'src/common/exceptions/prisma-general.exception';
import { PrismaService } from 'src/common/services/prisma.service';
import { BrandRepository } from '../brand.repository';

@Injectable()
export class BrandRepositoryImpl implements BrandRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string): Promise<Brand> {
    try {
      return await this.prisma.brand.create({
        data: { name },
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
      return await this.prisma.brand.findMany();
    } catch (error) {
      throw new PrismaConsultException(error);
    }
  }

  async findById(id: string): Promise<Brand | null> {
    try {
      return await this.prisma.brand.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new PrismaConsultException(error);
    }
  }

  async update(id: string, name: string): Promise<Brand> {
    try {
      return await this.prisma.brand.update({
        where: { id },
        data: { name },
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
