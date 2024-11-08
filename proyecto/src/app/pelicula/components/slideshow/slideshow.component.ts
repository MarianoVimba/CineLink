import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { Pelicula } from '../../../interfaces/pelicula.interface';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css'
})
export class SlideshowComponent implements OnInit, AfterViewInit{

  @Input() peliculas?: Pelicula[];

  mySwiper?:Swiper;

  router = inject(Router);



  ngOnInit(): void {
      // borrar
  }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper',{loop:true});
  }

  onSlidePrev(){
    this.mySwiper?.slidePrev();
  }

  onSlideNext(){
    this.mySwiper?.slideNext();
  }

  irPaginaPelicula(pelicula: Pelicula){

    this.router.navigate(['/pelicula', pelicula.id]);
  }


}
