import { Component, OnInit, inject } from '@angular/core';
import { FavoritosService } from '../../service/favorito.service';
import { PeliculaService } from '../../service/pelicula.service';
import { CommonModule } from '@angular/common';
import { PosterComponent } from '../../pelicula/components/poster/poster.component';
import { MovieDetails } from '../../interfaces/details.interface';
import { forkJoin } from 'rxjs';
import { PosterfavoritoComponent } from '../../pelicula/components/poster-favoritos/poster-favoritos.component';
import { AddFavoritosComponent } from "../add-favoritos/add-favoritos.component";

@Component({
  selector: 'app-lista-peliculas',
  standalone: true,
  imports: [CommonModule, PosterComponent, PosterfavoritoComponent, AddFavoritosComponent],
  templateUrl: './lista-peliculas.component.html',
  styleUrls: ['./lista-peliculas.component.css']
})
export class ListaPeliculasComponent implements OnInit {
  peliculas: MovieDetails[] | null = [];
  favoritos: number[] = [];
  userId: string | null = localStorage.getItem('userId');
  favoritosIdsString: string[] = [];


  private peliculaService = inject(PeliculaService);
  private favoritosService = inject(FavoritosService);

  ngOnInit(): void {
    if (this.userId) {
      this.favoritosService.obtenerFavoritos(this.userId).subscribe({
        next: (lista) => {
          this.favoritos = lista;
          this.castear();
          this.cargarPeliculasFavoritas();
        },
        error: () => {
          console.log("Error al cargar la lista de favoritos");
        }
      });
    }
  }

  castear(): void {
    this.favoritosIdsString = this.favoritos.map(id => id.toString());
    console.log(this.favoritosIdsString);
  }

    cargarPeliculasFavoritas(): void {
      const requests = this.favoritosIdsString.map(id => this.peliculaService.getPeliculaById(id));
      forkJoin(requests).subscribe({
        next: (peliculas) => {
          this.peliculas = peliculas.filter(pelicula => pelicula !== null) as MovieDetails[];
        },
        error: () => {
          console.log("Error al cargar las películas favoritas");
        }
      });
    }
}


