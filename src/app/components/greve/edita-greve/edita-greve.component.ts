import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Greve } from '../../../models/greve.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-greve-modal',
  templateUrl: './edita-greve.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditGreveModalComponent {
  @Input() greve?: Greve;
  @Output() save = new EventEmitter<Greve>();
  @Output() close = new EventEmitter<void>();
  editForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      dataInicio: [''],
      dataFim: [''],
      motivo: [''],
      categoriasTrabalhadores: [''],
      numeroTrabalhadores: [''],
      local: [''],
      sindicato: ['']
    });
  }

  ngOnChanges(): void {
    if (this.greve) {
      this.editForm.patchValue(this.greve);
    }
  }

  onSave(): void {
    if (this.editForm.valid) {
      this.save.emit(this.editForm.value);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
