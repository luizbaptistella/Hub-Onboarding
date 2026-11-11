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
| Voltar | [CAD-10 · Criação de senha](../CAD-10-criacao-de-senha/spec.md) |  |
| Ajuda | — |  |
| Tirar foto do documento | CIN, CNH ou RG: tutorial da foto ([DOC-47](../DOC-47-cin-tutorial-frente/spec.md), [DOC-50](../DOC-50-cnh-tutorial-frente/spec.md), [DOC-53](../DOC-53-rg-tutorial-frente/spec.md)) | Documento escolhido |
| Fazer upload do documento | CIN, CNH ou RG: upload ([DOC-65](../DOC-65-cin-upload/spec.md), [DOC-66](../DOC-66-cnh-upload/spec.md), [DOC-67](../DOC-67-rg-upload/spec.md)) | Documento escolhido |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Nenhuma opção
- Opção aberta com ações (variante CNH aberta)

## 6. Comportamento

- Grupo de rádio com CIN e CNH (badge "Aprovação mais rápida") e RG (badge "Aprovação pode demorar mais").
- A opção escolhida abre um painel com duas ações: Tirar foto do documento e Fazer upload do documento.
- Cada documento leva ao seu tutorial da foto (DOC-47, DOC-50 ou DOC-53), que segue para câmera e confirmação (DOC-48/49, 51/52, 54/55). O tutorial e as telas de captura são provisórios (marcação do RNE).

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-10 · Criação de senha](../CAD-10-criacao-de-senha/spec.md) | Confirmar (criação de senha) | Senha válida · usuário brasileiro | Caminho principal |
| [BIO-01 · Tutorial da captura](../BIO-01-tutorial-da-captura/spec.md) | Voltar no 1º passo | — | Voltar |
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Concluir validação ou Tentar novamente | Cenário pendente ou reprovado | Caminho alternativo |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-10 · Criação de senha](../CAD-10-criacao-de-senha/spec.md) | Voltar | — | Voltar |
| [DOC-47](../DOC-47-cin-tutorial-frente/spec.md) · [DOC-50](../DOC-50-cnh-tutorial-frente/spec.md) · [DOC-53](../DOC-53-rg-tutorial-frente/spec.md) | Tirar foto do documento | CIN, CNH ou RG escolhido | Caminho principal |
| [DOC-65](../DOC-65-cin-upload/spec.md) · [DOC-66](../DOC-66-cnh-upload/spec.md) · [DOC-67](../DOC-67-rg-upload/spec.md) | Fazer upload do documento | CIN, CNH ou RG escolhido | Caminho principal |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Upload e verso: desenhados no hub (DOC-56 a DOC-67).
- Regras de formato e tamanho do upload.

## 11. Critérios de aceite

- [ ] Escolher uma opção abre o painel só dela.
- [ ] As ações levam ao tutorial do documento escolhido (DOC-47, DOC-50 ou DOC-53).

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
