# Histórias de Usuário

# FitControl - Sistema de Gestão para Academias

## Introdução

As histórias de usuário descrevem as necessidades dos usuários do sistema FitControl sob a perspectiva de cada perfil de utilização, permitindo compreender os objetivos e expectativas relacionados às funcionalidades do sistema.

---

# 1. Histórias do Aluno

## HU01 – Consultar Treino

**Como** aluno  
**Quero** visualizar minha ficha de treino  
**Para que** eu possa realizar os exercícios corretamente durante meus treinos.

### Critério de Aceitação

- O aluno deve acessar sua área autenticada.
- O sistema deve exibir os exercícios cadastrados.
- O sistema deve apresentar séries, repetições e observações.

---

## HU02 – Consultar Situação Financeira

**Como** aluno  
**Quero** visualizar minhas mensalidades  
**Para que** eu possa acompanhar pagamentos pendentes e realizados.

### Critério de Aceitação

- O sistema deve mostrar parcelas pagas.
- O sistema deve mostrar parcelas em aberto.
- O sistema deve indicar vencimentos futuros.

---

## HU03 – Consultar Avaliações Físicas

**Como** aluno  
**Quero** visualizar minhas avaliações físicas  
**Para que** eu possa acompanhar minha evolução.

### Critério de Aceitação

- O sistema deve apresentar todas as avaliações registradas.
- O sistema deve exibir data e métricas registradas.

---

## HU04 – Atualizar Informações Pessoais

**Como** aluno  
**Quero** atualizar meus dados de contato  
**Para que** minhas informações permaneçam corretas no sistema.

### Critério de Aceitação

- O sistema deve permitir edição de telefone e e-mail.
- Os dados devem ser validados antes de serem salvos.

---

# 2. Histórias da Recepção

## HU05 – Cadastrar Aluno

**Como** recepcionista  
**Quero** cadastrar novos alunos  
**Para que** eles possam utilizar os serviços da academia.

### Critério de Aceitação

- Todos os campos obrigatórios devem ser preenchidos.
- O CPF não poderá estar duplicado.

---

## HU06 – Realizar Matrícula

**Como** recepcionista  
**Quero** associar um plano a um aluno  
**Para que** sua matrícula seja ativada.

### Critério de Aceitação

- O plano deve estar ativo.
- A matrícula deve possuir data de início e fim.

---

## HU07 – Registrar Pagamento

**Como** recepcionista  
**Quero** registrar pagamentos realizados pelos alunos  
**Para que** suas mensalidades sejam regularizadas.

### Critério de Aceitação

- O sistema deve alterar o status para pago.
- O histórico financeiro deve ser atualizado.

---

## HU08 – Consultar Inadimplência

**Como** recepcionista  
**Quero** identificar alunos inadimplentes  
**Para que** eu possa realizar cobranças e regularizações.

### Critério de Aceitação

- O sistema deve listar alunos com pagamentos vencidos.
- O sistema deve indicar quantidade de parcelas em atraso.

---

# 3. Histórias do Professor

## HU09 – Criar Ficha de Treino

**Como** professor  
**Quero** cadastrar uma ficha de treino  
**Para que** o aluno tenha orientações adequadas de exercícios.

### Critério de Aceitação

- Deve ser possível adicionar exercícios.
- Deve ser possível definir séries e repetições.

---

## HU10 – Atualizar Treino

**Como** professor  
**Quero** modificar fichas existentes  
**Para que** os treinos permaneçam adequados aos objetivos dos alunos.

### Critério de Aceitação

- O sistema deve registrar a última atualização.
- O histórico deve permanecer disponível.

---

## HU11 – Registrar Avaliação Física

**Como** professor  
**Quero** registrar avaliações físicas  
**Para que** seja possível acompanhar a evolução do aluno.

### Critério de Aceitação

- O sistema deve permitir informar peso e altura.
- O sistema deve armazenar a data da avaliação.

---

## HU12 – Consultar Histórico de Evolução

**Como** professor  
**Quero** visualizar avaliações anteriores  
**Para que** eu possa comparar resultados.

### Critério de Aceitação

- O sistema deve apresentar avaliações em ordem cronológica.

---

# 4. Histórias do Gerente

## HU13 – Consultar Quantidade de Alunos

**Como** gerente  
**Quero** visualizar o número total de alunos cadastrados  
**Para que** eu possa acompanhar o crescimento da academia.

### Critério de Aceitação

- O sistema deve apresentar total de alunos ativos.
- O sistema deve apresentar total de alunos inativos.

---

## HU14 – Consultar Relatório Financeiro

**Como** gerente  
**Quero** visualizar a receita da academia  
**Para que** eu possa avaliar o desempenho financeiro do negócio.

### Critério de Aceitação

- O sistema deve apresentar o faturamento mensal.
- O sistema deve apresentar pagamentos pendentes.

---

## HU15 – Consultar Frequência

**Como** gerente  
**Quero** visualizar relatórios de frequência  
**Para que** eu possa analisar a utilização da academia.

### Critério de Aceitação

- O sistema deve exibir acessos por período.
- O sistema deve permitir filtros por aluno.

---

## HU16 – Gerenciar Planos

**Como** gerente  
**Quero** cadastrar e atualizar planos  
**Para que** a academia possa oferecer diferentes opções aos alunos.

### Critério de Aceitação

- O sistema deve permitir cadastro, alteração e consulta de planos.

---

# 5. Histórias do Sistema de Controle de Acesso

## HU17 – Validar Situação Financeira

**Como** sistema de catraca  
**Quero** verificar a situação financeira do aluno  
**Para que** apenas alunos regulares possam acessar a academia.

### Critério de Aceitação

- O sistema deve consultar pagamentos pendentes.
- O sistema deve retornar situação adimplente ou inadimplente.

---

## HU18 – Liberar Entrada

**Como** sistema de catraca  
**Quero** liberar automaticamente o acesso  
**Para que** alunos adimplentes tenham acesso às instalações.

### Critério de Aceitação

- A catraca deve ser liberada automaticamente.

---

## HU19 – Bloquear Entrada

**Como** sistema de catraca  
**Quero** bloquear alunos inadimplentes  
**Para que** seja cumprida a política financeira da academia.

### Critério de Aceitação

- O sistema deve impedir a abertura da catraca.
- O sistema deve informar o motivo do bloqueio.

---

# Resumo das Histórias

| Ator | Quantidade |
|--------|--------|
| Aluno | 4 |
| Recepcionista | 4 |
| Professor | 4 |
| Gerente | 4 |
| Sistema de Catraca | 3 |
| **Total** | **19 Histórias de Usuário** |