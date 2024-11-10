import { Component, inject, OnInit } from '@angular/core';
import { SeguidoresService } from '../../service/seguidores.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-seguidos',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './lista-seguidos.component.html',
  styleUrls: ['./lista-seguidos.component.css']
})
export class ListaSeguidosComponent implements OnInit {
  seguidos: Usuario[] = [];
  userId: string | null = localStorage.getItem('userId');
  seguidoresService = inject(SeguidoresService);

  ngOnInit(): void {
    if (this.userId) {
      this.seguidoresService.obtenerDetallesSeguidos(this.userId).subscribe({
        next: (usuarios: Usuario[]) => {
          this.seguidos = usuarios;
        },
        error: () => {
          console.error('Error al obtener los detalles de los seguidos');
        }
      });
    }
  }
}
