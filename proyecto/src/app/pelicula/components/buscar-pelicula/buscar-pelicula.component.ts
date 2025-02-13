import { FooterComponent} from '../../../shared/footer/footer.component' ;
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PosterComponent } from '../poster/poster.component';
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from '../../../service/pelicula.service';
import { Pelicula } from '../../../interfaces/pelicula.interface';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-buscar-pelicula',
  standalone: true,
  imports: [CommonModule, PosterComponent,NavbarComponent,FooterComponent],
  templateUrl: './buscar-pelicula.component.html',
  styleUrls: ['./buscar-pelicula.component.css']
})
export class BuscarPeliculaComponent implements OnInit{

  texto = '';
  peliculas:Pelicula [] = [];
  noEncontro = '';

  activatedRoute = inject(ActivatedRoute);
  servicioPelicula = inject(PeliculaService);

  ngOnInit(): void {

    this.activatedRoute.params.subscribe({
      next: (params) =>{

          this.texto = params['texto']; // recuper el texto de la url
          console.log(this.texto);

        this.buscarPeliculas();

      },error:(e:Error) =>{
        console.log(e.message);
      }
    })
  }


  buscarPeliculas(){

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










}
