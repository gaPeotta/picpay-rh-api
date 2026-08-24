const API_URL = 'http://localhost:8080/funcionarios';
let listaOriginal = [];
const modal = new bootstrap.Modal(document.getElementById('modalFuncionario'));

async function carregarDados() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha ao carregar API');
        listaOriginal = await response.json();
        renderizarTabela(listaOriginal);
        atualizarIndicadores(listaOriginal);
    } catch (error) {
        mostrarAlerta('Erro ao conectar com o servidor.', 'danger');
    }
}

function renderizarTabela(dados) {
    const tbody = document.getElementById('tabela-corpo');
    tbody.innerHTML = dados.map(f => `
        <tr>
            <td>${f.nome}</td>
            <td>${f.email}</td>
            <td>${f.cargo}</td>
            <td><span class="badge ${getBadgeClass(f.status)}">${f.status.replace('_', ' ')}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editar(${f.id})">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir(${f.id})">Excluir</button>
            </td>
        </tr>
    `).join('');
}

function atualizarIndicadores(dados) {
    document.getElementById('ind-total').innerText = dados.length;
    document.getElementById('ind-analise').innerText = dados.filter(d => d.status === 'EM_ANALISE').length;
    document.getElementById('ind-aprovados').innerText = dados.filter(d => d.status === 'APROVADO').length;
    document.getElementById('ind-reprovados').innerText = dados.filter(d => d.status === 'REPROVADO').length;
    document.getElementById('ind-contratados').innerText = dados.filter(d => d.status === 'CONTRATADO').length;
}

function filtrarTabela() {
    const texto = document.getElementById('busca-texto').value.toLowerCase();
    const status = document.getElementById('busca-status').value;
    const filtrados = listaOriginal.filter(f => {
        const bateTexto = f.nome.toLowerCase().includes(texto) || f.cargo.toLowerCase().includes(texto);
        const bateStatus = status ? f.status === status : true;
        return bateTexto && bateStatus;
    });
    renderizarTabela(filtrados);
}

document.getElementById('form-funcionario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('func-id').value;
    
    const payload = {
        nome: document.getElementById('func-nome').value,
        email: document.getElementById('func-email').value,
        telefone: document.getElementById('func-telefone').value,
        cargo: document.getElementById('func-cargo').value,
        departamento: document.getElementById('func-departamento').value,
        salario: parseFloat(document.getElementById('func-salario').value) || 0,
        cidade: document.getElementById('func-cidade').value,
        status: document.getElementById('func-status').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const res = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error();
        modal.hide();
        mostrarAlerta(id ? 'Atualizado com sucesso!' : 'Cadastrado com sucesso!', 'success');
        carregarDados();
    } catch (e) {
        mostrarAlerta('Erro ao salvar candidato.', 'danger');
    }
});

async function excluir(id) {
    if (!confirm('Deseja excluir este candidato?')) return;
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        mostrarAlerta('Excluído com sucesso.', 'success');
        carregarDados();
    } catch (e) {
        mostrarAlerta('Erro ao excluir.', 'danger');
    }
}

function editar(id) {
    const func = listaOriginal.find(f => f.id === id);
    if (!func) return;
    document.getElementById('func-id').value = func.id;
    document.getElementById('func-nome').value = func.nome;
    document.getElementById('func-email').value = func.email;
    document.getElementById('func-telefone').value = func.telefone;
    document.getElementById('func-cargo').value = func.cargo;
    document.getElementById('func-departamento').value = func.departamento;
    document.getElementById('func-salario').value = func.salario;
    document.getElementById('func-cidade').value = func.cidade;
    document.getElementById('func-status').value = func.status;
    document.getElementById('modalTitulo').innerText = 'Editar Candidato';
    modal.show();
}

function abrirModal() {
    document.getElementById('form-funcionario').reset();
    document.getElementById('func-id').value = '';
    document.getElementById('modalTitulo').innerText = 'Novo Candidato';
    modal.show();
}

function mostrarAlerta(msg, tipo) {
    const box = document.getElementById('alerta-container');
    box.innerHTML = `<div class="alert alert-${tipo} alert-dismissible fade show">${msg}<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>`;
    setTimeout(() => box.innerHTML = '', 3500);
}

function getBadgeClass(status) {
    if (status === 'EM_ANALISE') return 'badge-analise';
    if (status === 'APROVADO') return 'badge-aprovado';
    if (status === 'REPROVADO') return 'badge-reprovado';
    return 'badge-contratado';
}

// Inicia aplicação
carregarDados();