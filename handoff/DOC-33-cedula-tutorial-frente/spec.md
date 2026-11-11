# DOC-33 · Cédula · tutorial da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão.** Tela gerada a partir da tela aprovada de referência; validar em conjunto com as demais telas do fluxo de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-33` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | [`2799:36264`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2799-36264) (seção `2283:33539`) |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 3 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · componentes em [components.json](components.json) |

## Objetivo

Preparar a pessoa para fotografar a frente da Cédula de identidade.

## Componentes

1 componente do DS, 3 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `Tutorial` | 3 | `<Tutorial label="Como fotografar a frente da Cédula" title="Foto do documento" steps={[{ title: "Vamos capturar a frente do seu documento", description: "Use o mesmo documento que você in…` | defaultStep | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Notas de componentes

- Barra de status (mock do sistema, não implementar).
- `Tutorial` do DS com 3 passos: Voltar, título "Foto do documento", "Pular", pontos, número da etapa, "Continuar" e "Abrir câmera" no último passo.

## Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Passo 1 · frente da Cédula | [`2799:36264`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2799-36264) | [telas/passo-1](telas/passo-1/screen.html) |
| 2 | Passo 2 · superfície plana | [`2799:36286`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2799-36286) | [telas/passo-2](telas/passo-2/screen.html) |
| 3 | Passo 3 · enquadrar | [`2799:36308`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2799-36308) | [telas/passo-3](telas/passo-3/screen.html) |

## Comportamento

- "Continuar" avança; o Voltar do topo recua. No passo 1, Voltar volta à tela anterior.
- "Pular" e "Abrir câmera" abrem a câmera.
- O botão do passo fica preso ao rodapé, na mesma altura em todos os passos.
- Deslizar troca de passo no toque; os botões sempre existem.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-32 | Cédula · formulário | Continuar | Caminho principal | — |
| DOC-34 | Cédula · câmera da frente | Voltar | Voltar | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-32 | Cédula · formulário | Voltar no passo 1 | Voltar | — |
| DOC-34 | Cédula · câmera da frente | Abrir câmera ou Pular | Caminho principal | — |

## Pendências

- As imagens vêm do Figma e são provisórias (mascote e arte do CRNM).
- Textos que mudaram em relação ao Figma precisam voltar para o Figma, se aprovados.
- Textos novos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- Abre no passo 1, com Voltar e "Pular" no header.
- No último passo aparecem o botão "Abrir câmera" e, quando houver, a moldura.
- Leitor de tela anuncia "Etapa N de M" e o título ao avançar.
