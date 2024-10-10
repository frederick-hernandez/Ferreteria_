import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { usuario } from '../interfaces/clientes.intergaces';
import {getAuth,GoogleAuthProvider,signInWithEmailAndPassword , createUserWithEmailAndPassword, updateProfile,sendPasswordResetEmail, User, onAuthStateChanged} from 'firebase/auth';
import { Observable, observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
auth = inject(AngularFireAuth);
firestore= inject(AngularFirestore);
router= inject(Router);


readonly estadoauth$ = this.auth.authState;

getAuth(){
  return getAuth();
}




signInWithEmailandPassword(credenciales: usuario){
  return createUserWithEmailAndPassword(getAuth(),credenciales.email,credenciales.password);
}

logIngWithEmailAndPassword(credencial: usuario){
  return signInWithEmailAndPassword(getAuth(),credencial.email,credencial.password);
}


loginwithgoogleaccount(){
  return this.auth.signInWithPopup(new GoogleAuthProvider());
}


logout(){
  return this.auth.signOut();
}
}

