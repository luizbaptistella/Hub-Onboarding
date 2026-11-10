# FAM-G2 · Confirmação do verso do documento do familiar

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
>
> **Proposta, ainda não validada.** Passo 5 do fluxo FAM-G2. Fecha a lacuna "Confirmação do verso" (FAM-G2-5 em [flow.json](../flow.json)), que era a parte de conferência da lacuna DOC-G1 para o verso. Estrutura igual à da frente ([FAM-G2 · Confirmação da frente](../FAM-G2-confirmacao-da-frente/spec.md)). Premissas na seção 10.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-G2` (passo 5 do fluxo; confirmação do verso) |
| Raia | Familiares · Cadastro do familiar no celular do titular |
| Figma | Estrutura de referência: BIO-04, [`1774:46253`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1774-46253). Telas próprias do FAM-G2: não desenhadas |
| Status | Proposta, a validar |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 2 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas e premissas · 11. Critérios de aceite

## 1. Objetivo

Deixar o titular conferir a foto do verso do documento do familiar antes de seguir para a captura facial, e decidir entre salvar e tirar outra.

## 2. Componentes

4 peças nesta tela: **4 instâncias de 4 componentes do DS** (`AppHeader`, `Image`, `PageHeading`, `Button`).

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Captura do documento" language={false} help />` | — | Sem barra de progresso, como no restante do FAM-G2. |
| 2 | `Image` | `<Image alt="Foto do verso do documento de Ana Paula" rounded height={320} src={fotoVerso} />` | placeholder (sem foto) | Foto do verso capturada. |
| 3 | `PageHeading` | `<PageHeading title="Confira se o verso do documento está legível." subtitle="Veja se as informações estão nítidas e se o documento aparece inteiro na foto." tone="neutral" spaced />` | — | Mesmo texto da frente, com "verso". |
| 4 | `Button` | `<Button variant="primary" fullWidth iconEnd="arrow_forward">Salvar e continuar</Button>` | — | Vai para a próxima etapa do FAM-G2 (captura facial, a desenhar). |
| 5 | `Button` | `<Button variant="secondary" fullWidth iconEnd="photo_camera">Tirar outra foto</Button>` | — | Volta para a captura do verso. |

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | Captura do verso ([FAM-G2 · Captura do verso](../FAM-G2-captura-do-verso/spec.md) ou, na CIN, [FAM-G2 · CIN · captura do verso](../FAM-G2-cin-captura-verso/spec.md)) | Mesma captura de origem. |
| Ajuda | — | — |
| Salvar e continuar | Próxima etapa do FAM-G2: captura facial do familiar (a desenhar) | Guarda a foto do verso. |
| Tirar outra foto | Captura do verso (a mesma de origem: [RG ou CNH](../FAM-G2-captura-do-verso/spec.md) ou [CIN](../FAM-G2-cin-captura-verso/spec.md)) | Descarta a foto do verso. |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Foto do verso capturada

## 6. Comportamento

- O texto de conferência pede só legibilidade e enquadramento, como na frente.
- "Salvar e continuar" guarda a foto do verso e segue para a próxima etapa do FAM-G2.
- "Tirar outra foto" descarta a foto e volta para a captura do verso de origem. Não guarda nada.
- Voltar leva à mesma captura do verso de origem.
- A foto não vai para a galeria do celular.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-G2 · Captura do verso do documento do familiar](../FAM-G2-captura-do-verso/spec.md) | Foto tirada | RG ou CNH | Caminho principal |
| [FAM-G2 · CIN · captura do verso do familiar](../FAM-G2-cin-captura-verso/spec.md) | Foto tirada | CIN | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| Próxima etapa do FAM-G2: captura facial do familiar (a desenhar) | Salvar e continuar | — | Caminho principal |
| [FAM-G2 · Captura do verso do documento do familiar](../FAM-G2-captura-do-verso/spec.md) | Tirar outra foto ou Voltar | RG ou CNH | Caminho alternativo |
| [FAM-G2 · CIN · captura do verso do familiar](../FAM-G2-cin-captura-verso/spec.md) | Tirar outra foto ou Voltar | CIN | Caminho alternativo |

## 9. Dados

- Imagem do verso do documento, guardada até o envio do cadastro.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e premissas

**Premissas a validar:**

- **Texto:** igual ao da frente ([FAM-G2 · Confirmação da frente](../FAM-G2-confirmacao-da-frente/spec.md)), trocando "frente" por "verso".
- **Conferência também no verso:** diferente do CRNM, em que a câmera lê só o MRZ e não há confirmação do verso (decisão de 2026-11-08, [DOC-07](../DOC-07-crnm-camera-verso/spec.md)). RG e CNH não têm código de leitura automática no verso, então a foto precisa de conferência. Se o produto quiser pular esta tela para RG e CNH, o fluxo passa direto da captura do verso para a captura facial.
- **Sem barra de progresso:** o cadastro do familiar tem outro total de etapas.
- **Foto:** placeholder, como em BIO-04. A foto real vem da câmera do verso de FAM-G2 (RG e CNH) ou de FAM-G2 · CIN.
- **Próxima etapa:** captura facial do familiar, na ordem documento, captura facial e senha (ver [FAM-G2 · Preparação do cadastro](../FAM-G2-preparacao-do-cadastro/spec.md)). A tela da captura facial ainda não foi desenhada.

**Em aberto:**

- **Conferência dos dados:** DOC-G1 prevê conferência. Ainda não definida: se a leitura do documento deve mostrar os dados lidos antes do envio. Mesma pendência da frente.
- **Verso de RG e CNH:** a instrução e a moldura do verso ainda são premissas ([FAM-G2 · Captura do verso](../FAM-G2-captura-do-verso/spec.md)).

## 11. Critérios de aceite

- [ ] A foto do verso aparece no lugar da imagem.
- [ ] "Salvar e continuar" segue para a próxima etapa do FAM-G2 (captura facial, a desenhar).
- [ ] "Tirar outra foto" volta para a captura do verso de origem e descarta a foto.
- [ ] Voltar leva à captura do verso de origem.
- [ ] A foto não é salva na galeria.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
