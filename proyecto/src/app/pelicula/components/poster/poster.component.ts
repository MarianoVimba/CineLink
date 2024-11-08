import { Component, inject, Input } from '@angular/core';
import { Pelicula } from '../../../interfaces/pelicula.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poster.component.html',
  styleUrl: './poster.component.css'
})
export class PosterComponent {

  @Input() peliculas?: Pelicula[];
  router = inject(Router);





  getEstrellas(voteAverage:number){

    const contador = Math.floor(voteAverage);
    return Array(contador).fill(0);

  }


  irPaginaPelicula(pelicula: Pelicula){

    this.router.navigate(['/pelicula', pelicula.id]);
  }








}
