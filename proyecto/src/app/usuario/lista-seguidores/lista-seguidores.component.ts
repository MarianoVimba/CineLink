import { Component, inject, OnInit } from '@angular/core';
import { SeguidoresService } from '../../service/seguidores.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-lista-seguidores',
  standalone: true,
  imports: [CommonModule,RouterLink,FooterComponent,NavbarComponent],
  templateUrl: './lista-seguidores.component.html',
  styleUrls: ['./lista-seguidores.component.css']
})
export class ListaSeguidoresComponent implements OnInit {
  seguidores: Usuario[] = [];
  userId: string | null = localStorage.getItem('userId');
  seguidoresService = inject(SeguidoresService);
  router= inject(Router);

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

  guardarEstadoYRedirigir(userId: string) {
    localStorage.setItem('fromSeguidores', 'true');
    this.router.navigate(['/perfil', userId]);
  }
}