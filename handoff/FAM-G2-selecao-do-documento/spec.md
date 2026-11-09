# FAM-G2 · Seleção do documento do familiar

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.
>
> **Aprovada.** Tela nova, que não estava no fluxo. Entra antes do tutorial de captura. Cada documento escolhido vai ter a sua versão do fluxo de captura. Premissas na seção 10.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-G2` (passo 0: escolha do documento e do modo de envio, antes do tutorial) |
| Id no protótipo | — (não implementada) |
| Raia | Familiares · Cadastro do familiar no celular do titular |
| Figma | Estrutura de referência: DOC-01, [`1928:61728`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1928-61728) (variante CNH aberta, [`screen--cnh-aberta.html`](../DOC-01-selecao-de-documento/screen--cnh-aberta.html)). Comportamento de expansão: [`2256:29943`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2256-29943) |
| Status | Aprovada |
| Marcação | [screen.html](screen.html) (Padrão, maior de idade) · [screen--menor.html](screen--menor.html) (Menor de idade) |
| Entradas / saídas | 2 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Premissas e lacunas · 11. Critérios de aceite

## 1. Objetivo

Deixar o titular escolher o documento de identidade do familiar e como enviá-lo: tirar a foto ou fazer upload. A escolha define o fluxo de captura que vem depois.

## 2. Componentes

| # | Componente | JSX | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Cadastro do familiar" language={false} help />` | — | Sem barra de progresso, como no restante do FAM-G2. |
| 2 | `PageHeading` | `<PageHeading title="Escolha um documento" subtitle="Selecione o documento de identidade de Ana Paula e escolha como enviá-lo." tone="neutral" />` | Menor de idade: "Para menor de idade, a CNH não é aceita. Selecione CIN ou RG e escolha como enviá-lo." | Estrutura de DOC-01. |
| 3 | `DocumentOption` (CIN) | `<DocumentOption title="CIN" badge="Aprovação mais rápida" description="Carteira de Identidade Nacional" value="cin" name="documento">{ações}</DocumentOption>` | fechado; aberto (escolhido) | Dentro de um grupo de rádio (`name="documento"`). |
| 4 | `DocumentOption` (CNH) | `<DocumentOption title="CNH" badge="Aprovação mais rápida" description="Carteira Nacional de Habilitação" value="cnh" name="documento">{ações}</DocumentOption>` | fechado; aberto (escolhido) | **Só para maior de idade.** Some na variante de menor. |
| 5 | `DocumentOption` (RG) | `<DocumentOption title="RG" badge="Aprovação pode demorar mais" description="Registro Geral" value="rg" name="documento">{ações}</DocumentOption>` | fechado; aberto (escolhido) | Presente nas duas variantes. |
| 6 | `ActionRow` (foto) | `<ActionRow icon="camera">Tirar foto do documento</ActionRow>` | — | Dentro do painel da opção escolhida. |
| 7 | `ActionRow` (upload) | `<ActionRow icon="upload">Fazer upload do documento</ActionRow>` | — | Dentro do painel da opção escolhida. |
| 8 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

Classes locais: as de DOC-01 (`.doc-list*`, `.po-docopt*`, `.po-action*`).

## 3. Campos e validações

_Sem campos._ A escolha é feita pelo grupo de rádio: uma opção por vez.

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [FAM-13 · Termo de responsabilidade · menor](../FAM-13-termo-de-responsabilidade-menor/spec.md) ou [FAM-14 · Decisão do titular · maior de idade](../FAM-14-decisao-do-titular-maior-de-idade/spec.md) | Conforme o caminho de origem. |
| Tirar foto do documento | [FAM-G2 · CIN · tutorial da frente](../FAM-G2-cin-tutorial-frente/spec.md) | Vai para a versão de captura do documento escolhido. |
| Fazer upload do documento | [FAM-G2 · CIN · tutorial da frente](../FAM-G2-cin-tutorial-frente/spec.md) | Provisório: vai para o mesmo tutorial (ver seção 10). |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Nenhuma opção escolhida (todas fechadas)
- Opção escolhida e aberta, com as ações de foto e upload
- Variante de menor de idade (sem CNH)

## 6. Comportamento

- Como em DOC-01: a opção escolhida fica marcada e expande um painel com duas ações, **Tirar foto do documento** e **Fazer upload do documento**. Escolher outra opção fecha a anterior.
- Não há botão Continuar à parte: a ação é a própria saída, como em DOC-01.
- Menor de idade: a CNH não aparece. Se o titular já tinha escolhido CNH antes de a Receita informar a idade, a escolha é descartada.
- A escolha vale só para este cadastro. Não é guardada.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-13 · Termo de responsabilidade · menor](../FAM-13-termo-de-responsabilidade-menor/spec.md) | Aceitar termo | Variante de menor (CIN e RG) | Caminho principal |
| [FAM-14 · Decisão do titular · maior de idade](../FAM-14-decisao-do-titular-maior-de-idade/spec.md) | Cadastrar agora | Variante de maior (CIN, CNH e RG) | Caminho alternativo |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-G2 · CIN · tutorial da frente](../FAM-G2-cin-tutorial-frente/spec.md) | Tirar foto do documento ou Fazer upload do documento | CIN escolhida (CNH e RG: a desenhar) | Caminho principal |
| [FAM-13](../FAM-13-termo-de-responsabilidade-menor/spec.md) ou [FAM-14](../FAM-14-decisao-do-titular-maior-de-idade/spec.md) | Voltar | Conforme a origem | Voltar |

## 9. Dados

- Documento escolhido (CIN, CNH ou RG) e modo de envio (foto ou upload). Fica só nesta etapa até o envio do cadastro.

Visão geral: [dados.md](../dados.md).

## 10. Premissas e lacunas

**Premissas a validar:**

- **CNH só para maior de idade:** menor não tem CNH. A tela de menor não mostra a opção.
- **Badges:** os mesmos de DOC-01.
- **Upload:** aparece na tela, como no comportamento de expansão pedido. O upload ainda não tem tela própria: por ora leva ao tutorial de captura, como DOC-01 faz provisoriamente.

**Em aberto:**

- **Versões de captura por documento:** o titular quer uma versão do fluxo de captura para cada documento (CIN, CNH e RG). Tutorial, câmera, confirmação e verso ainda não foram desenhados para cada um.
- **Upload do familiar:** a família não tinha upload na captura (decisão de 2026-11-08 para a câmera). Confirmar se o upload entra na família, e qual tela segue.
- **Figma 2256:29943:** a referência de expansão foi lida pela DOC-01 (variante CNH aberta). Confirmar se é a mesma.

## 11. Critérios de aceite

- [ ] Escolher uma opção abre o painel com foto e upload, e fecha a opção anterior.
- [ ] Na variante de menor, a CNH não aparece.
- [ ] Tirar foto ou Fazer upload leva ao tutorial do familiar.
- [ ] Voltar leva à etapa de origem (FAM-13 ou FAM-14).

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
