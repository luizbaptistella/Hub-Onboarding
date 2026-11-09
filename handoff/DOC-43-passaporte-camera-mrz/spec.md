# DOC-43 · Passaporte · leitura do código MRZ

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão.** Tela gerada a partir da tela aprovada de referência; validar em conjunto com as demais telas do fluxo de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-43` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | sem desenho (proposta do hub) |
| Status | Proposta do hub, com o DS aplicado |
| Marcação | 6 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · componentes em [components.json](components.json) |

## Objetivo

Enquadrar o código MRZ do passaporte na câmera. O código é lido por OCR da foto, sem a pessoa tirar uma foto nova do verso inteiro.

## Componentes

1 componente do DS, 6 instâncias, mais 3 peças fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `CameraCapture` | 6 | `<CameraCapture state="aligning" frame="card" instruction="Enquadre o código MRZ do passaporte na moldura" successMessage="Enquadramento perfeito!" autoCapture onBack={() => {}} onCapture=…` | state, successMessage | No app, autoCapture={true} (captura automática decidida). No hub, a captura automática só liga depois do primeiro toque no visor. |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Faixa do código (moldura horizontal) | Moldura de 335×93 desenhada sobre o visor; o CameraCapture do DS só tem molduras verticais. Proposta para o DS: ratio livre. |
| Vídeo da câmera (simulado) | No app é o <video> da câmera (getUserMedia), passado como children do CameraCapture. Aqui é uma foto. |

## Notas de componentes

- Barra de status escura (mock do sistema, não implementar).
- `CameraCapture` do DS com captura automática.
- Faixa do código de 335×93 desenhada sobre o visor (o DS só tem molduras verticais).
- Faixa do topo verde com "Código capturado com sucesso!", sem ícone.

## Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Enquadrando | sem Figma | [telas/enquadrando](telas/enquadrando/screen.html) |
| 2 | Enquadrado (lendo o MRZ) | sem Figma | [telas/enquadrado](telas/enquadrado/screen.html) |
| 3 | Código capturado (notificação e redirecionamento) | sem Figma | [telas/codigo-capturado](telas/codigo-capturado/screen.html) |
| 4 | Tirando a foto (sem Figma) | sem Figma | [telas/tirando-foto](telas/tirando-foto/screen.html) |
| 5 | Sem acesso à câmera (sem Figma) | sem Figma | [telas/sem-permissao](telas/sem-permissao/screen.html) |
| 6 | Câmera indisponível (sem Figma) | sem Figma | [telas/camera-indisponivel](telas/camera-indisponivel/screen.html) |

## Comportamento

- Abre em "enquadrando". Ao enquadrar a faixa, vai para "enquadrado" e a leitura acontece sozinha.
- Com o código lido e validado, a faixa do topo e a moldura ficam verdes.
- Voltar leva ao tutorial do código (DOC-42).
- Sem acesso à câmera ou câmera indisponível: "Voltar para a seleção" leva à DOC-02.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-42 | Passaporte · tutorial do código | Abrir câmera ou Pular | Caminho principal | — |
| DOC-44 | Passaporte · confirmação do código | Tirar outra foto ou Voltar | Caminho alternativo | — |
| DOC-46 | Passaporte · código não encontrado | Tirar outra foto | Caminho alternativo | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-42 | Passaporte · tutorial do código | Voltar | Voltar | — |
| DOC-44 | Passaporte · confirmação do código | Código MRZ capturado | Caminho principal | Captura automática ou Tirar foto |
| DOC-46 | Passaporte · código não encontrado | Código MRZ não encontrado | Erro ou nova tentativa | Leitura por OCR falhou |
| DOC-02 | Seleção do documento · estrangeiro | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |

## Pendências

- O botão "Tirar foto" ainda aparece na demonstração; com leitura automática, deve sair (pendência herdada da DOC-07).
- A máscara fora da faixa não escurece no hub (pendência herdada da DOC-07).
- Erro de leitura do código: nem sempre definido; ver a tela de erro correspondente.
- A imagem de simulação é a do CRNM (provisória).
- Textos novos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- A faixa tem a mesma posição e tamanho do Figma (335×93).
- Em "código capturado", a moldura fica verde e a mensagem aparece sem ícone.
