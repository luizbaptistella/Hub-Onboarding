# DOC-45 · Passaporte · página errada

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.
> **Em revisão.** Tela gerada a partir da tela aprovada de referência; validar em conjunto com as demais telas do fluxo de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-45` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | sem desenho (proposta do hub) |
| Status | Proposta do hub, com o DS aplicado |
| Marcação | 1 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · componentes em [components.json](components.json) |

## Objetivo

Avisar que a foto não é da página de dados do passaporte e pedir uma nova foto.

## Componentes

3 componentes do DS, 3 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar" }} title="Validação do passaporte" language={false} help={{ label: "Ajuda" }} />` | — | — |
| `ResultHero` | 1 | `<ResultHero tone="danger" icon="menu_book" title="Esta não é a página com sua foto" description="Abra o passaporte na página de dados, onde estão sua foto e seus dados pessoais." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Button` | 1 | `<Button variant="primary" iconEnd="arrow_forward" onClick={() => {}}>Tirar outra foto</Button>` | — | — |

Peças fora do DS (só no protótipo ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Notas de componentes

- Barra de status (mock do sistema, não implementar).
- `AppHeader` "Validação do passaporte".
- `ResultHero` com tom de erro, título "Esta não é a página com sua foto" e a orientação.
- `Button` "Tirar outra foto" no rodapé.

## Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão (sem Figma) | sem Figma | [telas/padrao](telas/padrao/screen.html) |

## Comportamento

- "Tirar outra foto" volta à câmera da página (DOC-40).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-40 | Passaporte · câmera da página | Página errada do passaporte | Erro ou nova tentativa | Não é a página com a foto |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-40 | Passaporte · câmera da página | Tirar outra foto | Caminho alternativo | — |

## Pendências

- Tela proposta, sem desenho no Figma; o Figma não tem o passaporte.
- Como o sistema decide que não é a página certa (detecção por foto do rosto ou por texto) não está definido.
- Textos novos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- O título é o único `h1`.
- "Tirar outra foto" fica no rodapé e volta à câmera.
