# DOC-26 · RNE · tutorial da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão.** Primeira tela do RNE. Segue o tutorial da frente do CRNM e do DPRNM, com o texto do Figma no primeiro passo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-26` |
| Raia | Documento de identidade · estrangeiro · RNE |
| Figma | `1817:51415`, `1817:51360`, `1817:51297` (intros 1 a 3 do RNE · foto) · seção `2283:33539` |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 3 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · imagens em [img/](img/) · gerador `build-tools/estrangeiro/doc26-rne-tutorial-frente.html` |

## Objetivo

Preparar a pessoa para fotografar a frente do RNE (Registro Nacional de Estrangeiros).

## Componentes

1 componente do DS, 3 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `Tutorial` | 3 | `<Tutorial label="Como fotografar a frente do RNE" title="Foto do documento" steps={[{ title: "Vamos capturar a frente do RNE", description: "É importante que o documento esteja atualizado…` | defaultStep | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Passo 1 · frente do RNE | [`1817:51415`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1817-51415) | [telas/passo-1](telas/passo-1/screen.html) |
| 2 | Passo 2 · superfície plana | [`1817:51360`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1817-51360) | [telas/passo-2](telas/passo-2/screen.html) |
| 3 | Passo 3 · enquadrar | [`1817:51297`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1817-51297) | [telas/passo-3](telas/passo-3/screen.html) |

## Passos

| Passo | Título | Texto | Imagem | Figma |
|---|---|---|---|---|
| 1 | Vamos capturar a frente do RNE | É importante que o documento esteja atualizado e com todas as informações legíveis. | [passo-1.jpg](img/passo-1.jpg) | `1817:51415` |
| 2 | Coloque o documento numa superfície plana | Use uma superfície clara e limpa, num lugar bem iluminado. | [passo-2.jpg](img/passo-2.jpg) | `1817:51360` |
| 3 | Enquadre a frente do documento | Posicione o documento dentro da moldura e confira se a imagem está nítida e todas as informações legíveis. | [passo-3.jpg](img/passo-3.jpg) + moldura do DS | `1817:51297` |

## Melhorias em relação ao Figma

| # | Figma | Hub | Por quê |
|---|---|---|---|
| 1 | Passo 2: "Posicione o documento em uma superfície plana" / "A superfície deve ser plana…" | "Coloque o documento numa superfície plana" / "Use uma superfície clara e limpa, num lugar bem iluminado." | Mesmo texto aprovado no CRNM e no DPRNM. |
| 2 | Passo 3: "Enquadre o documento dentro da moldura" | "Enquadre a frente do documento" | Mesmo texto aprovado no CRNM e no DPRNM. |

## Pendências

- **Imagens provisórias:** as telas do RNE no Figma usam a arte do CRNM. Trocar pela foto do RNE quando estiver pronta.
- **RNE aberto na seleção:** o Figma não desenhou a seleção com o RNE aberto. A DOC-02 usa o mesmo padrão do CRNM (foto e upload).
- **Verso do RNE:** o Figma tem o código do verso (MRZ), com as mesmas telas do CRNM. Desenhar nas próximas telas.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | RNE · Tirar foto do documento | Caminho principal | RNE aberto (sem Figma da seleção) |
| DOC-27 | RNE · câmera da frente | Voltar | Voltar | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | Voltar no passo 1 | Voltar | — |
| DOC-27 | RNE · câmera da frente | Abrir câmera ou Pular | Caminho principal | — |

## Critérios de aceite

- Abre no passo 1, com Voltar, "Foto do documento" e "Pular".
- No passo 3 aparecem a moldura e o botão "Abrir câmera".
- Voltar no passo 1 retorna à seleção do documento.
