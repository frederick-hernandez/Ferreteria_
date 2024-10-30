import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { listaclientes, usuario } from '../../interfaces/clientes.intergaces';
import { ClientesComponent } from '../clientes/clientes.component';
import { ClientesService } from '../../services/clientes.service';
import { EmpleadosService } from '../../services/empleados.service';
import { EmpInterfaces } from '../../interfaces/empleados.interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  EmpList: EmpInterfaces[] = [];
  clientList: listaclientes[] = [];
  fservice = inject(AuthService);
  userEmail: string = null
  constructor(private _router: Router, private clientService: ClientesService, private EmpleService: EmpleadosService) {}
  ngOnInit(): void {
    this.clientService.getClientes().subscribe((res) => {
      this.clientList = res.clientes;
      console.log(this.clientList);
    });
    this.EmpleService.getEmpleados().subscribe((res) => {
      this.EmpList = res;
      console.log(this.EmpList);
    });

  }
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async login() {
    console.log('hola');
    if (this.form.valid) {
      this.fservice
        .logIngWithEmailAndPassword(this.form.value as usuario)
        .then(async (response) => {
          console.log('login exitoso', response);
          this.userEmail = await this.fservice.getCurrentUserEmail();
          
          if(this.EmpList.find(e => e.email == this.userEmail)){
              this._router.navigateByUrl('/clientes')
          }
          else if(this.clientList.find(e => e.email == this.userEmail)){
            this._router.navigateByUrl('/')
          }
        });
    }
  }

  loginwithgoogleaccount() {
    this.fservice.loginwithgoogleaccount().then((response) => {
      console.log('login exitoso con google', response);
      this._router.navigateByUrl('/');
    });
  }
}
