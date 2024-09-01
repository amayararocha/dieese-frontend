import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Greve } from '../../../models/greve.model';
import { GreveService } from '../../../service/greve.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditGreveModalComponent } from '../edita-greve/edita-greve.component';

@Component({
  selector: 'app-greve',
  templateUrl: './greve.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditGreveModalComponent]
})
export class GreveListComponent implements OnInit {
  greves: Greve[] = [];
  searchForm!: FormGroup;
  loading: boolean = false;
  error: string | null = null;
  selectedGreve?: Greve;
  showModal: boolean = false;

  constructor(
    private greveService: GreveService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      categoria: [''],
      sindicato: ['']
    });

    this.loadGreves();
  }

  loadGreves(): void {
    this.loading = true;
    this.error = null;
    const { categoria, sindicato } = this.searchForm.value;

    if (categoria) {
      this.greveService.obterGrevesPorCategoria(categoria).subscribe(
        (data: Greve[]) => {
          this.greves = data;
          this.loading = false;
        },
        (err) => {
          this.error = 'Erro ao carregar greves por categoria';
          this.loading = false;
        }
      );
    } else if (sindicato) {
      this.greveService.obterGrevesPorSindicato(sindicato).subscribe(
        (data: Greve[]) => {
          this.greves = data;
          this.loading = false;
        },
        (err) => {
          this.error = 'Erro ao carregar greves por sindicato';
          this.loading = false;
        }
      );
    } else {
      this.greveService.obterTodasGreves().subscribe(
        (data: Greve[]) => {
          this.greves = data;
          this.loading = false;
        },
        (err) => {
          this.error = 'Erro ao carregar todas as greves';
          this.loading = false;
        }
      );
    }
  }

  onSearch(): void {
    this.loadGreves();
  }

  onReset(): void {
    this.searchForm.reset();
    this.loadGreves();
  }

  onAddGreve(): void {
    this.router.navigate(['/add-greve']);
  }

  onEditGreve(greve: Greve): void {
    this.selectedGreve = greve;
    this.showModal = true;
  }

  onSaveGreve(updatedGreve: Greve): void {
    if (this.selectedGreve) {
      this.greveService.atualizarGreve(this.selectedGreve.id, updatedGreve).subscribe(
        () => {
          this.loadGreves();
          this.showModal = false;
        },
        (err) => {
          this.error = 'Erro ao salvar a greve';
        }
      );
    }
  }

  onCloseModal(): void {
    this.showModal = false;
  }

  onDeleteGreve(id: number): void {
    if (confirm('Tem certeza que deseja deletar esta greve?')) {
      this.greveService.deletarGreve(id).subscribe(
        () => {
          this.loadGreves();
        },
        (err) => {
          this.error = 'Erro ao deletar a greve';
        }
      );
    }
  }
}
