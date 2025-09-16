package pe.edu.upeu.mscursoservice.Service;



import pe.edu.upeu.mscursoservice.Entity.Curso;

import java.util.List;
import java.util.Optional;

public interface CursoService {
    List<Curso> listar();
    Optional<Curso> buscarPorId(Integer id);
    Curso guardar(Curso curso);
    Curso actualizar(Curso curso);
    void borrarPorId(Integer id);
}
