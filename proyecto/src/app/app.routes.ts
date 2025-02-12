import { Routes } from '@angular/router';
import { LoginComponent } from './usuario/autenticacion/login/login.component';
import { RegistroComponent } from './usuario/autenticacion/registro/registro.component';
import { UpdateComponent } from './usuario/update/update.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { BuscarPeliculaComponent } from './pelicula/components/buscar-pelicula/buscar-pelicula.component';
import { PaginaPeliculaComponent } from './pages/pagina-pelicula/pagina-pelicula.component';
import { PerfilUsuarioPageComponent } from './pages/perfil-usuario-page/perfil-usuario-page.component';
import { ListaSeguidosComponent } from './usuario/lista-seguidos/lista-seguidos.component';
import { ListaSeguidoresComponent } from './usuario/lista-seguidores/lista-seguidores.component';
import { ListaPeliculasComponent } from './usuario/lista-peliculas/lista-peliculas.component';
import { ListaFavoritosComponent } from './usuario/lista-favoritos/lista-favoritos.component';
import { authGuardFn } from './auth/guard/auth.guard-fn';
import { authGuardFnLogueado } from './auth/guard/auth.guard-fn-logueado';
import { RestablecerPasswordComponent } from './usuario/autenticacion/restablecer-password/restablecer-password.component';
import { PaginaJuegoComponent } from './pages/pagina-juego/pagina-juego.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent, canActivate:[authGuardFnLogueado] },
    { path: "registro", component: RegistroComponent, canActivate:[authGuardFnLogueado] },
    { path: "recuperacionDeContraseña", component: RestablecerPasswordComponent , canActivate:[authGuardFnLogueado] },
    { path: "inicio", component: InicioComponent, canActivate:[authGuardFn] },
    { path: "perfil/:id", component: PerfilUsuarioPageComponent, canActivate:[authGuardFn]  },
    { path: 'pelicula/:id', component: PaginaPeliculaComponent, canActivate:[authGuardFn]  },
    { path: 'buscar/:texto', component: BuscarPeliculaComponent, canActivate:[authGuardFn]  },
    { path: 'buscar', component: BuscarComponent, canActivate:[authGuardFn] },
    { path: 'update/:id', component: UpdateComponent, canActivate:[authGuardFn] },
    { path: 'seguidos', component:ListaSeguidosComponent, canActivate:[authGuardFn] },
    { path: 'seguidores', component: ListaSeguidoresComponent, canActivate:[authGuardFn] },
    { path: 'favoritos', component: ListaPeliculasComponent, canActivate:[authGuardFn] }, // favoritos del usuario logeado
    {path: 'favoritos/:id', component: ListaFavoritosComponent, canActivate:[authGuardFn]  }, // lista favoritos otros usuarios
    {path: 'trivia', component: PaginaJuegoComponent,canActivate:[authGuardFn]}, // trivia

    { path: '**', redirectTo: 'login' }

];
