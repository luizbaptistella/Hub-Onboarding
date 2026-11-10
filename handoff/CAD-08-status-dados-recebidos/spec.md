# CAD-08 · Status · dados recebidos

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `CAD-08` |
| Raia | Entrada e cadastro · Etapa 1 de 4 · dados pessoais, contatos e endereço |
| Figma | `2198:23407` (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 2 / 1 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Confirmar que os dados foram recebidos e mostrar a jornada de 4 etapas.

## 2. Componentes

3 peças nesta tela: **3 instâncias de 3 componentes do DS** (`JourneyStepper`, `RedirectCountdown`, `StatusScreen`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `StatusScreen` | `<StatusScreen title="Recebemos seus dados cadastrais!" tone="success" badge="success" />` | — | — |
| 2 | ↳ `JourneyStepper` | `<JourneyStepper steps={[{ label: "Cadastro", state: "done" }, { label: "Captura de documentos", state: "current" }, { label: "Biometria facial", state: "upcoming" }, { label: "Validação de benefícios", state: "upcoming" }]} />` | — | — |
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
- Redirecionando

## 6. Comportamento

- StatusScreen com a jornada: Cadastro (feito), Captura de documentos (atual), Biometria facial e Validação de benefícios (próximas).
- Contagem de 10 s e depois abre CAD-09 (criação de senha). "Continuar agora" adianta. A contagem pausa com a aba oculta.
- Leitor de tela: anuncia "Redirecionando para a criação de senha em 10 segundos."

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-07 · Endereço](../CAD-07-endereco/spec.md) | Continuar | CEP, rua, número, estado e cidade preenchidos | Caminho principal |
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | Voltar | — | Voltar |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-09 · Primeiro acesso · criar senha](../CAD-09-primeiro-acesso-criar-senha/spec.md) | 10 s ou Continuar agora | — | Automática (timer) |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

_Nenhuma._

## 11. Critérios de aceite

- [ ] Sem interação, abre CAD-09 depois de 10 s.
- [ ] Continuar agora abre CAD-09 na hora.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
