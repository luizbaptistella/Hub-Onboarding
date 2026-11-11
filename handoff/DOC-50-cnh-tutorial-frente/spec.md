# DOC-50 · CNH · tutorial da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Status:** Desenhada no hub, base do RNE (Figma pode estar defasado).

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-50` |
| Raia | Documento de identidade · brasileiro · Etapa 2 de 4 |
| Figma | `1752:45123`, `1620:13444`, `1817:51230` (defasado) · seção `1620:12039` |
| Status | Desenhada no hub, base do RNE (Figma pode estar defasado) |
| Marcação | 3 variantes em [telas/](telas/) · componentes em [components.json](components.json) |
| Entradas / saídas | 2 / 2 |

## 1. Objetivo

Preparar a pessoa para fotografar a frente do documento. Documento: Carteira Nacional de Habilitação (CNH).

## 2. Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Passo 1 · frente do CNH | `1752:45123` | [telas/passo-1/screen.html](telas/passo-1/screen.html) |
| 2 | Passo 2 · superfície plana | `1620:13444` | [telas/passo-2/screen.html](telas/passo-2/screen.html) |
| 3 | Passo 3 · enquadrar | `1817:51230` | [telas/passo-3/screen.html](telas/passo-3/screen.html) |

## 3. Pendências

- **Figma:** o desenho do Figma pode estar defasado. Este spec segue o hub.
- **Imagens e textos de tutorial:** do RNE, adaptados ao documento. Trocar pelas do Figma quando conveniente.

## 4. Entradas (de onde se chega)

| De | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | CNH · Tirar foto do documento | CNH escolhido | Caminho principal |
| [DOC-51 · câmera da frente](../DOC-51-cnh-camera-frente/spec.md) | Voltar | — | Voltar |

## 5. Saídas (para onde se vai)

| Para | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | Voltar no passo 1 | — | Voltar |
| [DOC-51 · câmera da frente](../DOC-51-cnh-camera-frente/spec.md) | Abrir câmera ou Pular | — | Caminho principal |

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
