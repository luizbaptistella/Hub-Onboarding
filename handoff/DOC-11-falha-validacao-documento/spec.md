# DOC-11 · Falha na validação do documento

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-09.** Tela de falha da validação do documento de identidade. Falha usa `ResultHero` com tom de erro, não `StatusScreen` (regra do DS).

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-11` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | `2283:34313` (Falha na validação do documento de identidade) · seção `2283:33539` |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 3 variantes em [telas/](telas/) ([tela.js](tela.js)) · componentes em [components.json](components.json) |

## Objetivo

Dizer à pessoa que o documento não foi aceito, por quais motivos, e o que ela pode fazer: tentar de novo ou ver como tirar uma boa foto.

## Componentes

3 componentes do DS, 4 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar" }} title="Validação do documento de identidade" language={false} help={{ label: "Ajuda" }} />` | — | — |
| `ResultHero` | 1 | `<ResultHero tone="danger" title="Falha na validação do documento de identidade" description="Sua validação foi reprovada pelos motivos listados abaixo. Você pode tentar novamente." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Button` | 2 | `<Button variant="primary" iconEnd="refresh" onClick={() => {}}>Tentar novamente</Button>` | children, iconEnd, variant | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Lista de motivos | Lista simples (título + ul). Proposta: usar List do DS. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Volta ao upload do CRNM | [`2283:34313`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2283-34313) | [telas/padrao](telas/padrao/screen.html) |
| 2 | Volta ao upload do DPRNM | [`2283:34313`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2283-34313) | [telas/dprnm](telas/dprnm/screen.html) |
| 3 | Volta ao upload do RNE | [`2283:34313`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2283-34313) | [telas/rne](telas/rne/screen.html) |

## Motivos

| Motivo | Quando aparece |
|---|---|
| QR Code identificado | Foi enviado o QR Code no lugar do código de identificação (documento errado) |
| Informações não estão nítidas | Imagem tremida ou com baixa resolução |
| Documento está ilegível | O OCR não consegue ler os campos |
| Documento não identificado | O sistema não reconhece o tipo de documento |

## Melhorias em relação ao Figma

| # | Figma | Hub | Por quê |
|---|---|---|---|
| 1 | Cabeçalho "Validação do documento de identidade" sem Voltar | Com Voltar | A pessoa pode sair da falha para a seleção. |
| 2 | Lista de motivos em texto corrido | Lista com título | Cada motivo fica separado para leitura rápida. |

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-10 | Status · documento recebido | Validação do documento reprovada | Erro ou nova tentativa | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-09 | CRNM · upload da frente e do verso | Tentar novamente | Caminho alternativo | — |
| DOC-25 | Bloqueio por tentativas no documento | Terceira validação reprovada | Erro ou nova tentativa | Três tentativas esgotadas |
| DOC-21 | DPRNM · upload da frente e do verso | Tentar novamente | Caminho alternativo | Envio do DPRNM |
| DOC-31 | RNE · upload da frente e do verso | Tentar novamente | Caminho alternativo | Envio do RNE |

## Pendências

- A mensagem de falha da MRZ no verso (DOC-09) é inline. Esta tela cobre a reprovação depois do envio. Confirmar se o motivo "MRZ não encontrado" também aparece aqui.
- "Veja como tirar uma boa foto" ainda não tem destino.
- Os demais erros (tamanho, formato, senha, corrompido, falha de envio, sem conexão, tempo, erro inesperado, sessão) ainda não têm telas. Próxima decisão.

## Critérios de aceite

- O título é o único `h1` da tela.
- Os motivos aparecem como lista, na ordem do Figma.
- "Tentar novamente" volta ao envio do documento.

## Variante brasileira

Usada pelo fluxo de documento brasileiro (CIN, CNH e RG). Figma `1620:13639` (seção `1620:12039`). Marcação em [telas/brasileiro](telas/brasileiro/screen.html).

**Entradas:** confirmação da frente do CIN, do CNH e do RG, pelos erros de envio.

**Retorno:** Tentar novamente volta à confirmação do documento (DOC-11 volta ao tutorial da frente).

**Pendência:** Copy igual à do hub. A lista do Figma inclui "QR Code identificado", que não se aplica ao CIN, CNH e RG. Confirmar com o design.
