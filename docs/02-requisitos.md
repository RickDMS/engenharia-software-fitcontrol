# Especificação de Requisitos

# FitControl - Sistema de Gestão para Academias

## 1. Introdução

Este documento apresenta os requisitos funcionais e não funcionais do sistema FitControl, responsável pelo gerenciamento de academias, contemplando processos de cadastro, controle financeiro, acompanhamento dos alunos, gestão de treinos e controle de acesso.

---

# 2. Requisitos Funcionais

## RF01 – Cadastrar Aluno

O sistema deve permitir o cadastro de novos alunos contendo:

- Nome completo;
- CPF;
- Data de nascimento;
- Telefone;
- E-mail;
- Endereço.

---

## RF02 – Consultar Aluno

O sistema deve permitir a consulta dos dados cadastrais dos alunos.

---

## RF03 – Atualizar Cadastro de Aluno

O sistema deve permitir alterar informações cadastrais dos alunos.

---

## RF04 – Inativar Aluno

O sistema deve permitir a inativação de alunos sem excluir seu histórico.

---

## RF05 – Cadastrar Professor

O sistema deve permitir o cadastro de professores contendo:

- Nome;
- CPF;
- CREF;
- Especialidade;
- Telefone;
- E-mail.

---

## RF06 – Consultar Professor

O sistema deve permitir consultar informações dos professores.

---

## RF07 – Cadastrar Plano

O sistema deve permitir criar planos de academia contendo:

- Nome;
- Valor;
- Duração;
- Benefícios.

---

## RF08 – Atualizar Plano

O sistema deve permitir a alteração das informações dos planos.

---

## RF09 – Realizar Matrícula

O sistema deve permitir vincular um aluno a um plano.

---

## RF10 – Gerar Mensalidades

O sistema deve gerar automaticamente as cobranças referentes aos planos contratados.

---

## RF11 – Registrar Pagamento

O sistema deve permitir registrar pagamentos realizados pelos alunos.

---

## RF12 – Consultar Histórico Financeiro

O sistema deve permitir visualizar o histórico de pagamentos de cada aluno.

---

## RF13 – Identificar Inadimplência

O sistema deve identificar alunos com pagamentos vencidos.

---

## RF14 – Bloquear Acesso por Inadimplência

O sistema deve impedir a entrada de alunos inadimplentes.

---

## RF15 – Liberar Acesso

O sistema deve liberar a entrada de alunos adimplentes.

---

## RF16 – Registrar Acesso

O sistema deve registrar data e hora de entrada dos alunos.

---

## RF17 – Criar Ficha de Treino

O professor deve ser capaz de criar fichas de treino para os alunos.

---

## RF18 – Atualizar Ficha de Treino

O professor deve poder modificar treinos existentes.

---

## RF19 – Consultar Ficha de Treino

O aluno deverá visualizar sua ficha de treino.

---

## RF20 – Registrar Avaliação Física

O professor deverá registrar avaliações físicas dos alunos.

---

## RF21 – Consultar Avaliações Físicas

O sistema deverá permitir a consulta das avaliações registradas.

---

## RF22 – Emitir Relatório de Alunos

O gerente deverá visualizar relatórios contendo informações dos alunos.

---

## RF23 – Emitir Relatório Financeiro

O sistema deverá gerar relatórios financeiros.

---

## RF24 – Emitir Relatório de Frequência

O sistema deverá gerar relatórios de acesso e frequência dos alunos.

---

## RF25 – Realizar Login

O sistema deverá autenticar usuários cadastrados.

---

## RF26 – Recuperar Senha

O sistema deverá permitir a recuperação de senha por e-mail.

---

# 3. Requisitos Não Funcionais

## RNF01 – Desempenho

O sistema deverá responder às solicitações em até 3 segundos.

---

## RNF02 – Disponibilidade

O sistema deverá estar disponível pelo menos 99% do tempo.

---

## RNF03 – Segurança

As senhas deverão ser armazenadas utilizando técnicas de criptografia.

---

## RNF04 – Controle de Acesso

O sistema deverá possuir diferentes níveis de acesso conforme o perfil do usuário.

---

## RNF05 – Confiabilidade

Todas as transações deverão ser registradas em logs.

---

## RNF06 – Backup

O sistema deverá realizar backup diário das informações.

---

## RNF07 – Usabilidade

A interface deverá ser intuitiva e de fácil utilização.

---

## RNF08 – Compatibilidade

O sistema deverá funcionar nos principais navegadores modernos:

- Google Chrome;
- Microsoft Edge;
- Mozilla Firefox.

---

## RNF09 – Responsividade

O sistema deverá adaptar-se a computadores, tablets e smartphones.

---

## RNF10 – Manutenibilidade

O código deverá seguir arquitetura em camadas para facilitar futuras manutenções.

---

# 4. Matriz de Priorização dos Requisitos

| ID | Requisito | Prioridade |
|------|------|------|
| RF01 | Cadastrar Aluno | Alta |
| RF07 | Cadastrar Plano | Alta |
| RF09 | Realizar Matrícula | Alta |
| RF11 | Registrar Pagamento | Alta |
| RF13 | Identificar Inadimplência | Alta |
| RF15 | Liberar Acesso | Alta |
| RF17 | Criar Ficha de Treino | Alta |
| RF20 | Registrar Avaliação Física | Média |
| RF22 | Relatórios de Alunos | Média |
| RF23 | Relatórios Financeiros | Média |
| RF24 | Relatórios de Frequência | Média |
| RF26 | Recuperar Senha | Baixa |

---

# 5. Critérios de Aceitação

## Cadastro de Aluno

Dado que o recepcionista esteja autenticado,
quando preencher todos os campos obrigatórios,
então o sistema deverá salvar o cadastro com sucesso.

---

## Registro de Pagamento

Dado que exista uma mensalidade pendente,
quando o pagamento for registrado,
então o status deverá ser alterado para pago.

---

## Liberação de Acesso

Dado que o aluno esteja adimplente,
quando realizar a identificação na catraca,
então o acesso deverá ser liberado.

---

## Bloqueio por Inadimplência

Dado que o aluno possua mensalidades vencidas,
quando tentar acessar a academia,
então o sistema deverá bloquear a entrada.

---

## Criação de Treino

Dado que o professor esteja autenticado,
quando cadastrar uma ficha de treino,
então ela deverá ficar disponível para consulta pelo aluno.