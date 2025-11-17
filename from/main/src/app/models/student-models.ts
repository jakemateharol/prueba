// src/app/models/student-models.ts

export interface CreateStudentDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  career: string;
  academicCycle: number;
  studentCode: string;
}

export interface StudentDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  career: string;
  academicCycle: number;
  studentCode: string;
  active: boolean;
  createdAt: string;      // Se puede usar string para fechas en frontend
  updatedAt: string;
  roomHistory: number[];  // Lista de IDs de habitaciones
}

export interface UpdateStudentDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  career?: string;
  academicCycle?: number;
  active?: boolean;
}
