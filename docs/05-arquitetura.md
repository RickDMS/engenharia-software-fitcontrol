# Arquitetura do Sistema

# FitControl - Sistema de Gestão para Academias

## 1. Objetivo

Este documento descreve a arquitetura proposta para o sistema FitControl, apresentando os componentes principais, suas responsabilidades e a comunicação entre eles.

A arquitetura foi projetada para garantir:

- Organização do código;
- Facilidade de manutenção;
- Escalabilidade;
- Segurança das informações;
- Separação de responsabilidades.

---

# 2. Arquitetura Adotada

O sistema utilizará uma arquitetura em três camadas (Three-Tier Architecture).

```text
┌─────────────────────┐
│      Frontend       │
│       React         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Backend        │
│   Spring Boot API   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Banco de Dados   │
│       MySQL         │
└─────────────────────┘
```

---

# 3. Camadas da Arquitetura

## 3.1 Camada de Apresentação (Frontend)

Responsável pela interação com os usuários.

### Principais funcionalidades

- Login do sistema;
- Cadastro de alunos;
- Gestão de planos;
- Controle de pagamentos;
- Gestão de treinos;
- Visualização de relatórios.

### Tecnologia

- React

### Responsabilidades

- Exibir informações;
- Receber dados dos usuários;
- Enviar requisições ao backend;
- Validação inicial de formulários.

---

## 3.2 Camada de Negócio (Backend)

Responsável por processar as regras de negócio da academia.

### Tecnologia

- Java Spring Boot

### Responsabilidades

- Autenticação de usuários;
- Controle financeiro;
- Gestão de alunos;
- Gestão de planos;
- Controle de acesso;
- Emissão de relatórios;
- Regras de validação.

### Exemplos de regras

- Aluno inadimplente não pode acessar a academia;
- CPF não pode ser duplicado;
- Matrículas devem possuir plano ativo;
- Apenas professores podem criar treinos.

---

## 3.3 Camada de Persistência (Banco de Dados)

Responsável pelo armazenamento das informações.

### Tecnologia

- MySQL

### Responsabilidades

- Armazenamento de dados;
- Integridade referencial;
- Consultas e relatórios;
- Histórico de movimentações.

### Principais entidades

- Aluno
- Professor
- Plano
- Matrícula
- Pagamento
- Treino
- Exercício
- Avaliação Física

---

# 4. Arquitetura de Software

## Organização em Camadas

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

---

## Controller

Recebe as requisições do sistema.

Exemplos:

- AlunoController
- PagamentoController
- TreinoController
- RelatorioController

---

## Service

Responsável pelas regras de negócio.

Exemplos:

- AlunoService
- PagamentoService
- TreinoService

---

## Repository

Responsável pelo acesso aos dados.

Exemplos:

- AlunoRepository
- PagamentoRepository
- TreinoRepository

---

## Database

Responsável pelo armazenamento das informações.

---

# 5. Arquitetura Física

```text
Usuário
   │
   ▼
Navegador Web
   │
   ▼
Servidor Web
   │
   ▼
API Spring Boot
   │
   ▼
Banco de Dados MySQL
```

---

# 6. Segurança

O sistema adotará mecanismos de segurança para proteger as informações dos usuários.

## Autenticação

- Login por e-mail e senha.

## Autorização

Perfis existentes:

- Administrador
- Gerente
- Recepcionista
- Professor
- Aluno

Cada perfil terá permissões específicas.

---

## Criptografia

- Senhas armazenadas de forma criptografada.
- Comunicação segura utilizando HTTPS.

---

# 7. Integração com a Catraca

O sistema deverá permitir integração com o equipamento de controle de acesso.

Fluxo:

```text
Aluno
  ↓
Catraca
  ↓
API FitControl
  ↓
Banco de Dados
```

### Processo

1. Aluno realiza identificação.
2. Sistema consulta matrícula.
3. Sistema verifica pagamentos.
4. Sistema retorna autorização.
5. Catraca libera ou bloqueia a entrada.

---

# 8. Escalabilidade

A arquitetura foi projetada para permitir crescimento futuro.

Possíveis expansões:

- Aplicativo mobile;
- Integração com pagamentos online;
- Integração com reconhecimento facial;
- Controle de acesso por QR Code;
- Área do aluno via aplicativo.

---

# 9. Tecnologias Utilizadas

| Camada | Tecnologia |
|----------|----------|
| Frontend | React |
| Backend | Java Spring Boot |
| Banco de Dados | MySQL |
| Versionamento | GitHub |
| Modelagem UML | Draw.io |
| Prototipação | Figma |
| Planejamento | Trello |

---

# 10. Benefícios da Arquitetura Proposta

A arquitetura escolhida proporciona:

- Separação clara de responsabilidades;
- Facilidade de manutenção;
- Maior organização do projeto;
- Segurança dos dados;
- Possibilidade de crescimento futuro;
- Baixo acoplamento entre componentes.

---

# 11. Conclusão

A arquitetura do FitControl foi definida seguindo boas práticas de Engenharia de Software e padrões modernos de desenvolvimento web.

Sua estrutura em camadas permite atender aos requisitos funcionais e não funcionais do sistema, garantindo controle eficiente das operações da academia, facilidade de evolução do software e qualidade na manutenção futura.