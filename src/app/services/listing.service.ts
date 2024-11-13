import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  constructor(private http: HttpClient) {}

  generateDescription(title: string): Observable<any> {
    // Replace with your actual API endpoint
    return this.http.post<any>('/api/generate-description', { title });
  }
} 