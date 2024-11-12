import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AddSeguirUsuarioComponent } from '../add-seguir-usuario/add-seguir-usuario.component';
import { CommonModule } from '@angular/common';
import { ListaFavoritosComponent } from '../lista-favoritos/lista-favoritos.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [AddSeguirUsuarioComponent,RouterLink,CommonModule, ListaFavoritosComponent,NavbarComponent, FooterComponent],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit{
actualizarListaSeguidores() {
throw new Error('Method not implemented.');
}

  ngOnInit(): void {
    this.ar.paramMap.subscribe(
      {
        next:(param)=>{
          this.id = param.get('id')
          this.us.getUsuarioById(this.id).subscribe(
            {
              next:(descarga)=>{
                this.unUsuario = descarga
              },
              error:console.log
            }
          )
        },
        error:console.log
      }
    )
  }


  unUsuario: Usuario | undefined
  id:string | null = null
  us = inject(UsuarioService)
  ar = inject(ActivatedRoute)


}
