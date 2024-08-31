import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioLogin } from '../models/usuario-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://greve-dieese.onrender.com/usuarios/logar'; // Substitua com a URL da sua API

  constructor(private http: HttpClient) { }

  login(usuarioLogin: UsuarioLogin): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuarioLogin, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
