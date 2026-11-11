# DOC-39 · Passaporte · tutorial da página

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão.** Tela gerada a partir da tela aprovada de referência; validar em conjunto com as demais telas do fluxo de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-39` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | sem desenho (proposta do hub) |
| Status | Proposta do hub, com o DS aplicado |
| Marcação | 3 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · componentes em [components.json](components.json) |

## Objetivo

Preparar a pessoa para fotografar a página de dados do passaporte.

## Componentes

1 componente do DS, 3 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `Tutorial` | 3 | `<Tutorial label="Como fotografar a página do passaporte" title="Foto do documento" steps={[{ title: "Abra o passaporte na página com sua foto", description: "Mantenha o documento aberto n…` | defaultStep | — |

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
| 1 | Passo 1 · abrir na página com a foto | sem Figma | [telas/passo-1](telas/passo-1/screen.html) |
| 2 | Passo 2 · superfície plana | sem Figma | [telas/passo-2](telas/passo-2/screen.html) |
| 3 | Passo 3 · enquadrar | sem Figma | [telas/passo-3](telas/passo-3/screen.html) |

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
| DOC-02 | Seleção do documento · estrangeiro | Passaporte · Tirar foto do documento | Caminho principal | — |
| DOC-40 | Passaporte · câmera da página | Voltar | Voltar | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | Voltar | Voltar | — |
| DOC-40 | Passaporte · câmera da página | Abrir câmera ou Pular | Caminho principal | — |

## Pendências

- As imagens vêm do Figma e são provisórias (mascote e arte do CRNM).
- Textos que mudaram em relação ao Figma precisam voltar para o Figma, se aprovados.
- Textos novos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- Abre no passo 1, com Voltar e "Pular" no header.
- No último passo aparecem o botão "Abrir câmera" e, quando houver, a moldura.
- Leitor de tela anuncia "Etapa N de M" e o título ao avançar.
