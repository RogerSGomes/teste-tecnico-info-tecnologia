import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from 'generated/prisma/client';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { UpdateBrandDto } from './dtos/update-brand.dto';
import { IBrandService } from './interfaces/brand-service.interface';
import { BrandRepository } from './repositories/brand.repository';

@Injectable()
export class BrandService implements IBrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    return await this.brandRepository.create(createBrandDto);
  }

  async getAllBrands(): Promise<Brand[]> {
    return await this.brandRepository.findAll();
  }

  async getBrandById(id: string): Promise<Brand> {
    const foundBrand = await this.brandRepository.findById(id);

    // Throw not found exception if brand does not exist
    if (!foundBrand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    return foundBrand;
  }

  async updateBrandById(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<Brand> {
    return await this.brandRepository.update(id, updateBrandDto);
  }

  async deleteBrandById(id: string): Promise<Brand> {
    return await this.brandRepository.delete(id);
  }
}
