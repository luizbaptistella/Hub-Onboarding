# CAD-05 · Editar e-mail

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `CAD-05` |
| Raia | Entrada e cadastro · Etapa 1 de 4 · dados pessoais, contatos e endereço |
| Figma | sem node no Figma |
| Status | Só implementada (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 1 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Trocar o e-mail antes de receber um novo código.

## 2. Componentes

6 peças nesta tela: **6 instâncias de 5 componentes do DS** (`AppHeader`, `Button`, `LegalFooter`, `PageHeading`, `TextField`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Editar e-mail" language={false} help />` | — | Forma atual: Edição (classe po-header-task). Navega para `otp-email`. |
| 2 | `PageHeading` | `<PageHeading title="Atualize seu e-mail" subtitle="Informe o novo e-mail para receber um novo código de verificação." tone="neutral" spaced />` | — | — |
| 3 | `TextField` | `<TextField label="E-mail" preset="email" name="valor" placeholder="seuemail@exemplo.com" autoComplete="email" />` | padrão; preenchido; erro (prop `error`, mostra FormMessage) | — |
| 4 | `TextField` | `<TextField label="Confirmar E-mail" preset="email" name="confirmacao" placeholder="seuemail@exemplo.com" />` | padrão; preenchido; erro (prop `error`, mostra FormMessage) | — |
| 5 | `Button` | `<Button variant="primary" fullWidth type="submit">Confirmar e enviar código</Button>` | — | — |
| 6 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| `FormMessage` | via `error` do TextField | Formato inválido ou e-mails diferentes. |

## 3. Campos e validações

| Campo | id | Controle |
|---|---|---|
| E-mail | `ed-email` | `email` · name=`valor` · autocomplete=`email` · placeholder "seuemail@exemplo.com" |
| Confirmar E-mail | `ed-email2` | `email` · name=`confirmacao` · placeholder "seuemail@exemplo.com" |

| Campo | Regra | Mensagem de erro |
|---|---|---|
| E-mail | nome@dominio.tld, com 2+ letras no final. | E-mail inválido. Use o formato nome@exemplo.com. |
| Confirmar e-mail | Igual ao primeiro campo. | Os e-mails não coincidem. Digite o mesmo e-mail nos dois campos. |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [CAD-04 · Código por e-mail](../CAD-04-codigo-por-e-mail/spec.md) |  |
| Ajuda | — |  |
| Confirmar e enviar código | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Vazio
- Erro de formato
- Erro de confirmação

## 6. Comportamento

- Valida ao enviar. Se estiver tudo certo, grava o e-mail, marca que ele foi editado, zera as tentativas e volta para CAD-04 com o toast.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-04 · Código por e-mail](../CAD-04-codigo-por-e-mail/spec.md) | Editar e-mail | — | Caminho alternativo |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-04 · Código por e-mail](../CAD-04-codigo-por-e-mail/spec.md) | Confirmar e enviar código | E-mail válido e igual nos dois campos; mostra o toast | Caminho alternativo |

## 9. Dados

- Sobrescreve `email` e marca `emailEditado`.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

_Nenhuma._

## 11. Critérios de aceite

- [ ] E-mails iguais e válidos voltam a CAD-04 com o toast.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
