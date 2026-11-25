# FitControl · Protótipo de interface (HTML, CSS e JavaScript)

Abra `index.html` no navegador. Não precisa de servidor nem instalação.

## Telas
- `index.html`: login e recuperar senha (RF25, RF26)
- `cadastrar-aluno.html`: cadastro de aluno com validação de CPF e CPF único (RF01, HU05)
- `registrar-pagamento.html`: busca de aluno e registro de pagamento (RF11, UC03)
- `dashboard.html`: visão do gerente com alunos ativos/inativos, faturamento e inadimplentes (RF22 a RF24)
- `meu-treino.html`: ficha de treino do aluno, em layout de celular (RF19, HU01)
- `catraca.html`: simulação de acesso liberado ou bloqueado por inadimplência (RF14 a RF16)

## Observações
- Os dados ficam no `localStorage` do navegador e começam com alunos de exemplo. Para voltar ao estado inicial, rode `fitcontrolReset()` no console.
- O login é simulado: qualquer e-mail válido e senha entram, e o perfil escolhido define a tela inicial.
- Telas do Professor ainda não foram feitas.
