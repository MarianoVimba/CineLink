import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistroComponent } from './usuario/autenticacion/registro/registro.component';
import { LoginComponent } from './usuario/autenticacion/login/login.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./shared/footer/footer.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistroComponent, LoginComponent, CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
