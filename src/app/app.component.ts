import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { LoginComponent } from './components/login/login.component';
import { FirebaseComponent } from './components/firebase/firebase.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { usuario } from './interfaces/clientes.intergaces';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    BarraLateralComponent,CommonModule,
    RouterLink,FirebaseComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'final_web';

  fservice = inject(AuthService);

  user$ = this.fservice.estadoauth$
}
