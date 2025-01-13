import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../service/usuario.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  router = inject(Router);
  auth = inject(AuthService);

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.formLogin = this.fb.group({
      nombreUsuario: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}


  login() {
    if (this.formLogin.invalid) return;

    const { nombreUsuario, password } = this.formLogin.value;
    this.usuarioService.login(nombreUsuario, password).subscribe({
      next: (usuario) => {
        if (usuario) {
          alert('Login exitoso');
          this.router.navigate(['inicio']);
          this.auth.logIn(); // del servicio para pasarlo a true
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


}
