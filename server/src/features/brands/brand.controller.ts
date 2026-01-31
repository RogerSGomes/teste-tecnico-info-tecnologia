import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PROVIDERS_INSTANCE } from 'src/constants/providers-instance.constant';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { UpdateBrandDto } from './dtos/update-brand.dto';
import type { IBrandService } from './interfaces/brand-service.interface';

@Controller('brands')
export class BrandController {
  constructor(
    @Inject(PROVIDERS_INSTANCE.BRAND_SERVICE)
    private readonly brandService: IBrandService,
  ) {}

  @Post()
  async handleCreateBrand(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandService.createBrand(createBrandDto);
  }

  @Get()
  async handleGetAllBrands() {
    return await this.brandService.getAllBrands();
  }

  @Get('/:id')
  async handleGetBrandById(@Param('id') id: string) {
    return await this.brandService.getBrandById(id);
  }

  @Put('/:id')
  async handleUpdateBrandById(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return await this.brandService.updateBrandById(id, updateBrandDto);
  }

  @Delete('/:id')
  async handleDeleteBrandById(@Param('id') id: string) {
    return await this.brandService.deleteBrandById(id);
  }
}
