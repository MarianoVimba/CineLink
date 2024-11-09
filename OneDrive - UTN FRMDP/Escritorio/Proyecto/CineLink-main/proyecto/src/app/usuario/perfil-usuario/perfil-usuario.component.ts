import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit{
  
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
