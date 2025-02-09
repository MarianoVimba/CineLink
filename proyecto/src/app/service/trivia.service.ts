import { Trivia } from './../interfaces/trivia.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {


  private apiUrl = 'http://localhost:3000/preguntas';

  constructor(private http: HttpClient) { }



  obtenerPreguntas():   Observable <Trivia []> {
    return this.http.get<Trivia[]>(this.apiUrl);
  }





}
