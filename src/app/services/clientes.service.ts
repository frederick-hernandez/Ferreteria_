import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { crearUsuario, listaclientes } from '../interfaces/clientes.intergaces';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'https://ferreteria-api.onrender.com/api/v3/cliente'; 

  constructor(private http: HttpClient) {}

  getClientes(): Observable<{ clientes: listaclientes[] }> {
    return this.http.get<{ clientes: listaclientes[] }>(this.apiUrl+'/findall');
  }

  deleteCliente(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  getClientebyid(id:number): Observable<listaclientes>{
    return this.http.get<listaclientes>(`${this.apiUrl}/findbyid/${id}`);
  }

  createCliente(cliente: crearUsuario): Observable<crearUsuario> {
    return this.http.post<crearUsuario>(this.apiUrl+'/create', cliente);
  }
  
}
