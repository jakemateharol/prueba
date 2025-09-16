package pe.edu.upeu.mscursoservice.Respository;


import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.mscursoservice.Entity.Curso;

public interface CursoRepository extends JpaRepository<Curso,Integer> {
}
