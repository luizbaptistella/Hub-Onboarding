# DOC-48 · CIN · câmera da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Status:** Desenhada no hub, base do RNE (Figma pode estar defasado).

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-48` |
| Raia | Documento de identidade · brasileiro · Etapa 2 de 4 |
| Figma | sem Figma · seção `1620:12039` |
| Status | Desenhada no hub, base do RNE (Figma pode estar defasado) |
| Marcação | 5 variantes em [telas/](telas/) · componentes em [components.json](components.json) |
| Entradas / saídas | 2 / 3 |

## 1. Objetivo

Capturar a frente do documento. A captura é automática quando o documento está enquadrado. Documento: Carteira de Identidade Nacional (CIN).

## 2. Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Enquadrando | sem Figma | [telas/enquadrando/screen.html](telas/enquadrando/screen.html) |
| 2 | Enquadrado | sem Figma | [telas/enquadrado/screen.html](telas/enquadrado/screen.html) |
| 3 | Tirando a foto (sem Figma) | sem Figma | [telas/tirando-foto/screen.html](telas/tirando-foto/screen.html) |
| 4 | Sem acesso à câmera (sem Figma) | sem Figma | [telas/sem-permissao/screen.html](telas/sem-permissao/screen.html) |
| 5 | Câmera indisponível (sem Figma) | sem Figma | [telas/camera-indisponivel/screen.html](telas/camera-indisponivel/screen.html) |

## 3. Pendências

- **Figma:** o desenho do Figma pode estar defasado. Este spec segue o hub.
- **Imagens e textos de tutorial:** do RNE, adaptados ao documento. Trocar pelas do Figma quando conveniente.

## 4. Entradas (de onde se chega)

| De | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-47 · tutorial da frente](../DOC-47-cin-tutorial-frente/spec.md) | Abrir câmera ou Pular | — | Caminho principal |
| [DOC-49 · confirmação da frente](../DOC-49-cin-confirmacao-frente/spec.md) | Tirar outra foto ou Voltar | — | Caminho alternativo |

## 5. Saídas (para onde se vai)

| Para | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-47 · tutorial da frente](../DOC-47-cin-tutorial-frente/spec.md) | Voltar | — | Voltar |
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | Voltar para a seleção | Sem acesso à câmera ou câmera indisponível | Caminho alternativo |
| [DOC-49 · confirmação da frente](../DOC-49-cin-confirmacao-frente/spec.md) | Foto tirada | Captura automática ou Tirar foto | Caminho principal |

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
