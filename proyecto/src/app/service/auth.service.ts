import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  estoyLogueado: boolean =  false;

  logIn(){
    this.estoyLogueado = true;
  }

  logOut(){
    this.estoyLogueado = false;
  }
}
