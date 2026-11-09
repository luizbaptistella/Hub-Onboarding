# CAD-06 · E-mail verificado

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `CAD-06` |
| Id no protótipo | `email-atualizado` (`prototipo.html#email-atualizado`) |
| Raia | Entrada e cadastro · Etapa 1 de 4 · dados pessoais, contatos e endereço |
| Figma | sem node no Figma |
| Status | Só no protótipo (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 2 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Confirmar que o e-mail foi verificado e levar ao endereço.

## 2. Componentes

5 peças nesta tela: **5 instâncias de 5 componentes do DS** (`Alert`, `AppHeader`, `Button`, `LegalFooter`, `ResultHero`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Cadastro" progress={{ current: 1, total: 4 }} language={false} help />` | — | Forma no protótipo: Verificação (classe po-header-module). Navega para `otp-email`. |
| 2 | `ResultHero` | `<ResultHero title="E-mail verificado com sucesso!" description="Agora vamos completar o seu cadastro com o seu endereço." tone="success" icon="mail" />` | — | — |
| 3 | `Alert` | `<Alert tone="success" title="E-mail verificado">Validação de e-mail concluída com sucesso.</Alert>` | — | No protótipo usa a classe po-status (StatusCard, depreciado no DS): implementar como Alert tone="success". |
| 4 | `Button` | `<Button variant="primary" fullWidth>Continuar</Button>` | — | Navega para `endereco`. |
| 5 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [CAD-04 · Código por e-mail](../CAD-04-codigo-por-e-mail/spec.md) |  |
| Ajuda | — |  |
| Continuar | [CAD-07 · Endereço](../CAD-07-endereco/spec.md) |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- E-mail verificado
- E-mail atualizado

## 6. Comportamento

- O título muda: "E-mail atualizado com sucesso!" se o e-mail foi editado em CAD-05; senão, "E-mail verificado com sucesso!".

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-04 · Código por e-mail](../CAD-04-codigo-por-e-mail/spec.md) | Código e-mail correto? Sim · após 1,8 s | Código confere | Caminho principal |
| [CAD-07 · Endereço](../CAD-07-endereco/spec.md) | Voltar | — | Voltar |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-07 · Endereço](../CAD-07-endereco/spec.md) | Continuar | — | Caminho principal |
| [CAD-04 · Código por e-mail](../CAD-04-codigo-por-e-mail/spec.md) | Voltar | — | Voltar |

## 9. Dados

- Lê `emailEditado`.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

_Nenhuma._

## 11. Critérios de aceite

- [ ] Continuar abre CAD-07.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
