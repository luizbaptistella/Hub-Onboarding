# DOC-06 · CRNM · tutorial do verso

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-08.** Quinta tela da reconstrução do fluxo de documento de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-06` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | `2788:34672`, `2788:34694` (intros 4 e 5 do CRNM · foto) · seção `2283:33539` |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 2 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · imagens em [img/](img/) · componentes em [components.json](components.json) · gerador `build-tools/estrangeiro/doc06-crnm-tutorial-verso.html` |
| Regras do módulo | [regras-do-modulo.md](../DOC-02-selecao-documento-estrangeiro/regras-do-modulo.md) |

## Objetivo

Explicar que agora a foto é do verso e que o que importa é o código (MRZ): as três linhas de letras, números e sinais `<<<` na parte de baixo.

## Componentes

1 componente do DS, 2 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `Tutorial` | 2 | `<Tutorial label="Como fotografar o código do verso do CRNM" title="Foto do documento" steps={[{ title: "Vire o documento", description: "Agora vamos fotografar o código: as três linhas de…` | defaultStep | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Número do 2.º tutorial | O número visível do passo é trocado por 2 (sequência de tutoriais do fluxo). Proposta para o Tutorial: prop de número inicial. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Passo 1 · virar o documento | [`2788:34672`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34672) | [telas/passo-1](telas/passo-1/screen.html) |
| 2 | Passo 2 · enquadrar o código | [`2788:34694`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34694) | [telas/passo-2](telas/passo-2/screen.html) |

## Passos

| Passo | Título | Texto | Imagem | Figma |
|---|---|---|---|---|
| 1 | Vire o documento | Agora vamos fotografar o código: as três linhas de letras e números na parte de baixo do verso. | [passo-1.jpg](img/passo-1.jpg) | `2788:34672` |
| 2 | Enquadre o código | Posicione as três linhas do código dentro da moldura e confira se a imagem está nítida. | [passo-2.jpg](img/passo-2.jpg), com a moldura da faixa do código | `2788:34694` |

- **Moldura do código:** o `frame` do Tutorial só tem a proporção do documento em pé (160:402). A faixa do código é horizontal, então a moldura está desenhada na imagem, no estilo do `ScanFrame` (cantos de 6px em `border-brand`, braço de 28px). Proposta para o DS: `frame` com proporção (`ratio`) no passo do Tutorial.
- **Rosto no verso:** as imagens do Figma trazem uma foto pequena de pessoa (imagem gerada). Foi coberta com o mascote, como o próprio Figma faz na intro 5.

## Melhorias em relação ao Figma

| # | Figma | Hub (DS aplicado) | Por quê |
|---|---|---|---|
| 1 | 2 telas soltas, numeradas 4 e 5 (continuando a frente) | Um `Tutorial` do DS com 2 passos, numerados 1 e 2 | O DS numera cada tutorial do 1; o leitor de tela ouve "Etapa 1 de 2". |
| 2 | "Agora, vamos capturar o código no verso." | **"Vire o documento"** | Título no imperativo, com a ação. |
| 3 | "Vire o documento. O código fica na parte de baixo do verso. Mantenha o documento em uma superfície plana, de cor clara e em um ambiente bem iluminado." | "Agora vamos fotografar o código: as três linhas de letras e números na parte de baixo do verso." | Uma frase só, que descreve o código para quem não sabe o que é MRZ. A superfície já foi explicada no tutorial da frente. |
| 4 | "Enquadre o código dentro da moldura." / "Posicione a câmera do celular enquadrando o código do verso dentro da moldura. Certifique-se…" | "Enquadre o código" / "Posicione as três linhas do código dentro da moldura e confira se a imagem está nítida." | Mais curto, e repete o que é o código. |
| 5 | "Continuar" no último passo | "Abrir câmera" + "Pular" no header | Mesmo padrão da DOC-03. |

## Comportamento

- "Continuar" avança; Voltar recua. No passo 1, Voltar volta para a confirmação da frente (DOC-05).
- "Pular" e "Abrir câmera" abrem a câmera do verso (próxima tela, entra depois desta aprovação).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-05 | CRNM · confirmação da frente | Continuar | Caminho principal | — |
| DOC-07 | CRNM · câmera do verso (código) | Voltar | Voltar | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-05 | CRNM · confirmação da frente | Voltar no passo 1 | Voltar | — |
| DOC-07 | CRNM · câmera do verso (código) | Abrir câmera ou Pular | Caminho principal | — |

## Pendências

- Textos novos precisam ir para o Figma, se aprovados.
- Imagens provisórias do Figma (com mascote).
- Proposta para o DS: proporção da moldura no passo do Tutorial.

## Critérios de aceite

- Abre no passo 1 ("Etapa 1 de 2"), com Voltar e Pular.
- No passo 2 a moldura marca só as três linhas do código, e o botão é "Abrir câmera".
- O passo 2 tem texto alternativo na imagem (a moldura não está no texto da tela).
