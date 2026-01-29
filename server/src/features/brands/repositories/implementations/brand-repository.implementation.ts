import { Brand } from 'generated/prisma/client';
import { PrismaService } from 'src/core/services/prisma.service';
import { BrandRepository } from '../brand.repository';

export class BrandRepositoryImpl implements BrandRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string): Promise<Brand> {
    try {
      return await this.prisma.brand.create({
        data: { name },
      });
    } catch (error) {
      console.log('Error creating brand:', error);
      throw error;
    }
  }

  async findAll(): Promise<Brand[]> {
    try {
      return await this.prisma.brand.findMany();
    } catch (error) {
      console.log('Error retrieving brands:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<Brand | null> {
    try {
      return await this.prisma.brand.findUnique({
        where: { id },
      });
    } catch (error) {
      console.log('Error retrieving brand:', error);
      throw error;
    }
  }

  async update(id: string, name: string): Promise<Brand> {
    try {
      return await this.prisma.brand.update({
        where: { id },
        data: { name },
      });
    } catch (error) {
      console.log('Error updating brand:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<Brand> {
    try {
      return await this.prisma.brand.delete({
        where: { id },
      });
    } catch (error) {
      console.log('Error deleting brand:', error);
      throw error;
    }
  }
}
