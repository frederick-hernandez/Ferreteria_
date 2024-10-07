import { ChangeDetectorRef, Component, HostListener, OnInit, signal } from '@angular/core';
import { EmpInterfaces } from '../../interfaces/empleados.interfaces';
import { EmpleadosService } from '../../services/empleados.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {
  EmpList: EmpInterfaces[] = [];
  empleado: EmpInterfaces | undefined;
  empleadoEditando: EmpInterfaces | null = null;
  nuevoEmpleado: EmpInterfaces = {
    id: 0,
    nombre: '',
    apellido: '',
    direccion:'',
    telefono: '',
    salario: 0,
    email: '',
    area_id: '',
    status: ''
  };
  mostrarFormulario: boolean = false; // Variable para controlar la visibilidad del formulario

  constructor(private empService: EmpleadosService, private cd: ChangeDetectorRef) {}

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
    this.empleadoEditando = { ...empleado };
    console.log(this.empleadoEditando);
  }

  actualizarEmpleado(): void {
    console.log('Actualizar empleado:', this.empleadoEditando); // Verificar si el método se llama
    if (this.empleadoEditando) {
      this.empService.updateEmpleado(this.empleadoEditando.id, this.empleadoEditando).subscribe({
        next: () => {
          this.getEmpleados(); // Actualizar la lista de empleados
          this.empleadoEditando = null; // Limpiar el formulario
        },
        error: (err) => {
          console.log('Error al actualizar el empleado:', err);
        }
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
      }
    });
  }

  buscarEmpleado(id: string): void {
    console.log('Buscar empleado con ID:', id); // Verificar si el método se llama
    const empleadoId = parseInt(id, 10); // Convertir el valor a número
    if (!isNaN(empleadoId)) {
      this.empService.getEmpleadoById(empleadoId).subscribe({
        next: (result) => {
          this.empleado = result; // Aquí result debe ser de tipo EmpInterfaces
          console.log('Empleado encontrado:', this.empleado);
          this.cd.detectChanges(); // Detectar cambios después de actualizar el empleado
        },
        error: (err) => {
          console.log('Error al buscar el empleado:', err);
        }
      });
    } else {
      console.log('ID inválido');
    }
  }

  crearEmpleado(): void {
    console.log('Crear empleado:'); // Verificar si el método se llama
    this.empService.createEmpleado(this.nuevoEmpleado).subscribe({
      next: (result) => {
        console.log('Empleado creado:', result);
        this.getEmpleados();
        this.mostrarFormulario = false; 
        this.resetFormulario();
      },
      error: (err) => {
        console.log('Error al crear el empleado:', err);
      }
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
      status: ''
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
