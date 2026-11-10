# REC-02 · Código por SMS (recuperação)

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão (2026-11-09).** Código de verificação por SMS na recuperação de senha, com os erros de código. Desenhada no Figma; DS aplicado.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `REC-02` |
| Raia | Acesso e recuperação de senha |
| Figma | [`1914:60064`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-60064) (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma, com o DS aplicado |
| Marcação | 5 variantes em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/acesso/gen-REC-02.html` |

## Objetivo

Receber o código de 6 dígitos enviado por SMS ao celular informado e validá-lo.

## Componentes

6 componentes do DS, 20 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `PageHeading` | 1 | `<PageHeading title="Insira o seu código" subtitle="Enviamos um código de verificação via SMS para o seu celular. Pode levar alguns segundos." tone="neutral" />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `AppHeader` | 5 | `<AppHeader back={{ label: "Voltar", href: "file:///Users/baptistella/Projetos/Onboarding-Palmeiras/palmeiras-hub/handoff/REC-01-recuperar-senha/telas/celular-vazio/screen.html" }} title="…` | back | — |
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
| 1 | Vazio | [`1914:60064`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-60064) | [telas/vazio](telas/vazio/screen.html) |
| 2 | Código validado | [`1914:60041`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-60041) | [telas/validado](telas/validado/screen.html) |
| 3 | Código incorreto (1/3) | [`1914:60147`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-60147) | [telas/incorreto](telas/incorreto/screen.html) |
| 4 | Código expirado | [`1914:60180`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-60180) | [telas/expirado](telas/expirado/screen.html) |
| 5 | Excesso de tentativas | [`1914:60213`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-60213) | [telas/bloqueado](telas/bloqueado/screen.html) |

## Comportamento

- Ao digitar o 6º dígito, o código é conferido (DEC-06). **No protótipo:** `847291` acerta, `000000` simula código expirado e qualquer outro erra.
- Acerto: os dígitos ficam verdes, somente leitura, e abre a nova senha (REC-06).
- Erro: células e mensagem em vermelho com "Tentativas restantes: N/3" e aviso "Código incorreto". Digitar de novo limpa o erro; as tentativas continuam contadas.
- Expirado: aviso "O código expirou."; a saída é "Reenviar código" (limpa o campo). Não conta como tentativa.
- No 3º erro seguido: aviso "Excesso de tentativas.", campos e "Reenviar código" desativados, e o botão "Voltar ao login". Bloqueio de 30 minutos (sem contagem real no protótipo).
- Editar celular e Voltar levam a REC-01. No bloqueio, Voltar leva ao login.
- O SMS enviado está em REC-03 (apoio do protótipo).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`). Decisões (DEC-…) são avaliações da própria tela, sem tela própria.

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| REC-01 | Recuperar senha | Continuar | Caminho principal | Aba Celular; celular e data válidos |
| REC-03 | SMS recebido (apoio do protótipo) | Voltar ao app | Voltar | — |
| DEC-06 | Código SMS correto? | Não · código incorreto | Erro ou nova tentativa | Mostra tentativas; digitar de novo limpa o erro |
| DEC-06 | Código SMS correto? | Não · o código expirou | Erro ou nova tentativa | Pede novo código em Reenviar código |
| DEC-06 | Código SMS correto? | Não · excesso de tentativas | Erro ou nova tentativa | 3º erro: campos desativados por 30 minutos |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| REC-03 | SMS recebido (apoio do protótipo) | SMS enviado | Automática (timer) | Apoio do protótipo: mostra a mensagem recebida |
| DEC-06 | Código SMS correto? | 6º dígito digitado | Caminho principal | — |
| REC-01 | Recuperar senha | Editar celular ou Voltar | Caminho alternativo | — |
| ENT-01 | Login | Voltar ao login | Sair do fluxo | Só no bloqueio por tentativas |

## Pendências

- O texto "Tentativas restantes: 1/3" no primeiro erro conta as tentativas usadas, não as que restam (no 3º erro mostra 3/3). Texto do Figma; confirmar se é "Tentativa 1 de 3".
- Reenviar código: o cooldown e o limite de reenvios do DS estão desligados no hub. Definir tempo e limite.
- O bloqueio de 30 minutos precisa vir do servidor e sobreviver a fechar o app. Não definido.
- O botão "Voltar ao login" não está no Figma: foi acrescentado para a pessoa sair do bloqueio.
- O cabeçalho do Figma tem a seta de voltar e a ajuda; o título é "Validação de celular".

## Critérios de aceite

- O 6º dígito dispara a conferência sem botão.
- Código correto abre REC-06; incorreto mostra as tentativas; no 3º erro bloqueia e oferece voltar ao login.
- O erro é anunciado por leitor de tela (`role="alert"`).
