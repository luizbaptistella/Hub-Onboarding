# AREA-04 · Encerrar conta

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `AREA-04` |
| Raia | Área logada · Meu cadastro, notificações, ajuda e segurança |
| Figma | `3142:61697` (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Encerrar a conta com confirmação por senha.

## 2. Componentes

11 peças nesta tela: **11 instâncias de 7 componentes do DS** (`AppHeader`, `Button`, `LegalFooter`, `List`, `ListItem`, `PageHeading`, `TextField`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Encerrar conta" language={false} help />` | — | Forma atual: Edição (classe po-header-task). Navega para `seguranca`. |
| 2 | `PageHeading` | `<PageHeading title="Encerrar sua conta" subtitle="Por exigência legal e pela segurança do estádio, seu cadastro não é apagado: ele fica inativo e bloqueado para uso." tone="neutral" />` | — | — |
| 3 | `List` | `<List label="O que acontece" />` | — | — |
| 4 | ↳ `ListItem` | `<ListItem title="Você perde o acesso a ingressos e benefícios" icon="cancel" />` | — | — |
| 5 | ↳ `ListItem` | `<ListItem title="Sua biometria é removida das catracas" icon="shield" />` | — | — |
| 6 | ↳ `ListItem` | `<ListItem title="Compras e histórico ficam guardados pelo prazo legal" icon="folder" />` | — | — |
| 7 | ↳ `ListItem` | `<ListItem title="Para voltar, fale com o atendimento" icon="chat" />` | — | — |
| 8 | `TextField` | `<TextField label="Para confirmar, digite sua senha" preset="password" name="senha" placeholder="Sua senha" autoComplete="current-password" />` | padrão; preenchido; erro (prop `error`, mostra FormMessage); senha visível ou oculta | Botão de mostrar senha: no DS faz parte do preset password. |
| 9 | `Button` | `<Button variant="danger" fullWidth type="submit">Encerrar conta</Button>` | padrão; carregando (`loading`, "Encerrando conta") | — |
| 10 | `Button` | `<Button variant="secondary" fullWidth>Cancelar</Button>` | — | Navega para `seguranca`. |
| 11 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| `FormMessage` | via `error` do TextField | Senha vazia, ao enviar. |

Classes locais usadas na tela (fora do DS): `.enc-actions*`.

## 3. Campos e validações

| Campo | id | Controle |
|---|---|---|
| Para confirmar, digite sua senha | `enc-senha` | `password` · name=`senha` · autocomplete=`current-password` · placeholder "Sua senha" |

| Campo | Regra | Mensagem de erro |
|---|---|---|
| Senha | Obrigatória. | Digite sua senha para confirmar o encerramento. |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [AREA-03 · Segurança](../AREA-03-seguranca/spec.md) |  |
| Ajuda | — |  |
| Mostrar senha | — |  |
| Encerrar conta | — |  |
| Cancelar | [AREA-03 · Segurança](../AREA-03-seguranca/spec.md) |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Padrão
- Erro
- Encerrando (loading)

## 6. Comportamento

- Explica o que acontece: perde ingressos e benefícios, biometria removida das catracas, histórico guardado pelo prazo legal e, para voltar, falar com o atendimento.
- Campo de senha com botão Mostrar ou ocultar.
- Ao enviar: spinner no botão e "Encerrando conta" para leitor de tela; depois de 1,2 s abre ENT-01 com o aviso de conta encerrada.
- Cancelar e Voltar limpam o formulário e abrem AREA-03.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [AREA-03 · Segurança](../AREA-03-seguranca/spec.md) | Encerrar conta | — | Caminho alternativo |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [ENT-01 · Login](../ENT-01-login/spec.md) | Encerrar conta | Senha preenchida; o login mostra o aviso de conta encerrada | Caminho principal |
| [AREA-03 · Segurança](../AREA-03-seguranca/spec.md) | Cancelar ou Voltar | — | Voltar |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Tela de resultado do encerramento (hoje é o aviso no login).

## 11. Critérios de aceite

- [ ] Sem senha, mostra o erro.
- [ ] Com senha, abre ENT-01 com o aviso.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
