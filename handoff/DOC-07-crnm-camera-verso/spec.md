# DOC-07 · CRNM · leitura do código MRZ (verso)

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-08.** Esta é a última captura do CRNM. Não há captura nem confirmação do verso (decisão de 2026-11-08): a câmera lê só o MRZ.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-07` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | `2788:34736` (enquadrando), `2788:34767` (código capturado) · seção `2283:33539` |
| Status | Desenhada no Figma · DS aplicado, com faixa do código e notificação de sucesso |
| Marcação | 6 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · vídeo simulado em [img/](img/) · gerador `build-tools/estrangeiro/doc07-crnm-camera-verso.html` |

## Objetivo

Ler o código MRZ do verso do CRNM (as três linhas de letras e números) por visão computacional, sem a pessoa tirar foto. O resultado é validado via API dos certificados de atributos. Depois de lido, a pessoa segue para a validação facial.

## Como funciona

| Passo | O que acontece |
|---|---|
| 1 | A câmera abre com a faixa do código na tela e a instrução "Enquadre o código MRZ no verso do documento". |
| 2 | O detector encontra o código na faixa. A faixa muda para "Enquadramento perfeito!". |
| 3 | A leitura do MRZ acontece sozinha, sem botão. |
| 4 | A leitura é validada via API dos certificados de atributos. |
| 5 | Com o código lido e validado, a faixa do topo fica verde com a mensagem "Código capturado com sucesso!", sem ícone de check. Nenhuma outra notificação. |
| 6 | Sem nova tela, a pessoa segue para a validação facial (BIO-01). |

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
| 1 | Enquadrando | [`2788:34736`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34736) | [telas/enquadrando](telas/enquadrando/screen.html) |
| 2 | Enquadrado (lendo o MRZ) | [`2788:34767`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34767) | [telas/enquadrado](telas/enquadrado/screen.html) |
| 3 | Código capturado (notificação e redirecionamento) | [`2788:34767`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34767) | [telas/codigo-capturado](telas/codigo-capturado/screen.html) |
| 4 | Tirando a foto (sem Figma) | sem Figma | [telas/tirando-foto](telas/tirando-foto/screen.html) |
| 5 | Sem acesso à câmera (sem Figma) | sem Figma | [telas/sem-permissao](telas/sem-permissao/screen.html) |
| 6 | Câmera indisponível (sem Figma) | sem Figma | [telas/camera-indisponivel](telas/camera-indisponivel/screen.html) |

## Estados

| Variante | O que aparece | Figma |
|---|---|---|
| Enquadrando | Instrução e faixa branca | `2788:34736` |
| Enquadrado (lendo o MRZ) | "Enquadramento perfeito!" | `2788:34767` |
| Código capturado | Faixa verde, notificação e redirecionamento | `2788:34767` |
| Tirando a foto | Só implementada; a leitura é automática | sem Figma |
| Sem acesso à câmera | Texto do DS + "Voltar para a seleção" | sem Figma |
| Câmera indisponível | Texto do DS + "Voltar para a seleção" | sem Figma |

## Melhorias em relação ao Figma

| # | Figma | Hub | Por quê |
|---|---|---|---|
| 1 | Captura do verso inteiro, com confirmação | Só o MRZ, lido sem botão | Decisão de produto: o sistema lê o código e valida via API. |
| 2 | Faixa desenhada à mão | `CameraCapture` do DS com a faixa | Estados e textos vêm do componente. |
| 3 | Sucesso só na faixa | Faixa verde com a mensagem, sem ícone | Uma só mensagem de sucesso, sem repetição. |

## Comportamento

- Não há botão de disparo na tela de leitura: a leitura acontece sozinha. Em implementação atual, tocar no visor simula o enquadramento.
- Depois da leitura, a câmera para e a faixa do topo fica verde. A navegação para a validação facial acontece no app.
- "Voltar para a seleção" (sem acesso ou câmera indisponível) leva à DOC-02.
- Voltar leva ao tutorial do verso (DOC-06).
- LGPD: parar a câmera ao sair; não salvar a imagem; enviar só o recorte do código para a API.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-06 | CRNM · tutorial do verso | Abrir câmera ou Pular | Caminho principal | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-06 | CRNM · tutorial do verso | Voltar | Voltar | — |
| DOC-02 | Seleção do documento · estrangeiro | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| BIO-01 | Tutorial da captura | Código MRZ lido e validado via API | Automática (timer) | Sem confirmação do verso (decisão de 2026-11-08) |

## Pendências

- **Redirecionamento:** no hub, o destino (BIO-01) aparece como ligação no mapa, mas a tela não navega sozinha. No app, a navegação acontece depois da notificação. Definir o tempo da notificação antes do redirecionamento (proposta: 2 s).
- **Erro de leitura:** o que acontece se o MRZ não for lido ou não validar na API (aviso na faixa? nova tentativa?). Não está definido.
- **Ocultar o disparo:** o `CameraCapture` do DS mostra o botão "Tirar foto". Como a leitura é automática, o botão deve sair desta tela. Hoje ainda aparece na demonstração.
- A mensagem da faixa precisa ir para o Figma. A pessoa não vê a frase "Seguindo para a validação facial": o redirecionamento acontece sem aviso.
- A faixa é horizontal; o DS só tem molduras verticais. Proposta para o DS: proporção livre (`ratio`).
- Textos fixos do DS nos erros falam em enviar arquivo (mesma pendência da DOC-04).

## Critérios de aceite

- Sem botão de disparo; a leitura acontece sozinha quando o código está na faixa.
- A faixa fica verde e a notificação aparece na mesma tela, sem trocar de tela.
- Depois da leitura, a pessoa segue para a validação facial sem ação.
- Sem acesso à câmera ou câmera indisponível: "Voltar para a seleção" leva à DOC-02.
