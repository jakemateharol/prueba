// src/app/models/reservation-models.ts

export interface CancelReservationDto {
  cancellationReason: string;
}

export interface CreateReservationDto {
  studentId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  notes: string;
}

export interface ReservationDto {
  id: number;
  studentId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  status: 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  notes: string;
  createdAt: string;
  updatedAt: string;
  cancelledAt?: string;
  cancellationReason?: string;
}

export interface RoomDto {
  id: number;
  roomNumber: string;
  status: string;
}

export interface StudentDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
}

export interface UpdateReservationDto {
  checkInDate?: string;
  checkOutDate?: string;
  status?: 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

// Interfaz para la tabla
export interface ReservationView {
  id: number;
  studentName: string;
  roomNumber: string;
  status: string;
}
