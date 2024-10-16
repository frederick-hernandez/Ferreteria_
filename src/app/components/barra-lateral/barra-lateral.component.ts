import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css'
})
export class BarraLateralComponent {

  constructor(private authService: AuthService, private _router:Router) {}
  async logout() {
    await this.authService.logout();
    this._router.navigateByUrl('auth/login');
  }

}
