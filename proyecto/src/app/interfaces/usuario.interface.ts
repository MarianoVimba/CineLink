export interface Usuario{
    id?:string,
    nombre?: string,
    apellido?: string,
    nombreUsuario: string,
    password?: string,
    confirmacionPasword?: string,
    pais: string,
    ciudad: string,
    palabraClave?: string,
    descripcion: string

    //listas
    listaFavoritos?: any[],
    seguidores?: string[],
    seguidos?: string[],
    listaDePeliculasPersonalizadas?: any[],
    watchList?: any[],
    reseñas?: number[]
};