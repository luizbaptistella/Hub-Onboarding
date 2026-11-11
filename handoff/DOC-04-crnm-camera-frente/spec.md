# DOC-04 · CRNM · câmera da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-08.** Terceira tela da reconstrução do fluxo de documento de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-04` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | `2788:34617` (enquadrando), `2788:34644` (enquadrado) · seção `2283:33539` |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 5 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · vídeo simulado com fotos em [img/](img/) · componentes em [components.json](components.json) · gerador `build-tools/estrangeiro/doc04-crnm-camera-frente.html` |
| Regras do módulo | [regras-do-modulo.md](../DOC-02-selecao-documento-estrangeiro/regras-do-modulo.md) (§3.3 captura por câmera) |

## Objetivo

Fotografar a frente do CRNM com a câmera do celular. A pessoa só enquadra: a foto é tirada sozinha quando o documento está na moldura.

## Componentes

1 componente do DS, 5 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

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
| 1 | Enquadrando | [`2788:34617`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34617) | [telas/enquadrando](telas/enquadrando/screen.html) |
| 2 | Enquadrado | [`2788:34644`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34644) | [telas/enquadrado](telas/enquadrado/screen.html) |
| 3 | Tirando a foto (sem Figma) | sem Figma | [telas/tirando-foto](telas/tirando-foto/screen.html) |
| 4 | Sem acesso à câmera (sem Figma) | sem Figma | [telas/sem-permissao](telas/sem-permissao/screen.html) |
| 5 | Câmera indisponível (sem Figma) | sem Figma | [telas/camera-indisponivel](telas/camera-indisponivel/screen.html) |

## Estados

| Variante | `state` | Faixa | Figma |
|---|---|---|---|
| Enquadrando | `aligning` | "Enquadre a frente do documento na moldura", cantos brancos | `2788:34617` |
| Enquadrado | `aligned` | Faixa verde, "Enquadramento perfeito!" (com a captura automática ligada: "… Segure firme…"), moldura contínua | `2788:34644` |
| Tirando a foto | `capturing` | "Tirando a foto…", disparo ocupado | sem Figma |
| Sem acesso à câmera | `denied` | "Sem acesso à câmera", como liberar, "Abrir configurações" e **"Voltar para a seleção"** (secondary) | sem Figma |
| Câmera indisponível | `unavailable` | "Câmera indisponível" e **"Voltar para a seleção"** (primary, única ação) | sem Figma |

Os estados `denied` e `unavailable` substituem as telas de erro de câmera propostas antes ("Permissão negada" e "Câmera indisponível"): agora são estados do próprio componente do DS.

## Melhorias em relação ao Figma

| # | Figma | Hub (DS aplicado) | Por quê |
|---|---|---|---|
| 1 | Moldura e faixa desenhadas à mão | `CameraCapture` do DS com `frame="card"` (CRNM é cartão ID-1, 54:85,6) | Mesmas proporções em qualquer tela, sem distorcer. |
| 2 | Instrução "Enquadre a frente do documento no centro da moldura" | "Enquadre a frente do documento na moldura" | Curta e no imperativo (regra do DS). |
| 3 | Sem disparo, sem alternativa | "Tirar foto" sempre visível + captura automática (`autoCapture`) | Captura automática decidida no módulo; o botão garante o controle (WCAG 2.2.1, sem tempo limite). |
| 5 | Sem estados de permissão | `denied` e `unavailable` | Cobre câmera bloqueada e aparelho sem câmera. |
| 6 | Barra de status clara | Barra de status escura | A tela toda fica na cor da câmera, como pede o DS. |
| 7 | Foto de fundo do Figma traz um CRNM com rosto de pessoa (imagem gerada) | Foto montada com a madeira e o CRNM do mascote | Evita rosto de pessoa no material de handoff. |

## Comportamento

- Abre em "enquadrando". Quando o detector encontra o documento na moldura, vai para "enquadrado" e tira a foto sozinho em ~1 s; "Tirar foto" dispara na hora.
- Depois da foto, segue para a confirmação da frente (próxima tela, entra depois desta aprovação).
- Sem "Enviar arquivo" na câmera (decisão de 2026-11-08). O upload do CRNM fica só na seleção do documento (DOC-02).
- Sem acesso à câmera ou sem câmera: **"Voltar para a seleção"** leva à DOC-02, onde a pessoa escolhe "Fazer upload do documento" (decisão de 2026-11-08). É um `Button` do DS (`size="sm"`, ícone `arrow_back`) colocado no painel de ações do `CameraCapture`, depois das ações do componente: secondary abaixo de "Abrir configurações"; primary quando é a única ação.
- Voltar retorna ao tutorial (DOC-03).
- **Demonstração no hub:** as variantes abrem paradas. Tocar no visor alterna enquadrando ↔ enquadrado; depois do primeiro toque a captura automática passa a correr. Depois de "Tirando a foto…", a demonstração volta a "enquadrando".
- LGPD: parar a câmera ao sair da tela, não salvar a foto na galeria, enviar só o recorte da moldura, não registrar imagem em logs (regra do `CameraCapture`).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-03 | CRNM · tutorial da frente | Abrir câmera ou Pular | Caminho principal | — |
| DOC-05 | CRNM · confirmação da frente | Tirar outra foto ou Voltar | Caminho alternativo | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-03 | CRNM · tutorial da frente | Voltar | Voltar | — |
| DOC-02 | Seleção do documento · estrangeiro | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| DOC-05 | CRNM · confirmação da frente | Foto tirada | Caminho principal | Captura automática ou Tirar foto |

## Pendências

- **Textos fixos do DS nos estados de erro falam em enviar arquivo** ("Você também pode enviar um arquivo." / "Envie a foto ou o PDF do documento."). Com o "Voltar para a seleção", a pessoa chega ao upload, mas o texto não diz o caminho. Pedir ao DS textos configuráveis e uma ação extra no painel (hoje a tela insere o botão no painel do componente).
- O DS pede "Enviar arquivo" sempre ("câmera nunca é o único caminho"). Esta tela segue a decisão do produto; registrar a exceção no DS.

- Detector de enquadramento e avisos ("Aproxime o documento", "Evite reflexo", "Segure firme"): textos curtos no imperativo, um por vez. As propostas antigas (imagem borrada, fora da moldura, pouca luz) viram valores de `instruction`.
- Estados `capturing`, `denied` e `unavailable` precisam ir para o Figma.

## Critérios de aceite

- A instrução é a única região viva; trocar de estado não relê o Voltar.
- Em "enquadrado", forma, ícone e texto mostram o enquadramento, não só a cor.
- "Tirar foto" sempre disponível enquanto a câmera está aberta.
- Sem "Enviar arquivo" no rodapé.
- Sem acesso à câmera ou sem câmera, "Voltar para a seleção" leva à DOC-02.
