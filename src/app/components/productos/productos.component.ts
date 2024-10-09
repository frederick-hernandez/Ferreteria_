import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductosInterface,ProductosSinId } from '../../interfaces/productos.interfaces';
import { ProductosService } from '../../services/productos.service';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  id: number = 0;
  editando: boolean = false;
  mostrarFormulario: boolean = false;
  productos: ProductosInterface[] = [];
  nuevoProducto: ProductosSinId= {
    nombre: '',
    precio_actual: 0,
    stock: 0,
    proveedor_id: 0,
    precio_costo: 0
  };

  constructor(private Pservice: ProductosService) { }
  ngOnInit(): void {
    this.getProductos();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (this.mostrarFormulario) {
      this.toggleFormulario();
    }
  }


  getProductos(): void {
    this.Pservice.getProductos().subscribe({
      next: (result) => {
        console.log('Respuesta completa:', result);
        this.productos = result.Productos;
        console.log('Productos:', this.productos);
      },
      error: (err) => {
        console.log('Error al obtener los empleados:', err);
      }
    });
  }

  crearProducto(): void {
    this.Pservice.crearProductos(this.nuevoProducto).subscribe(() => {
      this.getProductos();
      this.resetFormulario();
      console.log('Productos created', this.nuevoProducto);
      this.mostrarFormulario = false

    });
  }
  editarProducto(id:number, prod:ProductosSinId): void {
    this.toggleFormulario();
    this.nuevoProducto={...prod}
    this.id=id;
    console.log("Editando Area"+ this.nuevoProducto);
    this.editando = true;
  }

  guardarProducto(): void {
    if (this.editando) {
      this.actualizarProducto();
    } else {
      this.crearProducto();
    }
  }

  actualizarProducto(): void {
    const id = this.id;
    if (this.nuevoProducto) {
      this.Pservice.updateEmpleado(id,this.nuevoProducto).subscribe(() => {
        this.getProductos();
        this.resetFormulario();
        this.mostrarFormulario==false;
      });
    }
  }

  eliminarProducto(id: number): void {
    this.Pservice.deleteEmpleado(id).subscribe(() => {
      this.getProductos();
    });
  }

  resetFormulario() {
    this.nuevoProducto = {
      nombre: '',
      precio_actual: 0,
      stock: 0,
      proveedor_id: 0,
      precio_costo: 0
    };
    this.editando = false;
    this.mostrarFormulario = false;
  }
  toggleFormulario(): void {
    console.log("hola");
    this.mostrarFormulario =!this.mostrarFormulario;
  }

  trackByIndex(index: number, item: any): any {
    return index;
  }
}
