import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PROVIDERS_INSTANCE } from 'src/constants/providers-instance.constant';
import { VehicleServiceContract } from 'src/interfaces/contracts/vehicle-service-contract.interface';

@Controller('vehicles')
export class VehicleController {
  constructor(
    @Inject(PROVIDERS_INSTANCE.VEHICLE_SERVICE)
    private readonly vehicleService: VehicleServiceContract,
  ) {}

  @Post()
  handleCreateVehicle() {
    return this.vehicleService.createVehicle();
  }

  @Get()
  handleGetAllVehicles() {
    return this.vehicleService.getAllVehicles();
  }

  @Get('/:id')
  handleGetVehicleById(@Param('id') id: string) {
    return this.vehicleService.getVehicleById(id);
  }

  @Put('/:id')
  handleUpdateVehicleById(@Param('id') id: string) {
    return this.vehicleService.updateVehicleById(id);
  }

  @Delete('/:id')
  handleDeleteVehicleById(@Param('id') id: string) {
    return this.vehicleService.deleteVehicleById(id);
  }
}
