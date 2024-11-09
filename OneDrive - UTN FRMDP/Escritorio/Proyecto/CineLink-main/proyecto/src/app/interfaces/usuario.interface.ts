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
    watchList?: string[],
    listaMeGusta?: string[],
    seguidores?: string[],
    seguidos?: string[],
    reseñas?: number[]
};