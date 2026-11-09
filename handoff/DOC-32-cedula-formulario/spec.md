# DOC-32 · Cédula · formulário

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão.** Tela gerada a partir da tela aprovada de referência; validar em conjunto com as demais telas do fluxo de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-32` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | [`2799:36191`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2799-36191) (seção `2283:33539`) |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 4 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · componentes em [components.json](components.json) |

## Objetivo

Informar o país e o número da Cédula de identidade (Mercosul) antes de fotografar. A conferência dos dados lidos contra os informados acontece depois, na validação.

## Componentes

5 componentes do DS, 14 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar" }} title="Captura de documentos" progress={{ current: 2, total: 4 }} language={false} help={{ label: "Ajuda" }} />` | — | — |
| `PageHeading` | 1 | `<PageHeading tone="neutral" title="Cédula de identidade" subtitle="Informe o país e o documento que você vai enviar. Vamos conferir esses dados com as fotos do documento." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Select` | 4 | `<Select label="País" options={["Argentina", "Colômbia", "Paraguai", "Peru", "Uruguai", "Venezuela"]} placeholder="Selecione" value="" onChange={() => {}} />` | error, value | — |
| `TextField` | 4 | `<TextField label="Número do documento" value="" onChange={() => {}} />` | error, value | — |
| `Button` | 4 | `<Button variant="primary" iconEnd="arrow_forward" disabled onClick={() => {}}>Continuar</Button>` | disabled | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Notas de componentes

- Barra de status (mock do sistema, não implementar).
- `AppHeader` e `PageHeading`.
- `Select` do DS para o país e `TextField` para o número do documento.
- `Button` "Continuar" no rodapé, desabilitado até os campos estarem preenchidos.

## Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Vazio | [`2799:36191`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2799-36191) | [telas/padrao](telas/padrao/screen.html) |
| 2 | Preenchido (Argentina) | sem Figma | [telas/preenchido](telas/preenchido/screen.html) |
| 3 | Erro: número inválido (sem Figma) | sem Figma | [telas/erro-numero](telas/erro-numero/screen.html) |
| 4 | Erro: país sem suporte (sem Figma) | sem Figma | [telas/erro-pais](telas/erro-pais/screen.html) |

## Comportamento

- País com lista fechada de países aceitos; país sem suporte mostra erro no campo.
- Número inválido mostra erro no campo.
- "Continuar" leva ao tutorial da frente da Cédula.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | Cédula · Tirar foto do documento | Caminho principal | — |
| DOC-33 | Cédula · tutorial da frente | Voltar no passo 1 | Voltar | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | Voltar | Voltar | — |
| DOC-33 | Cédula · tutorial da frente | Continuar | Caminho principal | — |

## Pendências

- O Figma tem os campos País e Documento de identidade; o hub usa País e Número do documento (de acordo com o mapeamento antigo). Confirmar os campos.
- Lista de países aceitos a pesquisar (Paraguai "a confirmar"; Venezuela sem MRZ).
- Validação do número por país (formato) não definida.
- Os textos de erro são propostas.
- Textos novos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- "Continuar" só ativa com país e número preenchidos.
- Erros aparecem no próprio campo, com texto que diz o que fazer.
