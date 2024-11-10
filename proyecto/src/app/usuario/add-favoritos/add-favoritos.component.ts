import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FavoritosService } from '../../service/favorito.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../service/usuario.service';
import { ListaPeliculasComponent } from '../lista-peliculas/lista-peliculas.component';

@Component({
  selector: 'app-add-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-favoritos.component.html',
  styleUrls: ['./add-favoritos.component.css']
})
export class AddFavoritosComponent implements OnInit {
  @Input() peliculaId!: number;
  @Output() eventoAgregar = new EventEmitter()


  servicio = inject(UsuarioService);



  esFavorito: boolean = false;
  constructor(private favoritosService: FavoritosService) {}
  userId:  string | null  = localStorage.getItem('userId');

  ngOnInit(): void {
    this.verificarFavorito();
  }

  verificarFavorito(): void {
    this.favoritosService.obtenerFavoritos(this.userId).subscribe((favoritos: number[]) => {
      this.esFavorito = favoritos.includes(this.peliculaId);
    });
  }

  agregarAFavoritos(): void {
    if (!this.esFavorito) {
      this.favoritosService.agregarFavorito(this.userId, this.peliculaId).subscribe(() => {
        this.esFavorito = true;
      });
    }
  }

  eliminarDeFavoritos(): void {
    if (this.esFavorito) {
      this.favoritosService.eliminarFavorito(this.userId, this.peliculaId).subscribe(() => {
        this.esFavorito = false;
      });
    }
  }
}
