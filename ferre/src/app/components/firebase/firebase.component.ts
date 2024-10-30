import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { usuario } from '../../interfaces/clientes.intergaces';

@Component({
  selector: 'app-firebase',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './firebase.component.html',
  styleUrl: './firebase.component.css'
})
export class FirebaseComponent implements OnInit{

  constructor() { }
  ngOnInit(): void {
  }

  
fservice = inject(AuthService)

  form= new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  async submit(){
    if(this.form.valid){
      this.fservice.logIngWithEmailAndPassword(this.form.value as usuario)
      .then(response => {
        console.log('Login exitoso',response)
      }
      )
    }
  }
}
