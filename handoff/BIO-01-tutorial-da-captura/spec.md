# BIO-01 · Tutorial da captura

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `BIO-01` |
| Raia | Biometria facial · Etapa 3 de 4 · Figma `1774:46029` |
| Figma | [`1774:46320`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46320) (seção `1774:46029`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 3 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## Telas do Figma

| Tela | Figma | Marcação |
|---|---|---|
| Permissão · câmera e localização | [`1774:46339`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46339) | [screen--permissao.html](screen--permissao.html) |
| Passo 1 · lugar claro | [`1774:46320`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46320) | [screen.html](screen.html) |
| Passo 2 · óculos e boné | [`1774:46300`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46300) | [screen--passo-2.html](screen--passo-2.html) |
| Passo 3 · roupa | [`1774:46375`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46375) | [screen--passo-3.html](screen--passo-3.html) |

> Tutorial em 3 telas no Figma (`1774:46320`, `1774:46300`, `1774:46375`) e o pedido de permissão de câmera e localização (`1774:46339`).

## 1. Objetivo

Preparar a pessoa para a selfie em 3 passos.

## 2. Componentes

3 peças nesta tela: **3 instâncias de 3 componentes do DS** (`AppHeader`, `Button`, `Tutorial`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Biometria facial" progress={{ current: 3, total: 4 }} language={false} help />` | — | Forma atual: Verificação (classe po-header-module). |
| 2 | `Tutorial` _(na implementação atual, classes locais)_ | `<Tutorial label="Tutorial da captura" steps={[{ title: "Ache um lugar bem claro e com fundo simples.", description: "Fique de frente para a luz e sem coisas ou pessoas atrás de você. Assim, sua foto fica boa e ajuda a aprovar mais rápido." }, { title: "Tire óculos, boné ou o que cobrir seu rosto.", description: "Deixe seu rosto e olhos bem à mostra e sem reflexos. Assim, fica mais fácil reconhecer você e sua foto é aceita de primeira." }, { title: "Vista uma roupa apropriada.", description: "Não tire a foto sem camisa, com roupas de banho ou íntimas. Estar bem vestido faz com que sua selfie seja aprovada rápido." }]} continueLabel="Continuar" />` | passo 1; passo 2; passo 3 | Implementação atual monta o tutorial com classes locais lv-tut-* + PageHeading; no DS é Tutorial (passos com TutorialSlide e CarouselDots). |
| 3 | `Button` | `<Button variant="primary" fullWidth disabled iconEnd="arrow_forward">Continuar</Button>` | desativado por 3 s (`disabled` / aria-disabled); liberado | Barra de 3 s enchendo o botão (classe local lv-fill) antes de liberar. |

Classes locais usadas na tela (fora do DS): `.lv-fill*`, `.lv-tut*`.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | — |  |
| Ajuda | — |  |
| Continuar | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Passo 1
- Passo 2
- Passo 3
- Botão aguardando 3 s

## 6. Comportamento

- Passos: 1. lugar claro e fundo simples; 2. sem óculos ou boné; 3. roupa apropriada.
- Continuar fica com aria-disabled e uma barra enchendo por 3 s em cada passo; depois libera.
- Na troca de passo, o leitor de tela anuncia "Etapa n de 3, <título>".
- Voltar no 1º passo abre DOC-01; nos outros, volta um passo. Continuar no 3º abre BIO-02.
- Entrar nesta tela zera as tentativas da biometria.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | Tirar foto ou Fazer upload | Provisório: pula a captura do documento | Caminho principal |
| [DOC-24 · Conclusão do fluxo de documento](../DOC-24-documento-em-analise/spec.md) | Documento brasileiro aprovado | CIN, CNH ou RG | Caminho principal |
| [BIO-02 · Captura facial](../BIO-02-captura-facial/spec.md) | Voltar | — | Voltar |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [BIO-02 · Captura facial](../BIO-02-captura-facial/spec.md) | Continuar no 3º passo | O botão libera 3 s depois de cada passo | Caminho principal |
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | Voltar no 1º passo | — | Voltar |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Ilustrações dos passos (hoje é um placeholder).

## 11. Critérios de aceite

- [ ] O Continuar não age antes de 3 s.
- [ ] Depois do 3º passo, abre BIO-02.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
