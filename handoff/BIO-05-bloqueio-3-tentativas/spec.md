# BIO-05 · Bloqueio · 3 tentativas

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `BIO-05` |
| Id no protótipo | `liv-lock` (`prototipo.html#liv-lock`) |
| Raia | Biometria facial · Etapa 3 de 4 · Figma `1774:46029` |
| Figma | sem node no Figma |
| Status | Só no protótipo (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Bloquear novas tentativas depois de 3 reprovações.

## 2. Componentes

3 peças nesta tela: **3 instâncias de 3 componentes do DS** (`Alert`, `AppHeader`, `Button`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={false} title="Biometria facial" progress={{ current: 3, total: 4 }} language={false} help />` | — | Forma no protótipo: Verificação (classe po-header-module). |
| 2 | `Alert` | `<Alert tone="danger" title="Excesso de tentativas.">Você excedeu o limite de 3 tentativas. Tente novamente em 5:00.</Alert>` | — | — |
| 3 | `Button` | `<Button variant="secondary" fullWidth>Sair e continuar depois</Button>` | — | Navega para `login`. |

Classes locais usadas na tela (fora do DS): `.lv-exit*`.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Ajuda | — |  |
| Sair e continuar depois | [ENT-01 · Login](../ENT-01-login/spec.md) |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Bloqueado com contagem

## 6. Comportamento

- Alerta de erro "Excesso de tentativas." com contagem regressiva "Tente novamente em m:ss", começando em 5:00.
- No fim do bloqueio, zera as tentativas e abre BIO-06.
- Sair e continuar depois abre ENT-01. Os dados já enviados ficam salvos.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [BIO-02 · Captura facial](../BIO-02-captura-facial/spec.md) | Rosto aprovado? 3ª reprovação | — | Erro ou nova tentativa |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [BIO-06 · Erro com suporte](../BIO-06-erro-com-suporte/spec.md) | Fim do bloqueio de 5 min | — | Automática (timer) |
| [ENT-01 · Login](../ENT-01-login/spec.md) | Sair e continuar depois | — | Sair do fluxo |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Confirmar o produto: no fim do bloqueio, o certo é BIO-06 (erro com suporte) ou voltar para BIO-01?

## 11. Critérios de aceite

- [ ] A contagem desce de 5:00 a 0:00 e então abre BIO-06.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
