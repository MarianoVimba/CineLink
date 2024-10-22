import { Routes } from '@angular/router';
import { LoginComponent } from './autenticacion/login/login.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';

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
        path:'**',
        redirectTo:''
    }
];
