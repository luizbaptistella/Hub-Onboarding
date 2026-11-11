# ENT-00 · Splash

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão (2026-11-09).** Splash do app, antes do login. Desenhada no Figma; DS aplicado.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `ENT-00` |
| Raia | Acesso e recuperação de senha |
| Figma | [`1620:26697`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-26697) (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma, com o DS aplicado |
| Marcação | 1 variante em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/acesso/gen-ENT-00.html` |

## Objetivo

Mostrar a marca enquanto o app abre e levar ao login sozinho.

## Componentes

0 componentes do DS, 0 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Marca do Palmeiras | Escudo com a estrela sobre um círculo branco (assets logo-palmeiras.png e logo-palmeiras-bg-ellipse.svg do DS, grupo Logos). O DS não tem um componente de marca. |

Sem componente do DS: só a marca (escudo com a estrela) centralizada sobre o fundo da página. O desenho do Figma não tem barra de status nesta tela.

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão | [`1620:26697`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-26697) | [telas/padrao](telas/padrao/screen.html) |

## Comportamento

- Abre sozinha ao iniciar o app e, depois de cerca de 2 s, vai para o login (ENT-01).
- Não há botão: a pessoa não interage com o splash.
- No hub a tela roda dentro de um iframe, por isso o timer não navega (a miniatura não vira o login).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`). Decisões (DEC-…) são avaliações da própria tela, sem tela própria.

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| — | | | | |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| ENT-01 | Login | Cerca de 2 s | Automática (timer) | Ao abrir o app |

## Pendências

- A duração real depende do carregamento do app; 2 s é a referência do protótipo.
- Sessão ativa: se a pessoa já estiver logada, o splash deveria levar direto à área logada. Não está no Figma.

## Critérios de aceite

- O escudo fica centralizado na tela.
- Em cerca de 2 s abre o login.
- Leitor de tela anuncia "Palmeiras".
