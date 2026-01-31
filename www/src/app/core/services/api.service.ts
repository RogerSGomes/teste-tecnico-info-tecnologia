import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseURL: string;

  constructor(private readonly http: HttpClient) {
    this.baseURL = 'http://localhost:3000';
  }

  get<T>(endpoint: string, headers?: Record<string, string>) {
    return this.http.get<T>(`${this.baseURL}${endpoint}`, {
      headers,
    });
  }

  post<B, T>(endpoint: string, body: B, headers?: Record<string, string>) {
    return this.http.post<T>(`${this.baseURL}${endpoint}`, body, {
      headers,
    });
  }

  put<B, T>(endpoint: string, body: B, headers?: Record<string, string>) {
    return this.http.put<T>(`${this.baseURL}${endpoint}`, body, {
      headers,
    });
  }

  delete<T>(endpoint: string, headers?: Record<string, string>) {
    return this.http.delete<T>(`${this.baseURL}${endpoint}`, {
      headers,
    });
  }
}
