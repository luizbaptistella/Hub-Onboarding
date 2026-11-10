# DOC-47 · CIN · tutorial da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Provisório.** Marcação copiada do RNE (DOC-26 a DOC-28), com nome e textos do CIN. Trocar pelo desenho do CIN no Figma antes de aprovar.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-47` |
| Raia | Documento de identidade · brasileiro · Etapa 2 de 4 |
| Figma | `3080:59953`, `1817:51160`, `1817:51067` · seção `1620:12039` |
| Status | Proposta, marcação provisória |
| Marcação | 3 variantes em [telas/](telas/) · imagens em [img/](img/) · componentes em [components.json](components.json) |
| Entradas / saídas | 2 / 2 |

## 1. Objetivo

Preparar a pessoa para fotografar a frente do documento. Documento: Carteira de Identidade Nacional (CIN).

## 2. Componentes

Mesmos componentes da tela RNE de origem, copiados. Lista para máquina: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding).

## 3. Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Passo 1 · frente do CIN | `3080:59953` | [passo-1](telas/passo-1/screen.html) |
| 2 | Passo 2 · superfície plana | `1817:51160` | [passo-2](telas/passo-2/screen.html) |
| 3 | Passo 3 · enquadrar | `1817:51067` | [passo-3](telas/passo-3/screen.html) |

## 4. Pendências

- **Provisório:** marcação copiada do RNE (DOC-26 a DOC-28). Textos e imagens ainda são do RNE, a trocar pelos do CIN no Figma (seção `1620:12039`).
- **Passos:** o Figma do CIN tem 3 passos de foto (ver Figma). A marcação segue os 3 passos do RNE, a conferir.
- **Verso e upload:** fora desta tela. Ver lacunas em DOC-01.

## 5. Entradas (de onde se chega)

| De | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | CIN · Tirar foto do documento | CIN escolhido | Caminho principal |
| [DOC-48 · câmera da frente](../DOC-48-cin-camera-frente/spec.md) | Voltar | — | Voltar |

## 6. Saídas (para onde se vai)

| Para | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | Voltar no passo 1 | — | Voltar |
| [DOC-48 · câmera da frente](../DOC-48-cin-camera-frente/spec.md) | Abrir câmera ou Pular | — | Caminho principal |

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
