import { Brand } from 'generated/prisma/client';

export abstract class BrandRepository {
  abstract create(name: string): Promise<Brand>;
  abstract findAll(): Promise<Brand[]>;
  abstract findById(id: string): Promise<Brand | null>;
  abstract update(id: string, name: string): Promise<Brand>;
  abstract delete(id: string): Promise<Brand>;
}
