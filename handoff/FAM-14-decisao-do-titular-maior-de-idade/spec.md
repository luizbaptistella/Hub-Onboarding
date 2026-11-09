# FAM-14 · Decisão do titular · maior de idade

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-14` |
| Id no protótipo | `familiar-decisao` (`prototipo.html#familiar-decisao`) |
| Raia | Familiares · Inclusão e gestão de vínculos |
| Figma | sem node no Figma |
| Status | Só no protótipo (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 3 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Deixar o titular escolher como cadastrar um familiar maior de idade (Caminho B).

## 2. Componentes

5 peças nesta tela: **5 instâncias de 4 componentes do DS** (`AppHeader`, `LegalFooter`, `OptionCard`, `PageHeading`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Cadastrar familiar" language={false} help={false} />` | — | Forma no protótipo: Edição (classe po-header-task). Navega para `familiar-cadastro`. |
| 2 | `PageHeading` | `<PageHeading title="Como deseja concluir o cadastro?" subtitle="Você pode preencher agora, no seu celular, ou enviar um convite para o familiar confirmar os próprios dados." tone="neutral" />` | — | — |
| 3 | `OptionCard` | `<OptionCard icon="person_add" title="Cadastrar agora" description="Preencha os dados e tire as fotos do documento e do rosto do familiar no seu celular." layout="stacked" />` | — | — |
| 4 | `OptionCard` | `<OptionCard icon="send" title="Enviar convite" description="O familiar recebe o convite por e-mail ou SMS e confirma os próprios dados." layout="stacked" />` | — | — |
| 5 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

Classes locais usadas na tela (fora do DS): `.familiar-options*`.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [FAM-12 · Cadastro do familiar (sem conta)](../FAM-12-cadastro-do-familiar-sem-conta/spec.md) |  |
| Cadastrar agora Preencha os dados e tire as fotos do documento e do rosto do familiar no seu celular. | — |  |
| Enviar convite O familiar recebe o convite por e-mail ou SMS e confirma os próprios dados. | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Padrão

## 6. Comportamento

- Cadastrar agora: mesmo fluxo do menor, sem termo. Preenchimento e capturas no celular do titular (FAM-G2).
- Enviar convite: reaproveita os contatos informados na tela de cadastro e abre FAM-11.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-15 · Código do contato do familiar](../FAM-15-codigo-do-contato-do-familiar/spec.md) | Último contato confirmado · após 1,8 s | Receita informou familiar maior de idade (spec §6.1) | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-12 · Cadastro do familiar (sem conta)](../FAM-12-cadastro-do-familiar-sem-conta/spec.md) | Voltar | — | Voltar |
| [FAM-G2 · Seleção do documento do familiar](../FAM-G2-selecao-do-documento/spec.md) | Cadastrar agora | Mesmo fluxo do menor, sem termo (spec §6.3); CIN, CNH e RG | Caminho alternativo |
| [FAM-11 · Confirmação de contatos e convite](../FAM-11-confirmacao-de-contatos-e-convite/spec.md) | Enviar convite | Reaproveita os contatos informados (spec §6.3) | Caminho alternativo |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Ao cadastrar agora, o familiar recebe login e cria a senha no fim do cadastro (status PENDENTE_SENHA até concluir).

## 11. Critérios de aceite

- [ ] Cadastrar agora segue para FAM-G2.
- [ ] Enviar convite abre FAM-11 com os contatos já preenchidos.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
