package pe.edu.upeu.msmatriculaservice.Respository;


import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.upeu.msmatriculaservice.Entity.Matricula;

public interface MatriculaRepository extends JpaRepository<Matricula, Integer> {
}
