# DOC-19 · DPRNM · tutorial do verso (QR Code)

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.
> **Aprovada em 2026-11-09.** Quarta tela do DPRNM. Segue o tutorial do verso do CRNM (DOC-06), com o QR Code no lugar do código MRZ.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-19` |
| Raia | Documento de identidade · estrangeiro · DPRNM |
| Figma | `2794:35566`, `2794:35588` (intros 4 e 5 do DPRNM · foto) · seção `2283:33539` |
| Status | Desenhada no Figma · DS aplicado, com moldura do QR desenhada na imagem |
| Marcação | 2 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · imagens em [img/](img/) · gerador `build-tools/estrangeiro/doc19-dprnm-tutorial-verso.html` |

## Objetivo

Explicar que a foto agora é do verso e que o que importa é o QR Code, no canto superior direito. O QR é lido por OCR da foto capturada pela câmera (decisão de 2026-11-09).

## Componentes

1 componente do DS, 2 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `Tutorial` | 2 | `<Tutorial label="Como fotografar o QR Code do verso do DPRNM" title="Foto do documento" steps={[{ title: "Vire o documento", description: "Agora vamos fotografar o QR Code: ele fica no ca…` | defaultStep | — |

Peças fora do DS (só no protótipo ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Número do 2.º tutorial | O número visível do passo é trocado por 2 (sequência de tutoriais do fluxo). Proposta para o Tutorial: prop de número inicial. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Passo 1 · virar o documento | [`2794:35566`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2794-35566) | [telas/passo-1](telas/passo-1/screen.html) |
| 2 | Passo 2 · enquadrar o QR Code | [`2794:35588`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2794-35588) | [telas/passo-2](telas/passo-2/screen.html) |

## Passos

| Passo | Título | Texto | Imagem | Figma |
|---|---|---|---|---|
| 1 | Vire o documento | Agora vamos fotografar o QR Code: ele fica no canto superior direito do verso. | [passo-1.jpg](img/passo-1.jpg) | `2794:35566` |
| 2 | Enquadre o QR Code | Posicione o QR Code dentro da moldura e confira se a imagem está nítida. | [passo-2.jpg](img/passo-2.jpg), com a moldura do QR | `2794:35588` |

## Melhorias em relação ao Figma

| # | Figma | Hub | Por quê |
|---|---|---|---|
| 1 | "Agora, vamos capturar o QR Code no verso." / "Vire o documento. O QR Code fica no canto superior direito do verso. Mantenha o documento em uma superfície plana…" | "Vire o documento" / "Agora vamos fotografar o QR Code: ele fica no canto superior direito do verso." | Título com a ação; a superfície já foi explicada na frente. |
| 2 | "Enquadre o QR Code dentro da moldura." / "Posicione a câmera do celular enquadrando o QR Code do verso…" | "Enquadre o QR Code" / "Posicione o QR Code dentro da moldura e confira se a imagem está nítida." | Mais curto, mesmo padrão do CRNM. |

## Pendências

- As imagens do Figma para o verso são as do CRNM (provisórias). O verso do DPRNM precisa de foto própria, com o QR visível.
- Confirmar a posição do QR no DPRNM real; a moldura está desenhada para o canto superior direito.
- Textos novos precisam ir para o Figma, se aprovados.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-18 | DPRNM · confirmação da frente | Continuar | Caminho principal | — |
| DOC-20 | DPRNM · captura do código do verso | Voltar | Voltar | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-18 | DPRNM · confirmação da frente | Voltar no passo 1 | Voltar | — |
| DOC-20 | DPRNM · captura do código do verso | Abrir câmera ou Pular | Caminho principal | — |

## Critérios de aceite

- Abre no passo 1 ("Etapa 1 de 2"), com Voltar e Pular.
- No passo 2, a moldura marca só o QR Code, e o botão é "Abrir câmera".
