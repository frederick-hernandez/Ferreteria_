import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpInterfaces } from '../interfaces/empleados.interfaces';
import {empsinID} from '../interfaces/empsinId';
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private apiUrl = 'https://ferreteria-api.onrender.com/api/v1/empleado';

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<any> {
    return this.http.get<any>(this.apiUrl +'/findall');
  }

  createEmpleado(empleado: EmpInterfaces): Observable<EmpInterfaces> {
    return this.http.post<EmpInterfaces>(`${this.apiUrl}`+'/create',empleado);
  }

  updateEmpleado(id: number, empleado: empsinID): Observable<empsinID> {
    return this.http.put<empsinID>(`https://ferreteria-api.onrender.com/api/v1/empleado/update/${id}`, empleado);
  }
  
  deleteEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
