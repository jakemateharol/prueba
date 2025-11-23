import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../providers/services/students/student.service';
import { StudentDto, CreateStudentDto, UpdateStudentDto } from '../../models/student-models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-students',
  templateUrl: './students.component.html',
  imports: [CommonModule, FormsModule]
})
export class StudentsComponent implements OnInit {
  students: StudentDto[] = [];
  newStudent: CreateStudentDto = {} as CreateStudentDto;

  // 🔹 Variables para búsqueda
  searchCode: string = '';

  // 🔹 Variables para actualización
  updateStudentData: UpdateStudentDto = {} as UpdateStudentDto;
  editingStudentId: number | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  // 🔹 Cargar todos los estudiantes
  loadStudents() {
    this.studentService.getAll().subscribe(data => this.students = data);
  }

  // 🔹 Crear estudiante
  createStudent() {
    this.studentService.create(this.newStudent).subscribe(student => {
      alert('Estudiante creado: ' + student.firstName);
      this.newStudent = {} as CreateStudentDto;
      this.loadStudents();
    }, error => {
      alert('Error creando estudiante: ' + error.error.message);
    });
  }

  // 🔹 Buscar estudiante por código
  searchByCode() {
    if (!this.searchCode) return;
    this.studentService.getByCode(this.searchCode).subscribe(student => {
      this.students = [student]; // mostrar solo el resultado encontrado
    }, error => {
      alert('Estudiante no encontrado');
    });
  }

  // 🔹 Limpiar búsqueda y recargar lista completa
  clearSearch() {
    this.searchCode = '';
    this.loadStudents();
  }

  // 🔹 Activar / Desactivar estudiante
  toggleActive(studentId: number) {
    this.studentService.toggleActive(studentId).subscribe(() => {
      this.loadStudents();
    }, error => {
      alert('Error cambiando estado: ' + error.error.message);
    });
  }

  // 🔹 Eliminar estudiante
  deleteStudent(studentId: number) {
    this.studentService.deleteStudent(studentId).subscribe(() => {
      alert('Estudiante eliminado');
      this.loadStudents();  // Recargar la lista después de eliminar
    }, error => {
      alert('Error eliminando estudiante: ' + error.error.message);
    });
  }

  // 🔹 Preparar datos para actualizar
  editStudent(student: StudentDto) {
    this.editingStudentId = student.id;
    this.updateStudentData = {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      career: student.career,
      academicCycle: student.academicCycle
    };
  }

  // 🔹 Actualizar estudiante
  updateStudent(studentId: number) {
    this.studentService.updateStudent(studentId, this.updateStudentData).subscribe(() => {
      alert('Estudiante actualizado');
      this.updateStudentData = {} as UpdateStudentDto;
      this.editingStudentId = null;
      this.loadStudents();
    }, error => {
      alert('Error actualizando estudiante: ' + error.error.message);
    });
  }

  // 🔹 Cancelar edición
  cancelEdit() {
    this.editingStudentId = null;
    this.updateStudentData = {} as UpdateStudentDto;
  }
}
