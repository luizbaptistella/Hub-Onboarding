# BIO-03 · Validando a foto

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `BIO-03` |
| Raia | Biometria facial · Etapa 3 de 4 · Figma `1774:46029` |
| Figma | [`1774:46292`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46292) (seção `1774:46029`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 1 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Mostrar que a foto está sendo validada.

## 2. Componentes

2 peças nesta tela: **2 instâncias de 2 componentes do DS** (`AppHeader`, `LoadingState`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={false} title="Biometria facial" progress={{ current: 3, total: 4 }} language={false} help />` | — | Forma atual: Verificação (classe po-header-module). |
| 2 | `LoadingState` _(na implementação atual, classes locais)_ | `<LoadingState title="Aguarde!" description="Estamos validando sua foto." />` | — | Implementação atual usa classes locais lv-*; implementar com o LoadingState do DS. |

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| `OrientationHint` | visible message="Posicione seu celular na vertical." | Celular na horizontal; pausa a validação. |

Classes locais usadas na tela (fora do DS): `.lv-body*`, `.lv-loading*`, `.lv-spinner*`.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Ajuda | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Carregando

## 6. Comportamento

- Spinner com "Aguarde! Estamos validando sua foto." e, depois de 2 s, abre BIO-04. Não tem botão Voltar.
- Também pausa quando o celular vai para a horizontal.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [BIO-02 · Captura facial](../BIO-02-captura-facial/spec.md) | Rosto aprovado? Aprovado · contagem 3, 2, 1 | — | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [BIO-04 · Conferência da foto](../BIO-04-conferencia-da-foto/spec.md) | Após 2 s | — | Automática (timer) |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

_Nenhuma._

## 11. Critérios de aceite

- [ ] Abre BIO-04 sozinha.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
