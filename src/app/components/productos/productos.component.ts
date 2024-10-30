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
  prueba: ProductosSinId= {
    title: '',
    price: 0,
    description: '',
    proveedor_id: 0,
    image: '',
    category: ''
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
        this.productos = result;
        console.log('Productos:', this.productos);
      },
      error: (err) => {
        console.log('Error al obtener los empleados:', err);
      }
    });
  }

  crearProducto(): void {
    this.Pservice.crearProductos(this.prueba).subscribe(() => {
      this.getProductos();
      this.resetFormulario();
      this.mostrarFormulario = false

    });
  }
  editarProducto(id:number, prod:ProductosSinId): void {
    this.toggleFormulario();
    this.prueba={...prod}
    this.id=id;
    console.log(this.prueba);
    this.editando = true;
  }

  guardarProducto(): void {
    if (this.editando) {
      this.actualizarProducto();
      this.editando = false;
    } else {
      this.crearProducto();
    }
  }

  actualizarProducto(): void {
    const id = this.id;
    if (this.prueba) {
      this.Pservice.updateEmpleado(id,this.prueba).subscribe(() => {
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
    this.prueba = {
      title: '',
      price: 0,
      description: '',
      proveedor_id: 0,
      image: '',
      category: ''
    };
    this.editando = false;
  }
  toggleFormulario(): void {
    console.log("hola");
    this.mostrarFormulario =!this.mostrarFormulario;
    this.resetFormulario();
  }

  trackByIndex(index: number, item: any): any {
    return index;
  }
}
