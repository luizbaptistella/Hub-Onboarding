# DOC-05 · CRNM · confirmação da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-08.** Quarta tela da reconstrução do fluxo de documento de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-05` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | `2788:34658` · seção `2283:33539` |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 1 variantes em [telas/](telas/) ([tela.js](tela.js)) · foto em [img/frente.jpg](img/frente.jpg) · componentes em [components.json](components.json) · gerador `build-tools/estrangeiro/doc05-crnm-confirmacao-frente.html` |
| Regras do módulo | [regras-do-modulo.md](../DOC-02-selecao-documento-estrangeiro/regras-do-modulo.md) |

## Objetivo

Depois da foto, a pessoa confere se a frente do CRNM ficou legível antes de seguir para o verso.

## Componentes

4 componentes do DS, 5 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar" }} title="Captura de documentos" progress={{ current: 2, total: 4 }} language={false} help={{ label: "Ajuda" }} />` | — | — |
| `PageHeading` | 1 | `<PageHeading tone="neutral" title="Confira a foto da frente" subtitle="Todos os dados precisam estar nítidos, sem reflexo e sem partes cortadas." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Image` | 1 | `<Image src="handoff/DOC-05-crnm-confirmacao-frente/img/frente.jpg" alt="Foto da frente do CRNM" fit="contain" rounded loading="eager" height="100%" />` | — | — |
| `Button` | 2 | `<Button variant="primary" iconEnd="arrow_forward" onClick={() => {}}>Continuar</Button>` | children, iconEnd, variant | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão | [`2788:34658`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34658) | [telas/padrao](telas/padrao/screen.html) |

## Melhorias em relação ao Figma

| # | Figma | Hub (DS aplicado) | Por quê |
|---|---|---|---|
| 1 | Header "Validação de Identidade" | `AppHeader` "Captura de documentos · Etapa 2 de 4" | Igual às outras telas da etapa. |
| 2 | Título "Confira se a frente do documento está legível." | "Confira a foto da frente" | Título curto e direto (regra do `PageHeading`). |
| 3 | "É importante que a foto do seu documento esteja legível, para validarmos ele o quanto antes." | "Todos os dados precisam estar nítidos, sem reflexo e sem partes cortadas." | Diz o que conferir, em vez de só pedir legibilidade. |
| 4 | Foto solta | `Image` com `fit="contain"` e cantos arredondados, sobre fundo neutro | A foto inteira aparece em qualquer altura de tela, sem cortar o documento. |
| 5 | Botões em posição fixa no desenho | Botões presos ao rodapé, a `space-300` da borda | Mesmo padrão do tutorial (DOC-03). |

## Comportamento

- "Continuar" segue para o verso do CRNM (próxima tela, entra depois desta aprovação).
- "Tirar outra foto" e Voltar reabrem a câmera da frente (DOC-04).
- A foto não fica salva na galeria do celular (regra do `CameraCapture`).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-04 | CRNM · câmera da frente | Foto tirada | Caminho principal | Captura automática ou Tirar foto |
| DOC-06 | CRNM · tutorial do verso | Voltar no passo 1 | Voltar | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-04 | CRNM · câmera da frente | Tirar outra foto ou Voltar | Caminho alternativo | — |
| DOC-06 | CRNM · tutorial do verso | Continuar | Caminho principal | — |

## Pendências

- Os textos novos de título e subtítulo precisam ir para o Figma, se aprovados.
- Confirmar se a foto da frente é enviada ao tocar em "Continuar" (aí o botão precisa do estado `loading`, "Enviando foto") ou só no fim, com o verso.

## Critérios de aceite

- A foto aparece inteira, sem cortes, entre o título e os botões.
- A foto tem texto alternativo ("Foto da frente do CRNM").
- "Continuar" e "Tirar outra foto" ficam no rodapé da tela.
