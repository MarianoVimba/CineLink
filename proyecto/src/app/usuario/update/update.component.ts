import { Usuario } from './../../interfaces/usuario.interface';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  id: string | null = '';

  router = inject(Router);

  ngOnInit(): void {
    this.ruta.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.getUsuario(this.id);
      }
    });
  }

  ruta = inject(ActivatedRoute);
  servicio = inject(UsuarioService);
  fb = inject(FormBuilder);

  formulario = this.fb.nonNullable.group({
    nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
    pais: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    descripcion: ['']
  });

  getUsuario(id: string) {
    this.servicio.getUsuarioById(id).subscribe({
      next: (usuario: Usuario) => {
        console.log("usuario obtenido " + usuario.nombreUsuario);
        this.setPersonaje(usuario);
      },
      error: () => {
        console.log("error");
      }
    });
  }

  setPersonaje(usuario: Usuario) {
    this.formulario.controls['nombreUsuario'].setValue(usuario.nombreUsuario);
    this.formulario.controls['pais'].setValue(usuario.pais);
    this.formulario.controls['ciudad'].setValue(usuario.ciudad);
    this.formulario.controls['descripcion'].setValue(usuario.descripcion);
  }

  actualizar() {
    if (this.formulario.invalid) return;
    const usuarioActualizado = this.formulario.getRawValue();
    this.servicio.updateUsuario(this.id, usuarioActualizado).subscribe({
      next: () => {
        alert("actualizado");
        this.volverAlinicio()
      },
      error: () => {
        console.log("error");
      }
    });
  }

  volverAlinicio(){
    this.router.navigate(['/inicio']);
  }
}
