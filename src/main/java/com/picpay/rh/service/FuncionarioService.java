package com.picpay.rh.service;

import com.picpay.rh.model.Funcionario;
import com.picpay.rh.model.StatusCandidato;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {
    private final List<Funcionario> funcionarios = new ArrayList<>();
    private Long contadorId = 1L;

    @PostConstruct
    public void popularDadosIniciais() {
        funcionarios.add(new Funcionario(gerarId(), "Gabriel", "gabriel@email.com", "11999999999", "Desenvolvedor", "TI", 4000.0, "São Paulo", StatusCandidato.EM_ANALISE));
    }

    private Long gerarId() {
        return contadorId++;
    }

    public List<Funcionario> listarTodos() {
        return funcionarios;
    }

    public Optional<Funcionario> buscarPorId(Long id) {
        return funcionarios.stream().filter(f -> f.getId().equals(id)).findFirst();
    }

    public Funcionario salvar(Funcionario func) {
        if (func.getNome() == null || func.getEmail() == null || func.getCargo() == null) {
            throw new IllegalArgumentException("Nome, email e cargo sao obrigatorios.");
        }
        func.setId(gerarId());
        if (func.getStatus() == null) {
            func.setStatus(StatusCandidato.EM_ANALISE);
        }
        funcionarios.add(func);
        return func;
    }

    public Funcionario atualizarCompleto(Long id, Funcionario atualizado) {
        Funcionario existente = buscarPorId(id).orElseThrow(() -> new RuntimeException("Funcionario nao encontrado"));
        existente.setNome(atualizado.getNome());
        existente.setEmail(atualizado.getEmail());
        existente.setTelefone(atualizado.getTelefone());
        existente.setCargo(atualizado.getCargo());
        existente.setDepartamento(atualizado.getDepartamento());
        existente.setSalario(atualizado.getSalario());
        existente.setCidade(atualizado.getCidade());
        existente.setStatus(atualizado.getStatus());
        return existente;
    }

    public Funcionario atualizarParcial(Long id, Funcionario parciais) {
        Funcionario existente = buscarPorId(id).orElseThrow(() -> new RuntimeException("Funcionario nao encontrado"));
        if (parciais.getCargo() != null) existente.setCargo(parciais.getCargo());
        if (parciais.getStatus() != null) existente.setStatus(parciais.getStatus());
        if (parciais.getSalario() != null) existente.setSalario(parciais.getSalario());
        return existente;
    }

    public boolean deletar(Long id) {
        return funcionarios.removeIf(f -> f.getId().equals(id));
    }
}