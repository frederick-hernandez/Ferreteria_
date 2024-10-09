import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { listaclientes } from '../../interfaces/clientes.intergaces';
import { ClientesService } from '../../services/clientes.service';
import { CommonModule } from '@angular/common';
import { EmpleadosComponent } from '../empleados/empleados.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule,EmpleadosComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clientList: listaclientes[] = []; // Inicializa la lista de clientes

  constructor(private _clientService: ClientesService, private cd: ChangeDetectorRef) {}

  clientes =  signal <any |undefined>(undefined)
  ngOnInit(): void {
    this.getClients(); 
  }
  getClients(): void {
    this._clientService.getClientes().subscribe({
      next: (result) => {
        console.log('Respuesta completa:', result);
        this.clientList = result.clientes; 
        console.log('Lista de clientes asignada:', this.clientList);

      },
      error: (err) => {
        console.log('Error al obtener los clientes:', err);
      }
    });
  }
  
  
  eliminarCliente(id: number): void {
    this._clientService.deleteCliente(id).subscribe(() => {
      this.getClients();
    });
  }

  trackByIndex(index: number, item: any): any {
    return index;
  }
}
