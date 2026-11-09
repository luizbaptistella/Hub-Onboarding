# DOC-01 · Seleção de documento

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-01` |
| Raia | Documento e biometria · Etapas 2 e 3 de 4 · documento e validação facial |
| Figma | `1928:61728` (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Fechado), [screen--cnh-aberta.html](screen--cnh-aberta.html) (CNH aberta) |
| Entradas / saídas | 3 / 3 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Escolher o documento de identidade e como enviá-lo.

## 2. Componentes

6 peças nesta tela: **6 instâncias de 4 componentes do DS** (`AppHeader`, `DocumentOption`, `LegalFooter`, `PageHeading`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Captura de documentos" progress={{ current: 2, total: 4 }} language={false} help />` | — | Forma atual: Verificação (classe po-header-module). Navega para `status`. |
| 2 | `PageHeading` | `<PageHeading title="Escolha um documento" subtitle="Selecione um dos documentos listados abaixo para continuar com a validação." tone="neutral" />` | — | — |
| 3 | `DocumentOption` | `<DocumentOption title="CIN" badge="<Badge tone=\"success\">Aprovação mais rápida</Badge>" description="Carteira de Identidade Nacional" value="cin" name="documento" />` | não escolhido; escolhido e aberto (mostra as ActionRow) | Dentro de um RadioGroup (name="documento"). |
| 4 | `DocumentOption` | `<DocumentOption title="CNH" badge="<Badge tone=\"success\">Aprovação mais rápida</Badge>" description="Carteira Nacional de Habilitação" value="cnh" name="documento" />` | não escolhido; escolhido e aberto (mostra as ActionRow) | Dentro de um RadioGroup (name="documento"). |
| 5 | `DocumentOption` | `<DocumentOption title="RG" badge="<Badge tone=\"warning\">Aprovação pode demorar mais</Badge>" description="Registro Geral" value="rg" name="documento" />` | não escolhido; escolhido e aberto (mostra as ActionRow) | Dentro de um RadioGroup (name="documento"). |
| 6 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

**Só em outras variantes desta tela:**

- _CNH aberta_: `DocumentOption` `<DocumentOption title="CNH" badge="<Badge tone=\"success\">Aprovação mais rápida</Badge>" description="Carteira Nacional de Habilitação" value="cnh" name="documento" expanded />`
- _CNH aberta_: `ActionRow` `<ActionRow icon="camera">Tirar foto do documento</ActionRow>`
- _CNH aberta_: `ActionRow` `<ActionRow icon="upload">Fazer upload do documento</ActionRow>`

Classes locais usadas na tela (fora do DS): `.doc-list*`.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [CAD-08 · Status · dados recebidos](../CAD-08-status-dados-recebidos/spec.md) |  |
| Ajuda | — |  |
| Tirar foto do documento | [BIO-01 · Tutorial da captura](../BIO-01-tutorial-da-captura/spec.md) |  |
| Fazer upload do documento | [BIO-01 · Tutorial da captura](../BIO-01-tutorial-da-captura/spec.md) |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Nenhuma opção
- Opção aberta com ações (variante CNH aberta)

## 6. Comportamento

- Grupo de rádio com CIN e CNH (badge "Aprovação mais rápida") e RG (badge "Aprovação pode demorar mais").
- A opção escolhida abre um painel com duas ações: Tirar foto do documento e Fazer upload do documento.
- Provisório: as duas ações vão direto para BIO-01.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-08 · Status · dados recebidos](../CAD-08-status-dados-recebidos/spec.md) | 10 s ou Continuar agora | — | Automática (timer) |
| [BIO-01 · Tutorial da captura](../BIO-01-tutorial-da-captura/spec.md) | Voltar no 1º passo | — | Voltar |
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Concluir validação ou Tentar novamente | Cenário pendente ou reprovado | Caminho alternativo |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-08 · Status · dados recebidos](../CAD-08-status-dados-recebidos/spec.md) | Voltar | — | Voltar |
| [BIO-01 · Tutorial da captura](../BIO-01-tutorial-da-captura/spec.md) | Tirar foto ou Fazer upload | Provisório: pula a captura do documento | Caminho principal |
| DOC-G1 · Captura do documento | Tirar foto ou Fazer upload | — | Lacuna (a desenhar) |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Telas de captura e upload do documento (DOC-G1).
- Regras de formato e tamanho do upload.

## 11. Critérios de aceite

- [ ] Escolher uma opção abre o painel só dela.
- [ ] As ações levam à próxima etapa definida (hoje BIO-01).

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
