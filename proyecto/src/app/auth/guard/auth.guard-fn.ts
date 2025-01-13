import { inject } from "@angular/core"
import { AuthService } from "../../service/auth.service"
import { Router } from "@angular/router"

export const authGuardFn = () => {

    const authService = inject(AuthService)
    const router = inject(Router)

    if(authService.estoyLogueado || localStorage.getItem('token') ){
        localStorage.setItem('token', '123.123.123');
        return true;
    }
    else{
        router.navigateByUrl('login');
        return false;
    }
}