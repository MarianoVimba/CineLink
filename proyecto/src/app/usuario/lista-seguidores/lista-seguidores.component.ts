import { Component, inject, OnInit } from '@angular/core';
import { SeguidoresService } from '../../service/seguidores.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-seguidores',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './lista-seguidores.component.html',
  styleUrls: ['./lista-seguidores.component.css']
})
export class ListaSeguidoresComponent implements OnInit {
  seguidores: Usuario[] = [];
  userId: string | null = localStorage.getItem('userId');
  seguidoresService = inject(SeguidoresService);

  ngOnInit(): void {
    if (this.userId) {
      this.seguidoresService.obtenerDetallesSeguidores(this.userId).subscribe({
        next: (usuarios: Usuario[]) => {
          this.seguidores = usuarios;
        },
        error: () => {
          console.error('Error al obtener los detalles de los seguidores');
        }
      });
    }
  }
}
