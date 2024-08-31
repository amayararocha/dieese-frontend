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

  getAllGreves(): Observable<Greve[]> {
    return this.http.get<Greve[]>(`${this.apiUrl}/greves`);
  }

  getGreveById(id: number): Observable<Greve> {
    return this.http.get<Greve>(`${this.apiUrl}/greves/${id}`);
  }

  getGrevesByCategoria(categoria: string): Observable<Greve[]> {
    return this.http.get<Greve[]>(`${this.apiUrl}/greves/categoria/${categoria}`);
  }

  getGrevesBySindicato(sindicato: string): Observable<Greve[]> {
    return this.http.get<Greve[]>(`${this.apiUrl}/greves/sindicato/${sindicato}`);
  }

  createGreve(greve: Greve): Observable<Greve> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Greve>(this.apiUrl, greve, { headers });
  }

  updateGreve(id: number, greve: Greve): Observable<Greve> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Greve>(`${this.apiUrl}/greves/${id}`, greve, { headers });
  }

  deleteGreve(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/greves/${id}`);
  }
}
