import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [RouterOutlet,RouterLink, CommonModule],
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css'
})
export class BarraLateralComponent implements OnInit {
  userEmail: string = null
  constructor(private authService: AuthService, private _router:Router) {}
  async logout() {
    await this.authService.logout();
    this._router.navigateByUrl('auth/login');
  }

  async ngOnInit(){
    this.userEmail = await this.authService.getCurrentUserEmail();
    console.log('El email del usuario es:', this.userEmail);  // Mostrará el email del usuario actualmente logueado en la consola.  // Para obtener el email correcto, debería usar this.authServiceL.getCurrentUserEmail() y no this.userEmail.  // Este método devuelve un Observable que emitirá el email del usuario logueado cuando éste cambie.  // Este método también se puede usar en
  }


}
