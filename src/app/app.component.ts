import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarraLateralComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'final_web';
}
