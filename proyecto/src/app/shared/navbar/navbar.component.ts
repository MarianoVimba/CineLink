import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {



  ruta = inject(Router);
  servicio = inject(UsuarioService);

  id: string | null= "";
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

    /* Barra de busqueda !! */

     /*  barra de busqueda */
    buscarUsuario: string = ''; 
    resultadoBusqueda: Usuario[] = [];
    /* -------------------------------- */

  buscarUsuarios() {
    if (this.buscarUsuario.trim() === '') {
      this.resultadoBusqueda = [];
      return;
    }
  
    this.servicio.getUsuarios().subscribe({
      next: (usuarios) => {
        console.log('Usuarios recibidos:', usuarios); // Verificar los datos recibidos
        this.resultadoBusqueda = usuarios.filter(usuario =>
          usuario.nombreUsuario.toLowerCase().includes(this.buscarUsuario.toLowerCase())
        );
        console.log('Resultados de búsqueda:', this.resultadoBusqueda); // Verificar los resultados
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  
    
  }
}
