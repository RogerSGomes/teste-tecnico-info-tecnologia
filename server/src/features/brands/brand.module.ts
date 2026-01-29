import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { BrandController } from './brand.controller';
import { BrandRepositoryProvider } from './providers/brand-repository.provider';
import { BrandServiceProvider } from './providers/brand-service.provider';

@Module({
  controllers: [BrandController],
  providers: [PrismaService, BrandServiceProvider, BrandRepositoryProvider],
  exports: [BrandServiceProvider],
})
export class BrandModule {}
