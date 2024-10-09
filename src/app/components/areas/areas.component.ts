import { Component, OnInit } from '@angular/core';
import { AreaService} from '../../services/area.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AreaInterfaces } from '../../interfaces/Areas.interfaces';
@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  idParaEliminar: number | null = null;
  editando: boolean = false;
  mostrarFormulario: boolean = false;
  areas: AreaInterfaces[] = [];
  nuevoArea: AreaInterfaces= {
    id: 0,
    nombre_area: '',
    porcentaje_comision: ''
  };
  areaEditando: AreaInterfaces | null = null;

  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(): void {
    this.areaService.getAreas().subscribe({
      next: (result) => {
        console.log('Respuesta completa:', result);
        this.areas = result.Area;
        console.log('areas:', this.areas);
      },
      error: (err) => {
        console.log('Error al obtener los empleados:', err);
      }
    });
  }
  crearArea(): void {
    this.areaService.createArea(this.nuevoArea).subscribe(() => {
      this.getAreas();
      this.resetFormulario();
      console.log('Areas created',this.nuevoArea);
    });
  }

  editarArea(area:AreaInterfaces): void {
    this.toggleFormulario();
    this.nuevoArea={...area}
    console.log("Editando Area"+ this.nuevoArea);
    this.editando = true;
  }

  guardarArea(): void {
    if (this.editando) {
      this.actualizarArea();
    } else {
      this.crearArea();
    }
  }

     actualizarArea(): void {
        if (this.nuevoArea) {
          const areaParaActualizar = { ...this.nuevoArea };
          const { id,...areaSinId } = areaParaActualizar;
          this.areaService.updateArea(id, areaSinId).subscribe(() => {
            this.getAreas();
            this.resetFormulario();
            this.toggleFormulario();
          });
        }
      }
  eliminarArea(id: number): void {
    this.areaService.deleteArea(id).subscribe(() => {
      this.getAreas();
    });
  }

  toggleFormulario(): void {
    console.log('adasda');
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  resetFormulario(): void {
    this.nuevoArea = {
      id: 0,
      nombre_area: '',
      porcentaje_comision: ''
    };
  }
  trackByIndex(index: number, item: any): any {
    return index;
  }
}
