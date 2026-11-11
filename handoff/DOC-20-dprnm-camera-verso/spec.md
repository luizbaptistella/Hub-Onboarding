# DOC-20 · DPRNM · captura do código do verso

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-09.** Mesmo layout da captura do código do CRNM (DOC-07). Não há captura de câmera do verso: a foto do verso já capturada é lida por OCR (decisão de 2026-11-09).

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-20` |
| Raia | Documento de identidade · estrangeiro · DPRNM |
| Figma | `2794:35630` (enquadrando), `2794:35661` (capturado) · seção `2283:33539` |
| Status | Desenhada no Figma · layout igual ao do CRNM (DOC-07) |
| Marcação | 6 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · imagens em [img/](img/) · gerador `build-tools/estrangeiro/doc20-dprnm-camera-verso.html` |

## Objetivo

Enquadrar o código do verso do DPRNM na câmera. A foto do verso é lida por OCR para extrair o código.

## Componentes

1 componente do DS, 6 instâncias, mais 3 peças fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `CameraCapture` | 6 | `<CameraCapture state="aligning" frame="card" instruction="Enquadre o código MRZ no verso do documento" successMessage="Enquadramento perfeito!" autoCapture onBack={() => {}} onCapture={()…` | state, successMessage | No app, autoCapture={true} (captura automática decidida). No hub, a captura automática só liga depois do primeiro toque no visor. |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Faixa do código (moldura horizontal) | Moldura de 335×93 desenhada sobre o visor; o CameraCapture do DS só tem molduras verticais. Proposta para o DS: ratio livre. |
| Vídeo da câmera (simulado) | No app é o <video> da câmera (getUserMedia), passado como children do CameraCapture. Aqui é uma foto. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Enquadrando | [`2794:35630`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2794-35630) | [telas/enquadrando](telas/enquadrando/screen.html) |
| 2 | Enquadrado (lendo o código) | [`2794:35661`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2794-35661) | [telas/enquadrado](telas/enquadrado/screen.html) |
| 3 | Código capturado (notificação e redirecionamento) | [`2794:35661`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2794-35661) | [telas/codigo-capturado](telas/codigo-capturado/screen.html) |
| 4 | Tirando a foto (sem Figma) | sem Figma | [telas/tirando-foto](telas/tirando-foto/screen.html) |
| 5 | Sem acesso à câmera (sem Figma) | sem Figma | [telas/sem-permissao](telas/sem-permissao/screen.html) |
| 6 | Câmera indisponível (sem Figma) | sem Figma | [telas/camera-indisponivel](telas/camera-indisponivel/screen.html) |

## Layout

Idêntico à DOC-07 (CRNM): barra de status escura, faixa com Voltar e instrução, faixa do código de 335×93 sobre o visor, e mensagem "Código capturado com sucesso!" na faixa verde, sem ícone.

| Variante | Faixa | Figma |
|---|---|---|
| Enquadrando | "Enquadre o código MRZ no verso do documento" | `2794:35630` |
| Enquadrado | "Enquadramento perfeito!" | `2794:35661` |
| Código capturado | Faixa verde, "Código capturado com sucesso!" | `2794:35661` |
| Tirando a foto | Implementação atual | sem Figma |
| Sem acesso à câmera | Texto do DS + "Voltar para a seleção" | sem Figma |
| Câmera indisponível | Texto do DS + "Voltar para a seleção" | sem Figma |

## Comportamento

- A foto do verso já capturada é lida por OCR. Lido e validado, o código fica verde e a pessoa segue para a validação facial (BIO-01), como no CRNM.
- Sem acesso à câmera ou câmera indisponível: "Voltar para a seleção" leva à DOC-02.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-19 | DPRNM · tutorial do verso (QR Code) | Abrir câmera ou Pular | Caminho principal | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-19 | DPRNM · tutorial do verso (QR Code) | Voltar | Voltar | — |
| DOC-02 | Seleção do documento · estrangeiro | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| BIO-01 | Tutorial da captura | QR Code lido por OCR | Automática (timer) | Próxima etapa: validação facial |

## Pendências

- **Código do DPRNM:** o DPRNM tem QR Code no verso, não MRZ. A tela segue o texto do CRNM, por pedido de 2026-11-09. Confirmar se o texto deve ser "QR Code" e se a faixa tem o mesmo tamanho.
- **Imagem:** a simulação usa a foto do CRNM, provisória.
- **Tutorial (DOC-19):** a moldura do tutorial ficou quadrada, em volta do QR. Se o layout deve ser exatamente o do CRNM, a DOC-19 também muda para a faixa.
- Pendências herdadas da DOC-07: botão "Tirar foto" ainda aparece na demonstração, e a máscara fora da faixa não escurece no hub.
