# DOC-14 · Erro inesperado ao enviar o documento

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-09.** Terceira das telas de erro de sistema do CRNM. Sem desenho no Figma (proposta do hub).

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-14` |
| Raia | Documento de identidade · estrangeiro |
| Figma | sem desenho |
| Status | Proposta do hub, com o DS aplicado |
| Marcação | 3 variantes em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/estrangeiro/doc14-erro-inesperado.html` |

## Objetivo

Avisar que algo deu errado, sem uma causa conhecida, e oferecer tentar de novo ou voltar à seleção do documento.

## Componentes

3 componentes do DS, 4 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar" }} title="Captura de documentos" progress={{ current: 2, total: 4 }} language={false} help={{ label: "Ajuda" }} />` | — | — |
| `ResultHero` | 1 | `<ResultHero tone="danger" icon="error" title="Algo deu errado" description="Ocorreu um erro inesperado. Tente novamente." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Button` | 2 | `<Button variant="primary" iconEnd="refresh" onClick={() => {}}>Tentar novamente</Button>` | children, iconEnd, variant | — |

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

- "Tentar novamente" reenvia com os arquivos guardados (DOC-09).
- "Voltar" leva à seleção do documento (DOC-02). Os arquivos não são mantidos ao voltar.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-09 | CRNM · upload da frente e do verso | Erro inesperado no envio | Erro ou nova tentativa | Falha de sistema não identificada |
| DOC-21 | DPRNM · upload da frente e do verso | Erro inesperado no envio (DPRNM) | Erro ou nova tentativa | Falha de sistema não identificada |
| DOC-31 | RNE · upload da frente e do verso | Erro inesperado no envio (RNE) | Erro ou nova tentativa | Falha de sistema não identificada |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-09 | CRNM · upload da frente e do verso | Tentar novamente | Caminho alternativo | — |
| DOC-02 | Seleção do documento · estrangeiro | Voltar | Voltar | — |
| DOC-21 | DPRNM · upload da frente e do verso | Tentar novamente | Caminho alternativo | Envio do DPRNM |
| DOC-31 | RNE · upload da frente e do verso | Tentar novamente | Caminho alternativo | Envio do RNE |

## Pendências

- Os textos precisam ir para o Figma, se aprovados.
- Decidir se "Voltar" também limpa os arquivos escolhidos ou mantém para a próxima vez.
- Registrar o código do erro para o suporte? Hoje a tela não mostra código.

## Critérios de aceite

- O título é o único `h1`.
- "Tentar novamente" e "Voltar" ficam no rodapé.

## Variante brasileira

Usada pelo fluxo de documento brasileiro (CIN, CNH e RG). Copy do hub (contexto de erro), sem o texto do Figma `1620:13621`. Marcação em [telas/brasileiro](telas/brasileiro/screen.html), com `volta=br`: Tentar novamente volta à seleção do documento (DOC-01).

**Entradas:** confirmação da frente e do verso (CIN, CNH e RG) e upload, pelos erros de envio.
