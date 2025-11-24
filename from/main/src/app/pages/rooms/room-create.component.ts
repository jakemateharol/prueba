import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../../providers/services/room/room.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-create',
  standalone: true,
  templateUrl: './room-create.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ]
})
export class RoomCreateComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private router: Router
  ) {
    this.form = this.fb.group({
      roomNumber: ['', Validators.required],
      type: ['', Validators.required],
      capacity: [1, [Validators.required, Validators.min(1)]],
      floor: [1, [Validators.required, Validators.min(1)]],
      pricePerMonth: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      additionalServices: [''] // texto separado por comas
    });
  }

  save() {
    if (this.form.invalid) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const dto = {
      ...this.form.value,
      additionalServices: this.form.value.additionalServices
        ? this.form.value.additionalServices.split(',').map((s: string) => s.trim())
        : []
    };

    this.roomService.createRoom(dto).subscribe({
      next: () => {
        alert('Habitación creada correctamente');
        this.router.navigate(['/rooms']);
      },
      error: (err: any) => {
        console.error('Error al crear la habitación:', err);
        alert('Ocurrió un error al crear la habitación');
      }
    });
  }
}
