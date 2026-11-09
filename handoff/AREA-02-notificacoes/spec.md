# AREA-02 · Notificações

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `AREA-02` |
| Raia | Área logada · Meu cadastro, notificações, ajuda e segurança |
| Figma | sem node no Figma |
| Status | Só implementada (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 1 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Listar as notificações da conta.

## 2. Componentes

8 peças nesta tela: **8 instâncias de 4 componentes do DS** (`AppHeader`, `LegalFooter`, `List`, `ListItem`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Notificações" language={false} help={false} />` | — | Forma atual: Edição (classe po-header-task). Navega para `area-cadastro-detalhe`. |
| 2 | `List` | `<List label="Hoje" />` | — | — |
| 3 | ↳ `ListItem` | `<ListItem title="Ingresso confirmado" description="Palmeiras x Corinthians · 12/11, setor Norte" icon="confirmation_number" />` | — | — |
| 4 | ↳ `ListItem` | `<ListItem title="Cadastro atualizado" description="Seu e-mail foi alterado. Se não foi você, fale com a gente." icon="mail" />` | — | — |
| 5 | `List` | `<List label="Anteriores" />` | — | — |
| 6 | ↳ `ListItem` | `<ListItem title="Meia-entrada aprovada" description="Estudante · válido até 31/12/2026" icon="school" />` | — | — |
| 7 | ↳ `ListItem` | `<ListItem title="Bem-vindo ao Sócio Torcedor" description="Seu cadastro foi concluído" icon="celebration" />` | — | — |
| 8 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Com notificações

## 6. Comportamento

- Lista agrupada em Hoje e Anteriores; os itens novos têm o badge "Novo".
- Voltar abre AREA-01.
- Notificação de convite recebido abre FAM-17 direto em Sou familiar de, com a seção expandida.
- Notificações de familiares (textos propostos, validar com produto antes do go-live):

| Evento | Para | Título | Texto |
| --- | --- | --- | --- |
| Convite aceito | Titular | Convite aceito | [Nome] aceitou o convite. Ele já aparece em Meus familiares. |
| Convite recusado | Titular | Convite recusado | [Nome] recusou o convite. Para tentar de novo, busque o familiar e cadastre os contatos outra vez. |
| Convite expirado | Titular | Convite expirado | O convite para [Nome] venceu sem resposta. Você pode reenviá-lo em Meus familiares, até o limite de 3 reenvios. |
| Convite recebido | Convidado | Novo convite de familiar | [Nome do titular] convidou você para ser familiar dele. Veja o convite em Sou familiar de. |
| Vínculo encerrado | Titular | Vínculo encerrado | A conta de [Nome] foi encerrada, e o vínculo com ele foi removido de Meus familiares. |

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Sino de notificações | — | Caminho alternativo |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Voltar | — | Voltar |
| [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) | Tocar em notificação de convite recebido | Abre em Sou familiar de, com a seção expandida | Caminho alternativo |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Tocar em notificação de convite recebido: definido (abre FAM-17 em Sou familiar de). Para as demais, em aberto.
- Marcar como lida.
- Estado vazio.

## 11. Critérios de aceite

- [ ] Voltar retorna a AREA-01.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
