import { Provider } from '@nestjs/common';
import { BrandRepository } from '../repositories/brand.repository';
import { BrandRepositoryImpl } from '../repositories/implementations/brand-repository.implementation';

export const BrandRepositoryProvider: Provider = {
  provide: BrandRepository,
  useClass: BrandRepositoryImpl,
};
