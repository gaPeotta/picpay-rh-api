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

## Arquitetura do Sistema

O projeto segue o padrao arquitetural em camadas (Layered Architecture), separando claramente as responsabilidades entre a interface visual, o controle de rotas, as regras de negocio e o armazenamento de dados.

+-------------------------------------------------------------+
|                        FRONT END                            |
|  HTML5 + CSS3 (Bootstrap) + JavaScript (Fetch API)          |
+------------------------------+------------------------------+
                               |
                     Requisicoes HTTP (JSON)
                [POST, GET, PUT, PATCH, DELETE]
                               v
+-------------------------------------------------------------+
|                   BACK END (Spring Boot)                    |
|                                                             |
|  [ Camada Controller ]  FuncionarioController               |
|  Recebe as rotas REST, processa o payload e retorna status  |
|                                                             |
|  [ Camada Service ]     FuncionarioService                  |
|  Executa regras de negocio, validacoes e manipulacao        |
|                                                             |
|  [ Camada Model ]       Funcionario / StatusCandidato       |
|  Define as entidades e os enums do dominio                  |
+------------------------------+------------------------------+
                               |
                     Manipulacao em Memoria
                               v
+-------------------------------------------------------------+
|                    PERSISTENCIA TEMPORARIA                  |
|  ArrayList<Funcionario> (Memoria RAM)                       |
+-------------------------------------------------------------+
