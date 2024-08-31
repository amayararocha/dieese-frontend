import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioLogin } from '../../models/usuario-login.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true, 
  imports:[FormsModule, CommonModule]
})
export class LoginComponent {
  usuarioLogin: UsuarioLogin = new UsuarioLogin();
  mensagemErro: string = '';

  constructor(private authService: AuthService) { }



  onLogin(): void {
    this.authService.login(this.usuarioLogin).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido:', response);
        // Armazene o token se necessário
      },
      error: (error) => {
        this.mensagemErro = 'Falha na autenticação. Verifique suas credenciais.';
        console.error('Erro de login:', error);
      }
    });
  }
}
