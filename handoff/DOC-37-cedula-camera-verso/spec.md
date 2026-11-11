# DOC-37 · Cédula · câmera do verso

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão.** Tela gerada a partir da tela aprovada de referência; validar em conjunto com as demais telas do fluxo de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-37` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | [`2799:36455`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2799-36455) (seção `2283:33539`) |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 5 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · componentes em [components.json](components.json) |

## Objetivo

Fotografar o verso inteiro da Cédula. A foto é tirada sozinha quando o documento está enquadrado.

## Componentes

1 componente do DS, 5 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `CameraCapture` | 5 | `<CameraCapture state="aligning" frame="card" instruction="Enquadre o verso do documento no centro da moldura" autoCapture onBack={() => {}} onCapture={() => {}} onOpenSettings={() => {}} />` | state | No app, autoCapture={true} (captura automática decidida). No hub, a captura automática só liga depois do primeiro toque no visor. |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Vídeo da câmera (simulado) | No app é o <video> da câmera (getUserMedia), passado como children do CameraCapture. Aqui é uma foto. |

## Notas de componentes

- Barra de status escura (mock do sistema, não implementar).
- `CameraCapture` do DS com `frame="card"` e captura automática.

## Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Enquadrando | [`2799:36455`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2799-36455) | [telas/enquadrando](telas/enquadrando/screen.html) |
| 2 | Enquadrado | [`2799:36486`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2799-36486) | [telas/enquadrado](telas/enquadrado/screen.html) |
| 3 | Tirando a foto (sem Figma) | sem Figma | [telas/tirando-foto](telas/tirando-foto/screen.html) |
| 4 | Sem acesso à câmera (sem Figma) | sem Figma | [telas/sem-permissao](telas/sem-permissao/screen.html) |
| 5 | Câmera indisponível (sem Figma) | sem Figma | [telas/camera-indisponivel](telas/camera-indisponivel/screen.html) |

## Comportamento

- Mesmo comportamento da câmera da frente (DOC-34), para o verso inteiro.
- Depois da foto, segue para a confirmação do verso (DOC-38).
- Sem acesso à câmera ou câmera indisponível: "Voltar para a seleção" leva à DOC-02.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-36 | Cédula · tutorial do verso | Abrir câmera ou Pular | Caminho principal | — |
| DOC-38 | Cédula · confirmação do verso | Tirar outra foto ou Voltar | Caminho alternativo | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-36 | Cédula · tutorial do verso | Voltar | Voltar | — |
| DOC-38 | Cédula · confirmação do verso | Foto tirada | Caminho principal | Captura automática ou Tirar foto |
| DOC-02 | Seleção do documento · estrangeiro | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |

## Pendências

- Se houver linhas de código (sinais <<<), elas precisam aparecer nítidas; não há detecção específica na implementação atual.
- O botão "Tirar foto" ainda aparece mesmo com a captura automática.
- A imagem de simulação é provisória.
- Textos novos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- A moldura cobre o documento inteiro.
- Sem acesso ou sem câmera, "Voltar para a seleção" leva à DOC-02.
