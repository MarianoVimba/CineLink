import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../../service/favorito.service';
import { PeliculaService } from '../../service/pelicula.service';
import { Pelicula } from '../../interfaces/pelicula.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-peliculas.component.html',
  styleUrls: ['./lista-peliculas.component.css']
})
export class ListaPeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];
  favoritos: number[] = [];
  userId: string = '1'; // Asumimos un ID de usuario estático por ahora

  constructor(private peliculaService: PeliculaService, private favoritosService: FavoritosService) {}

  ngOnInit(): void {
    this.cargarPeliculas();
    this.cargarFavoritos();
  }

  cargarPeliculas(): void {
    this.peliculaService.getCartelera().subscribe(peliculas => {
      this.peliculas = peliculas;
    });
  }

  cargarFavoritos(): void {
    this.favoritosService.obtenerFavoritos(this.userId).subscribe((favoritos: number[]) => {
      this.favoritos = favoritos;
    });
  }

  agregarAFavoritos(id: number): void {
    this.favoritosService.agregarFavorito(this.userId, id).subscribe(() => {
      this.cargarFavoritos(); // Recargar la lista de favoritos después de agregar
    });
  }

  eliminarDeFavoritos(id: number): void {
    this.favoritosService.eliminarFavorito(this.userId, id).subscribe(() => {
      this.cargarFavoritos(); // Recargar la lista de favoritos después de eliminar
    });
  }
}
