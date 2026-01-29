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
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import type { IVehicleService } from './interfaces/vehicle-service.interface';

@Controller('vehicles')
export class VehicleController {
  constructor(
    @Inject(PROVIDERS_INSTANCE.VEHICLE_SERVICE)
    private readonly vehicleService: IVehicleService,
  ) {}

  @Post()
  async handleCreateVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    return await this.vehicleService.createVehicle(createVehicleDto);
  }

  @Get()
  async handleGetAllVehicles() {
    return await this.vehicleService.getAllVehicles();
  }

  @Get('/:id')
  async handleGetVehicleById(@Param('id') id: string) {
    return await this.vehicleService.getVehicleById(id);
  }

  @Put('/:id')
  async handleUpdateVehicleById(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return await this.vehicleService.updateVehicleById(id, updateVehicleDto);
  }

  @Delete('/:id')
  async handleDeleteVehicleById(@Param('id') id: string) {
    return await this.vehicleService.deleteVehicleById(id);
  }
}
