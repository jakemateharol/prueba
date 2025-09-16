package pe.edu.upeu.mscursoservice.Service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upeu.mscursoservice.Entity.Curso;
import pe.edu.upeu.mscursoservice.Respository.CursoRepository;
import pe.edu.upeu.mscursoservice.Service.CursoService;

import java.util.List;
import java.util.Optional;

@Service
public class CursoServiceImpl implements CursoService {
    @Autowired
    private CursoRepository cursoRepository;
    @Override
    public List<Curso> listar() {
        return cursoRepository.findAll();
    }

    @Override
    public Optional<Curso> buscarPorId(Integer id) {
        return cursoRepository.findById(id);
    }

    @Override
    public Curso guardar(Curso categoria) {
        return cursoRepository.save(categoria);
    }

    @Override
    public Curso actualizar(Curso categoria) {
        return cursoRepository.save(categoria);
    }

    @Override
    public void borrarPorId(Integer id) {
        cursoRepository.deleteById(id);
    }
}
