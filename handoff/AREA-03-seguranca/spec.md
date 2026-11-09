# AREA-03 · Segurança

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `AREA-03` |
| Id no protótipo | `seguranca` (`prototipo.html#seguranca`) |
| Raia | Área logada · Meu cadastro, notificações, ajuda e segurança |
| Figma | `3142:61656` (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 2 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Gerenciar o acesso e os logins sociais.

## 2. Componentes

11 peças nesta tela: **11 instâncias de 4 componentes do DS** (`AppHeader`, `LegalFooter`, `List`, `ListItem`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Segurança" language={false} help />` | — | Forma no protótipo: Edição (classe po-header-task). Navega para `area-cadastro-detalhe`. |
| 2 | `List` | `<List label="Acesso" />` | — | — |
| 3 | ↳ `ListItem` | `<ListItem title="Senha" description="Alterada há 3 meses" icon="password" action={{ label: "Alterar" }} />` | Conectado (Desconectar); Não conectado (Conectar) | — |
| 4 | ↳ `ListItem` | `<ListItem title="Verificação em duas etapas" description="Código por SMS ao entrar e ao alterar dados" icon="password" />` | — | — |
| 5 | `List` | `<List label="Login social" />` | — | — |
| 6 | ↳ `ListItem` | `<ListItem title="Google" description="Conectado · roberto.silva@gmail.com" icon="(logo do provedor)" action={{ label: "Desconectar", tone: "danger" }} />` | Conectado (Desconectar); Não conectado (Conectar) | — |
| 7 | ↳ `ListItem` | `<ListItem title="Apple" description="Não conectado" icon="(logo do provedor)" action={{ label: "Conectar" }} />` | Conectado (Desconectar); Não conectado (Conectar) | — |
| 8 | ↳ `ListItem` | `<ListItem title="Microsoft" description="Não conectado" icon="(logo do provedor)" action={{ label: "Conectar" }} />` | Conectado (Desconectar); Não conectado (Conectar) | — |
| 9 | `List` | `<List ariaLabel="Conta" />` | — | — |
| 10 | ↳ `ListItem` | `<ListItem title="Encerrar conta" icon="person_remove" tone="danger" />` | — | Navega para `encerrar-conta`. |
| 11 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

Classes locais usadas na tela (fora do DS): `.seg-help*`, `.seg-link*`, `.seg-row*`.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) |  |
| Ajuda | — |  |
| Alterar | — | Sem fluxo ainda |
| Verificação em duas etapas Código por SMS ao entrar e ao alterar dados Desligada | — | Sem fluxo ainda |
| Desconectar | — |  |
| Conectar | — |  |
| Sair de todos os outros aparelhos | — | Sem fluxo ainda |
| Encerrar conta | [AREA-04 · Encerrar conta](../AREA-04-encerrar-conta/spec.md) |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Conectado
- Não conectado

## 6. Comportamento

- Senha (Alterar) e Verificação em duas etapas (badge "Desligada") ainda sem fluxo.
- Login social: Google, Apple e Microsoft com Conectar ou Desconectar, alternando o estado da linha.
- "Sair de todos os outros aparelhos" ainda sem fluxo.
- Encerrar conta abre AREA-04.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Menu › Segurança | — | Caminho alternativo |
| [AREA-04 · Encerrar conta](../AREA-04-encerrar-conta/spec.md) | Cancelar ou Voltar | — | Voltar |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [AREA-04 · Encerrar conta](../AREA-04-encerrar-conta/spec.md) | Encerrar conta | — | Caminho alternativo |
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Voltar | — | Voltar |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Fluxos de alterar senha, verificação em duas etapas e sair dos outros aparelhos.

## 11. Critérios de aceite

- [ ] Encerrar conta abre AREA-04.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
