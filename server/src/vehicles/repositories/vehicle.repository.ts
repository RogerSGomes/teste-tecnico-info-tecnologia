import { Vehicle } from 'generated/prisma/client';

export abstract class VehicleRepository {
  abstract create(): Vehicle;
  abstract findAll(): Vehicle[];
  abstract findById(id: string): Vehicle;
  abstract update(id: string): Vehicle;
  abstract delete(id: string): Vehicle;
}
