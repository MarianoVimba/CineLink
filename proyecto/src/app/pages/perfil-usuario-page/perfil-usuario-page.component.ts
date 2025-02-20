import { Component } from '@angular/core';
import { PerfilUsuarioComponent } from '../../usuario/perfil-usuario/perfil-usuario.component';

@Component({
  selector: 'app-perfil-usuario-page',
  standalone: true,
  imports: [PerfilUsuarioComponent],
  templateUrl: './perfil-usuario-page.component.html',
  styleUrl: './perfil-usuario-page.component.css'
})
export class PerfilUsuarioPageComponent {

}
