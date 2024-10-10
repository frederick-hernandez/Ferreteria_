import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css'
})
export class BarraLateralComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
