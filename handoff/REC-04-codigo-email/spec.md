# REC-04 · Código por e-mail (recuperação)

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão (2026-11-09).** Código de verificação por e-mail na recuperação de senha, com os erros de código. Desenhada no Figma; DS aplicado.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `REC-04` |
| Raia | Acesso e recuperação de senha |
| Figma | [`1914:58806`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-58806) (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma, com o DS aplicado |
| Marcação | 5 variantes em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/acesso/gen-REC-04.html` |

## Objetivo

Receber o código de 6 dígitos enviado por e-mail ao endereço informado e validá-lo.

## Componentes

6 componentes do DS, 20 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `PageHeading` | 1 | `<PageHeading title="Insira o seu código" subtitle="Enviamos um e-mail com o código de verificação. Pode levar alguns segundos para chegar." tone="neutral" />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `AppHeader` | 5 | `<AppHeader back={{ label: "Voltar", href: "file:///Users/baptistella/Projetos/Onboarding-Palmeiras/ellena-hub/handoff/REC-01-recuperar-senha/telas/email-vazio/screen.html" }} title="Va…` | back | — |
| `OTPInput` | 5 | `<OTPInput value="" disabled={false} state="default" onChange={() => {}} onComplete={() => {}} />` | disabled, error, state, value | — |
| `ResendPrompt` | 5 | `<ResendPrompt cooldown={0} disabled={false} onResend={() => {}} />` | disabled | — |
| `Alert` | 3 | `<Alert tone="danger" title="Código incorreto">O código que você inseriu está incorreto, verifique e tente novamente.</Alert>` | children, title | — |
| `Button` | 1 | `<Button variant="secondary" onClick={() => {}}>Voltar ao login</Button>` | — | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Vazio | [`1914:58806`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-58806) | [telas/vazio](telas/vazio/screen.html) |
| 2 | Código validado | [`1914:58783`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-58783) | [telas/validado](telas/validado/screen.html) |
| 3 | Código incorreto (1/3) | [`1914:59007`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-59007) | [telas/incorreto](telas/incorreto/screen.html) |
| 4 | Código expirado | [`1914:59073`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-59073) | [telas/expirado](telas/expirado/screen.html) |
| 5 | Excesso de tentativas | [`1914:59139`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-59139) | [telas/bloqueado](telas/bloqueado/screen.html) |

## Comportamento

- Mesmo comportamento de REC-02 (SMS), com o e-mail mascarado e o texto "Enviamos um e-mail com o código de verificação".
- `847291` acerta e abre REC-06; `000000` simula expirado; outro código erra; no 3º erro seguido bloqueia por 30 minutos.
- Editar e-mail e Voltar levam a REC-01 (aba E-mail). No bloqueio, "Voltar ao login".
- O e-mail enviado está em REC-05 (apoio do protótipo).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`). Decisões (DEC-…) são avaliações da própria tela, sem tela própria.

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| REC-01 | Recuperar senha | Continuar | Caminho principal | Aba E-mail; e-mail e data válidos |
| REC-05 | E-mail recebido (apoio do protótipo) | Acessar minha conta | Voltar | Volta ao app; o código é digitado, não preenche sozinho |
| DEC-07 | Código e-mail correto? | Não · código incorreto | Erro ou nova tentativa | Mostra tentativas; digitar de novo limpa o erro |
| DEC-07 | Código e-mail correto? | Não · o código expirou | Erro ou nova tentativa | Pede novo código em Reenviar código |
| DEC-07 | Código e-mail correto? | Não · excesso de tentativas | Erro ou nova tentativa | 3º erro: campos desativados por 30 minutos |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| REC-05 | E-mail recebido (apoio do protótipo) | E-mail enviado | Automática (timer) | Apoio do protótipo: mostra a mensagem recebida |
| DEC-07 | Código e-mail correto? | 6º dígito digitado | Caminho principal | — |
| REC-01 | Recuperar senha | Editar e-mail ou Voltar | Caminho alternativo | — |
| ENT-01 | Login | Voltar ao login | Sair do fluxo | Só no bloqueio por tentativas |

## Pendências

- Mesmas pendências de REC-02: texto das tentativas, cooldown do reenvio, bloqueio no servidor, botão "Voltar ao login" acrescentado.
- O Figma mascara o e-mail com mais asteriscos (`silv*******@email.com`); o DS usa `silv***@email.com` (DS vence).
- O Figma não tem o ícone de ajuda no cabeçalho do e-mail; o do SMS tem.

## Critérios de aceite

- Mesmos critérios de REC-02, para o e-mail.
