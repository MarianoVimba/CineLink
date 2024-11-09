import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from '../../service/pelicula.service';
import { CommonModule } from '@angular/common';
import { MovieDetails } from '../../interfaces/details.interface';
import { Cast } from '../../interfaces/credits.interface';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pagina-pelicula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagina-pelicula.component.html',
  styleUrl: './pagina-pelicula.component.css'
})
export class PaginaPeliculaComponent implements OnInit{

  pelicula?: MovieDetails;
  cast : Cast[] =[];

  servicioPelicula = inject(PeliculaService);
  activatedroute = inject(ActivatedRoute);

  ngOnInit() {

    const {id} = this.activatedroute.snapshot.params; // recupero id de la url


    // combineLatest([

    //   this.servicioPelicula.getPeliculaById(id),
    //   this.servicioPelicula.getPeliculaCreditos(id)

    // ]).subscribe(([movie,cast])=>{

    //   if (movie === null || cast === null) {

    //     console.error('Error: La pelicula o el reparto no se encontraron');
    //     return;

    //   }

    //   this.pelicula= movie;
    //   this.cast = cast;
    // })


    this.cargarPelicula(id);
  }


  cargarPelicula(id:string){

    combineLatest([

      this.servicioPelicula.getPeliculaById(id),
      this.servicioPelicula.getPeliculaCreditos(id)

    ]).subscribe({
      next:([movie,cast]) =>{

      if (movie === null || cast === null) {

        console.error('Error: La pelicula o el reparto no se encontraron');
        return;

      }

      this.pelicula= movie;
      this.cast = cast;

      },error:(e:Error) =>{
        console.log(e.message);
      }
    })
  }


  getEstrellas(voteAverage:number){

    const contadorEstrellas = Math.floor(voteAverage);
    return Array(contadorEstrellas).fill(0);
  }


  regresar(){

    window.history.back();
  }


}
