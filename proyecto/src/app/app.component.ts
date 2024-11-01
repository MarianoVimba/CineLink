import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistroComponent } from './usuario/autenticacion/registro/registro.component';
import { LoginComponent } from './usuario/autenticacion/login/login.component';
import { CommonModule } from '@angular/common';
import { Usuario } from './interfaces/usuario.interface';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistroComponent, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
