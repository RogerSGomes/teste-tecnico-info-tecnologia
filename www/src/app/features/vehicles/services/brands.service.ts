import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandModel } from '../models/brand.model';

@Injectable()
export class BrandsService {
  private readonly baseURL = 'http://localhost:3000/brands';
  private readonly API_ROUTES = {
    CREATE: this.baseURL,
    GET_ALL: this.baseURL,
    GET_BY_ID: (id: string) => `${this.baseURL}/${id}`,
    UPDATE: (id: string) => `${this.baseURL}/${id}`,
    DELETE: (id: string) => `${this.baseURL}/${id}`,
    GET_MODELS_BY_BRAND: (brand: string) => `${this.baseURL}/models?brand=${brand}`,
  };

  constructor(private readonly http: HttpClient) {}

  createBrand(brand: BrandModel): Observable<BrandModel> {
    return this.http.post<BrandModel>(this.API_ROUTES.CREATE, brand);
  }

  getBrands(): Observable<BrandModel[]> {
    return this.http.get<BrandModel[]>(this.API_ROUTES.GET_ALL);
  }

  getBrandById(id: string): Observable<BrandModel> {
    return this.http.get<BrandModel>(this.API_ROUTES.GET_BY_ID(id));
  }

  updateBrand(
    id: string,
    updatedBrand: Partial<BrandModel>,
  ): Observable<BrandModel> {
    return this.http.put<BrandModel>(this.API_ROUTES.UPDATE(id), updatedBrand);
  }

  deleteBrand(id: string): Observable<BrandModel> {
    return this.http.delete<BrandModel>(this.API_ROUTES.DELETE(id));
  }

  getModelsByBrand(brand: string): Observable<string[]> {
    return this.http.get<string[]>(this.API_ROUTES.GET_MODELS_BY_BRAND(brand), {
      params: { brand },
    });
  }
}
