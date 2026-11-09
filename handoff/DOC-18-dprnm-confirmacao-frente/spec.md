# DOC-18 · DPRNM · confirmação da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-09.** Terceira tela do DPRNM. Segue a confirmação da frente do CRNM (DOC-05).

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-18` |
| Raia | Documento de identidade · estrangeiro · DPRNM |
| Figma | `2794:35552` · seção `2283:33539` |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 1 variantes em [telas/](telas/) ([tela.js](tela.js)) · foto em [img/frente.jpg](img/frente.jpg) · gerador `build-tools/estrangeiro/doc18-dprnm-confirmacao-frente.html` |

## Objetivo

Depois da foto da frente, a pessoa confere se o DPRNM ficou nítido antes de seguir para o verso.

## Componentes

4 componentes do DS, 5 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar" }} title="Captura de documentos" progress={{ current: 2, total: 4 }} language={false} help={{ label: "Ajuda" }} />` | — | — |
| `PageHeading` | 1 | `<PageHeading tone="neutral" title="Confira a foto da frente" subtitle="Todos os dados precisam estar nítidos, sem reflexo e sem partes cortadas." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Image` | 1 | `<Image src="handoff/DOC-18-dprnm-confirmacao-frente/img/frente.jpg" alt="Foto da frente do DPRNM" fit="contain" rounded loading="eager" height="100%" />` | — | — |
| `Button` | 2 | `<Button variant="primary" iconEnd="arrow_forward" onClick={() => {}}>Continuar</Button>` | children, iconEnd, variant | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão | [`2794:35552`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2794-35552) | [telas/padrao](telas/padrao/screen.html) |

## Pendências

- A foto é a provisória do CRNM, como no Figma do DPRNM. Trocar pela foto do DPRNM.
- O título e o subtítulo usam os textos aprovados no CRNM. O Figma do DPRNM diz "Confira se a frente do documento está legível." Decidir se mantém o padrão do CRNM.
- "Continuar" leva ao tutorial do verso do DPRNM, que ainda não foi desenhado.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-17 | DPRNM · câmera da frente | Foto tirada | Caminho principal | Captura automática ou Tirar foto |
| DOC-19 | DPRNM · tutorial do verso (QR Code) | Voltar no passo 1 | Voltar | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-17 | DPRNM · câmera da frente | Tirar outra foto ou Voltar | Caminho alternativo | — |
| DOC-19 | DPRNM · tutorial do verso (QR Code) | Continuar | Caminho principal | — |

## Critérios de aceite

- A foto aparece inteira, sem cortes, com texto alternativo.
- Os dois botões ficam no rodapé.
