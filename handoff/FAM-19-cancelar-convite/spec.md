# FAM-19 · Cancelar convite (modal)

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
>
> **Aprovada.** Modal de confirmação do botão Cancelar convite, em convite enviado (FAM-17). Premissas na seção 10.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-19` (código novo, modal de FAM-17) |
| Raia | Familiares · Inclusão e gestão de vínculos |
| Figma | — |
| Status | Aprovada |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 1 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Pedir confirmação antes de cancelar um convite enviado que ainda não foi aceito, para evitar cancelamento por toque acidental.

## 2. Componentes

3 peças no modal: **3 instâncias de 3 componentes** (`Button` ×2 e o painel de confirmação). O painel usa o padrão de **Desvincular familiar** (classes `desv-*`, fora do DS): candidato a componente `Dialog`.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | Painel de confirmação _(fora do DS, desv-*)_ | role="alertdialog", título, texto e duas ações | padrão; enviando; erro de rede | Mesmo padrão de FAM-17 "Desvincular familiar", com o conteúdo centralizado (`.cancelar-panel`). |
| 2 | `Button` | `<Button variant="danger" fullWidth>Cancelar convite</Button>` | padrão; carregando (durante a requisição) | Confirma o cancelamento. |
| 3 | `Button` | `<Button variant="secondary" fullWidth>Manter convite</Button>` | padrão | Fecha o modal sem alterar nada. |

Classes locais usadas (fora do DS): `.desv-modal`, `.desv-scrim`, `.desv-panel`, `.desv-icon`, `.desv-title`, `.desv-text`, `.desv-actions`.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Cancelar convite | — | Chama a API. Em caso de sucesso, fecha o modal e tira o convite da lista de FAM-17. |
| Manter convite | — | Fecha o modal. O foco volta para o botão Cancelar convite do card. |
| Toque no fundo escuro | — | Igual a Manter convite. |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Padrão
- Enviando (botão Cancelar convite em carregamento; os dois botões desabilitados)
- Erro de rede (alerta dentro do modal: "Não conseguimos cancelar o convite. Tente novamente."; o modal continua aberto)
- Convite cancelado por outro aparelho (409): fecha o modal e mostra a mensagem "Este convite já não está mais disponível" na lista. Hoje não há texto próprio para esse caso.

## 6. Comportamento

- Abre a partir do botão Cancelar convite em convite pendente ou expirado (FAM-17).
- O foco inicial vai para Manter convite, para que um toque acidental em Enter não cancele.
- Cancelar só remove o convite da lista depois da confirmação do servidor. Se a rede falhar, o card não some.
- Cancelar não gera nenhuma notificação para o convidado.
- O texto não mostra CPF nem contato do convidado; mostra só o nome, como em Desvincular.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) | Cancelar convite | Convite enviado, pendente ou expirado | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) | Cancelar convite (confirmado) ou Manter convite | Sucesso: convite sai da lista. Manter: nada muda. | Caminho principal |

## 9. Dados

- Nome do familiar convidado (exibido).
- Endpoint de cancelamento: o mesmo usado por FAM-17 (a confirmar com o backend). Aceita Idempotency-Key (§11).

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

**Premissas a validar:**

- **Texto do corpo:** "O convite para [Nome] vai ser cancelado. O link deixa de funcionar e o convite sai da lista." Não menciona o reenvio. Se quiser, acrescento: "Para convidar de novo, busque o familiar e cadastre os contatos."
- **Ordem dos botões:** Cancelar convite em vermelho, Manter convite como secundário, igual ao padrão de Desvincular.
- **Foco inicial em Manter convite.**

**Em aberto:**

- Texto para o caso de convite já cancelado ou aceito por outro aparelho (409). Hoje não há mensagem definida.
- Confirmar com o backend se o cancelamento aceita Idempotency-Key.

## 11. Critérios de aceite

- [ ] Toque em Cancelar convite abre o modal com o nome do familiar.
- [ ] Manter convite fecha o modal e não altera a lista.
- [ ] Confirmar com sucesso remove o convite da lista de FAM-17.
- [ ] Erro de rede mantém o modal aberto e o convite na lista.
- [ ] O foco inicial está em Manter convite.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
