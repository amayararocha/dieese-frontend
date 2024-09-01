import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Greve } from '../models/greve.model';
import { environment } from '../environments/environment.prod';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GreveService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  private getHeaders(): HttpHeaders {
    let token = '';

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }

    return new HttpHeaders({
      'Authorization': token, 
      'Accept': 'application/json'
    });
  }

  obterTodasGreves(): Observable<Greve[]> {
    return this.http.get<Greve[]>(`${this.apiUrl}/greves`, { headers: this.getHeaders() });
  }

  obterGrevePorId(id: number): Observable<Greve> {
    return this.http.get<Greve>(`${this.apiUrl}/greves/${id}`, { headers: this.getHeaders() });
  }

  obterGrevesPorCategoria(categoria: string): Observable<Greve[]> {
    return this.http.get<Greve[]>(`${this.apiUrl}/greves/categoria/${categoria}`, { headers: this.getHeaders() });
  }

  obterGrevesPorSindicato(sindicato: string): Observable<Greve[]> {
    return this.http.get<Greve[]>(`${this.apiUrl}/greves/sindicato/${sindicato}`, { headers: this.getHeaders() });
  }

  criarGreve(greve: Greve): Observable<Greve> {
    return this.http.post<Greve>(`${this.apiUrl}/greves`, greve, { headers: this.getHeaders() });
  }

  atualizarGreve(id: number, greve: Greve): Observable<Greve> {
    return this.http.put<Greve>(`${this.apiUrl}/greves/${id}`, greve, { headers: this.getHeaders() });
  }

  deletarGreve(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/greves/${id}`, { headers: this.getHeaders() });
  }
}
