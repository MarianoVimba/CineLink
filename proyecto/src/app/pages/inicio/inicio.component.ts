import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../service/pelicula.service';
import { Pelicula } from '../../interfaces/pelicula.interface';
import { SlideshowComponent } from '../../pelicula/components/slideshow/slideshow.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { PosterComponent } from '../../pelicula/components/poster/poster.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ListaPeliculasComponent } from "../../usuario/lista-peliculas/lista-peliculas.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, SlideshowComponent, NavbarComponent, PosterComponent, FooterComponent, ListaPeliculasComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  listaPeliculas: Pelicula[] = [];

  constructor(private servicioPelicula: PeliculaService){}

  ngOnInit(): void {
    this.cargarListaPeliculas();
  }

  cargarListaPeliculas(){
    this.servicioPelicula.getCartelera().subscribe(res=>{
      this.listaPeliculas = res;
  })}


}
