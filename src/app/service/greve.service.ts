import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Greve } from '../models/greve.model';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GreveService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  obterTodasGreves(): Observable<Greve[]> {
    return this.http.get<Greve[]>(`${this.apiUrl}/greves`);
  }

  obterGrevePorId(id: number): Observable<Greve> {
    return this.http.get<Greve>(`${this.apiUrl}/greves/${id}`);
  }

  obterGrevesPorCategoria(categoria: string): Observable<Greve[]> {
    return this.http.get<Greve[]>(`${this.apiUrl}/greves/categoria/${categoria}`);
  }

  obterGrevesPorSindicato(sindicato: string): Observable<Greve[]> {
    return this.http.get<Greve[]>(`${this.apiUrl}/greves/sindicato/${sindicato}`);
  }

  criarGreve(greve: Greve): Observable<Greve> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Greve>(`${this.apiUrl}/greves`, greve, { headers });
  }

  atualizarGreve(id: number, greve: Greve): Observable<Greve> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Greve>(`${this.apiUrl}/greves/${id}`, greve, { headers });
  }

  deletarGreve(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/greves/${id}`);
  }
}
