# DOC-17 · DPRNM · câmera da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-09.** Segunda tela do DPRNM. Segue a câmera da frente do CRNM (DOC-04), com o título do DPRNM.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-17` |
| Raia | Documento de identidade · estrangeiro · DPRNM |
| Figma | `2794:35511` (enquadrando), `2794:35538` (enquadrado) · seção `2283:33539` |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 5 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · vídeo simulado em [img/](img/) · gerador `build-tools/estrangeiro/doc17-dprnm-camera-frente.html` |

## Objetivo

Fotografar a frente do DPRNM. A foto é tirada sozinha quando o documento está enquadrado.

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

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Enquadrando | [`2794:35511`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2794-35511) | [telas/enquadrando](telas/enquadrando/screen.html) |
| 2 | Enquadrado | [`2794:35538`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2794-35538) | [telas/enquadrado](telas/enquadrado/screen.html) |
| 3 | Tirando a foto (sem Figma) | sem Figma | [telas/tirando-foto](telas/tirando-foto/screen.html) |
| 4 | Sem acesso à câmera (sem Figma) | sem Figma | [telas/sem-permissao](telas/sem-permissao/screen.html) |
| 5 | Câmera indisponível (sem Figma) | sem Figma | [telas/camera-indisponivel](telas/camera-indisponivel/screen.html) |

## Componentes e estados

Igual à câmera da frente do CRNM (DOC-04): `CameraCapture` do DS com `frame="card"`, captura automática, e os estados enquadrando, enquadrado, tirando a foto, sem acesso à câmera e câmera indisponível. Os textos e as ações de erro são os da DOC-04.

## Pendências

- As imagens de simulação são as do CRNM (provisórias), como no Figma.
- A moldura é a de cartão; confirmar se o DPRNM tem o mesmo tamanho do CRNM.
- O DPRNM tem o verso com QR Code, lido por OCR (decisão de 2026-11-09). A câmera do verso entra depois desta aprovação.
- Os textos de erro de câmera seguem a pendência da DOC-04: sem "Enviar arquivo", o erro leva à seleção.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-16 | DPRNM · tutorial da frente | Abrir câmera ou Pular | Caminho principal | — |
| DOC-18 | DPRNM · confirmação da frente | Tirar outra foto ou Voltar | Caminho alternativo | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-16 | DPRNM · tutorial da frente | Voltar | Voltar | — |
| DOC-02 | Seleção do documento · estrangeiro | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| DOC-18 | DPRNM · confirmação da frente | Foto tirada | Caminho principal | Captura automática ou Tirar foto |

## Critérios de aceite

- Abre enquadrando; ao enquadrar, tira a foto sozinha.
- Sem acesso ou sem câmera, "Voltar para a seleção" leva à DOC-02.
