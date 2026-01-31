import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleModel } from '../models/vehicle.model';

@Injectable()
export class VehiclesService {
  private readonly baseURL = '/api/vehicles';
  private readonly API_ROUTES = {
    CREATE: this.baseURL,
    GET_ALL: this.baseURL,
    GET_BY_ID: (id: string) => `${this.baseURL}/${id}`,
    UPDATE: (id: string) => `${this.baseURL}/${id}`,
    DELETE: (id: string) => `${this.baseURL}/${id}`,
  };

  constructor(private readonly http: HttpClient) {}

  createVehicle(vehicle: VehicleModel): Observable<VehicleModel> {
    return this.http.post<VehicleModel>(this.API_ROUTES.CREATE, vehicle);
  }

  getVehicles(): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(this.API_ROUTES.GET_ALL);
  }

  getVehicleById(id: string): Observable<VehicleModel> {
    return this.http.get<VehicleModel>(this.API_ROUTES.GET_BY_ID(id));
  }

  updateVehicle(
    id: string,
    updatedVehicle: Partial<VehicleModel>,
  ): Observable<VehicleModel> {
    return this.http.put<VehicleModel>(this.API_ROUTES.UPDATE(id), updatedVehicle);
  }

  deleteVehicle(id: string): Observable<VehicleModel> {
    return this.http.delete<VehicleModel>(this.API_ROUTES.DELETE(id));
  }
}
