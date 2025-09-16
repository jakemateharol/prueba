package pe.edu.upeu.msmatriculaservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.msmatriculaservice.Entity.Matricula;
import pe.edu.upeu.msmatriculaservice.Service.MatriculaService;

import java.util.List;

@RestController
@RequestMapping("/matricula")
public class MatriculaController {
    @Autowired
    MatriculaService matriculaService;

    @GetMapping
    public List<Matricula> listar() {
        return matriculaService.listar();
    }

    @GetMapping("/{id}")
    public Matricula buscarPorId(@PathVariable Integer id) {
        return matriculaService.buscarPorId(id).get();
    }

    @PostMapping
    public Matricula guardar(Matricula matricula) {
        return matriculaService.guardar(matricula);
    }

    @PutMapping
    public Matricula actualizar(Matricula matricula) {
        return matriculaService.actualizar(matricula);
    }

    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable Integer id) {
        matriculaService.borrarPorId(id);
        return "Categoria eliminada";
    }
}
