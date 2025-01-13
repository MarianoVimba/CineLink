
export const authGuardFnLogueado = () => {

    if(localStorage.getItem('token') ){
        localStorage.clear();
    }

}