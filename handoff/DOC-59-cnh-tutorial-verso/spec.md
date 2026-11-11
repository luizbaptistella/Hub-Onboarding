# DOC-59 · CNH · tutorial do verso

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Status:** Desenhada no hub, sem Figma atualizado.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-59` |
| Raia | Documento de identidade · brasileiro · Etapa 2 de 4 |
| Figma | sem Figma · seção `1620:12039` |
| Status | Desenhada no hub, sem Figma atualizado |
| Marcação | 2 variantes em [telas/](telas/) · componentes em [components.json](components.json) |
| Entradas / saídas | 2 / 2 |

## 1. Objetivo

Preparar a pessoa para fotografar o verso do documento. Documento: Carteira Nacional de Habilitação (CNH).

## 2. Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Passo 1 · virar o documento | sem Figma | [telas/passo-1/screen.html](telas/passo-1/screen.html) |
| 2 | Passo 2 · enquadrar o verso | sem Figma | [telas/passo-2/screen.html](telas/passo-2/screen.html) |

## 3. Pendências

- **Figma:** o desenho do Figma pode estar defasado. Este spec segue o hub.
- **Imagens do verso:** a arte do verso da Cédula foi reaproveitada. Trocar pela do documento.

## 4. Entradas (de onde se chega)

| De | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-52 · confirmação da frente](../DOC-52-cnh-confirmacao-frente/spec.md) | Continuar | Frente aprovada, segue para o verso | Caminho principal |
| [DOC-60 · câmera do verso](../DOC-60-cnh-camera-verso/spec.md) | Voltar | — | Voltar |

## 5. Saídas (para onde se vai)

| Para | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-52 · confirmação da frente](../DOC-52-cnh-confirmacao-frente/spec.md) | Voltar no passo 1 | — | Voltar |
| [DOC-60 · câmera do verso](../DOC-60-cnh-camera-verso/spec.md) | Abrir câmera ou Pular | — | Caminho principal |

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
