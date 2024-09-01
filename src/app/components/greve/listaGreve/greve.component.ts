import { Component, OnInit } from '@angular/core';
import { Greve } from '../../../models/greve.model';
import { GreveService } from '../../../service/greve.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-greve',
  templateUrl: './greve.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class GreveComponent implements OnInit {

  greves: Greve[] = [];
  greveSelecionada: Greve | null = null;
  novaGreve: Greve = this.resetarGreve();
  mensagemErro: string = '';

  constructor(private greveService: GreveService) { }

  ngOnInit(): void {
    this.obterTodasGreves();
  }

  obterTodasGreves(): void {
    this.greveService.obterTodasGreves().subscribe({
      next: (data) => {
        this.greves = data;
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao buscar greves.';
        console.error('Erro ao buscar greves:', err);
      }
    });
  }

  selecionarGreve(greve: Greve): void {
    this.greveSelecionada = greve;
  }

  buscarPorCategoria(categoria: string): void {
    this.greveService.obterGrevesPorCategoria(categoria).subscribe({
      next: (data) => {
        this.greves = data;
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao buscar greves por categoria.';
        console.error('Erro ao buscar greves por categoria:', err);
      }
    });
  }

  buscarPorSindicato(sindicato: string): void {
    this.greveService.obterGrevesPorSindicato(sindicato).subscribe({
      next: (data) => {
        this.greves = data;
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao buscar greves por sindicato.';
        console.error('Erro ao buscar greves por sindicato:', err);
      }
    });
  }

  salvarGreve(): void {
    if (this.greveSelecionada && this.greveSelecionada.id) {
      this.greveService.atualizarGreve(this.greveSelecionada.id, this.greveSelecionada).subscribe({
        next: () => {
          this.obterTodasGreves();
          this.greveSelecionada = null;
        },
        error: (err) => {
          this.mensagemErro = 'Erro ao atualizar greve.';
          console.error('Erro ao atualizar greve:', err);
        }
      });
    } else {
      this.greveService.criarGreve(this.novaGreve).subscribe({
        next: () => {
          this.obterTodasGreves();
          this.novaGreve = this.resetarGreve();
        },
        error: (err) => {
          this.mensagemErro = 'Erro ao criar nova greve.';
          console.error('Erro ao criar nova greve:', err);
        }
      });
    }
  }

  deletarGreve(id: number): void {
    this.greveService.deletarGreve(id).subscribe({
      next: () => {
        this.obterTodasGreves();
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao deletar greve.';
        console.error('Erro ao deletar greve:', err);
      }
    });
  }

  resetarGreve(): Greve {
    return {
      dataInicio: '',
      motivo: '',
      categoriasTrabalhadores: '',
      numeroTrabalhadores: 0,
      local: '',
      sindicato: ''
    };
  }

  cancelarEdicao(): void {
    this.greveSelecionada = null;
  }
}
