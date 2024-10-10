import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { usuario } from '../../interfaces/clientes.intergaces';

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
export class LoginComponent {
  fservice = inject(AuthService);
  constructor(private _router: Router) {}
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async login() {
    console.log('hola');
    if (this.form.valid) {
      this.fservice
        .logIngWithEmailAndPassword(this.form.value as usuario)
        .then((response) => {
          console.log('login exitoso', response);
          this._router.navigateByUrl('/');
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
