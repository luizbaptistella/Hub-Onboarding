# FAM-09 · Buscar familiar

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-09` |
| Raia | Familiares · Inclusão e gestão de vínculos |
| Figma | sem node no Figma |
| Status | Só implementada (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 3 / 3 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Buscar quem já tem conta ativa (Caminho A) ou cadastrar um familiar sem conta (Caminho B).

## 2. Componentes

5 peças nesta tela: **5 instâncias de 5 componentes do DS** (`AppHeader`, `Button`, `LegalFooter`, `PageHeading`, `TextField`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Vincular familiar" language={false} help={false} />` | — | Forma atual: Edição (classe po-header-task). Navega para `area-familiares-vazio`. |
| 2 | `PageHeading` | `<PageHeading title="Buscar familiar" tone="neutral" spaced />` | — | — |
| 3 | `TextField` | `<TextField label="CPF ou e-mail" name="valor" placeholder="CPF ou e-mail" required autoComplete="off" />` | padrão; preenchido | — |
| 4 | `Button` | `<Button variant="primary" fullWidth type="submit">Buscar</Button>` | — | — |
| 5 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

Classes locais usadas na tela (fora do DS): `.area-form*`.

## 3. Campos e validações

| Campo | id | Controle |
|---|---|---|
| CPF ou e-mail | `busca-valor` | `text` · name=`valor` · autocomplete=`off` · obrigatório · placeholder "CPF ou e-mail" |

| Campo | Regra | Mensagem de erro |
|---|---|---|
| CPF | 11 dígitos com dígitos verificadores válidos; rejeita todos iguais. Máscara 000.000.000-00. | CPF inválido. Use o formato 000.000.000-00. |
| E-mail | nome@dominio.tld, com 2+ letras no final. | E-mail inválido. Use o formato nome@exemplo.com. |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [FAM-01 · Meus familiares · vazio](../FAM-01-meus-familiares-vazio/spec.md) |  |
| Buscar | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Inicial (botão Buscar desabilitado)
- Não encontrado
- Limite de consultas atingido

## 6. Comportamento

- Um único campo aceita CPF ou e-mail. Letras ou @ indicam e-mail; só dígitos indicam CPF.
- CPF só segue para a busca com dígitos verificadores válidos (validação local, antes de qualquer consulta).
- Conta ativa encontrada: abre FAM-10 com nome e CPF mascarados.
- Sem conta ativa: a resposta é a mesma para usuário inexistente e para conta inativa (anti-enumeração). Mostra o aviso e o botão Cadastrar novo familiar, que abre FAM-12.
- Limite de consultas por titular: 5 consultas; ao exceder, espera de 15 min. Depois, mais 5 consultas e espera de 30 min. O aviso mostra o tempo de espera (retry_after). Depois da segunda espera de 30 min, a busca fica bloqueada; o aviso orienta a abrir um chamado no atendimento (AJD-01).
- Titular sem identidade validada: a busca não abre (regra R1).
- Vincular a si mesmo (CPF ou e-mail do próprio titular): aviso no campo de busca, sem avançar. Mensagem proposta: “Você não pode adicionar a si mesmo como familiar.”

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-03 · Adicionar familiar · introdução](../FAM-03-adicionar-familiar-introducao/spec.md) | Adicionar familiar | — | Caminho principal |
| [FAM-10 · Card e tipo de vínculo](../FAM-10-card-e-tipo-de-vinculo/spec.md) | Voltar | — | Voltar |
| [FAM-12 · Cadastro do familiar (sem conta)](../FAM-12-cadastro-do-familiar-sem-conta/spec.md) | Voltar | — | Voltar |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-01 · Meus familiares · vazio](../FAM-01-meus-familiares-vazio/spec.md) | Voltar | — | Voltar |
| [FAM-10 · Card e tipo de vínculo](../FAM-10-card-e-tipo-de-vinculo/spec.md) | Conta ativa encontrada | Busca devolve conta ativa (spec §4) | Caminho principal |
| [FAM-12 · Cadastro do familiar (sem conta)](../FAM-12-cadastro-do-familiar-sem-conta/spec.md) | Cadastrar novo familiar | Sem conta ativa, o titular cadastra o familiar (spec §6) | Caminho alternativo |

## 9. Dados

- POST /v1/family-links/search com { type: cpf | email, value }. O CPF nunca vai na URL.
- Resposta: 200 FOUND (user_id, nome_mascarado, cpf_mascarado); 404 USER_NOT_FOUND; 422 INVALID_CPF, INVALID_EMAIL e SELF_LINK (vincular a si mesmo, mostrado no campo de busca); 429 SEARCH_LIMIT_EXCEEDED; 403 IDENTITY_NOT_VALIDATED.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Limite de consultas definido (P1, decisão 1): após a segunda espera de 30 min, a busca bloqueia e o usuário abre chamado no atendimento.
- Mascaramento de nome e CPF (P2, decisão 2), padrão de mercado: CPF `***.456.789-**`; nome com o primeiro nome completo e, nos demais, a inicial seguida de `*`. Validar com produto.
- SELF_LINK (422): a implementação atual não trata esse caso. Decidido: aviso no campo de busca. Confirmar com o backend se a busca devolve SELF_LINK ou se a checagem é feita no front.

## 11. Critérios de aceite

- [ ] CPF com dígito verificador errado mostra o erro sem consultar a API.
- [ ] A 6ª consulta dentro da janela mostra aviso de espera de 15 min; depois de mais 5 consultas, a espera passa a 30 min.
- [ ] Após a segunda espera de 30 min, a busca fica bloqueada e o aviso indica o atendimento.
- [ ] Conta ativa encontrada abre FAM-10.
- [ ] Sem conta ativa mostra o aviso com Cadastrar novo familiar, que abre FAM-12.
- [ ] Resposta igual para inexistente e para conta inativa.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
