# ENT-02 · Carregando login

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão (2026-11-09).** Espera da resposta do servidor depois de Entrar. Desenhada no Figma; DS aplicado.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `ENT-02` |
| Raia | Acesso e recuperação de senha |
| Figma | [`1620:27173`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-27173) (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma, com o DS aplicado |
| Marcação | 1 variante em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/acesso/gen-ENT-02.html` |

## Objetivo

Mostrar que o login está sendo conferido enquanto o servidor responde.

## Componentes

0 componentes do DS, 0 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Marca do Palmeiras | Escudo com a estrela sobre um círculo branco (assets logo-palmeiras.png e logo-palmeiras-bg-ellipse.svg do DS, grupo Logos). O DS não tem um componente de marca. |
| Barra de carregamento | Faixa de 6 px com preenchimento animado e role=progressbar, sem valor (espera sem duração conhecida). O ProgressBar do DS é de etapas. Proposta para o DS. |

Sem componente do DS para esta espera: a barra de carregamento é uma peça local (proposta para o DS). O `LoadingState` do DS usa spinner; o Figma pede barra.

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão | [`1620:27173`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-27173) | [telas/padrao](telas/padrao/screen.html) |

## Comportamento

- Abre depois de Entrar com campos válidos e espera a resposta do servidor (cerca de 2 s no protótipo).
- Resposta aceita: abre a área logada (AREA-01). Resposta rejeitada: volta ao login com o aviso "Credenciais inválidas" (DEC-05).
- A barra não indica porcentagem real; a região é `role="status"` e o texto "Carregando Login..." é anunciado.
- Sem botão de cancelar. No hub, dentro do iframe, o timer não navega.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`). Decisões (DEC-…) são avaliações da própria tela, sem tela própria.

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DEC-04 | Preencheu corretamente? | Sim | Caminho principal | CPF ou e-mail válido e senha preenchida |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DEC-05 | Credenciais aceitas? | Resposta do servidor | Automática (timer) | — |

## Pendências

- Tempo limite: se o servidor não responder, não há tela de erro de conexão desenhada (as telas de erro de sistema do documento estrangeiro, DOC-12 a DOC-15, podem servir de base).
- Barra com preenchimento fixo (25%) no Figma; no protótipo ela anima. Confirmar se é indeterminada ou real.

## Critérios de aceite

- Mostra a marca, a barra e o texto "Carregando Login...".
- Em cerca de 2 s abre AREA-01 ou volta ao login com o aviso de credenciais inválidas.
