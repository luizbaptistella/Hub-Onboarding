# DOC-22 · Os dados do documento não conferem

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-09.** Tela de resultado para o CRNM e o DPRNM. Sem desenho no Figma para estes documentos (o Figma tem a versão da Cédula, em 2802:36765).

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-22` |
| Raia | Documento de identidade · estrangeiro |
| Figma | sem desenho para CRNM e DPRNM (Cédula: `2802:36765`) |
| Status | Proposta do hub, com o DS aplicado |
| Marcação | 3 variantes em [telas/](telas/): CRNM e DPRNM ([tela.js](tela.js)) · gerador `build-tools/estrangeiro/doc22-dados-nao-conferem.html` |

## Objetivo

Mostrar que os dados lidos do documento não batem com os informados, dizer quais campos diferem e oferecer revisar os dados ou enviar outros arquivos.

## Componentes

3 componentes do DS, 4 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar" }} title="Validação do documento de identidade" language={false} help={{ label: "Ajuda" }} />` | — | — |
| `ResultHero` | 1 | `<ResultHero tone="danger" icon="edit_note" title="Os dados do documento não conferem" description="Os dados lidos no documento são diferentes dos que você informou. Confira o que está dif…` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Button` | 2 | `<Button variant="primary" iconEnd="edit" onClick={() => {}}>Revisar dados informados</Button>` | children, iconEnd, variant | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Lista de motivos | Lista simples (título + ul). Proposta: usar List do DS. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Volta ao upload do CRNM | sem Figma | [telas/padrao](telas/padrao/screen.html) |
| 2 | Volta ao upload do DPRNM | sem Figma | [telas/dprnm](telas/dprnm/screen.html) |
| 3 | Volta ao upload do RNE | sem Figma | [telas/rne](telas/rne/screen.html) |

## Comportamento

- Serve ao CRNM e ao DPRNM. Com `volta=dprnm` (variante DPRNM), "Enviar novos arquivos" volta ao upload do DPRNM (DOC-21). Sem isso, volta ao CRNM (DOC-09).
- "Revisar dados informados" leva à seleção. Os dados informados ainda precisam ser revisados na tela de dados (não desenhada).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-10 | Status · documento recebido | Dados lidos não conferem com os informados | Erro ou nova tentativa | Número, país, tipo ou validade diferentes |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | Revisar dados informados | Caminho alternativo | — |
| DOC-09 | CRNM · upload da frente e do verso | Enviar novos arquivos | Caminho alternativo | Envio do CRNM |
| DOC-21 | DPRNM · upload da frente e do verso | Enviar novos arquivos | Caminho alternativo | Envio do DPRNM |
| DOC-31 | RNE · upload da frente e do verso | Enviar novos arquivos | Caminho alternativo | Envio do RNE |
| DOC-25 | Bloqueio por tentativas no documento | Terceira validação com dados divergentes | Erro ou nova tentativa | Três tentativas esgotadas |

## Pendências

- **Tela de revisão de dados:** "Revisar dados informados" leva à seleção, mas os dados precisam ser corrigidos numa tela própria (não desenhada).
- **Divergência de validade:** o Figma da Cédula lista validade; confirmar se o CRNM e o DPRNM têm validade impressa.
- **Tentativas:** a regra de bloqueio por tentativas (3 e 5 minutos) ainda não está nesta tela.
- Os textos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- O título é o único `h1`.
- A lista mostra as divergências encontradas.
- Os dois botões ficam no rodapé.
