import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RoomService } from '../../providers/services/room/room.service';
import { Router, ActivatedRoute } from '@angular/router';
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
    ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatCardModule, CommonModule
  ]
})
export class RoomCreateComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  roomId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      roomNumber: ['', Validators.required],
      type: ['', Validators.required],
      capacity: [1, [Validators.required, Validators.min(1)]],
      floor: [1, [Validators.required, Validators.min(1)]],
      pricePerMonth: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      additionalServices: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.roomId = +params['id'];
        this.loadRoom(this.roomId);
      }
    });
  }

  loadRoom(id: number) {
    this.roomService.getRoomById(id).subscribe({
      next: (room) => {
        this.form.patchValue({
          ...room,
          additionalServices: room.additionalServices.join(', ')
        });
      },
      error: (err) => { console.error(err); alert('Error al cargar la habitación'); }
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

    if (this.isEditMode && this.roomId) {
      this.roomService.updateRoom(this.roomId, dto).subscribe({
        next: () => { alert('Habitación actualizada'); this.router.navigate(['/rooms']); },
        error: (err) => { console.error(err); alert('Error al actualizar la habitación'); }
      });
    } else {
      this.roomService.createRoom(dto).subscribe({
        next: () => { alert('Habitación creada'); this.router.navigate(['/rooms']); },
        error: (err) => { console.error(err); alert('Error al crear la habitación'); }
      });
    }
  }

  cancel() {
    this.router.navigate(['/rooms']);
  }
}
