import { Injectable } from '@nestjs/common';
import { VehicleModel } from 'src/models/vehicle.model';
import { IVehicleService } from './interfaces/vehicle-service.interface';

@Injectable()
export class VehicleService implements IVehicleService {
  private readonly mockVehicle = new VehicleModel(
    '1',
    'ABC-1234',
    '9BWZZZ377VT004251',
    '12345678901',
    'Corolla',
    'Toyota',
    2022,
  );

  createVehicle() {
    return this.mockVehicle;
  }

  getAllVehicles() {
    return [
      this.mockVehicle,
      new VehicleModel(
        '2',
        'DEF-5678',
        '8APZZZ123VT009999',
        '98765432100',
        'Civic',
        'Honda',
        2021,
      ),
    ];
  }

  getVehicleById(id: string) {
    return new VehicleModel(
      id,
      'GHI-9012',
      '3HGCM82633A123456',
      '11223344556',
      'Onix',
      'Chevrolet',
      2020,
    );
  }

  updateVehicleById(id: string) {
    return new VehicleModel(
      id,
      'JKL-3456',
      '5XYKTDA2XDG398765',
      '66554433221',
      'HB20',
      'Hyundai',
      2023,
    );
  }

  deleteVehicleById(id: string) {
    return new VehicleModel(
      id,
      'MNO-7890',
      '1HGCM82633A654321',
      '99887766554',
      'Gol',
      'Volkswagen',
      2019,
    );
  }
}
