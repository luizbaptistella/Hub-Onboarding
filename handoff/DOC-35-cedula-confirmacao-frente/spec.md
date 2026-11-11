# DOC-35 · Cédula · confirmação da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão.** Tela gerada a partir da tela aprovada de referência; validar em conjunto com as demais telas do fluxo de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-35` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | [`2799:36377`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2799-36377) (seção `2283:33539`) |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 1 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · componentes em [components.json](components.json) |

## Objetivo

Conferir a foto da frente da Cédula antes de seguir.

## Componentes

4 componentes do DS, 5 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar" }} title="Captura de documentos" progress={{ current: 2, total: 4 }} language={false} help={{ label: "Ajuda" }} />` | — | — |
| `PageHeading` | 1 | `<PageHeading tone="neutral" title="Confira a foto da frente" subtitle="Todos os dados precisam estar nítidos, sem reflexo e sem partes cortadas." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Image` | 1 | `<Image src="handoff/DOC-35-cedula-confirmacao-frente/img/frente.jpg" alt="Foto da frente da Cédula" fit="contain" rounded loading="eager" height="100%" />` | — | — |
| `Button` | 2 | `<Button variant="primary" iconEnd="arrow_forward" onClick={() => {}}>Continuar</Button>` | children, iconEnd, variant | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Notas de componentes

- Barra de status (mock do sistema, não implementar).
- `AppHeader` "Captura de documentos · Etapa 2 de 4".
- `PageHeading` "Confira a foto da frente".
- `Image` com a foto inteira (`fit="contain"`).
- Dois `Button` presos ao rodapé: "Continuar" e "Tirar outra foto".

## Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão | [`2799:36377`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2799-36377) | [telas/padrao](telas/padrao/screen.html) |

## Comportamento

- "Continuar" segue para o tutorial do verso da Cédula (DOC-36).
- "Tirar outra foto" e Voltar reabrem a câmera.
- A foto não fica salva na galeria do celular.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-34 | Cédula · câmera da frente | Foto tirada | Caminho principal | Captura automática ou Tirar foto |
| DOC-36 | Cédula · tutorial do verso | Voltar no passo 1 | Voltar | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-34 | Cédula · câmera da frente | Tirar outra foto ou Voltar | Caminho alternativo | — |
| DOC-36 | Cédula · tutorial do verso | Continuar | Caminho principal | — |

## Pendências

- A foto é provisória (arte do CRNM), como no Figma.
- Confirmar se a foto é enviada ao tocar em "Continuar" (o botão precisaria do estado de envio) ou só no fim do fluxo.
- Textos novos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- A foto aparece inteira, sem cortes, com texto alternativo.
- Os dois botões ficam no rodapé.
