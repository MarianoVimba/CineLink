import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculaService } from '../../service/pelicula.service';
import { CommonModule } from '@angular/common';
import { MovieDetails } from '../../interfaces/details.interface';
import { Cast } from '../../interfaces/credits.interface';
import { combineLatest } from 'rxjs';
import { AddFavoritosComponent } from '../../usuario/add-favoritos/add-favoritos.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AgregarReseniaComponent } from '../../pelicula/components/agregar-resenia/agregar-resenia.component';
import { ListaPeliculasComponent } from '../../usuario/lista-peliculas/lista-peliculas.component';
import { ListaReseniasComponent } from '../../pelicula/components/lista-resenias/lista-resenias.component';
import { reseña } from '../../interfaces/reseña.interface';
import { ReseniaService } from '../../service/resenia.service';
import { TrailerService } from '../../service/trailer.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pagina-pelicula',
  standalone: true,
  imports: [CommonModule,AddFavoritosComponent,NavbarComponent,FooterComponent,AgregarReseniaComponent,ListaReseniasComponent],
  templateUrl: './pagina-pelicula.component.html',
  styleUrl: './pagina-pelicula.component.css'
})
export class PaginaPeliculaComponent implements OnInit{

  pelicula?: MovieDetails;
  cast : Cast[] =[];
  idPelicula!: number;
  trailerUrl?: SafeResourceUrl;;


  servicioPelicula = inject(PeliculaService);
  servicioResenia = inject(ReseniaService);
  servicioTrailer = inject(TrailerService)
  activatedroute = inject(ActivatedRoute);
  router = inject(Router);
  sanitizer = inject(DomSanitizer);

  @ViewChild(ListaReseniasComponent) lista!: ListaReseniasComponent;

  ngOnInit() {

    const {id} = this.activatedroute.snapshot.params; // recupero id de la url
    this.idPelicula = +id;


    console.log("ID ES", this.idPelicula);

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

      this.cargarTrailer(Number(id));

      },error:(e:Error) =>{
        console.log(e.message);
      }
    })
  }

  cargarTrailer(id: number) {
    this.servicioTrailer.getMovieTrailer(id).subscribe({
      next: (url) => {
        if (url) {
          this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); // Sanitiza la URL
        } else {
          console.log("No se encontró tráiler.");
        }
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }


  getEstrellas(voteAverage:number){

    const contadorEstrellas = Math.floor(voteAverage);
    return Array(contadorEstrellas).fill(0);
  }


  regresar(){

    window.history.back();
  }

  guardarResenia(nuevaResenia: reseña){


      this.servicioResenia.postResenia(nuevaResenia).subscribe({
        next:()=>{

          this.lista.cargarListaResenias();

        },error:(e:Error) =>{
          console.log(e.message);
        }
      })}

  }



