# FAM-13 · Termo de responsabilidade · menor

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-13` |
| Id no protótipo | `familiar-termo` (`prototipo.html#familiar-termo`) |
| Raia | Familiares · Inclusão e gestão de vínculos |
| Figma | sem node no Figma |
| Status | Só no protótipo (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Obter o termo de responsabilidade do titular antes de cadastrar um menor de idade (Caminho B).

## 2. Componentes

5 peças nesta tela: **5 instâncias de 5 componentes do DS** (`AppHeader`, `Button`, `Checkbox`, `LegalFooter`, `PageHeading`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Cadastrar familiar" language={false} help={false} />` | — | Forma no protótipo: Edição (classe po-header-task). Navega para `familiar-cadastro`. |
| 2 | `PageHeading` | `<PageHeading title="Termo de responsabilidade" subtitle="Como responsável, você responde pelo cadastro de quem tem menos de 18 anos. Leia o termo antes de confirmar." tone="neutral" />` | — | — |
| 3 | `Checkbox` | `<Checkbox name="aceite">Li e concordo com o termo de responsabilidade.</Checkbox>` | desmarcado; marcado | — |
| 4 | `Button` | `<Button variant="primary" fullWidth iconEnd="arrow_forward">Aceitar e continuar</Button>` | — | — |
| 5 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

## 3. Campos e validações

| Campo | Regra | Mensagem de erro |
|---|---|---|
| Termo | Aceite obrigatório. | Aceite o termo para continuar. |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [FAM-12 · Cadastro do familiar (sem conta)](../FAM-12-cadastro-do-familiar-sem-conta/spec.md) |  |
| Aceitar e continuar | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Padrão
- Erro sem aceite

## 6. Comportamento

- Menor de idade: o termo é obrigatório. Não existe opção de convite.
- O preenchimento e as capturas são feitos no celular do titular (FAM-G2).

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-15 · Código do contato do familiar](../FAM-15-codigo-do-contato-do-familiar/spec.md) | Último contato confirmado · após 1,8 s | Receita informou familiar menor de idade (spec §6.1) | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-12 · Cadastro do familiar (sem conta)](../FAM-12-cadastro-do-familiar-sem-conta/spec.md) | Voltar | — | Voltar |
| [FAM-G2 · Seleção do documento do familiar](../FAM-G2-selecao-do-documento/spec.md) | Aceitar termo | Obrigatório para menor (spec §6.2); CIN e RG | Caminho principal |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Texto final do termo e versionamento em aberto (P6): o protótipo usa lorem ipsum.

## 11. Critérios de aceite

- [ ] Sem aceite, mostra o erro e não avança.
- [ ] Com aceite, segue para a seleção do documento do familiar (FAM-G2).

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
