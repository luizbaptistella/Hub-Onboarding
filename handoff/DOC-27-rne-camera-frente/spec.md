# DOC-27 · RNE · câmera da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão.** Tela gerada a partir da tela aprovada de referência; validar em conjunto com as demais telas do fluxo de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-27` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | [`1620:12173`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-12173) (seção `2283:33539`) |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 5 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · componentes em [components.json](components.json) |

## Objetivo

Fotografar a frente do RNE. A foto é tirada sozinha quando o documento está enquadrado.

## Componentes

1 componente do DS, 5 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `CameraCapture` | 5 | `<CameraCapture state="aligning" frame="card" instruction="Enquadre a frente do documento na moldura" autoCapture onBack={() => {}} onCapture={() => {}} onOpenSettings={() => {}} />` | state | No app, autoCapture={true} (captura automática decidida). No hub, a captura automática só liga depois do primeiro toque no visor. |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Vídeo da câmera (simulado) | No app é o <video> da câmera (getUserMedia), passado como children do CameraCapture. Aqui é uma foto. |

## Notas de componentes

- Barra de status escura (mock do sistema, não implementar).
- `CameraCapture` do DS com `frame="card"` e captura automática.
- Vídeo simulado com foto no hub; no app é o `<video>` da câmera.

## Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Enquadrando | [`1620:12173`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-12173) | [telas/enquadrando](telas/enquadrando/screen.html) |
| 2 | Enquadrado | [`1620:12159`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-12159) | [telas/enquadrado](telas/enquadrado/screen.html) |
| 3 | Tirando a foto (sem Figma) | sem Figma | [telas/tirando-foto](telas/tirando-foto/screen.html) |
| 4 | Sem acesso à câmera (sem Figma) | sem Figma | [telas/sem-permissao](telas/sem-permissao/screen.html) |
| 5 | Câmera indisponível (sem Figma) | sem Figma | [telas/camera-indisponivel](telas/camera-indisponivel/screen.html) |

## Comportamento

- Abre em "enquadrando". Ao enquadrar, vai para "enquadrado" e tira a foto em cerca de 1 s; "Tirar foto" dispara na hora.
- Depois da foto, segue para a confirmação.
- Voltar leva ao tutorial da frente (DOC-26).
- Sem acesso à câmera ou câmera indisponível: "Voltar para a seleção" leva à seleção do documento (DOC-02).
- Demonstração no hub: as variantes abrem paradas; tocar no visor alterna enquadrando ↔ enquadrado, e a captura automática passa a correr depois do primeiro toque.
- LGPD: parar a câmera ao sair, não salvar a foto na galeria e enviar só o recorte da moldura.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-26 | RNE · tutorial da frente | Abrir câmera ou Pular | Caminho principal | — |
| DOC-28 | RNE · confirmação da frente | Tirar outra foto ou Voltar | Caminho alternativo | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-26 | RNE · tutorial da frente | Voltar | Voltar | — |
| DOC-02 | Seleção do documento · estrangeiro | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| DOC-28 | RNE · confirmação da frente | Foto tirada | Caminho principal | Captura automática ou Tirar foto |

## Pendências

- O botão "Tirar foto" ainda aparece, porque o `CameraCapture` do DS sempre o mostra; com captura automática, deve sair (pendência herdada da DOC-07).
- Estados "tirando a foto", "sem acesso" e "indisponível" não estão no Figma.
- A imagem de simulação é a do CRNM (provisória).
- Textos novos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- A moldura cobre o documento sem cortar.
- Em "enquadrado", forma, ícone e texto mostram o enquadramento, não só a cor.
- Sem acesso ou sem câmera, "Voltar para a seleção" leva à DOC-02.
