import { Usuario } from './../../interface/usuario.interface';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  //registro es el hijo y el padre es el app o algun otro en el cual va a manipular la info
  //ej para poder almacenar este dato
  @Output()
  emitirUsuario: EventEmitter<Usuario> = new EventEmitter();

  nuevoUsuario: Usuario = {
    nombre :"",
    apellido: "",
    nombreUsuario: "",
    password: "",
    confirmacionPasword: "",
    pais: "",
    ciudad: "",
    descripcion: ""
  };

  addUsuario(){
    if (this.nuevoUsuario.password === this.nuevoUsuario.confirmacionPasword && this.verificarCantidadDeCaracteres()){
      this.emitirUsuario.emit({...this.nuevoUsuario}); //envia una copia
      console.log(this.nuevoUsuario);
    }
    else{
      if(!this.verificarPassword()){
        console.log("no coinciden las contraseñas");
      }
      if(!this.verificarCantidadDeCaracteres()){
        console.log("no tiene la cantidad requerida de caracteres");
      }
  }
}
 
verificarPassword(){
  if(this.nuevoUsuario.password === this.nuevoUsuario.confirmacionPasword ){
    return true;
  }
  return false;
}

verificarCantidadDeCaracteres(){
  if(this.nuevoUsuario.password.length>=3){
    return true;
  }
  else{
    return false;
  }
}


}
