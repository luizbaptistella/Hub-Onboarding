# CAD-01 · Cadastro · Dados pessoais

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `CAD-01` |
| Raia | Entrada e cadastro · Etapa 1 de 4 · dados pessoais, contatos e endereço |
| Figma | `1619:11919` (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 3 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Coletar os dados pessoais e de contato para iniciar o cadastro.

## 2. Componentes

12 peças nesta tela: **12 instâncias de 8 componentes do DS** (`AppHeader`, `Button`, `Checkbox`, `LegalFooter`, `PageHeading`, `Tabs`, `TextField`, `TextLink`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Cadastro" progress={{ current: 1, total: 4 }} language help={false} />` | — | Forma atual: Cadastro/Login (classe po-header-entry). Navega para `login`. |
| 2 | `PageHeading` | `<PageHeading title="Bem-vindo(a) ao Palmeiras" subtitle="Crie o seu cadastro em poucos passos" tone="brand" />` | — | — |
| 3 | `Tabs` | `<Tabs label="Nacionalidade" items={[{ value: "Brasileiro", label: "Brasileiro" }, { value: "Estrangeiro", label: "Estrangeiro" }]} value="Brasileiro" />` | aba ativa: Brasileiro | — |
| 4 | `TextField` | `<TextField label="Número do seu CPF" preset="cpf" name="cpf" placeholder="000.000.000-00" />` | padrão; preenchido; erro (prop `error`, mostra FormMessage) | — |
| 5 | `TextField` | `<TextField label="Data de nascimento" preset="date" name="nascimento" placeholder="DD/MM/AAAA" />` | padrão; preenchido; erro (prop `error`, mostra FormMessage) | — |
| 6 | `TextField` | `<TextField label="Número do seu celular" preset="phone" name="celular" placeholder="(00) 00000-0000" autoComplete="tel-national" />` | padrão; preenchido; erro (prop `error`, mostra FormMessage) | — |
| 7 | `TextField` | `<TextField label="Seu e-mail" preset="email" name="email" placeholder="seuemail@exemplo.com" autoComplete="email" />` | padrão; preenchido; erro (prop `error`, mostra FormMessage) | — |
| 8 | `Checkbox` | `<Checkbox name="termos">Li e concordo com os Termos de Uso.</Checkbox>` | desmarcado; marcado; erro ("Para continuar, aceite os Termos de Uso.") | — |
| 9 | ↳ `TextLink` | `<TextLink variant="inline" href="#">Termos de Uso</TextLink>` | — | Na implementação atual é um botão sem destino; no DS o TextLink exige href. |
| 10 | `Checkbox` | `<Checkbox name="marketing">Quero receber novidades e ofertas do Palmeiras.</Checkbox>` | desmarcado; marcado | — |
| 11 | `Button` | `<Button variant="primary" fullWidth type="submit">Iniciar validação</Button>` | — | — |
| 12 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| `FormMessage` | via `error` do TextField e do Checkbox | Campo inválido ou Termos desmarcados, ao enviar. |

## 3. Campos e validações

| Campo | id | Controle |
|---|---|---|
| Número do seu CPF | `cad-cpf` | `text` · name=`cpf` · inputmode=`numeric` · data-mask=`cpf` · placeholder "000.000.000-00" |
| Data de nascimento | `cad-nasc` | `text` · name=`nascimento` · inputmode=`numeric` · data-mask=`data` · placeholder "DD/MM/AAAA" |
| Número do seu celular | `cad-cel` | `text` · name=`celular` · inputmode=`tel` · autocomplete=`tel-national` · data-mask=`celular` · placeholder "(00) 00000-0000" |
| Seu e-mail | `cad-email` | `email` · name=`email` · autocomplete=`email` · placeholder "seuemail@exemplo.com" |

| Campo | Regra | Mensagem de erro |
|---|---|---|
| CPF | 11 dígitos com dígitos verificadores válidos; rejeita todos iguais. Máscara 000.000.000-00. | CPF inválido. Use o formato 000.000.000-00. |
| Data de nascimento | DD/MM/AAAA, data existente, no passado e com ano depois de 1900. | Data de nascimento inválida. Use o formato DD/MM/AAAA. |
| Celular | Formato (XX) 9XXXX-XXXX (máscara automática). | Número de celular inválido. Use o formato (XX) XXXXX-XXXX. |
| E-mail | nome@dominio.tld, com 2+ letras no final. | E-mail inválido. Use o formato nome@exemplo.com. |
| Termos de Uso | Obrigatório marcar. | Para continuar, aceite os Termos de Uso. |
| Novidades e ofertas | Opcional. | — |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [ENT-01 · Login](../ENT-01-login/spec.md) |  |
| PT | — |  |
| Brasileiro | — |  |
| Estrangeiro | — |  |
| Termos de Uso | — | Sem fluxo ainda |
| Iniciar validação | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Vazio
- Preenchido
- Erro por campo (4 frames de erro no Figma, um por campo)

## 6. Comportamento

- Abas Brasileiro e Estrangeiro: só a aba Brasileiro tem formulário.
- Ao enviar, valida todos os campos de uma vez e foca o primeiro inválido.
- Se tudo estiver certo, guarda celular e e-mail (usados em CAD-02 e CAD-04), zera as tentativas de código dos dois canais e abre CAD-02.
- O link Termos de Uso ainda não tem destino.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [ENT-01 · Login](../ENT-01-login/spec.md) | Criar cadastro | — | Caminho principal |
| [CAD-02 · Código por SMS](../CAD-02-codigo-por-sms/spec.md) | Voltar | — | Voltar |
| [FAM-16 · Convite · entrada pelo link (sem conta)](../FAM-16-convite-entrada-pelo-link-sem-conta/spec.md) | Continuar | CPF igual ao do convite; reaproveita os dados pessoais | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [ENT-01 · Login](../ENT-01-login/spec.md) | Voltar | — | Voltar |
| [CAD-02 · Código por SMS](../CAD-02-codigo-por-sms/spec.md) | Iniciar validação | CPF, data, celular e e-mail válidos e Termos aceitos | Caminho principal |

## 9. Dados

- Grava `celular` e `email` para as telas de código.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Formulário da aba Estrangeiro.
- Destino do link Termos de Uso.
- Os textos de erro de CPF, data e e-mail são provisórios; só o do celular vem do Figma.

## 11. Critérios de aceite

- [ ] Termos desmarcados bloqueiam o envio com a mensagem.
- [ ] Envio válido abre CAD-02 mostrando o celular mascarado.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
