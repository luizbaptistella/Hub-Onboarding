# DOC-46 · Passaporte · código não encontrado

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão.** Tela gerada a partir da tela aprovada de referência; validar em conjunto com as demais telas do fluxo de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-46` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | sem desenho (proposta do hub) |
| Status | Proposta do hub, com o DS aplicado |
| Marcação | 1 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · componentes em [components.json](components.json) |

## Objetivo

Avisar, na câmera, que o código do passaporte não foi encontrado e orientar o enquadramento da faixa de letras e números.

## Componentes

1 componente do DS, 1 instância, mais 3 peças fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `CameraCapture` | 1 | `<CameraCapture state="aligning" frame="card" instruction="Não encontramos o código. Enquadre a faixa de letras e números." successMessage="Enquadramento perfeito!" autoCapture onBack={() …` | — | No app, autoCapture={true} (captura automática decidida). No hub, a captura automática só liga depois do primeiro toque no visor. |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Vídeo da câmera (simulado) | No app é o <video> da câmera (getUserMedia), passado como children do CameraCapture. Aqui é uma foto. |
| Faixa do código (moldura horizontal) | Moldura de 335×93 desenhada sobre o visor; o CameraCapture do DS só tem molduras verticais. Proposta para o DS: ratio livre. |

## Notas de componentes

- Barra de status escura (mock do sistema, não implementar).
- `CameraCapture` do DS com a instrução de erro na faixa do topo.
- Faixa do código desenhada sobre o visor.

## Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão (sem Figma) | sem Figma | [telas/padrao](telas/padrao/screen.html) |

## Comportamento

- Aparece como estado da câmera do código quando a leitura por OCR não encontra o MRZ.
- Depois de enquadrar de novo, a leitura segue e a pessoa vai para a confirmação do código (DOC-44).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-43 | Passaporte · leitura do código MRZ | Código MRZ não encontrado | Erro ou nova tentativa | Leitura por OCR falhou |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-43 | Passaporte · leitura do código MRZ | Tirar outra foto | Caminho alternativo | — |

## Pendências

- Tela proposta, sem Figma.
- Quantas tentativas antes de pedir ajuda ou bloquear não está definido.
- Textos novos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- A mensagem diz o que fazer ("Enquadre a faixa de letras e números").
- A faixa fica visível e a câmera continua aberta.
