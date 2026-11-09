# FAM-11 · Confirmação de contatos e convite

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-11` |
| Id no protótipo | `familiar-contatos` (`prototipo.html#familiar-contatos`) |
| Raia | Familiares · Inclusão e gestão de vínculos |
| Figma | sem node no Figma |
| Status | Só no protótipo (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 2 / 3 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Confirmar os canais de contato do familiar e enviar o convite (Caminho A e maior de idade do Caminho B).

## 2. Componentes

5 peças nesta tela: **5 instâncias de 4 componentes do DS** (`AppHeader`, `Button`, `LegalFooter`, `PageHeading`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Vincular familiar" language={false} help={false} />` | — | Forma no protótipo: Edição (classe po-header-task). Navega para `familiar-vinculo`. |
| 2 | `PageHeading` | `<PageHeading title="Enviar convite ao familiar" tone="neutral" spaced />` | — | — |
| 3 | `Button` | `<Button variant="primary" fullWidth type="submit" iconEnd="send">Enviar link</Button>` | — | — |
| 4 | `Button` | `<Button variant="secondary" fullWidth iconEnd="link">Copiar link</Button>` | — | — |
| 5 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

Classes locais usadas na tela (fora do DS): `.area-form*`.

## 3. Campos e validações

| Campo | Regra | Mensagem de erro |
|---|---|---|
| Canais | Pelo menos um marcado. | Escolha pelo menos um canal para enviar o convite. |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [FAM-10 · Card e tipo de vínculo](../FAM-10-card-e-tipo-de-vinculo/spec.md) |  |
| Alterar | — | Sem fluxo ainda |
| Enviar link | — |  |
| Copiar link | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Padrão
- Erro sem canal marcado

## 6. Comportamento

- Carrega o e-mail e o celular salvos na base do convidado (Caminho A) ou os contatos informados no cadastro (Caminho B).
- Checkboxes de canal (e-mail e SMS): pelo menos um precisa estar marcado.
- Titular pode trocar o e-mail e o celular do convidado. A troca vale só para o envio deste convite (P7); não atualiza o cadastro do familiar.
- Se o contato do convidado mudar depois do convite, o convite usa o contato atual. A atualização do contato é automática.
- Enviar convite cria o convite com validade de 7 dias e dispara as notificações. Abre FAM-17.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-10 · Card e tipo de vínculo](../FAM-10-card-e-tipo-de-vinculo/spec.md) | Prosseguir | Tipo de vínculo escolhido (spec §5) | Caminho principal |
| [FAM-14 · Decisão do titular · maior de idade](../FAM-14-decisao-do-titular-maior-de-idade/spec.md) | Enviar convite | Reaproveita os contatos informados (spec §6.3) | Caminho alternativo |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-10 · Card e tipo de vínculo](../FAM-10-card-e-tipo-de-vinculo/spec.md) | Voltar | — | Voltar |
| [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) | Enviar convite | Pelo menos um canal marcado (spec §5 e §7) | Caminho principal |
| [FAM-16 · Convite · entrada pelo link (sem conta)](../FAM-16-convite-entrada-pelo-link-sem-conta/spec.md) | Convidado abre o link do convite | Mesmo convite enviado em FAM-11 (spec §8.2) | Caminho alternativo |

## 9. Dados

- POST /v1/family-links/{id}/invitations com { channels: [EMAIL, SMS] }.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Limite de 3 reenvios por convite (P4). Ao atingir o limite, o card some em FAM-17. Para enviar de novo, o titular busca o familiar e cadastra os contatos outra vez.
- Caminho B exige OTP de cada contato informado (spec §6.4): tela em FAM-15 (aprovada).

## 11. Critérios de aceite

- [ ] Sem canal marcado, mostra o erro e não envia.
- [ ] Enviar convite abre FAM-17 com o convite pendente.
- [ ] Após 3 reenvios, o convite não aparece mais para reenvio em FAM-17.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
