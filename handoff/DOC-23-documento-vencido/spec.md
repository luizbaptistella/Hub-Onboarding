# DOC-23 · Documento vencido

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-09.** Tela de resultado para o CRNM e o DPRNM. O texto vem do Figma de conferência (rascunho antigo, sem node próprio).

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-23` |
| Raia | Documento de identidade · estrangeiro |
| Figma | sem node próprio (texto do rascunho de conferência) |
| Status | Proposta do hub, com o DS aplicado |
| Marcação | 1 variantes em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/estrangeiro/doc23-documento-vencido.html` |

## Objetivo

Dizer que o documento não pode ser usado porque a validade impressa já passou, e levar a pessoa a escolher outro documento.

## Componentes

3 componentes do DS, 3 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar" }} title="Validação do documento de identidade" language={false} help={{ label: "Ajuda" }} />` | — | — |
| `ResultHero` | 1 | `<ResultHero tone="danger" icon="event_busy" title="Seu documento está vencido" description="A data de validade impressa no documento já passou. Use um documento válido." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Button` | 1 | `<Button variant="primary" iconEnd="arrow_forward" onClick={() => {}}>Escolher outro documento</Button>` | — | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão (sem Figma) | sem Figma | [telas/padrao](telas/padrao/screen.html) |

## Comportamento

- Única ação: escolher outro documento. Não há "Tentar novamente", porque reenviar o mesmo documento vencido não resolve.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-10 | Status · documento recebido | Validade impressa já passou | Erro ou nova tentativa | Documento vencido |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | Escolher outro documento | Caminho principal | — |

## Pendências

- **Regra de validade:** a data de validade é comparada com a data atual pelo OCR. Confirmar se a tolerância é zero ou se há prazo de carência.
- **Documento sem validade:** o módulo aceita documento sem validade impressa (decidido em 2026-11-08). Esta tela não se aplica a ele.
- Os textos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- O título é o único `h1`.
- O botão "Escolher outro documento" fica no rodapé e leva à seleção.
