# FAM-G2 · Tutorial da captura do familiar

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
>
> **Substituída por BIO-01.** Esta versão (3 passos, texto em terceira pessoa) não é mais usada. O tutorial da captura facial do familiar é a [BIO-01 · Tutorial da captura](../BIO-01-tutorial-da-captura/spec.md), sem mudanças. Mantida só como histórico.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-G2` (etapa da captura facial, depois do documento) |
| Raia | Familiares · Cadastro do familiar no celular do titular |
| Figma | Estrutura de referência: DOC-03, [`2788:34545`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34545). Telas próprias do FAM-G2: não desenhadas |
| Status | Aprovada (passo 1) |
| Marcação | [screen.html](screen.html) (Padrão), com [tela.js](tela.js) |
| Entradas / saídas | 2 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Preparar o titular para fotografar o rosto do familiar, em 3 passos, no próprio celular.

## 2. Componentes

Estrutura de DOC-03 montada com componentes do DS: header do tutorial, carrossel, imagem, pontos, número da etapa e botão.

| # | Componente | JSX | Estados nesta tela | Observação |
|---|---|---|---|---|
| 0 | Barra de status do celular | — | — | Mock do sistema, comum às telas do fluxo. Não implementar. |
| 1 | `IconButton` (Voltar) | `<IconButton variant="subtle" size="sm" icon="chevron_left" label="Voltar" />` | — | No header do tutorial. |
| 2 | `Button` (Pular) | `<Button variant="tertiary" size="sm" fullWidth={false}>Pular</Button>` | — | No header do tutorial. |
| 3 | `Image` | `<Image alt="" height="var(--size-media-hero)" />` | placeholder (sem imagem) | Espaço da imagem. A imagem real entra quando houver. |
| 4 | `ScanFrame` | `<ScanFrame ratio={3 / 4} />` | só no passo 3 | Moldura do rosto, por cima da imagem. |
| 5 | `CarouselDots` | `<CarouselDots count={3} active={n} />` | passo 1; passo 2; passo 3 | Pontos dentro da imagem. |
| 6 | `StepNumber` | `<StepNumber value={n} total={3} noun="Etapa" decorative />` | — | Número do passo sobre a imagem. |
| 7 | `Button` (passo), variante de preenchimento | `<Button size="sm" fullWidth iconEnd="arrow_forward" disabled className="lv-fill is-filling">Continuar</Button>` | desabilitado com barra primária enchendo o fundo (3 s); habilitado em 100% | Classe `lv-fill` da implementação atual (`ajustes-ds.css`, de BIO-01). `is-filling` entra a cada passo e sai ao completar. No último passo: `iconStart="photo_camera"` e texto "Abrir câmera". |

O carrossel segue o padrão WAI-ARIA do DS: região "carrossel" com nome, slide "Etapa N de 3" e anúncio de troca de passo.

## 3. Passos

| Passo | Título | Texto | Imagem | Moldura |
|---|---|---|---|---|
| 1 | Ache um lugar bem claro e com fundo simples. | Peça para Ana Paula ficar de frente para a luz e sem coisas ou pessoas atrás dela. Assim, a foto fica boa e é aprovada mais rápido. | Placeholder | — |
| 2 | Tire óculos, boné ou o que cobrir o rosto. | O rosto e os olhos precisam estar à mostra e sem reflexos. Assim, a foto é aceita de primeira. | Placeholder | — |
| 3 | Enquadre o rosto de Ana Paula na moldura. | Posicione o rosto dentro da moldura e confira se a imagem está nítida. | Placeholder | `ScanFrame` 3:4 |

Os textos vêm de BIO-01, em terceira pessoa, com o nome do familiar. O passo de roupa de BIO-01 saiu, para caber em 3 passos com o enquadramento.

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar no 1º passo | [FAM-G2 · Confirmação do verso](../FAM-G2-confirmacao-do-verso/spec.md) | Volta à conferência do documento. |
| Voltar nos passos 2 e 3 | Passo anterior | Mesma tela. |
| Pular | [BIO-02 · Captura facial](../BIO-02-captura-facial/spec.md) | Sai do tutorial sem ver os passos restantes. |
| Continuar (passos 1 e 2) | Próximo passo | Só depois do loading de 3 s. |
| Abrir câmera (passo 3) | [BIO-02 · Captura facial](../BIO-02-captura-facial/spec.md) | Só depois do loading de 3 s. |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Passo 1
- Passo 2
- Passo 3
- Botão do passo desabilitado com barra enchendo (3 s após cada troca de passo); habilitado em 100%

## 6. Comportamento

- Passos: 1. lugar claro e fundo simples; 2. sem óculos ou boné; 3. enquadrar o rosto na moldura.
- Ao abrir cada passo, o botão do passo fica desabilitado (`aria-disabled`) e uma barra de cor primária enche o fundo em 3 s. Em 100%, o botão é habilitado. Vale para os três passos, inclusive o último.
- Continuar avança; o Voltar do header recua um passo. No 1º passo, Voltar volta para a confirmação do verso do documento.
- Pular e Abrir câmera seguem para o próximo passo do FAM-G2.
- Na troca de passo, o leitor de tela anuncia "Etapa n de 3, <título>".
- O nome do familiar aparece nos títulos e textos dos passos.
- Layout: a imagem cresce com a altura livre, como em DOC-03. O botão do passo fica no rodapé.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| — | — | Sem entrada no fluxo atual: o tutorial de rosto vem depois dos documentos (a definir) | — |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-G2 · Confirmação do verso](../FAM-G2-confirmacao-do-verso/spec.md) | Salvar e continuar | — | Caminho principal |

## 9. Dados

- Nome do familiar (exibido nos textos).

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

**Premissas a validar:**

- **Textos em terceira pessoa:** adaptados de BIO-01 para o titular falar do familiar.
- **Três passos:** o passo de roupa saiu, e o enquadramento do rosto entrou no lugar. Se o produto quiser o passo de roupa de volta, a tela passa a ter 4 passos e precisa de ajuste de altura.
- **Moldura do rosto:** `ScanFrame` com proporção 3:4. O DS não define moldura para rosto; a proporção é minha.
- **Botão de preenchimento de 3 s:** igual a BIO-01 (`lv-fill`). A variante está na implementação atual (`ajustes-ds.css`), não no componente `Button` do DS, então a implementação precisa dela.
- **Imagens:** placeholder. O mascote do Figma não está no projeto.
- **Sem barra de progresso no cabeçalho:** o cadastro do familiar tem outro total de etapas.
- **Botão "Abrir câmera" no passo 3:** texto de DOC-03. O próximo passo ainda não foi desenhado.

**Em aberto:**

- **Senha:** FAM-G2 diz que a senha é criada no celular do titular (spec §6.5). FAM-14 diz que o familiar cria a senha no fim do cadastro (PENDENTE_SENHA). Qual vale?
- **Documentos aceitos do familiar:** a mesma lista de DOC-01 ou uma lista própria?
- **Captura do documento:** DOC-47 a DOC-55, que também precisa ser desenhada.

## 11. Critérios de aceite

- [ ] O tutorial abre no passo 1 e mostra o nome do familiar nos textos.
- [ ] O botão do passo fica desabilitado com a barra enchendo por 3 s em cada passo, e habilita em 100%.
- [ ] Continuar avança um passo; no passo 3, o botão diz "Abrir câmera" e a moldura aparece.
- [ ] Pular e Abrir câmera seguem para o próximo passo do FAM-G2.
- [ ] Voltar no 1º passo leva à confirmação do verso do documento.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
