import { Component, OnInit } from '@angular/core';
import { crearUsuario } from '../../interfaces/clientes.intergaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-crear-usurio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-usurio.component.html',
  styleUrl: './crear-usurio.component.css',
})
export class CrearUsurioComponent implements OnInit {
  CrearUsurio: crearUsuario = {
    nombre: '',
    telefono: '',
    email: '',
      calle: '',
      numero: '',
      comuna: '',
      ciudad: '',
  };

  userEmail: string = null
  constructor(private clientesService: ClientesService, private authServiceL: AuthService){}
  async ngOnInit(){
    this.userEmail = await this.authServiceL.getCurrentUserEmail();
    console.log('El email del usuario es:', this.userEmail);  // Mostrará el email del usuario actualmente logueado en la consola.  // Para obtener el email correcto, debería usar this.authServiceL.getCurrentUserEmail() y no this.userEmail.  // Este método devuelve un Observable que emitirá el email del usuario logueado cuando éste cambie.  // Este método también se puede usar en
  }


onSubmit(): void {
  this.CrearUsurio.email=this.userEmail;
  console.log('Datos ingresados:', this.CrearUsurio);
  this.clientesService.createCliente(this.CrearUsurio).subscribe({
    next: () => {
      console.log('Usuario creado con éxito');
      // Limpiar los campos del formulario
      this.CrearUsurio = {
        nombre: '',
        email: '',
        telefono: '',
          calle: '',
          numero: '',
          comuna: '',
          ciudad: '',
      };
    },
    error: (err: any) => {
      console.error('Error al crear el usuario:', err);
    },
  });
}
}

