# DOC-29 · RNE · tutorial do verso (código)

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão.** Tela gerada a partir da tela aprovada de referência; validar em conjunto com as demais telas do fluxo de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-29` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | [`1620:13673`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-13673) (seção `2283:33539`) |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 2 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · componentes em [components.json](components.json) |

## Objetivo

Preparar a pessoa para fotografar o código (MRZ) do verso do RNE.

## Componentes

1 componente do DS, 2 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `Tutorial` | 2 | `<Tutorial label="Como fotografar o código do verso do RNE" title="Foto do documento" steps={[{ title: "Vire o documento", description: "Agora vamos fotografar o código: as três linhas de …` | defaultStep | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Número do 2.º tutorial | O número visível do passo é trocado por 2 (sequência de tutoriais do fluxo). Proposta para o Tutorial: prop de número inicial. |

## Notas de componentes

- Barra de status (mock do sistema, não implementar).
- `Tutorial` do DS com 2 passos: Voltar, título "Foto do documento", "Pular", pontos, número da etapa, "Continuar" e "Abrir câmera" no último passo.

## Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Passo 1 · virar o documento | [`1620:13673`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-13673) | [telas/passo-1](telas/passo-1/screen.html) |
| 2 | Passo 2 · enquadrar o código | [`1620:13719`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-13719) | [telas/passo-2](telas/passo-2/screen.html) |

## Comportamento

- "Continuar" avança; o Voltar do topo recua. No passo 1, Voltar volta à tela anterior.
- "Pular" e "Abrir câmera" abrem a câmera.
- O botão do passo fica preso ao rodapé, na mesma altura em todos os passos.
- Deslizar troca de passo no toque; os botões sempre existem.
- O número visível acima do título é 2 (segundo tutorial do fluxo), como no CRNM e no DPRNM.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-28 | RNE · confirmação da frente | Continuar | Caminho principal | — |
| DOC-30 | RNE · leitura do código MRZ (verso) | Voltar | Voltar | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-28 | RNE · confirmação da frente | Voltar no passo 1 | Voltar | — |
| DOC-30 | RNE · leitura do código MRZ (verso) | Abrir câmera ou Pular | Caminho principal | — |

## Pendências

- As imagens vêm do Figma e são provisórias (mascote e arte do CRNM).
- Textos que mudaram em relação ao Figma precisam voltar para o Figma, se aprovados.
- Textos novos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- Abre no passo 1, com Voltar e "Pular" no header.
- No último passo aparecem o botão "Abrir câmera" e, quando houver, a moldura.
- Leitor de tela anuncia "Etapa N de M" e o título ao avançar.
