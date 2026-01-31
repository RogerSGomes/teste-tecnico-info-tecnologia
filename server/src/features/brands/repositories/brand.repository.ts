import { Brand } from 'generated/prisma/client';
import { CreateBrandDto } from '../dtos/create-brand.dto';
import { UpdateBrandDto } from '../dtos/update-brand.dto';

export abstract class BrandRepository {
  abstract create(createBrandDto: CreateBrandDto): Promise<Brand>;
  abstract findAll(): Promise<Brand[]>;
  abstract findById(id: string): Promise<Brand | null>;
  abstract update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand>;
  abstract delete(id: string): Promise<Brand>;
}
