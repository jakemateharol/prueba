package pe.edu.upeu.mscursoservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.mscursoservice.Entity.Curso;
import pe.edu.upeu.mscursoservice.Service.CursoService;

import java.util.List;

@RestController
@RequestMapping("/curso")
public class CursoController {
    @Autowired
    CursoService cursoService;

    @GetMapping
    public List<Curso> listar() {
        return cursoService.listar();
    }

    @GetMapping("/{id}")
    public Curso buscarPorId(@PathVariable Integer id) {
        return cursoService.buscarPorId(id).get();
    }

    @PostMapping
    public Curso guardar(Curso curso) {
        return cursoService.guardar(curso);
    }

    @PutMapping
    public Curso actualizar(Curso curso) {
        return cursoService.actualizar(curso);
    }

    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable Integer id) {
        cursoService.borrarPorId(id);
        return "Categoria eliminada";
    }
}
