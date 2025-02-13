import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PosterComponent } from '../../pelicula/components/poster/poster.component';
import { PosterfavoritoComponent } from '../../pelicula/components/poster-favoritos/poster-favoritos.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieDetails } from '../../interfaces/details.interface';
import { forkJoin } from 'rxjs';
import { PeliculaService } from '../../service/pelicula.service';
import { FavoritosService } from '../../service/favorito.service';


@Component({
  selector: 'app-lista-favoritos',
  standalone: true,
  imports: [CommonModule, PosterfavoritoComponent, RouterLink],
  templateUrl: './lista-favoritos.component.html',
  styleUrls: ['./lista-favoritos.component.css']
})
export class ListaFavoritosComponent implements OnInit {

  peliculas: MovieDetails[] | null = [];
  favoritos: number[] = [];
  userId!: string // tengo q recupera el id del la ruta
  favoritosIdsString: string[] = [];


  activatedroute = inject(ActivatedRoute);
  private peliculaService = inject(PeliculaService);
  private favoritosService = inject(FavoritosService);





  ngOnInit(): void {

    //recupero el id de la url
    const {id} = this.activatedroute.snapshot.params; // recupero id de la url
    this.userId = id;

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
