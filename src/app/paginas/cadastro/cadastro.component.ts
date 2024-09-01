import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CadastroComponent {
  registerData: Usuario = { nome: '', localizacao: '', usuario: '', senha: '' }; 
  mensagemErro: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  onSubmit(): void {
    this.usuarioService.cadastrarUsuario(this.registerData).subscribe({
      next: (response) => {
        console.log('Cadastro bem-sucedido:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.mensagemErro = 'Falha no cadastro. Verifique os dados fornecidos.';
        console.error('Erro de cadastro:', error);
      }
    });
  }
}
