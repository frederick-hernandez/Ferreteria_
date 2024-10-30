import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { usuario } from '../../interfaces/clientes.intergaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css',
})
export class SingUpComponent {
  fservice = inject(AuthService);
  constructor(
    private _router: Router
  ) {}
  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async signup() {
    if (this.form.valid) {
      this.fservice
        .signInWithEmailandPassword(this.form.value as usuario)
        .then((response) => {
          console.log('creacion de usuario exitoso', response);
          this._router.navigateByUrl('/auth/crearusuario');
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
