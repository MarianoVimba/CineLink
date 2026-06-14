import { Trivia } from './../interfaces/trivia.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {


  private apiUrl = `${environment.apiBaseUrl}/preguntas`;

  constructor(private http: HttpClient) { }



  obtenerPreguntas():   Observable <Trivia []> {
    return this.http.get<Trivia[]>(this.apiUrl);
  }





}
