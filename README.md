# picpay-rh-api
# RH PicPay, Sistema de Gestao de Candidatos

Sistema web completo desenvolvido para auxiliar o setor de Recursos Humanos do PicPay no gerenciamento de candidatos durante processos seletivos. O projeto integra uma API REST desenvolvida em Java com Spring Boot a uma interface visual dinamica e responsiva construida com HTML5, CSS3 e JavaScript.

## Funcionalidades

* Cadastro de Candidatos: Formulario intuitivo para registro de novos participantes com validacao de campos obrigatorios.
* Listagem Geral e Consulta por ID: Visualizacao organizada em tabela e busca individualizada.
* Edicao Completa (PUT): Atualizacao de todos os dados cadastrais do candidato.
* Atualizacao Parcial (PATCH): Alteracao pontual de atributos especificos, como status, cargo ou salario.
* Remocao de Candidatos (DELETE): Exclusao de registros da lista em memoria.
* Filtros Dinamicos: Busca rapida em tempo real filtrando por nome, cargo ou status.
* Painel de Indicadores: Cards informativos com contagem em tempo real (Total, Em Analise, Aprovados, Reprovados e Contratados).

## Tecnologias Utilizadas

### Back end
* Java 19
* Spring Boot (Spring Web / Spring MVC)
* Armazenamento em memoria: ArrayList<Funcionario>
* Maven (Gerenciador de dependencias e build)

### Front end
* HTML5
* CSS3
* JavaScript (Vanilla / Fetch API)
* Bootstrap (Componentes visuais e modais)

## Endpoints da API

A API segue os padroes REST utilizando os cinco metodos HTTP principais:

| Metodo | Endpoint | Descricao |
| :--- | :--- | :--- |
| POST | /funcionarios | Cadastra um novo candidato na lista |
| GET | /funcionarios | Retorna todos os candidatos cadastrados |
| GET | /funcionarios/{id} | Busca os dados de um candidato especifico pelo ID |
| PUT | /funcionarios/{id} | Atualiza todos os dados do candidato |
| PATCH | /funcionarios/{id} | Atualiza parcialmente os dados do candidato |
| DELETE | /funcionarios/{id} | Remove o candidato da lista |
