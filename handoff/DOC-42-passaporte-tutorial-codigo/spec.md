# DOC-42 · Passaporte · tutorial do código

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.
> **Em revisão.** Tela gerada a partir da tela aprovada de referência; validar em conjunto com as demais telas do fluxo de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-42` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | sem desenho (proposta do hub) |
| Status | Proposta do hub, com o DS aplicado |
| Marcação | 2 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · componentes em [components.json](components.json) |

## Objetivo

Preparar a pessoa para fotografar o código (MRZ) do passaporte, com o documento na mesma posição.

## Componentes

1 componente do DS, 2 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `Tutorial` | 2 | `<Tutorial label="Como fotografar o código do passaporte" title="Foto do documento" steps={[{ title: "Mantenha seu passaporte aberto", description: "Mantenha o passaporte na mesma posição …` | defaultStep | — |

Peças fora do DS (só no protótipo ou propostas para o DS):

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
| 1 | Passo 1 · manter aberto | sem Figma | [telas/passo-1](telas/passo-1/screen.html) |
| 2 | Passo 2 · enquadrar o código | sem Figma | [telas/passo-2](telas/passo-2/screen.html) |

## Comportamento

- "Continuar" avança; o Voltar do topo recua. No passo 1, Voltar volta à tela anterior.
- "Pular" e "Abrir câmera" abrem a câmera.
- O botão do passo fica preso ao rodapé, na mesma altura em todos os passos.
- Deslizar troca de passo no toque; os botões sempre existem.
- O número visível acima do título é 2, herdado da regra do segundo tutorial. Pelo desenho do passaporte (intros 4 e 5), seria 4 e 5: decidir.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-41 | Passaporte · confirmação da página | Continuar | Caminho principal | — |
| DOC-43 | Passaporte · leitura do código MRZ | Voltar | Voltar | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-41 | Passaporte · confirmação da página | Voltar no passo 1 | Voltar | — |
| DOC-43 | Passaporte · leitura do código MRZ | Abrir câmera ou Pular | Caminho principal | — |

## Pendências

- As imagens vêm do Figma e são provisórias (mascote e arte do CRNM).
- Textos que mudaram em relação ao Figma precisam voltar para o Figma, se aprovados.
- Textos novos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- Abre no passo 1, com Voltar e "Pular" no header.
- No último passo aparecem o botão "Abrir câmera" e, quando houver, a moldura.
- Leitor de tela anuncia "Etapa N de M" e o título ao avançar.
