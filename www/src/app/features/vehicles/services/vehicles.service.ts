import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleModel } from '../models/vehicle.model';
import { ApiService } from './../../../core/services/api.service';

@Injectable()
export class VehiclesService {
  private readonly API_ROUTES = {
    CREATE: '/vehicles',
    GET_ALL: '/vehicles',
    GET_BY_ID: (id: string) => `/vehicles/${id}`,
    UPDATE: (id: string) => `/vehicles/${id}`,
    DELETE: (id: string) => `/vehicles/${id}`,
  };

  constructor(private readonly apiService: ApiService) {}

  createVehicle({
    id,
    ...vehicleWithoutId
  }: VehicleModel): Observable<VehicleModel> {
    return this.apiService.post<Omit<VehicleModel, 'id'>, VehicleModel>(
      this.API_ROUTES.CREATE,
      vehicleWithoutId,
    );
  }

  getVehicles(): Observable<VehicleModel[]> {
    return this.apiService.get<VehicleModel[]>(this.API_ROUTES.GET_ALL);
  }

  getVehicleById(id: string): Observable<VehicleModel> {
    return this.apiService.get<VehicleModel>(this.API_ROUTES.GET_BY_ID(id));
  }

  updateVehicle(
    id: string,
    updatedVehicle: Partial<VehicleModel>,
  ): Observable<VehicleModel> {
    return this.apiService.put<Partial<VehicleModel>, VehicleModel>(
      this.API_ROUTES.UPDATE(id),
      updatedVehicle,
    );
  }

  deleteVehicle(id: string): Observable<VehicleModel> {
    return this.apiService.delete<VehicleModel>(this.API_ROUTES.DELETE(id));
  }
}
