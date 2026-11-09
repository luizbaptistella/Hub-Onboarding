# FAM-10 · Card e tipo de vínculo

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-10` |
| Raia | Familiares · Inclusão e gestão de vínculos |
| Figma | sem node no Figma |
| Status | Só implementada (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 2 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Confirmar a conta ativa encontrada e escolher o tipo de vínculo (Caminho A).

## 2. Componentes

5 peças nesta tela: **5 instâncias de 5 componentes do DS** (`AppHeader`, `Button`, `LegalFooter`, `PageHeading`, `Select`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Vincular familiar" language={false} help={false} />` | — | Forma atual: Edição (classe po-header-task). Navega para `familiar-busca`. |
| 2 | `PageHeading` | `<PageHeading title="Confirme o familiar" tone="neutral" spaced />` | — | — |
| 3 | `Select` | `<Select label="Tipo de vínculo" options={["Filho(a)", "Pai ou mãe", "Irmão ou irmã", "Cônjuge ou companheiro(a)", "Sobrinho(a)", "Outros"]} placeholder="Selecione o tipo de vínculo" required name="relation" />` | padrão; aberto; preenchido | — |
| 4 | `Button` | `<Button variant="primary" fullWidth type="submit">Prosseguir</Button>` | — | — |
| 5 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

Classes locais usadas na tela (fora do DS): `.area-form*`.

## 3. Campos e validações

| Campo | id | Controle |
|---|---|---|
| Tipo de vínculo | `po-sel-3-btn` | `?` |

| Campo | Regra | Mensagem de erro |
|---|---|---|
| Tipo de vínculo | Obrigatório. | Selecione o tipo de vínculo. |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [FAM-09 · Buscar familiar](../FAM-09-buscar-familiar/spec.md) |  |
| Selecione o tipo de vínculo | — |  |
| Prosseguir | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Padrão
- Erro no tipo de vínculo

## 6. Comportamento

- Card com nome e CPF mascarados (CPF `***.456.789-**`; nos demais nomes, a inicial seguida de `*`). Não mostra mais nenhum dado.
- Tipo de vínculo: dropdown com Filho, Pai ou mãe, Irmão, Cônjuge, Sobrinho e Outros.
- Prosseguir cria o vínculo em PENDENTE_CONVITE e abre FAM-11.
- Vínculo ATIVO ou PENDENTE_CONVITE com o mesmo par responde 409 ALREADY_LINKED.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-09 · Buscar familiar](../FAM-09-buscar-familiar/spec.md) | Conta ativa encontrada | Busca devolve conta ativa (spec §4) | Caminho principal |
| [FAM-11 · Confirmação de contatos e convite](../FAM-11-confirmacao-de-contatos-e-convite/spec.md) | Voltar | — | Voltar |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-09 · Buscar familiar](../FAM-09-buscar-familiar/spec.md) | Voltar | — | Voltar |
| [FAM-11 · Confirmação de contatos e convite](../FAM-11-confirmacao-de-contatos-e-convite/spec.md) | Prosseguir | Tipo de vínculo escolhido (spec §5) | Caminho principal |

## 9. Dados

- POST /v1/family-links com { family_user_id, relation }. Cria o vínculo em PENDENTE_CONVITE.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Conta de convidado menor de idade não aparece como resultado (regra da spec): a tela não trata esse caso.

## 11. Critérios de aceite

- [ ] Sem tipo de vínculo, mostra o erro e não navega.
- [ ] Prosseguir abre FAM-11.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
