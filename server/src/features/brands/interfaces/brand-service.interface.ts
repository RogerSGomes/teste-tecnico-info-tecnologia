import { Brand } from 'generated/prisma/client';
import { CreateBrandDto } from '../dtos/create-brand.dto';
import { UpdateBrandDto } from '../dtos/update-brand.dto';

export interface IBrandService {
  createBrand(createBrandDto: CreateBrandDto): Promise<Brand>;
  getAllBrands(): Promise<Brand[]>;
  getBrandById(id: string): Promise<Brand>;
  updateBrandById(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand>;
  deleteBrandById(id: string): Promise<Brand>;
}
