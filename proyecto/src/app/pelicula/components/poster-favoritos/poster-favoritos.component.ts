import { Component, inject, Input } from '@angular/core';
import { Pelicula } from '../../../interfaces/pelicula.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddFavoritosComponent } from '../../../usuario/add-favoritos/add-favoritos.component';
import { FavoritosService } from '../../../service/favorito.service';
import { MovieDetails } from '../../../interfaces/details.interface';

@Component({
  selector: 'app-poster-favoritos',
  standalone: true,
  imports: [CommonModule,AddFavoritosComponent],
  templateUrl: './poster-favoritos.component.html',
  styleUrl: './poster-favoritos.component.css'
})
export class PosterfavoritoComponent {
  @Input() peliculasPoster?: MovieDetails[] | null;
  router = inject(Router);
  favoritosService = inject(FavoritosService);

  getEstrellas(voteAverage: number) {
    const contador = Math.floor(voteAverage);
    return Array(contador).fill(0);
  }

  irPaginaPelicula(pelicula: MovieDetails) {
    this.router.navigate(['/pelicula', pelicula.id]);
  }
  
}
