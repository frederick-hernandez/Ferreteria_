import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpInterfaces } from '../interfaces/empleados.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private apiUrl = 'https://ferreteria-api.onrender.com/api/v1/empleado';

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<any> {
    return this.http.get<any>(this.apiUrl +'/findall');
  }

  getEmpleadoById(id: number): Observable<EmpInterfaces> {
    return this.http.get<EmpInterfaces>(`${this.apiUrl}/findbyid/${id}`);
  }

  createEmpleado(empleado: EmpInterfaces): Observable<EmpInterfaces> {
    return this.http.post<EmpInterfaces>(`${this.apiUrl}`+'/create',empleado);
  }

  updateEmpleado(id: number, empleado: EmpInterfaces): Observable<EmpInterfaces> {
    return this.http.put<EmpInterfaces>(`https://ferreteria-api.onrender.com/api/v1/empleado/update/${id}`, empleado);
  }
}
