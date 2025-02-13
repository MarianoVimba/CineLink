import { Component, inject, OnInit } from '@angular/core';
import { SeguidoresService } from '../../service/seguidores.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-lista-seguidos',
  standalone: true,
  imports: [CommonModule, RouterLink,NavbarComponent,FooterComponent],
  templateUrl: './lista-seguidos.component.html',
  styleUrls: ['./lista-seguidos.component.css']
})
export class ListaSeguidosComponent implements OnInit {
  seguidos: Usuario[] = [];
  userId: string | null = localStorage.getItem('userId');
  seguidoresService = inject(SeguidoresService);
  router= inject(Router);

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

  guardarEstadoYRedirigir(userId: string) {
    localStorage.setItem('fromSeguidos', 'true');
    this.router.navigate(['/perfil', userId]);
  }

  }