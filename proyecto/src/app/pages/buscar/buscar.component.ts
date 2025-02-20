import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Pelicula } from '../../interfaces/pelicula.interface';
import { PeliculaService } from '../../service/pelicula.service';
import { PosterComponent } from '../../pelicula/components/poster/poster.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Genero } from '../../interfaces/genero.interface';
import { GeneroService } from '../../service/genero.service';
import { GeneroPeliculaService } from '../../service/GeneroPeliculaService.service';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, NavbarComponent,PosterComponent,FooterComponent,RouterLink],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit {

  router = inject(Router);
  servicioPelicula = inject(PeliculaService);

  servicioGenero = inject(GeneroService);
  servicioGeneroPelicula = inject(GeneroPeliculaService);
  generos: Genero[] = [];


  texto = '';
  noEncontro = '';
  peliculas:Pelicula [] = [];

  // colores de los botones de genero
  coloresGeneros: string[] = [
    '#E63946', '#F4A261', '#2A9D8F', '#264653', '#8E44AD',
    '#6dd84d', '#FF5733', '#3498DB', '#1ABC9C', '#D35400',
    '#C0392B', '#7F8C8D', '#27AE60', '#F39C12', '#c7ae20'
  ];

  ngOnInit() {

    this.obtenerGeneros();

    this.buscarPorGenero(28); // cuando se abra el componente por defecto va a mostrar peliculas de accion

  }



  buscarPelicula(textoBusqueda:string){


    textoBusqueda = textoBusqueda.trim();
    if (textoBusqueda.length === 0) {

      return;

    }

    this.texto = textoBusqueda;
    this.traerPeliculas()


  }



  traerPeliculas(){

    this.servicioPelicula.buscarPeliculas(this.texto).subscribe({
      next: (resPeliculas) =>{
        this.peliculas=resPeliculas;

        if(this.peliculas.length == 0){
        this.noEncontro= '😌 No se encontro la pelicula';
        }
      },error:(e:Error) =>{
        console.log(e.message);
      }
    })
  }

  obtenerGeneros() {
    this.servicioGenero.obtenerGeneros().subscribe({
      next: (resGeneros) => {
        this.generos = resGeneros;
      },
      error: (e: Error) => {
        console.error('Error al obtener géneros:', e.message);
      }
    });
  }

  buscarPorGenero(generoId: number) {
    this.noEncontro = ''; // Limpiar mensaje anterior
    this.servicioGeneroPelicula.buscarPeliculasPorGenero(generoId).subscribe({
      next: (resPeliculas) => {
        this.peliculas = resPeliculas;
        this.noEncontro = this.peliculas.length === 0 ? '😌 No se encontraron películas para este género' : '';
      },
      error: (e: Error) => {
        console.error('Error al buscar películas por género:', e.message);
      }
    });
  }


  obtenerColorGenero(index: number): string {
    return this.coloresGeneros[index % this.coloresGeneros.length];
  }

  onGeneroChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const generoId = Number(selectElement.value);
    this.buscarPorGenero(generoId);
  }


}
