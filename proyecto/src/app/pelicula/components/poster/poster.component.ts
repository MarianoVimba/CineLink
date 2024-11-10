import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Pelicula } from '../../../interfaces/pelicula.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddFavoritosComponent } from '../../../usuario/add-favoritos/add-favoritos.component';
import { FavoritosService } from '../../../service/favorito.service';

@Component({
  selector: 'app-poster',
  standalone: true,
  imports: [CommonModule, AddFavoritosComponent],
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css']
})
export class PosterComponent {
  @Input() peliculas?: Pelicula[];
  @Output() eventoModificar = new EventEmitter()
  router = inject(Router);
  favoritosService = inject(FavoritosService);

  getEstrellas(voteAverage: number) {
    const contador = Math.floor(voteAverage);
    return Array(contador).fill(0);
  }

  irPaginaPelicula(pelicula: Pelicula) {
    this.router.navigate(['/pelicula', pelicula.id]);
  }


  modificarFvorito(id: number){

    this.eventoModificar.emit(id)

  }

}
