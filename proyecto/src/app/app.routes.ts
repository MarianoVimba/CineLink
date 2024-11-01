import { Routes } from '@angular/router';
import { LoginComponent } from './usuario/autenticacion/login/login.component';
import { RegistroComponent } from './usuario/autenticacion/registro/registro.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
export const routes: Routes = [
    {
        path:"",
        component:LoginComponent
    },
    {
        path:"registro",
        component:RegistroComponent
    },
    {
        path:"inicio",
        component:InicioPageComponent
    },
    {
        path:'**',
        redirectTo:''
    }
];
