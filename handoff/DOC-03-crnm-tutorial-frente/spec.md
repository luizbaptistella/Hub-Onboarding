# DOC-03 · CRNM · tutorial da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.
> **Aprovada em 2026-11-08.** Segunda tela da reconstrução do fluxo de documento de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-03` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | `2788:34545`, `2788:34567`, `2788:34589` (intros 1 a 3 do CRNM · foto) · seção `2283:33539` |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 3 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · imagens do Figma em [img/](img/) · componentes em [components.json](components.json) · gerador `build-tools/estrangeiro/doc03-crnm-tutorial-frente.html` |
| Regras do módulo | [regras-do-modulo.md](../DOC-02-selecao-documento-estrangeiro/regras-do-modulo.md) |

## Objetivo

Preparar a pessoa para fotografar a frente do CRNM: documento válido e legível, superfície plana e bem iluminada, documento dentro da moldura.

## Componentes

1 componente do DS, 3 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `Tutorial` | 3 | `<Tutorial label="Como fotografar a frente do CRNM" title="Foto do documento" steps={[{ title: "Vamos capturar a frente do CRNM", description: "É importante que o documento esteja dentro d…` | defaultStep | — |

Peças fora do DS (só no protótipo ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Passo 1 · frente do CRNM | [`2788:34545`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34545) | [telas/passo-1](telas/passo-1/screen.html) |
| 2 | Passo 2 · superfície plana | [`2788:34567`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34567) | [telas/passo-2](telas/passo-2/screen.html) |
| 3 | Passo 3 · enquadrar | [`2788:34589`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34589) | [telas/passo-3](telas/passo-3/screen.html) |

## Passos

| Passo | Título | Texto | Imagem | Figma |
|---|---|---|---|---|
| 1 | Vamos capturar a frente do CRNM | É importante que o documento esteja dentro da validade e com todas as informações legíveis. | [passo-1.jpg](img/passo-1.jpg) | `2788:34545` |
| 2 | Coloque o documento numa superfície plana | Use uma superfície clara e limpa, num lugar bem iluminado. | [passo-2.jpg](img/passo-2.jpg) | `2788:34567` |
| 3 | Enquadre a frente do documento | Posicione o documento dentro da moldura e confira se a imagem está nítida e todas as informações legíveis. | [passo-3.jpg](img/passo-3.jpg) + moldura do DS | `2788:34589` |

As imagens são as do Figma (provisórias, com o mascote). No passo 3, a moldura é a `ScanFrame` do DS, por cima da foto do documento.

## Melhorias em relação ao Figma

| # | Figma | Hub (DS aplicado) | Por quê |
|---|---|---|---|
| 1 | 3 telas separadas, cada uma com "Continuar" | Um `Tutorial` do DS com 3 passos | Carrossel acessível: "Etapa N de 3" anunciada, um `h1` por passo, sem avanço automático. |
| 2 | Header "Validação de Identidade" | Header do Tutorial: Voltar · "Foto do documento" · **Pular** | Quem já sabe vai direto para a câmera. |
| 3 | "Continuar" também no último passo | **"Abrir câmera"** no último passo | O botão diz o que vem a seguir. |
| 4 | Passo 1: "atualizado" | "dentro da validade" | Mesma palavra da regra de validade do módulo. |
| 5 | Passo 2: "Posicione o documento em uma superfície plana" / "A superfície deve ser plana, de cor clara, limpa, e em um ambiente bem iluminado." | "Coloque o documento numa superfície plana" / "Use uma superfície clara e limpa, num lugar bem iluminado." | Título no imperativo e texto sem repetir "plana" (regra do DS). |
| 6 | Passo 3: "Enquadre a frente do documento na moldura" / "…certifique-se de que…" | "Enquadre a frente do documento" / "…e confira se…" | Mais curto; a moldura já está na imagem. |

## Estados

| Variante | Figma |
|---|---|
| Passo 1 · frente do CRNM | `2788:34545` |
| Passo 2 · superfície plana | `2788:34567` |
| Passo 3 · enquadrar (moldura, "Abrir câmera") | `2788:34589` |

## Comportamento

- "Continuar" avança; o Voltar do header recua um passo. No passo 1, Voltar volta para a DOC-02.
- "Pular" e "Abrir câmera" abrem a câmera da frente (próxima tela, entra depois desta aprovação).
- Deslizar troca de passo no toque; os botões sempre existem.
- **O botão do passo fica preso ao rodapé da tela** (a `space-300` da borda), na mesma altura nos 3 passos, qualquer que seja o tamanho do texto. É um ajuste de layout da página: o tutorial ocupa a altura da tela e o botão vai para o fim (`margin-top: auto`). Proposta para o DS: levar ao `Tutorial` a opção de ocupar a altura da tela.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | CRNM · Tirar foto do documento | Caminho principal | — |
| DOC-04 | CRNM · câmera da frente | Voltar | Voltar | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | Voltar no passo 1 | Voltar | — |
| DOC-04 | CRNM · câmera da frente | Abrir câmera ou Pular | Caminho principal | — |

## Pendências

- Os novos textos dos passos 1 a 3 precisam ir para o Figma, se aprovados.
- As imagens do Figma são provisórias (mascote). Trocar pelas fotos finais.
- O header do Tutorial não mostra "Etapa 2 de 4". É o padrão do DS para o tutorial; confirmar se a jornada precisa aparecer aqui.

## Critérios de aceite

- Abre no passo 1, com Voltar, "Foto do documento" e "Pular" no header.
- Leitor de tela anuncia "Etapa 2 de 3" e o título ao avançar.
- No passo 3 aparecem a moldura e o botão "Abrir câmera".
- Voltar no passo 1 retorna à seleção do documento.
