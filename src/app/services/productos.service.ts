import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductosSinId } from '../interfaces/productos.interfaces';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'https://ferreteria-api.onrender.com/api/v6/productos';
  constructor(private http:HttpClient) { }
  getProductos(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/findall');
  }
  crearProductos(producto:ProductosSinId): Observable<ProductosSinId>{
    return this.http.post<ProductosSinId>(this.apiUrl+'/create',producto);
  }

  updateEmpleado(id:number, producto:ProductosSinId): Observable<ProductosSinId>{
    return this.http.put<ProductosSinId>(`${this.apiUrl}/update/${id}`, producto);
  }

  deleteEmpleado(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
