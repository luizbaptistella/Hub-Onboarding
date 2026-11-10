# DOC-53 · RG · tutorial da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Provisório.** Marcação copiada do RNE (DOC-26 a DOC-28), com nome e textos do RG. Trocar pelo desenho do RG no Figma antes de aprovar.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-53` |
| Raia | Documento de identidade · brasileiro · Etapa 2 de 4 |
| Figma | `1620:13669` · seção `1620:12039` |
| Status | Proposta, marcação provisória |
| Marcação | 3 variantes em [telas/](telas/) · imagens em [img/](img/) · componentes em [components.json](components.json) |
| Entradas / saídas | 2 / 2 |

## 1. Objetivo

Preparar a pessoa para fotografar a frente do documento. Documento: Registro Geral (RG).

## 2. Componentes

Mesmos componentes da tela RNE de origem, copiados. Lista para máquina: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding).

## 3. Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Passo 1 · frente do RG | `1620:13669` | [passo-1](telas/passo-1/screen.html) |
| 2 | Passo 2 · superfície plana | sem Figma | [passo-2](telas/passo-2/screen.html) |
| 3 | Passo 3 · enquadrar | sem Figma | [passo-3](telas/passo-3/screen.html) |

## 4. Pendências

- **Provisório:** marcação copiada do RNE (DOC-26 a DOC-28). Textos e imagens ainda são do RNE, a trocar pelos do RG no Figma (seção `1620:12039`).
- **Passos:** só o passo 1 foi identificado no Figma (`1620:13669`). Os passos 2 e 3 seguem o RNE, a conferir.
- **Verso e upload:** fora desta tela. Ver lacunas em DOC-01.

## 5. Entradas (de onde se chega)

| De | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | RG · Tirar foto do documento | RG escolhido | Caminho principal |
| [DOC-54 · câmera da frente](../DOC-54-rg-camera-frente/spec.md) | Voltar | — | Voltar |

## 6. Saídas (para onde se vai)

| Para | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | Voltar no passo 1 | — | Voltar |
| [DOC-54 · câmera da frente](../DOC-54-rg-camera-frente/spec.md) | Abrir câmera ou Pular | — | Caminho principal |

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
