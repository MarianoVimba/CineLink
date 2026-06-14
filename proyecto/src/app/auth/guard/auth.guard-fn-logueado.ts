import { inject } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";

// Evita que un usuario YA logueado vuelva a login/registro/recuperación:
// si tiene sesión, lo manda a inicio; si no, deja pasar.
export const authGuardFnLogueado = () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        return router.createUrlTree(['inicio']);
    }

    return true;
};
