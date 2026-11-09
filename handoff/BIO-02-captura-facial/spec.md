# BIO-02 · Captura facial

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `BIO-02` |
| Id no protótipo | `liv-face` (`prototipo.html#liv-face`) |
| Raia | Biometria facial · Etapa 3 de 4 · Figma `1774:46029` |
| Figma | [`1774:46144`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46144) (seção `1774:46029`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 3 / 4 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## Telas do Figma

| Tela | Figma | Marcação |
|---|---|---|
| Giro · esquerda | [`1774:46144`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46144) | [screen.html](screen.html) |
| Giro · Perfeito! | [`1774:46127`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46127) | [screen--perfeito.html](screen--perfeito.html) |
| Giro · direita | [`1774:46165`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46165) | [screen--giro-direita.html](screen--giro-direita.html) |
| Giro · Muito bom! | [`1774:46110`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46110) | [screen--muito-bom.html](screen--muito-bom.html) |
| Enquadramento · olhe para frente | [`1774:46185`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46185) | [screen--olhe-para-frente.html](screen--olhe-para-frente.html) |
| Enquadramento · moldura | [`1774:46205`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46205) | [screen--moldura.html](screen--moldura.html) |
| Aprovado · Excelente! | [`1774:46229`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46229) | [screen--aprovado.html](screen--aprovado.html) |
| Aprovado · contagem 3, 2, 1 | [`1774:46265`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46265) | [screen--contagem.html](screen--contagem.html) |
| Aprovado · captura | [`1774:46400`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46400) | [screen--captura.html](screen--captura.html) |
| Reprovado · aproxime-se | [`1774:46056`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46056) | [screen--reprovado-aproxime.html](screen--reprovado-aproxime.html) |
| Reprovado · afaste-se | [`1774:46090`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46090) | [screen--reprovado-afaste.html](screen--reprovado-afaste.html) |
| Reprovado · enquadre no centro | [`1774:46073`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46073) | [screen--reprovado-centro.html](screen--reprovado-centro.html) |
| Celular na horizontal | [`1774:46031`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46031) | [screen--horizontal.html](screen--horizontal.html) |

> Sequência do Figma: giro esquerda `1774:46144`, Perfeito `46127`, giro direita `46165`, Muito bom `46110`, olhe para frente `46185`, moldura `46205`; aprovado: Excelente `46229`, contagem `46265`, captura `46400`; reprovado: aproxime-se `46056`, afaste-se `46090`, centro `46073`; celular na horizontal `46031`. Todas como variantes estáticas na aba Tela.

## 1. Objetivo

Capturar o rosto com prova de vida.

## 2. Componentes

2 peças nesta tela: **2 instâncias de 2 componentes do DS** (`AppHeader`, `FaceCapture`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Biometria facial" progress={{ current: 3, total: 4 }} language={false} help />` | — | Forma no protótipo: Verificação (classe po-header-module). |
| 2 | `FaceCapture` _(no protótipo, classes locais)_ | `<FaceCapture state="progress" />` | `progress` esquerda/direita; `success`; `idle`; `frame` (aguardando decisão); `warning` (avisos); `countdown` 3-2-1; pausado com o celular na horizontal | Protótipo usa classes locais lv-*; implementar com o FaceCapture do DS. |

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| `OrientationHint` | visible message="Posicione seu celular na vertical." | Celular na horizontal; pausa a captura. |

Classes locais usadas na tela (fora do DS): `.lv-arc*`, `.lv-body*`, `.lv-circle*`, `.lv-face*`.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | — |  |
| Ajuda | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Giro esquerda
- Giro direita
- Sucesso
- Moldura
- Aviso
- Contagem
- Pausado (horizontal)

## 6. Comportamento

- Roteiro: girar para a esquerda (arco de progresso) → "Perfeito!" → girar para a direita → "Muito bom!" → olhar para frente → moldura oval aguardando a decisão.
- Aprovado: contagem 3, 2, 1 com "Excelente! Vamos tirar sua foto." e abre BIO-03.
- Reprovado (1ª e 2ª vez): avisos de 1,4 s cada ("Aproxime-se...", "Afaste-se...", "Enquadre seu rosto...") e volta à moldura.
- 3ª reprovação: abre BIO-05.
- Celular na horizontal: pausa e mostra "Posicione seu celular na vertical"; retoma de onde parou ao voltar para a vertical.
- No protótipo, aprovar e reprovar são botões no menu lateral. No app, a decisão vem do SDK ou backend de liveness.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [BIO-01 · Tutorial da captura](../BIO-01-tutorial-da-captura/spec.md) | Continuar no 3º passo | O botão libera 3 s depois de cada passo | Caminho principal |
| [BIO-02 · Captura facial](../BIO-02-captura-facial/spec.md) | Rosto aprovado? Reprovado · avisos e nova tentativa | 1ª e 2ª reprovação | Erro ou nova tentativa |
| [BIO-04 · Conferência da foto](../BIO-04-conferencia-da-foto/spec.md) | Tirar outra foto | — | Caminho alternativo |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [BIO-03 · Validando a foto](../BIO-03-validando-a-foto/spec.md) | Rosto enquadrado na moldura → Rosto aprovado? Aprovado · contagem 3, 2, 1 | — | Caminho principal |
| [BIO-02 · Captura facial](../BIO-02-captura-facial/spec.md) | Rosto enquadrado na moldura → Rosto aprovado? Reprovado · avisos e nova tentativa | 1ª e 2ª reprovação | Erro ou nova tentativa |
| [BIO-05 · Bloqueio · 3 tentativas](../BIO-05-bloqueio-3-tentativas/spec.md) | Rosto enquadrado na moldura → Rosto aprovado? 3ª reprovação | — | Erro ou nova tentativa |
| [BIO-01 · Tutorial da captura](../BIO-01-tutorial-da-captura/spec.md) | Voltar | — | Voltar |

## 9. Dados

- Tentativas de biometria: no máximo 3.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Integração com o SDK de liveness e mensagens reais de reprovação.

## 11. Critérios de aceite

- [ ] Três reprovações seguidas abrem BIO-05.
- [ ] Girar para horizontal pausa o roteiro, que retoma na vertical.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
