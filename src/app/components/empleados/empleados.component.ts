import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  signal,
} from '@angular/core';
import { EmpInterfaces } from '../../interfaces/empleados.interfaces';
import { EmpleadosService } from '../../services/empleados.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css',
})
export class EmpleadosComponent implements OnInit {
  EmpList: EmpInterfaces[] = [];
  empleado: EmpInterfaces | undefined;
  empleadoEditando: EmpInterfaces | null = null;
  editando: boolean = false;
  nuevoEmpleado: EmpInterfaces = {
    id: 0,

    nombre: '',
    apellido: '',

    direccion: '',
    telefono: '',
    salario: 0,
    email: '',
    area_id: '',
    status: '',
  };
  mostrarFormulario: boolean = false; // Variable para controlar la visibilidad del formulario

  constructor(
    private empService: EmpleadosService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (this.mostrarFormulario) {
      this.toggleFormulario();
    }
  }

  editarEmpleado(empleado: EmpInterfaces): void {
    this.toggleFormulario();
    this.nuevoEmpleado = { ...empleado };
    console.log(this.nuevoEmpleado);
    this.editando = true;
  }

  guardarEmp(): void {
    if (this.editando) {
      this.actualizarEmpleado();
    } else {
      this.crearEmpleado();
    }
  }
  actualizarEmpleado(): void {
    if (this.nuevoEmpleado) {
      const empAct = { ...this.nuevoEmpleado };
      const { id, ...empleadosinId } = empAct;
      this.empService.updateEmpleado(id, empleadosinId).subscribe({
        next: () => {
          this.getEmpleados();
          this.resetFormulario();
          this.toggleFormulario();
        },
        error: (err) => {
          console.log('Error al actualizar el empleado:', err);
        },
      });
    }
  }
  getEmpleados(): void {
    this.empService.getEmpleados().subscribe({
      next: (result) => {
        console.log('Respuesta completa:', result);
        this.EmpList = result.Empleados;
        console.log('empleados:', this.EmpList);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log('Error al obtener los empleados:', err);
      },
    });
  }
  crearEmpleado(): void {
    this.empService.createEmpleado(this.nuevoEmpleado).subscribe({
      next: (result) => {
        console.log('Empleado creado:', result);
        this.getEmpleados();
        this.mostrarFormulario = false;
        this.resetFormulario();
      },
      error: (err) => {
        console.log('Error al crear el empleado:', err);
      },
    });
  }
  eliminarEmpleado(id: number): void {
    console.log('Eliminar empleado con ID:', id); // Verificar si el método se llama
    this.empService.deleteEmpleado(id).subscribe(() => {
      this.getEmpleados(); // Actualizar la lista de empleados
    });
  }
  resetFormulario(): void {
    this.nuevoEmpleado = {
      id: 0,
      nombre: '',
      apellido: '',
      telefono: '',
      salario: 0,
      email: '',
      direccion: '',
      area_id: '',
      status: '',
    };
  }

  toggleFormulario(): void {
    console.log('adasda');
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  trackByIndex(index: number, item: any): any {
    return index;
  }
}
