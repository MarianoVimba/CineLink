import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  ruta = inject(Router);
  servicio = inject(UsuarioService);

  id: string | null = "";
  nombreUsuario: string = "";

  ngOnInit(): void {
    this.id = localStorage.getItem('userId');
    if (this.id) {
      this.getUsuario(this.id);
    } else {
      console.error('User ID not found');
    }
  }

  modificarUsuario() {
    if (this.id) {
      this.ruta.navigate([`update/${this.id}`]);
    } else {
      console.error('User ID not found');
    }
  }

  getUsuario(id: string) {
    this.servicio.getUsuarioById(id).subscribe({
      next: (usuario: Usuario) => {
        this.nombreUsuario = usuario.nombreUsuario;
      },
      error: () => {
        console.log("error");
      }
    });
  }
}
