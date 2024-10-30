import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaInterfaces } from '../interfaces/Areas.interfaces';
import { AreaSinId } from '../interfaces/AreassinId.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = 'https://ferreteria-api.onrender.com/api/v2/areas';

  constructor(private http: HttpClient) {}

  getAreas(): Observable<{Area:AreaInterfaces[]}> {
    return this.http.get<{Area: AreaInterfaces[]}>(this.apiUrl+'/findall');
  }

  getArea(id: number): Observable<AreaInterfaces> {
    return this.http.get<AreaInterfaces>(`${this.apiUrl}/findbyid${id}`);
  }

  createArea(area: AreaInterfaces): Observable<AreaInterfaces> {
    return this.http.post<AreaInterfaces>(this.apiUrl+'/create', area);
  }

  updateArea(id: number, area: AreaSinId): Observable<AreaSinId> {
    return this.http.put<AreaSinId>(`${this.apiUrl}/update/${id}`, area);
  }

  deleteArea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
