// src/app/models/reservation-table-model.ts
export interface ReservationTableDto {
  id: number;
  studentId: number;
  studentName?: string;
  roomId: number;
  roomNumber?: string;
  status: 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
}
  