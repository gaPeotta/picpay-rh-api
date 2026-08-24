package com.picpay.rh.controller;

import com.picpay.rh.model.Funcionario;
import com.picpay.rh.service.FuncionarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin(origins = "*")
public class FuncionarioController {

    private final FuncionarioService service;

    public FuncionarioController(FuncionarioService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Funcionario funcionario) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(service.salvar(funcionario));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Funcionario> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Optional<Funcionario> func = service.buscarPorId(id);
        if (func.isPresent()) {
            return ResponseEntity.ok(func.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionario nao encontrado");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarCompleto(@PathVariable Long id, @RequestBody Funcionario funcionario) {
        try {
            return ResponseEntity.ok(service.atualizarCompleto(id, funcionario));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> atualizarParcial(@PathVariable Long id, @RequestBody Funcionario funcionario) {
        try {
            return ResponseEntity.ok(service.atualizarParcial(id, funcionario));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletar(@PathVariable Long id) {
        if (service.deletar(id)) {
            return ResponseEntity.ok("Excluido com sucesso");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionario nao encontrado");
    }
}