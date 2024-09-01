import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario, UsuarioLogin } from '../models/usuario.model';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken()); 
  isLoggedIn = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`);
  }

  autenticarUsuario(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(`${this.apiUrl}/usuarios/logar`, usuarioLogin).pipe(
      tap((response) => {
        if (response && response.token) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', response.token);
            this.loggedIn.next(true); 
          }
        }
      })
    );
  }

  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios/cadastrar`, usuario);
  }

  atualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  logout(): void {
    if (typeof window !== 'undefined') { 
      localStorage.removeItem('token'); 
    }
    this.loggedIn.next(false); 
  }
}
