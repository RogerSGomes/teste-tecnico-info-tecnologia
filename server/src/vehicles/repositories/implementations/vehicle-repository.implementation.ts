import { Injectable } from '@nestjs/common';
import { Brand, Vehicle } from 'generated/prisma/client';
import { VehicleRepository } from '../vehicle.repository';

@Injectable()
export class VehicleRepositoryImpl implements VehicleRepository {
  private readonly brands: Brand[] = [
    { id: '1', name: 'Toyota' },
    { id: '2', name: 'Honda' },
    { id: '3', name: 'Chevrolet' },
    { id: '4', name: 'Hyundai' },
    { id: '5', name: 'Volkswagen' },
  ];

  private readonly mockVehicle: Vehicle = {
    id: '1',
    brandId: this.brands[0].id,
    licensePlate: 'ABC-1234',
    chassis: '9BWZZZ377VT004251',
    renavam: '12345678901',
    model: 'Corolla',
    year: 2022,
  };

  create(): Vehicle {
    return this.mockVehicle;
  }

  findAll(): Vehicle[] {
    return [
      this.mockVehicle,
      {
        id: '2',
        brandId: this.brands[1].id,
        licensePlate: 'DEF-5678',
        chassis: '8APZZZ123VT009999',
        renavam: '98765432100',
        model: 'Civic',
        year: 2021,
      },
    ];
  }

  findById(id: string): Vehicle {
    return {
      id,
      brandId: this.brands[2].id,
      licensePlate: 'GHI-9012',
      chassis: '3HGCM82633A123456',
      renavam: '11223344556',
      model: 'Onix',
      year: 2020,
    };
  }

  update(id: string): Vehicle {
    return {
      id,
      brandId: this.brands[3].id,
      licensePlate: 'JKL-3456',
      chassis: '5XYKTDA2XDG398765',
      renavam: '66554433221',
      model: 'HB20',
      year: 2023,
    };
  }

  delete(id: string): Vehicle {
    return {
      id,
      brandId: this.brands[4].id,
      licensePlate: 'MNO-7890',
      chassis: '1HGCM82633A654321',
      renavam: '99887766554',
      model: 'Gol',
      year: 2019,
    };
  }
}
