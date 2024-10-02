import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listaclientes } from '../interfaces/clientes.intergaces';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'https://ferreteria-api.onrender.com/api/v3/cliente/findall'; 

  constructor(private http: HttpClient) {}

  getClientes(): Observable<{ clientes: listaclientes[] }> {
    return this.http.get<{ clientes: listaclientes[] }>(this.apiUrl);
  }
}
