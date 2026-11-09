# DOC-15 · Sessão expirada

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.
> **Aprovada em 2026-11-09.** Quarta e última das telas de erro de sistema do CRNM. Sem desenho no Figma (proposta do hub).

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-15` |
| Raia | Documento de identidade · estrangeiro |
| Figma | sem desenho |
| Status | Proposta do hub, com o DS aplicado |
| Marcação | 1 variantes em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/estrangeiro/doc15-sessao-expirada.html` |

## Objetivo

Avisar que a sessão acabou e levar a pessoa para entrar de novo, sem perder a etapa em que estava.

## Componentes

3 componentes do DS, 3 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={false} title="Captura de documentos" progress={{ current: 2, total: 4 }} language={false} help={{ label: "Ajuda" }} />` | — | — |
| `ResultHero` | 1 | `<ResultHero tone="danger" icon="lock_clock" title="Sua sessão expirou" description="Entre novamente para continuar de onde parou." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Button` | 1 | `<Button variant="primary" iconEnd="login" onClick={() => {}}>Entrar</Button>` | — | — |

Peças fora do DS (só no protótipo ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão (sem Figma) | sem Figma | [telas/padrao](telas/padrao/screen.html) |

## Comportamento

- "Entrar" leva ao login (ENT-01).
- Depois de entrar, a pessoa volta para esta etapa, com o idioma escolhido e os arquivos guardados, quando ainda estiverem disponíveis.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-09 | CRNM · upload da frente e do verso | Sessão expirada no envio | Erro ou nova tentativa | Token de sessão inválido |
| DOC-21 | DPRNM · upload da frente e do verso | Sessão expirada no envio (DPRNM) | Erro ou nova tentativa | Token de sessão inválido |
| DOC-31 | RNE · upload da frente e do verso | Sessão expirada no envio (RNE) | Erro ou nova tentativa | Token de sessão inválido |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| ENT-01 | Login | Entrar | Sair do fluxo | Volta para esta etapa depois do login |

## Pendências

- **Regra do módulo (pendência 15 do spec antigo):** a sessão expirada volta ao login? Mantém o idioma e o estado da captura? Esta tela assume que sim, mas a regra ainda precisa ser confirmada.
- **Arquivos guardados:** por quanto tempo ficam disponíveis depois da sessão expirar? Não definido.
- Os textos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- O título é o único `h1`.
- Não há Voltar no cabeçalho.
- "Entrar" leva ao login.
