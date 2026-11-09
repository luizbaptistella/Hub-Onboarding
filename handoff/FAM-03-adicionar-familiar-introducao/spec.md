# FAM-03 · Adicionar familiar · introdução

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-03` |
| Raia | Familiares · Inclusão e gestão de vínculos |
| Figma | `3057:44465` (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 2 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Explicar quem pode ser adicionado e como funciona o vínculo.

## 2. Componentes

6 peças nesta tela: **5 instâncias de 5 componentes do DS** (`Alert`, `AppHeader`, `Button`, `LegalFooter`, `PageHeading`) e **1 peças fora do DS**.

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Adicionar familiar" language={false} help />` | — | Forma atual: Edição (classe po-header-task). Navega para `familiar-recebidos`. |
| 2 | `PageHeading` | `<PageHeading title="Sua família no Torcedor 360" subtitle="Adicione familiares para comprar ingressos para eles. Cada um tem a própria identidade validada." tone="neutral" />` | — | — |
| 3 | Lista de parentescos _(fora do DS)_ | items: ["Filhos", "Cônjuge ou companheiro(a)", "Pai e mãe", "Irmãos", "Avô e avó"] | — | Fora do DS; equivalente: List com ListItem. |
| 4 | `Alert` | `<Alert tone="info">Menores de 18 anos ficam sob sua responsabilidade. Maiores de 18 recebem um convite e confirmam o vínculo.</Alert>` | — | — |
| 5 | `Button` | `<Button variant="primary" fullWidth iconEnd="add">Adicionar familiar</Button>` | — | Navega para `familiar-busca`. |
| 6 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

Classes locais usadas na tela (fora do DS): `.familiar-intro*`.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) |  |
| Ajuda | — |  |
| Adicionar familiar | [FAM-09 · Buscar familiar](../FAM-09-buscar-familiar/spec.md) |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Padrão

## 6. Comportamento

- Lista: filhos, cônjuge ou companheiro(a), pai e mãe, irmãos, avô e avó.
- Menores de 18 ficam sob responsabilidade do titular; maiores recebem convite e confirmam o vínculo.
- Adicionar familiar abre FAM-09.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-01 · Meus familiares · vazio](../FAM-01-meus-familiares-vazio/spec.md) | Incluir novo familiar | — | Caminho principal |
| [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) | Incluir novo familiar | — | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-09 · Buscar familiar](../FAM-09-buscar-familiar/spec.md) | Adicionar familiar | — | Caminho principal |
| [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) | Voltar | Sempre volta para a lista, mesmo vindo do estado vazio | Voltar |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Voltar sempre abre FAM-17, mesmo quando a pessoa veio de FAM-01.
- Regra de parentesco diferente da de FAM-01.

## 11. Critérios de aceite

- [ ] Voltar retorna à tela de origem (ajuste pendente).

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
