import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandModel } from '../models/brand.model';
import { ApiService } from './../../../core/services/api.service';

@Injectable()
export class BrandsService {
  private readonly API_ROUTES = {
    CREATE: '/brands',
    GET_ALL: '/brands',
    GET_BY_ID: (id: string) => `/brands/${id}`,
    UPDATE: (id: string) => `/brands/${id}`,
    DELETE: (id: string) => `/brands/${id}`,
  };

  constructor(private readonly apiService: ApiService) {}

  createBrand(brand: BrandModel): Observable<BrandModel> {
    return this.apiService.post<BrandModel, BrandModel>(
      this.API_ROUTES.CREATE,
      brand,
    );
  }

  getBrands(): Observable<BrandModel[]> {
    return this.apiService.get<BrandModel[]>(this.API_ROUTES.GET_ALL);
  }

  getBrandById(id: string): Observable<BrandModel> {
    return this.apiService.get<BrandModel>(this.API_ROUTES.GET_BY_ID(id));
  }

  updateBrand(
    id: string,
    updatedBrand: Partial<BrandModel>,
  ): Observable<BrandModel> {
    return this.apiService.put<Partial<BrandModel>, BrandModel>(
      this.API_ROUTES.UPDATE(id),
      updatedBrand,
    );
  }

  deleteBrand(id: string): Observable<BrandModel> {
    return this.apiService.delete<BrandModel>(this.API_ROUTES.DELETE(id));
  }
}
