# FAM-16 · Convite · entrada pelo link (sem conta)

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-16` |
| Raia | Familiares · Inclusão e gestão de vínculos |
| Figma | sem node no Figma |
| Status | Só implementada (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Confirmar a identidade do convidado sem conta antes de criar a conta, pelo link do convite.

## 2. Componentes

6 peças nesta tela: **6 instâncias de 5 componentes do DS** (`AppHeader`, `Button`, `LegalFooter`, `PageHeading`, `TextField`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Convite de familiar" language={false} help={false} />` | — | Forma atual: Edição (classe po-header-task). Navega para `login`. |
| 2 | `PageHeading` | `<PageHeading title="Roberto Silva convidou você" tone="neutral" spaced />` | — | — |
| 3 | `TextField` | `<TextField label="CPF" name="cpf" placeholder="000.000.000-00" autoComplete="off" />` | padrão; preenchido | — |
| 4 | `Button` | `<Button variant="primary" fullWidth type="submit">Continuar</Button>` | — | — |
| 5 | `Button` | `<Button variant="secondary" fullWidth>Já tenho conta</Button>` | — | Navega para `login`. |
| 6 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

Classes locais usadas na tela (fora do DS): `.area-form*`, `.convite-alert*`, `.convite-dica*`, `.convite-form*`.

## 3. Campos e validações

| Campo | id | Controle |
|---|---|---|
| CPF | `convite-cpf` | `text` · name=`cpf` · inputmode=`numeric` · autocomplete=`off` · placeholder "000.000.000-00" |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [ENT-01 · Login](../ENT-01-login/spec.md) |  |
| Continuar | — |  |
| Já tenho conta | [ENT-01 · Login](../ENT-01-login/spec.md) |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Inicial, com Continuar desabilitado até 11 dígitos
- CPF divergente (bloqueio com mensagem genérica)

## 6. Comportamento

- A tela mostra quem convidou e o tipo de vínculo, sem mostrar o CPF do convite.
- O CPF precisa ser válido e igual ao do convite. CPF diferente mostra a mensagem genérica 'Não conseguimos confirmar seu CPF', sem revelar o CPF do convite.
- Continuar com o CPF confirmado segue para o cadastro de dados pessoais (CAD-01).
- Já tenho conta leva ao login (ENT-01).

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-11 · Confirmação de contatos e convite](../FAM-11-confirmacao-de-contatos-e-convite/spec.md) | Convidado abre o link do convite | Mesmo convite enviado em FAM-11 (spec §8.2) | Caminho alternativo |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-01 · Cadastro · Dados pessoais](../CAD-01-cadastro-dados-pessoais/spec.md) | Continuar | CPF igual ao do convite; reaproveita os dados pessoais | Caminho principal |
| [ENT-01 · Login](../ENT-01-login/spec.md) | Já tenho conta | — | Caminho alternativo |
| [FAM-18 · Convite indisponível](../FAM-18-convite-indisponivel/spec.md) | Link expirado, cancelado ou já usado | Servidor responde 410 ou 409 (spec §8.3) | Erro ou nova tentativa |

## 9. Dados

- O CPF digitado não vai na URL.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Link expirado ou já usado: tela em FAM-18 (aprovada).
- A entrada pelo link ainda não está na implementação atual; a tela aparece só pelo menu de cenários.

## 11. Critérios de aceite

- [ ] CPF igual ao do convite segue para CAD-01.
- [ ] CPF diferente mostra a mensagem genérica, sem o CPF do convite.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
