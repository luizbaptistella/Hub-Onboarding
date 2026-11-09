# FAM-G2 · CIN · tutorial da frente do familiar

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.
>
> **Aprovada.** Primeira tela da versão de captura da CIN. Estrutura de DOC-03 (CRNM · tutorial da frente), com os passos da CIN e o botão de preenchimento validado na FAM-G2. Premissas na seção 10.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-G2` · CIN · tutorial da frente |
| Id no protótipo | — (não implementada) |
| Raia | Familiares · Cadastro do familiar no celular do titular |
| Figma | Estrutura de referência: DOC-03, [`2788:34545`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34545). Telas da CIN do familiar: não desenhadas |
| Status | Aprovada |
| Marcação | [screen.html](screen.html) (Padrão), com [tela.js](tela.js) |
| Entradas / saídas | 1 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Passos · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Premissas e lacunas · 11. Critérios de aceite

## 1. Objetivo

Preparar o titular para fotografar a frente da CIN do familiar, em 3 passos, no próprio celular.

## 2. Componentes

Estrutura de DOC-03 com componentes do DS: header do tutorial, carrossel, imagem, pontos, número da etapa e botão.

| # | Componente | JSX | Observação |
|---|---|---|---|
| 0 | Barra de status do celular | — | Mock do sistema. Não implementar. |
| 1 | `IconButton` (Voltar) | `<IconButton variant="subtle" size="sm" icon="chevron_left" label="Voltar" />` | No header do tutorial. |
| 2 | `Button` (Pular) | `<Button variant="tertiary" size="sm" fullWidth={false}>Pular</Button>` | No header do tutorial. |
| 3 | `Image` | `<Image alt="" height="var(--size-media-hero)" />` | Placeholder (sem imagem). |
| 4 | `ScanFrame` | `<ScanFrame ratio={160 / 402} />` | Só no passo 3. Mesma proporção de DOC-03. |
| 5 | `CarouselDots` | `<CarouselDots count={3} active={n} />` | Dentro da imagem. |
| 6 | `StepNumber` | `<StepNumber value={n} total={3} noun="Etapa" decorative />` | Sobre a imagem. |
| 7 | `Button` (passo), variante de preenchimento | `<Button size="sm" fullWidth disabled className="lv-fill is-filling">Continuar</Button>` | Igual à FAM-G2 validada: barra primária enche o fundo por 3 s; em 100%, libera. No último passo: "Abrir câmera". |

## 3. Passos

| Passo | Título | Texto | Moldura |
|---|---|---|---|
| 1 | Vamos capturar a frente da CIN. | É importante que a CIN de Ana Paula esteja dentro da validade e com todas as informações legíveis. | — |
| 2 | Coloque a CIN numa superfície plana. | Use uma superfície clara e limpa, num lugar bem iluminado. | — |
| 3 | Enquadre a frente da CIN na moldura. | Posicione a CIN dentro da moldura e confira se a imagem está nítida e todas as informações legíveis. | `ScanFrame` |

Os textos vêm de DOC-03, trocando "CRNM" por "CIN" e em terceira pessoa, com o nome do familiar.

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar no 1º passo | [FAM-G2 · Seleção do documento do familiar](../FAM-G2-selecao-do-documento/spec.md) | — |
| Voltar nos passos 2 e 3 | Passo anterior | Mesma tela. |
| Pular | [FAM-G2 · CIN · captura da frente](../FAM-G2-cin-captura-frente/spec.md) | Sai do tutorial. |
| Continuar (passos 1 e 2) | Próximo passo | Só depois dos 3 s de preenchimento. |
| Abrir câmera (passo 3) | [FAM-G2 · CIN · captura da frente](../FAM-G2-cin-captura-frente/spec.md) | Só depois dos 3 s. |

## 5. Estados

- Passo 1, 2 e 3
- Botão desabilitado com a barra enchendo (3 s após cada troca de passo); habilitado em 100%

## 6. Comportamento

- Passos: 1. validade e legibilidade; 2. superfície plana e bem iluminada; 3. enquadrar a frente na moldura.
- O botão do passo segue o padrão validado na FAM-G2: desabilitado, barra enchendo, habilitado em 100%. Vale para os três passos.
- Na troca de passo, o leitor de tela anuncia "Etapa n de 3, <título>".
- Abrir câmera e Pular levam à captura da frente da CIN.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-G2 · Seleção do documento do familiar](../FAM-G2-selecao-do-documento/spec.md) | Tirar foto ou Fazer upload | CIN escolhida | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-G2 · CIN · captura da frente](../FAM-G2-cin-captura-frente/spec.md) | Abrir câmera ou Pular | — | Caminho principal |
| [FAM-G2 · Seleção do documento do familiar](../FAM-G2-selecao-do-documento/spec.md) | Voltar no 1º passo | — | Voltar |

## 9. Dados

- Documento escolhido: CIN.

Visão geral: [dados.md](../dados.md).

## 10. Premissas e lacunas

**Premissas a validar:**

- **Textos de DOC-03:** trocados "CRNM" por "CIN" e postos em terceira pessoa.
- **Captura da frente:** leva à captura genérica da FAM-G2 (cartão ID-1). A CIN ainda não tem câmera própria. Se a CIN precisar de outra moldura ou instrução, a câmera vira uma tela própria.
- **Upload:** o tutorial é o mesmo para foto e upload, como na seleção. O upload da CIN ainda não tem tela própria.
- **Imagens:** placeholder. As imagens de DOC-03 são do CRNM.

**Em aberto:**

- **Verso da CIN:** a CIN tem frente e verso. A captura do verso e a confirmação ainda não foram desenhadas para a CIN.
- **Validade:** a regra de validade da CIN ainda não foi confirmada.

## 11. Critérios de aceite

- [ ] O tutorial abre no passo 1 e mostra o nome do familiar nos textos.
- [ ] O botão do passo fica desabilitado com a barra enchendo por 3 s em cada passo, e libera em 100%.
- [ ] Abrir câmera leva à captura da frente da CIN.
- [ ] Voltar no 1º passo leva à seleção do documento.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
