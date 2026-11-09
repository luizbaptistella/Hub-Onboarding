# BIO-06 · Erro com suporte

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `BIO-06` |
| Raia | Biometria facial · Etapa 3 de 4 · Figma `1774:46029` |
| Figma | sem node no Figma |
| Status | Só implementada (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 1 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Oferecer suporte quando a identidade não pode ser validada.

## 2. Componentes

5 peças nesta tela: **4 instâncias de 3 componentes do DS** (`Alert`, `AppHeader`, `Button`) e **1 peças fora do DS**.

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={false} title="Biometria facial" progress={{ current: 3, total: 4 }} language={false} help />` | — | Forma atual: Verificação (classe po-header-module). |
| 2 | `Alert` | `<Alert tone="danger" title="Não conseguimos validar sua identidade.">Entre em contato com o suporte para continuar.</Alert>` | — | — |
| 3 | Painel de atendimento _(fora do DS)_ | title: Atendimento | oculto; aberto por "Falar com o suporte" | Fora do DS (lv-support-*). Oculto no layout padrão. |
| 4 | `Button` | `<Button variant="primary" fullWidth iconEnd="support_agent">Falar com o suporte</Button>` | — | — |
| 5 | `Button` | `<Button variant="secondary" fullWidth>Sair e continuar depois</Button>` | — | Navega para `login`. |

Classes locais usadas na tela (fora do DS): `.lv-exit*`, `.lv-support*`.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Ajuda | — |  |
| Falar com o suporte | — |  |
| Sair e continuar depois | [ENT-01 · Login](../ENT-01-login/spec.md) |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Padrão
- Painel de suporte aberto

## 6. Comportamento

- Falar com o suporte abre e fecha o painel de atendimento (aria-expanded).
- Sair e continuar depois abre ENT-01.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [BIO-05 · Bloqueio · 3 tentativas](../BIO-05-bloqueio-3-tentativas/spec.md) | Fim do bloqueio de 5 min | — | Automática (timer) |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [ENT-01 · Login](../ENT-01-login/spec.md) | Sair e continuar depois | — | Sair do fluxo |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Telefone e e-mail do suporte (a definir pelo produto).

## 11. Critérios de aceite

- [ ] O botão alterna o painel e o aria-expanded.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
