import { inject } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";

// Protege las rutas privadas: solo entra quien tiene sesión iniciada.
export const authGuardFn = () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        return true;
    }

    return router.createUrlTree(['login']);
};
