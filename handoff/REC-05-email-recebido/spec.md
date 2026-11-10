# REC-05 · E-mail recebido (apoio do protótipo)

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão (2026-11-09).** E-mail recebido, apoio do protótipo. Desenhada no Figma; DS aplicado.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `REC-05` |
| Raia | Acesso e recuperação de senha |
| Figma | [`1914:58829`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-58829) (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma, com o DS aplicado |
| Marcação | 1 variante em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/acesso/gen-REC-05.html` |

## Objetivo

Mostrar o e-mail que o sistema envia com o código de recuperação. Apoio do protótipo, não é tela do app.

## Componentes

0 componentes do DS, 0 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Marca do Palmeiras | Escudo com a estrela sobre um círculo branco (assets logo-palmeiras.png e logo-palmeiras-bg-ellipse.svg do DS, grupo Logos). O DS não tem um componente de marca. |
| E-mail recebido (template) | Template do e-mail transacional (adaptado a 375 px, o padrão mobile do hub) com saudação, código, validade e aviso de segurança. É o conteúdo do e-mail enviado pelo servidor, não uma tela do app. |

Sem componente do DS: é o template do e-mail transacional, adaptado a 375 px (largura padrão mobile do hub). No Figma tem 600 px; a adaptação mantém o conteúdo e a ordem. Serve de referência de conteúdo para quem monta o e-mail.

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão | [`1914:58829`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-58829) | [telas/padrao](telas/padrao/screen.html) |

## Comportamento

- Conteúdo: saudação com o nome, o código em destaque (847 291), validade de 10 minutos, botão "Acessar minha conta", aviso de segurança e rodapé com a central de suporte.
- "Acessar minha conta" só volta ao app na tela do código (REC-04): a pessoa digita o código; o botão não preenche nem valida sozinho.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`). Decisões (DEC-…) são avaliações da própria tela, sem tela própria.

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| REC-04 | Código por e-mail (recuperação) | E-mail enviado | Automática (timer) | Apoio do protótipo: mostra a mensagem recebida |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| REC-04 | Código por e-mail (recuperação) | Acessar minha conta | Voltar | Volta ao app; o código é digitado, não preenche sozinho |

## Pendências

- O botão "Acessar minha conta" poderia abrir o app com o código já preenchido (link mágico). Decisão atual: não.
- O Figma não define o assunto do e-mail nem a versão em texto simples.
- Imagens do e-mail precisam de texto alternativo e de contraste na versão escura dos clientes de e-mail.

## Critérios de aceite

- O e-mail traz o nome, o código, a validade e o aviso de segurança.
- O botão leva de volta ao app.
