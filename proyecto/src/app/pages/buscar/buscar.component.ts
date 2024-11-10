import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Pelicula } from '../../interfaces/pelicula.interface';
import { PeliculaService } from '../../service/pelicula.service';
import { PosterComponent } from '../../pelicula/components/poster/poster.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, NavbarComponent,PosterComponent,FooterComponent,RouterLink],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {

  router = inject(Router);
  servicioPelicula = inject(PeliculaService);


  texto = '';
  noEncontro = '';
  peliculas:Pelicula [] = [];




  buscarPelicula(textoBusqueda:string){

    textoBusqueda = textoBusqueda.trim();
    if (textoBusqueda.length === 0) {

      return;

    }

    this.texto = textoBusqueda;
    this.traerPeliculas()

    //this.router.navigate(['/buscar', texto]);

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


}
