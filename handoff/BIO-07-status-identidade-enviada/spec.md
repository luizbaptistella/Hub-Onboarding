# BIO-07 · Status · identidade enviada

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `BIO-07` |
| Raia | Biometria facial · Etapa 3 de 4 · Figma `1774:46029` |
| Figma | [`2602:31414`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2602-31414) (seção `1774:46029`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

> No Figma o texto é “Redirecionando para a captura de documentos de identidade…”; o hub usa texto genérico (decidido).

## 1. Objetivo

Confirmar que documento e biometria foram enviados.

## 2. Componentes

3 peças nesta tela: **3 instâncias de 3 componentes do DS** (`JourneyStepper`, `RedirectCountdown`, `StatusScreen`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `StatusScreen` | `<StatusScreen title="Recebemos seus dados cadastrais!" tone="success" badge="success" />` | — | — |
| 2 | ↳ `JourneyStepper` | `<JourneyStepper steps={[{ label: "Cadastro", state: "done" }, { label: "Captura de documentos", state: "done" }, { label: "Biometria facial", state: "done" }, { label: "Validação de benefícios", state: "current" }]} />` | — | — |
| 3 | ↳ `RedirectCountdown` | `<RedirectCountdown seconds={10} continueLabel="Continuar agora" />` | contando 10 → 0; pausado com a aba oculta | O botão "Continuar agora" faz parte do RedirectCountdown (prop continueLabel). |

Classes locais usadas na tela (fora do DS): `.lv-done*`.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Continuar agora | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Contando

## 6. Comportamento

- StatusScreen com Cadastro, Documento e Biometria feitos e Validação de benefícios como atual.
- Contagem de 10 s e depois a próxima etapa (na implementação atual, AREA-01). Continuar agora adianta. Pausa com a aba oculta.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [BIO-04 · Conferência da foto](../BIO-04-conferencia-da-foto/spec.md) | Salvar e continuar | — | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | 10 s ou Continuar agora | Provisório até existir a validação de benefícios | Automática (timer) |
| BEN-G1 · Validação de benefícios | Próxima etapa definida pelo backend | — | Lacuna (a desenhar) |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Tela de validação de benefícios (BEN-G1).

## 11. Critérios de aceite

- [ ] Depois de 10 s, segue para a próxima etapa.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
