# AJD-02 · Ajuda · chamado aberto

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `AJD-02` |
| Raia | Área logada · Meu cadastro, notificações, ajuda e segurança |
| Figma | sem node no Figma |
| Status | Só implementada (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 1 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Confirmar o chamado e mostrar o protocolo.

## 2. Componentes

6 peças nesta tela: **5 instâncias de 4 componentes do DS** (`AppHeader`, `Button`, `LegalFooter`, `PageHeading`) e **1 peças fora do DS**.

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Fechar" }} title="Ajuda e atendimento" language={false} help={false} />` | — | Forma atual: Edição (classe po-header-task). Navega para `area-cadastro-detalhe`. |
| 2 | `PageHeading` | `<PageHeading title="Chamado aberto" subtitle="Guarde o número de protocolo. Enviamos uma cópia para o seu e-mail." tone="neutral" />` | — | — |
| 3 | Bloco de protocolo _(fora do DS)_ | label: Número de protocolo; value: PAL-2026-004812 | — | Fora do DS (ajd-proto-*). |
| 4 | ↳ `Button` | `<Button variant="secondary" fullWidth={false} iconStart="content_copy">Copiar número</Button>` | padrão; "Número copiado" ou "Copie manualmente" | — |
| 5 | `Button` | `<Button variant="primary" fullWidth>Voltar para a área logada</Button>` | — | Navega para `area-cadastro-detalhe`. |
| 6 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

Classes locais usadas na tela (fora do DS): `.ajd-actions*`, `.ajd-caption*`, `.ajd-done*`, `.ajd-proto*`.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Fechar | [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) |  |
| Copiar número | — |  |
| Voltar para a área logada | [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Chamado aberto
- Número copiado

## 6. Comportamento

- Copiar número usa a área de transferência: mostra "Número copiado" ou, se falhar, "Copie manualmente".
- Fechar e Voltar para a área logada abrem AREA-01.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [AJD-01 · Ajuda · abrir chamado](../AJD-01-ajuda-abrir-chamado/spec.md) | Abrir chamado | Categoria escolhida e descrição com 20+ caracteres | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Voltar para a área logada ou Fechar | — | Caminho principal |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Prazo de resposta a definir pelo atendimento.

## 11. Critérios de aceite

- [ ] O protocolo exibido é o mesmo gerado no envio.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
