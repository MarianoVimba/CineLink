export interface Usuario{
    id?:string,
    nombre?: string,
    apellido?: string,
    nombreUsuario: string,
    password?: string,
    confirmacionPasword?: string,
    pais: string,
    ciudad: string,
    descripcion: string

    //listas
    listaDePeliculasPersonalizadas?: any[],
    watchList?: any[],
    listaMeGusta?: any[],
    seguidores?: Usuario[],
    seguidos?: Usuario[],
    reseñas?: number[]
};