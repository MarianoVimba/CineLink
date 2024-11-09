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
    listaFavoritos?: any[],
    listaDePeliculasPersonalizadas?: any[],
    watchList?: any[],
    seguidores?: Usuario[],
    seguidos?: Usuario[],
    reseñas?: number[]
};