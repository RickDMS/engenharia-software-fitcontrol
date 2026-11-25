# Casos de Uso

# FitControl - Sistema de Gestão para Academias

## 1. Introdução

Este documento descreve os principais casos de uso do sistema FitControl, detalhando as interações entre os usuários e o sistema para atender às necessidades da academia.

---

# 2. Atores do Sistema

## Aluno

Responsável por consultar informações relacionadas aos seus treinos, avaliações e situação financeira.

## Recepcionista

Responsável pelo cadastro de alunos, matrículas e registro de pagamentos.

## Professor

Responsável pela gestão dos treinos e avaliações físicas.

## Gerente

Responsável pelo acompanhamento operacional e financeiro da academia.

## Sistema de Catraca

Responsável pela validação automática de acesso dos alunos.

---

# UC01 – Cadastrar Aluno

## Objetivo

Permitir o cadastro de novos alunos no sistema.

## Ator Principal

Recepcionista

## Pré-condições

- Recepcionista autenticado.
- CPF não cadastrado.

## Fluxo Principal

1. Recepcionista acessa a opção "Cadastrar Aluno".
2. Sistema apresenta formulário.
3. Recepcionista preenche os dados.
4. Sistema valida as informações.
5. Sistema salva o cadastro.
6. Sistema confirma a operação.

## Fluxo Alternativo

### FA01

4. CPF já cadastrado.

5. Sistema informa o erro.

6. Cadastro não é realizado.

## Pós-condições

- Aluno cadastrado com sucesso.

---

# UC02 – Realizar Matrícula

## Objetivo

Associar um aluno a um plano de academia.

## Ator Principal

Recepcionista

## Pré-condições

- Aluno cadastrado.
- Plano ativo.

## Fluxo Principal

1. Selecionar aluno.
2. Selecionar plano.
3. Informar data de início.
4. Sistema gera matrícula.
5. Sistema registra a contratação.

## Pós-condições

- Matrícula criada.

---

# UC03 – Registrar Pagamento

## Objetivo

Registrar pagamentos efetuados pelos alunos.

## Ator Principal

Recepcionista

## Fluxo Principal

1. Localizar aluno.
2. Consultar mensalidades pendentes.
3. Selecionar mensalidade.
4. Registrar pagamento.
5. Atualizar situação financeira.

## Pós-condições

- Mensalidade marcada como paga.

---

# UC04 – Consultar Situação Financeira

## Objetivo

Permitir a consulta do histórico financeiro.

## Ator Principal

Aluno

## Fluxo Principal

1. Aluno realiza login.
2. Acessa área financeira.
3. Sistema exibe pagamentos.
4. Sistema apresenta pendências.

## Pós-condições

- Histórico financeiro visualizado.

---

# UC05 – Criar Ficha de Treino

## Objetivo

Cadastrar treinos personalizados.

## Ator Principal

Professor

## Pré-condições

- Professor autenticado.
- Aluno cadastrado.

## Fluxo Principal

1. Selecionar aluno.
2. Informar objetivo do treino.
3. Inserir exercícios.
4. Definir séries e repetições.
5. Salvar treino.

## Pós-condições

- Ficha de treino criada.

---

# UC06 – Atualizar Ficha de Treino

## Objetivo

Modificar um treino existente.

## Ator Principal

Professor

## Fluxo Principal

1. Selecionar treino.
2. Alterar exercícios.
3. Salvar alterações.

## Pós-condições

- Treino atualizado.

---

# UC07 – Registrar Avaliação Física

## Objetivo

Registrar evolução física do aluno.

## Ator Principal

Professor

## Fluxo Principal

1. Selecionar aluno.
2. Informar dados da avaliação.
3. Registrar peso.
4. Registrar altura.
5. Registrar percentual de gordura.
6. Salvar avaliação.

## Pós-condições

- Avaliação armazenada.

---

# UC08 – Consultar Treino

## Objetivo

Permitir que o aluno visualize sua ficha.

## Ator Principal

Aluno

## Fluxo Principal

1. Realizar login.
2. Acessar menu Treinos.
3. Sistema apresenta ficha completa.

## Pós-condições

- Treino visualizado.

---

# UC09 – Liberar Acesso

## Objetivo

Controlar a entrada na academia.

## Ator Principal

Sistema de Catraca

## Pré-condições

- Aluno identificado.

## Fluxo Principal

1. Aluno aproxima identificação.
2. Sistema consulta matrícula.
3. Sistema consulta pagamentos.
4. Sistema verifica situação.
5. Sistema libera a catraca.

## Pós-condições

- Entrada registrada.

---

# UC10 – Bloquear Acesso por Inadimplência

## Objetivo

Impedir o acesso de alunos inadimplentes.

## Ator Principal

Sistema de Catraca

## Fluxo Principal

1. Aluno aproxima identificação.
2. Sistema verifica situação financeira.
3. Sistema identifica débitos pendentes.
4. Sistema bloqueia acesso.
5. Sistema exibe mensagem informativa.

## Pós-condições

- Entrada bloqueada.

---

# UC11 – Emitir Relatório Financeiro

## Objetivo

Gerar indicadores financeiros da academia.

## Ator Principal

Gerente

## Fluxo Principal

1. Acessar relatórios.
2. Selecionar período.
3. Sistema gera relatório financeiro.
4. Sistema apresenta resultados.

## Pós-condições

- Relatório disponível.

---

# UC12 – Emitir Relatório de Frequência

## Objetivo

Gerar relatório de utilização da academia.

## Ator Principal

Gerente

## Fluxo Principal

1. Selecionar período.
2. Consultar acessos.
3. Sistema gera relatório.
4. Sistema apresenta estatísticas.

## Pós-condições

- Relatório emitido.

---

# Resumo dos Casos de Uso

| Código | Caso de Uso | Ator |
|----------|----------|----------|
| UC01 | Cadastrar Aluno | Recepcionista |
| UC02 | Realizar Matrícula | Recepcionista |
| UC03 | Registrar Pagamento | Recepcionista |
| UC04 | Consultar Situação Financeira | Aluno |
| UC05 | Criar Ficha de Treino | Professor |
| UC06 | Atualizar Ficha de Treino | Professor |
| UC07 | Registrar Avaliação Física | Professor |
| UC08 | Consultar Treino | Aluno |
| UC09 | Liberar Acesso | Sistema de Catraca |
| UC10 | Bloquear Acesso | Sistema de Catraca |
| UC11 | Emitir Relatório Financeiro | Gerente |
| UC12 | Emitir Relatório de Frequência | Gerente |