// src/app/cadastro/cadastro.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../service/usuario.service'; // Ajuste o caminho conforme necessário
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CadastroComponent {
  registerData: Usuario = { nome: '', localizacao: '', usuario: '', senha: '' }; 
  mensagemErro: string = '';

  constructor(private usuarioService: UsuarioService) { }

  onSubmit(): void {
    this.usuarioService.cadastrarUsuario(this.registerData).subscribe({
      next: (response) => {
        console.log('Cadastro bem-sucedido:', response);

      },
      error: (error) => {
        this.mensagemErro = 'Falha no cadastro. Verifique os dados fornecidos.';
        console.error('Erro de cadastro:', error);
      }
    });
  }
}
