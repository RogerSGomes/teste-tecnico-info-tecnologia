import { Brand } from 'generated/prisma/client';

export interface IBrandService {
  createBrand(name: string): Promise<Brand>;
  getAllBrands(): Promise<Brand[]>;
  getBrandById(id: string): Promise<Brand>;
  updateBrandById(id: string, name: string): Promise<Brand>;
  deleteBrandById(id: string): Promise<Brand>;
}
