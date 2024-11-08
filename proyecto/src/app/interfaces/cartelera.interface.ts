import { Pelicula } from "./pelicula.interface";

export interface Cartelera{
  dates:         Dates;
  page:          number;
  results:       Pelicula[];
  total_pages:   number;
  total_results: number;
}


export interface Dates {
  maximum: string;
  minimum: string;
}
