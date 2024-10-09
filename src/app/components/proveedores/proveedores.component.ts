import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import {
  Proveedor,
  ProveedorwithId,
} from '../../interfaces/proveedores.interfaces';
import { ProveedoresService } from '../../services/proveedores.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
})
export class ProveedoresComponent implements OnInit {
  proveedorList: ProveedorwithId[] = [];
  proveedor: Proveedor | undefined;
  nuevoProveedor: Proveedor = {
    nombre: '',
    direccion: '',
    telefono: '',
    contacto: '',
  };
  mostrarFormulario: boolean = false;
  editando: boolean = false;
  id: number = 0;
  constructor(
    private proveedoresService: ProveedoresService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProveedores();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (this.mostrarFormulario) {
      this.toggleFormulario();
      this.editando==false;
    }
  }

  getProveedores(): void {
    this.proveedoresService.getProveedores().subscribe({
      next: (result) => {
        console.log('Respuesta completa:', result);
        this.proveedorList = result.Proveedores;
        console.log('proveedores:', this.proveedorList);
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.log('Error al obtener los proveedores:', err);
      },
    });
  }

  buscarProveedor(id: string): void {
    console.log('Buscar proveedor con ID:', id);
    const proveedorId = parseInt(id, 10);
    if (!isNaN(proveedorId)) {
      this.proveedoresService.getProveedorById(proveedorId).subscribe({
        next: (result: Proveedor) => {
          this.proveedor = result;
          console.log('Proveedor encontrado:', this.proveedor);
          this.cd.detectChanges();
        },
        error: (err: any) => {
          console.log('Error al buscar el proveedor:', err);
        },
      });
    } else {
      console.log('ID inválido');
    }
  }

  crearProveedor(): void {
    this.proveedoresService.createProveedor(this.nuevoProveedor).subscribe({
      next: (result: Proveedor) => {
        console.log('Proveedor creado:', result);
        this.getProveedores();
        this.mostrarFormulario = false;
        this.resetFormulario();
      },
      error: (err: any) => {
        console.log('Error al crear el proveedor:', err);
      },
    });
  }

  guardarProveedor() {
    if (this.editando) {
      this.actualizarProveedores();
    } else {
      this.crearProveedor();
    }
  }

  editarProveedor(id: number, proveedor: Proveedor): void {
    this.toggleFormulario();
    this.nuevoProveedor = { ...proveedor };
    this.id = id;
    this.mostrarFormulario = true;
    this.editando = true;
  }

  actualizarProveedores(): void {
    const id = this.id;
    if(this.nuevoProveedor){
      this.proveedoresService.updateProveedor(id, this.nuevoProveedor).subscribe({
        next: (result: any) => {
          console.log('Proveedor actualizado:', result);
          this.getProveedores();
          this.mostrarFormulario = false;
          this.resetFormulario();
        },
        error: (err: any) => {
          console.log('Error al actualizar el proveedor:', err);
        },
      });
    }
  }
  eliminarProveedor(id: number): void {
    this.proveedoresService.deleteProveedor(id).subscribe({
      next: (result: any) => {
        console.log('Proveedor eliminado:', result);
        this.getProveedores();
      },
      error: (err: any) => {
        console.log('Error al eliminar el proveedor:', err);
      },
    });
  }

  resetFormulario(): void {
    this.nuevoProveedor = {
      nombre: '',
      direccion: '',
      telefono: '',
      contacto: '',
    };
    this.editando = false;
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.resetFormulario();
  }

  trackByIndex(index: number, item: any): any {
    return index;
  }
}
