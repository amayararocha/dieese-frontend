import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../service/usuario.service';
import { UsuarioLogin } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true, 
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  usuarioLogin: UsuarioLogin = { usuario: '', senha: '' }; 
  mensagemErro: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  onSubmit(): void {
    this.usuarioService.autenticarUsuario(this.usuarioLogin).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido:', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.mensagemErro = 'Falha na autenticação. Verifique suas credenciais.';
        console.error('Erro de login:', error);
      }
    });
  }
}
