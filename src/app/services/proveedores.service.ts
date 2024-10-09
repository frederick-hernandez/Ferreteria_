import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../interfaces/proveedores.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private apiUrl = 'https://ferreteria-api.onrender.com/api/v4/proveedores'; 

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/findall');
  }

  getProveedorById(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}/findbyid/${id}`);
  }

  createProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.apiUrl}/create`, proveedor);
  }

  updateProveedor(id:number, proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.apiUrl}/update/${id}`, proveedor);
  }

  deleteProveedor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}