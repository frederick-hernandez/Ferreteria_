import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarraLateralComponent,RouterLink, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'final_web';
}
