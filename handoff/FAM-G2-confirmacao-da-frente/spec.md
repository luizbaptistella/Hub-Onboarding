# FAM-G2 · Confirmação da frente do documento do familiar

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
>
> **Proposta, ainda não validada.** Passo 3 do fluxo FAM-G2. Estrutura de BIO-04 (conferência da foto), com o texto da frente do documento do familiar. Premissas na seção 10.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-G2` (passo 3 do fluxo) |
| Raia | Familiares · Cadastro do familiar no celular do titular |
| Figma | Estrutura de referência: BIO-04, [`1774:46253`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46253). Telas próprias do FAM-G2: não desenhadas |
| Status | Proposta, a validar |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas e premissas · 11. Critérios de aceite

## 1. Objetivo

Deixar o titular conferir a foto da frente do documento do familiar antes de seguir, e decidir entre salvar e tirar outra.

## 2. Componentes

4 peças nesta tela: **4 instâncias de 4 componentes do DS** (`AppHeader`, `Image`, `PageHeading`, `Button`).

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Captura do documento" language={false} help />` | — | Sem barra de progresso, como no restante do FAM-G2. |
| 2 | `Image` | `<Image alt="Foto da frente do documento de Ana Paula" rounded height={320} src={fotoFrente} />` | placeholder (sem foto) | Foto da frente capturada. |
| 3 | `PageHeading` | `<PageHeading title="Confira se a frente do documento está legível." subtitle="Veja se as informações estão nítidas e se o documento aparece inteiro na foto." tone="neutral" spaced />` | — | — |
| 4 | `Button` | `<Button variant="primary" fullWidth iconEnd="arrow_forward">Salvar e continuar</Button>` | — | Vai para o verso (a desenhar). |
| 5 | `Button` | `<Button variant="secondary" fullWidth iconEnd="photo_camera">Tirar outra foto</Button>` | — | Volta para a captura da frente. |

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [FAM-G2 · Captura da frente do documento do familiar](../FAM-G2-captura-do-documento/spec.md) | — |
| Ajuda | — | — |
| Salvar e continuar | [FAM-G2 · CIN · captura do verso](../FAM-G2-cin-captura-verso/spec.md) (CIN). Genérico: a desenhar | — |
| Tirar outra foto | [FAM-G2 · Captura da frente do documento do familiar](../FAM-G2-captura-do-documento/spec.md) | — |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Foto da frente capturada

## 6. Comportamento

- O texto de conferência pede só legibilidade e enquadramento, como em BIO-04.
- "Salvar e continuar" guarda a foto da frente e segue para o verso.
- "Tirar outra foto" descarta a foto e volta para a captura. Não guarda nada.
- A foto não vai para a galeria do celular.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-G2 · Captura da frente do documento do familiar](../FAM-G2-captura-do-documento/spec.md) | Foto tirada | — | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-G2 · CIN · captura do verso](../FAM-G2-cin-captura-verso/spec.md) | Salvar e continuar | CIN | Caminho principal |
| [FAM-G2 · CIN · captura da frente](../FAM-G2-cin-captura-frente/spec.md) | Tirar outra foto | — | Caminho alternativo |

## 9. Dados

- Imagem da frente do documento, guardada até o envio do cadastro.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e premissas

**Premissas a validar:**

- **Texto:** adaptado de BIO-04 ("Confira se sua foto está legível") para o documento.
- **Sem barra de progresso:** o cadastro do familiar tem outro total de etapas.
- **Foto:** placeholder, como em BIO-04. A foto real vem da câmera de FAM-G2 (captura da frente).
- **Verso em seguida:** "Salvar e continuar" leva ao verso, porque RG e CNH têm dois lados. Se o produto quiser pular o verso para algum documento, a tela muda.

**Em aberto:**

- **Verso:** ainda não desenhado (parte de DOC-G1).
- **Conferência dos dados:** DOC-G1 prevê conferência. Ainda não definida: se a leitura do documento deve mostrar os dados lidos antes do envio.

## 11. Critérios de aceite

- [ ] A foto da frente aparece no lugar da imagem.
- [ ] "Salvar e continuar" segue para o verso.
- [ ] "Tirar outra foto" volta para a captura da frente e descarta a foto.
- [ ] A foto não é salva na galeria.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
