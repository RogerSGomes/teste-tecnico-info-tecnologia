export class VehicleModel {
  id: string;
  licensePlate: string;
  chassis: string;
  renavam: string;
  model: string;
  brand: string;
  year: number;

  constructor(
    id: string,
    licensePlate: string,
    chassis: string,
    renavam: string,
    model: string,
    brand: string,
    year: number,
  ) {
    this.id = id;
    this.licensePlate = licensePlate;
    this.chassis = chassis;
    this.renavam = renavam;
    this.model = model;
    this.brand = brand;
    this.year = year;
  }
}
