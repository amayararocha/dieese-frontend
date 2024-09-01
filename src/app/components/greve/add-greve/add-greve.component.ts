import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GreveService } from '../../../service/greve.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-greve',
  templateUrl: './add-greve.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule]

})
export class AddGreveComponent {
  addGreveForm: FormGroup;
  error: string | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private greveService: GreveService,
    private router: Router
  ) {
    this.addGreveForm = this.fb.group({
      dataInicio: ['', Validators.required],
      dataFim: [''],
      motivo: ['', Validators.required],
      categoriasTrabalhadores: ['', Validators.required],
      numeroTrabalhadores: [0, [Validators.required, Validators.min(1)]],
      local: ['', Validators.required],
      sindicato: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addGreveForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    this.greveService.criarGreve(this.addGreveForm.value).subscribe(
      () => {
        this.router.navigate(['/greves']);
      },
      (err) => {
        this.error = 'Erro ao adicionar greve';
        this.loading = false;
      }
    );
  }

  onReset(): void {
    this.addGreveForm.reset();
  }
}
