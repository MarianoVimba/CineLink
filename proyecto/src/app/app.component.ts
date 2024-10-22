import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { CommonModule } from '@angular/common';
import { Usuario } from './interface/usuario.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistroComponent, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listaUsuarios: Usuario[] = [];

  agregarAlaLista(nuevoUsuario: Usuario) {
    this.listaUsuarios.push(nuevoUsuario);
  }
}
