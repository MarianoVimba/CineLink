import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {

  router = inject(Router);






  buscarPelicula(texto:string){

    texto = texto.trim();
    if (texto.length === 0) {

      return;

    }

    this.router.navigate(['/buscar', texto]);

  }


}
