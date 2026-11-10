# DOC-52 · CNH · confirmação da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Provisório.** Marcação copiada do RNE (DOC-26 a DOC-28), com nome e textos do CNH. Trocar pelo desenho do CNH no Figma antes de aprovar.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-52` |
| Raia | Documento de identidade · brasileiro · Etapa 2 de 4 |
| Figma | sem node próprio · seção `1620:12039` |
| Status | Proposta, marcação provisória |
| Marcação | 1 variantes em [telas/](telas/) · imagens em [img/](img/) · componentes em [components.json](components.json) |
| Entradas / saídas | 1 / 2 |

## 1. Objetivo

Mostrar a foto capturada da frente e permitir confirmar ou tirar outra foto. Documento: Carteira Nacional de Habilitação (CNH).

## 2. Componentes

Mesmos componentes da tela RNE de origem, copiados. Lista para máquina: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding).

## 3. Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão | sem Figma | [padrao](telas/padrao/screen.html) |

## 4. Pendências

- **Provisório:** marcação copiada do RNE (DOC-26 a DOC-28). Textos e imagens ainda são do RNE, a trocar pelos do CNH no Figma (seção `1620:12039`).
- **Figma:** não foi identificado o frame da confirmação da frente do CNH no Figma. Sem desenho próprio ainda.
- **Verso e upload:** fora desta tela. Ver lacunas em DOC-01.

## 5. Entradas (de onde se chega)

| De | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-51 · câmera da frente](../DOC-51-cnh-camera-frente/spec.md) | Foto tirada | Captura automática ou Tirar foto | Caminho principal |

## 6. Saídas (para onde se vai)

| Para | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-51 · câmera da frente](../DOC-51-cnh-camera-frente/spec.md) | Tirar outra foto ou Voltar | — | Caminho alternativo |
| [DOC-24 · Conclusão do fluxo de documento](../DOC-24-documento-em-analise/spec.md) | Continuar | Documento brasileiro aprovado | Caminho principal |

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
