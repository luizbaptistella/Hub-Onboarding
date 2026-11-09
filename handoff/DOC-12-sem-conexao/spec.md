# DOC-12 · Sem conexão ao enviar o documento

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-09.** Primeira das telas de erro de sistema do CRNM. Sem desenho no Figma (proposta do hub).

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-12` |
| Raia | Documento de identidade · estrangeiro |
| Figma | sem desenho |
| Status | Proposta do hub, com o DS aplicado |
| Marcação | 3 variantes em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/estrangeiro/doc12-sem-conexao.html` |

## Objetivo

Avisar que o envio falhou por falta de internet e deixar a pessoa tentar de novo sem refazer a foto ou a escolha do arquivo.

## Componentes

3 componentes do DS, 3 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar" }} title="Captura de documentos" progress={{ current: 2, total: 4 }} language={false} help={{ label: "Ajuda" }} />` | — | — |
| `ResultHero` | 1 | `<ResultHero tone="danger" icon="wifi_off" title="Sem conexão" description="Verifique sua internet e tente de novo. Suas fotos foram mantidas." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Button` | 1 | `<Button variant="primary" iconEnd="refresh" onClick={() => {}}>Tentar novamente</Button>` | — | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Volta ao upload do CRNM | sem Figma | [telas/padrao](telas/padrao/screen.html) |
| 2 | Volta ao upload do DPRNM | sem Figma | [telas/dprnm](telas/dprnm/screen.html) |
| 3 | Volta ao upload do RNE | sem Figma | [telas/rne](telas/rne/screen.html) |

## Comportamento

- Esta tela serve ao CRNM e ao DPRNM. Com `volta=dprnm` (variante "DPRNM" no hub), "Tentar novamente" volta ao upload do DPRNM (DOC-21). Sem isso, volta ao upload do CRNM (DOC-09).

- "Tentar novamente" reenvia com os arquivos já escolhidos (DOC-09, com os dois arquivos).
- A tela não apaga nada: as fotos e os arquivos ficam guardados.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-09 | CRNM · upload da frente e do verso | Enviar documento sem conexão | Erro ou nova tentativa | Erro de conexão no envio |
| DOC-21 | DPRNM · upload da frente e do verso | Sem conexão ao enviar (DPRNM) | Erro ou nova tentativa | Erro de conexão no envio |
| DOC-31 | RNE · upload da frente e do verso | Sem conexão ao enviar (RNE) | Erro ou nova tentativa | Erro de conexão no envio |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-09 | CRNM · upload da frente e do verso | Tentar novamente | Caminho alternativo | — |
| DOC-21 | DPRNM · upload da frente e do verso | Tentar novamente | Caminho alternativo | Envio do DPRNM |
| DOC-31 | RNE · upload da frente e do verso | Tentar novamente | Caminho alternativo | Envio do RNE |

## Pendências

- Os textos precisam ir para o Figma, se aprovados.
- Ainda falta decidir se "Tentar novamente" reenvia sozinho quando a conexão volta.

## Critérios de aceite

- O título é o único `h1`.
- "Tentar novamente" leva de volta ao envio, com os arquivos mantidos.
