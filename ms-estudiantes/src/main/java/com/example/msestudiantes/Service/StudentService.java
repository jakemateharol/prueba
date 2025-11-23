package com.example.msestudiantes.Service;

import com.example.msestudiantes.Entity.Student;
import com.example.msestudiantes.Exceptions.InvalidStudentDataException;
import com.example.msestudiantes.Exceptions.StudentAlreadyExistsException;
import com.example.msestudiantes.Exceptions.StudentNotFoundException;
import com.example.msestudiantes.Repository.StudentRepository;
import com.example.msestudiantes.dtos.CreateStudentDto;
import com.example.msestudiantes.dtos.StudentDto;
import com.example.msestudiantes.dtos.UpdateStudentDto;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    // --------------------------
    // CREATE STUDENT
    // --------------------------
    @Transactional
    public StudentDto createStudent(CreateStudentDto createDto) {
        validateCreateStudentDto(createDto);

        // Validaciones de email y código
        if (studentRepository.existsByEmail(createDto.getEmail())) {
            throw new StudentAlreadyExistsException("Student with email " + createDto.getEmail() + " already exists");
        }

        if (studentRepository.existsByStudentCode(createDto.getStudentCode())) {
            throw new StudentAlreadyExistsException("Student with code " + createDto.getStudentCode() + " already exists");
        }

        // Crear entidad
        Student student = new Student();
        student.setFirstName(createDto.getFirstName());
        student.setLastName(createDto.getLastName());
        student.setEmail(createDto.getEmail());
        student.setPhone(createDto.getPhone());
        student.setCareer(createDto.getCareer());
        student.setAcademicCycle(createDto.getAcademicCycle());
        student.setStudentCode(createDto.getStudentCode());

        // 🔥 Campos obligatorios que NO vienen en el DTO
        student.setActive(true);
        student.setCreatedAt(LocalDateTime.now());
        student.setUpdatedAt(LocalDateTime.now());
        student.setRoomHistory(new ArrayList<>());  // Evita NullPointer

        Student savedStudent = studentRepository.save(student);
        return mapToDto(savedStudent);
    }

    // --------------------------
    // GET BY ID
    // --------------------------
    @Transactional(readOnly = true)
    public StudentDto getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
        return mapToDto(student);
    }

    // --------------------------
    // GET BY STUDENT CODE
    // --------------------------
    @Transactional(readOnly = true)
    public StudentDto getStudentByCode(String studentCode) {
        Student student = studentRepository.findByStudentCode(studentCode)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with code: " + studentCode));
        return mapToDto(student);
    }

    // --------------------------
    // GET ALL STUDENTS
    // --------------------------
    @Transactional(readOnly = true)
    public List<StudentDto> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // --------------------------
    // GET ACTIVE STUDENTS
    // --------------------------
    @Transactional(readOnly = true)
    public List<StudentDto> getActiveStudents() {
        return studentRepository.findByActiveTrue().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // --------------------------
    // UPDATE STUDENT
    // --------------------------
    @Transactional
    public StudentDto updateStudent(Long id, UpdateStudentDto updateDto) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));

        // Validación de email único
        if (updateDto.getEmail() != null && !updateDto.getEmail().equals(student.getEmail())) {
            if (studentRepository.existsByEmail(updateDto.getEmail())) {
                throw new StudentAlreadyExistsException("Email " + updateDto.getEmail() + " is already in use");
            }
            student.setEmail(updateDto.getEmail());
        }

        if (updateDto.getFirstName() != null) student.setFirstName(updateDto.getFirstName());
        if (updateDto.getLastName() != null) student.setLastName(updateDto.getLastName());
        if (updateDto.getPhone() != null) student.setPhone(updateDto.getPhone());
        if (updateDto.getCareer() != null) student.setCareer(updateDto.getCareer());
        if (updateDto.getAcademicCycle() != null) student.setAcademicCycle(updateDto.getAcademicCycle());
        if (updateDto.getActive() != null) student.setActive(updateDto.getActive());

        student.setUpdatedAt(LocalDateTime.now());

        Student updatedStudent = studentRepository.save(student);
        return mapToDto(updatedStudent);
    }

    // --------------------------
    // DELETE STUDENT
    // --------------------------
    @Transactional
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new StudentNotFoundException(id);
        }
        studentRepository.deleteById(id);
    }

    // --------------------------
    // ADD ROOM TO HISTORY
    // --------------------------
    @Transactional
    public void addRoomToHistory(Long studentId, Long roomId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException(studentId));

        if (student.getRoomHistory() == null) {
            student.setRoomHistory(new ArrayList<>());
        }

        if (!student.getRoomHistory().contains(roomId)) {
            student.getRoomHistory().add(roomId);
        }

        student.setUpdatedAt(LocalDateTime.now());
        studentRepository.save(student);
    }

    // --------------------------
    // TOGGLE ACTIVE (Activar/Desactivar)
    // --------------------------
    @Transactional
    public StudentDto toggleActive(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));

        // Cambiar el estado de "active" (si es true lo cambia a false, y viceversa)
        student.setActive(!student.getActive());

        // Actualizar la fecha de modificación
        student.setUpdatedAt(LocalDateTime.now());

        // Guardar el estudiante actualizado
        studentRepository.save(student);

        // Devolver el DTO actualizado
        return mapToDto(student);
    }

    // --------------------------
    // VALIDATE CREATE DTO
    // --------------------------
    private void validateCreateStudentDto(CreateStudentDto dto) {
        if (dto.getFirstName() == null || dto.getFirstName().trim().isEmpty()) {
            throw new InvalidStudentDataException("First name is required");
        }
        if (dto.getLastName() == null || dto.getLastName().trim().isEmpty()) {
            throw new InvalidStudentDataException("Last name is required");
        }
        if (dto.getEmail() == null || !dto.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new InvalidStudentDataException("Valid email is required");
        }
        if (dto.getStudentCode() == null || dto.getStudentCode().trim().isEmpty()) {
            throw new InvalidStudentDataException("Student code is required");
        }
        if (dto.getAcademicCycle() == null || dto.getAcademicCycle() < 1) {
            throw new InvalidStudentDataException("Valid academic cycle is required");
        }
    }

    // --------------------------
    // MAP ENTITY TO DTO
    // --------------------------
    private StudentDto mapToDto(Student student) {
        return new StudentDto(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getPhone(),
                student.getCareer(),
                student.getAcademicCycle(),
                student.getStudentCode(),
                student.getActive(),
                student.getCreatedAt(),
                student.getUpdatedAt(),
                student.getRoomHistory()
        );
    }
}
