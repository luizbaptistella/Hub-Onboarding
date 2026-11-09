# ENT-01 · Login

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `ENT-01` |
| Raia | Entrada e cadastro · Etapa 1 de 4 · dados pessoais, contatos e endereço |
| Figma | `1620:26870` (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 6 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Entrar com CPF e senha, ou começar um cadastro novo.

## 2. Componentes

14 peças nesta tela: **13 instâncias de 9 componentes do DS** (`Alert`, `AppHeader`, `Button`, `DividerText`, `LegalFooter`, `PageHeading`, `SocialButton`, `TextField`, `TextLink`) e **1 peças fora do DS**.

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={false} title="Login" language help={false} />` | — | Forma atual: Cadastro/Login (classe po-header-entry). |
| 2 | Logo Palmeiras _(fora do DS)_ | asset: logo-palmeiras.png + logo-palmeiras-bg-ellipse.svg | — | Asset do DS (grupo Logos). |
| 3 | `PageHeading` | `<PageHeading title="Faça seu login" subtitle="Faça seu login para começar ou cadastre-se." tone="brand" />` | — | — |
| 4 | `Alert` | `<Alert tone="info" title="Sua conta foi encerrada.">O cadastro ficou inativo. Para voltar, fale com o atendimento.</Alert>` | oculto; visível | Oculto no layout padrão; aparece por condição (ver Estados). |
| 5 | `TextField` | `<TextField label="Número do seu CPF" preset="cpf" name="cpf" placeholder="000.000.000-00" autoComplete="username" />` | padrão; preenchido; erro (prop `error`, mostra FormMessage) | — |
| 6 | `TextField` | `<TextField label="Senha" preset="password" name="senha" placeholder="Digite sua senha" autoComplete="current-password" />` | padrão; preenchido; erro (prop `error`, mostra FormMessage); senha visível ou oculta | — |
| 7 | `TextLink` | `<TextLink variant="standalone" href="#">Esqueceu sua senha?</TextLink>` | — | Na implementação atual é um botão sem destino; no DS o TextLink exige href. |
| 8 | `Button` | `<Button variant="primary" fullWidth type="submit">Entrar</Button>` | — | — |
| 9 | `Button` | `<Button variant="accent" fullWidth>Criar cadastro</Button>` | — | Navega para `cadastro`. |
| 10 | `DividerText` | `<DividerText>ou entrar com:</DividerText>` | — | — |
| 11 | `SocialButton` | `<SocialButton provider="google" layout="icon" intent="signin" />` | — | — |
| 12 | `SocialButton` | `<SocialButton provider="apple" layout="icon" intent="signin" />` | — | — |
| 13 | `SocialButton` | `<SocialButton provider="microsoft" layout="icon" intent="signin" />` | — | — |
| 14 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| `Alert` | tone="info" title="Sua conta foi encerrada." | Depois de encerrar a conta (AREA-04). Some ao digitar ou trocar de tela. |
| `FormMessage` | via `error` do TextField | CPF inválido ou senha vazia, ao enviar. |

## 3. Campos e validações

| Campo | id | Controle |
|---|---|---|
| Número do seu CPF | `login-cpf` | `text` · name=`cpf` · inputmode=`numeric` · autocomplete=`username` · data-mask=`cpf` · placeholder "000.000.000-00" |
| Senha | `login-senha` | `password` · name=`senha` · autocomplete=`current-password` · placeholder "Digite sua senha" |

| Campo | Regra | Mensagem de erro |
|---|---|---|
| CPF | 11 dígitos com dígitos verificadores válidos; rejeita todos iguais. Máscara 000.000.000-00. | CPF inválido. Use o formato 000.000.000-00. |
| Senha | Obrigatória. | Informe sua senha. |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| PT | — |  |
| Esqueceu sua senha? | — | Sem fluxo ainda |
| Entrar | — |  |
| Criar cadastro | [CAD-01 · Cadastro · Dados pessoais](../CAD-01-cadastro-dados-pessoais/spec.md) |  |
| Entrar com Google | — |  |
| Entrar com Apple | — |  |
| Entrar com Microsoft | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Padrão
- Erro por campo (FormMessage abaixo do campo)
- Aviso de conta encerrada

## 6. Comportamento

- O botão Entrar fica sempre ativo e valida ao enviar (regra do DS). O foco vai para o primeiro campo com erro.
- Na implementação atual qualquer senha é aceita; com CPF válido, vai para a área logada (AREA-01).
- Quando a pessoa vem de Encerrar conta (AREA-04), aparece o aviso informativo "Sua conta foi encerrada." Ele some ao digitar ou ao trocar de tela.
- "Esqueceu sua senha?" e os botões Google, Apple e Microsoft ainda não têm fluxo.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-01 · Cadastro · Dados pessoais](../CAD-01-cadastro-dados-pessoais/spec.md) | Voltar | — | Voltar |
| [BIO-05 · Bloqueio · 3 tentativas](../BIO-05-bloqueio-3-tentativas/spec.md) | Sair e continuar depois | — | Sair do fluxo |
| [BIO-06 · Erro com suporte](../BIO-06-erro-com-suporte/spec.md) | Sair e continuar depois | — | Sair do fluxo |
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Menu › Sair | — | Sair do fluxo |
| [FAM-16 · Convite · entrada pelo link (sem conta)](../FAM-16-convite-entrada-pelo-link-sem-conta/spec.md) | Já tenho conta | — | Caminho alternativo |
| [AREA-04 · Encerrar conta](../AREA-04-encerrar-conta/spec.md) | Encerrar conta | Senha preenchida; o login mostra o aviso de conta encerrada | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Entrar | CPF válido e senha preenchida | Caminho principal |
| [CAD-01 · Cadastro · Dados pessoais](../CAD-01-cadastro-dados-pessoais/spec.md) | Criar cadastro | — | Caminho principal |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Recuperação de senha.
- Login social (Google, Apple, Microsoft).
- Erro de credenciais incorretas: a implementação atual não simula.
- Os textos de erro de CPF são provisórios (DESIGN-SYSTEM.md).

## 11. Critérios de aceite

- [ ] Com CPF inválido, mostra o erro no campo e não navega.
- [ ] Com CPF válido e senha preenchida, abre AREA-01.
- [ ] Criar cadastro abre CAD-01.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
