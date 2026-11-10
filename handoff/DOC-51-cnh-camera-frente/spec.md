# DOC-51 · CNH · câmera da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Provisório.** Marcação copiada do RNE (DOC-26 a DOC-28), com nome e textos do CNH. Trocar pelo desenho do CNH no Figma antes de aprovar.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-51` |
| Raia | Documento de identidade · brasileiro · Etapa 2 de 4 |
| Figma | sem node próprio · seção `1620:12039` |
| Status | Proposta, marcação provisória |
| Marcação | 5 variantes em [telas/](telas/) · imagens em [img/](img/) · componentes em [components.json](components.json) |
| Entradas / saídas | 2 / 3 |

## 1. Objetivo

Capturar a frente do documento com a câmera. A captura é automática quando o documento está enquadrado. Documento: Carteira Nacional de Habilitação (CNH).

## 2. Componentes

Mesmos componentes da tela RNE de origem, copiados. Lista para máquina: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding).

## 3. Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Enquadrando | sem Figma | [enquadrando](telas/enquadrando/screen.html) |
| 2 | Enquadrado | sem Figma | [enquadrado](telas/enquadrado/screen.html) |
| 3 | Tirando a foto (sem Figma) | sem Figma | [tirando-foto](telas/tirando-foto/screen.html) |
| 4 | Sem acesso à câmera (sem Figma) | sem Figma | [sem-permissao](telas/sem-permissao/screen.html) |
| 5 | Câmera indisponível (sem Figma) | sem Figma | [camera-indisponivel](telas/camera-indisponivel/screen.html) |

## 4. Pendências

- **Provisório:** marcação copiada do RNE (DOC-26 a DOC-28). Textos e imagens ainda são do RNE, a trocar pelos do CNH no Figma (seção `1620:12039`).
- **Figma:** não foi identificado o frame da câmera da frente do CNH no Figma. Sem desenho próprio ainda.
- **Verso e upload:** fora desta tela. Ver lacunas em DOC-01.

## 5. Entradas (de onde se chega)

| De | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-50 · tutorial da frente](../DOC-50-cnh-tutorial-frente/spec.md) | Abrir câmera ou Pular | — | Caminho principal |
| [DOC-52 · confirmação da frente](../DOC-52-cnh-confirmacao-frente/spec.md) | Tirar outra foto ou Voltar | — | Caminho alternativo |

## 6. Saídas (para onde se vai)

| Para | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-50 · tutorial da frente](../DOC-50-cnh-tutorial-frente/spec.md) | Voltar | — | Voltar |
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | Voltar para a seleção | Sem acesso à câmera ou câmera indisponível | Caminho alternativo |
| [DOC-52 · confirmação da frente](../DOC-52-cnh-confirmacao-frente/spec.md) | Foto tirada | Captura automática ou Tirar foto | Caminho principal |

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
