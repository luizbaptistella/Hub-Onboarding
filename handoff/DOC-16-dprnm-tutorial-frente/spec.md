# DOC-16 · DPRNM · tutorial da frente

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-09.** Primeira tela do DPRNM. Segue o tutorial da frente do CRNM (DOC-03), com o texto do Figma no primeiro passo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-16` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | `2794:35439`, `2794:35461`, `2794:35483` (intros 1 a 3 do DPRNM · foto) · seção `2283:33539` |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 3 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · imagens em [img/](img/) · gerador `build-tools/estrangeiro/doc16-dprnm-tutorial-frente.html` |

## Objetivo

Preparar a pessoa para fotografar a frente do DPRNM (Documento Provisório de Registro Nacional Migratório).

## Componentes

1 componente do DS, 3 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `Tutorial` | 3 | `<Tutorial label="Como fotografar a frente do DPRNM" title="Foto do documento" steps={[{ title: "Vamos capturar a frente do DPRNM", description: "É importante que o documento esteja em bom…` | defaultStep | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Passo 1 · frente do DPRNM | [`2794:35439`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2794-35439) | [telas/passo-1](telas/passo-1/screen.html) |
| 2 | Passo 2 · superfície plana | [`2794:35461`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2794-35461) | [telas/passo-2](telas/passo-2/screen.html) |
| 3 | Passo 3 · enquadrar | [`2794:35483`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2794-35483) | [telas/passo-3](telas/passo-3/screen.html) |

## Passos

| Passo | Título | Texto | Imagem | Figma |
|---|---|---|---|---|
| 1 | Vamos capturar a frente do DPRNM | É importante que o documento esteja em bom estado e com todas as informações legíveis. | [passo-1.jpg](img/passo-1.jpg) | `2794:35439` |
| 2 | Coloque o documento numa superfície plana | Use uma superfície clara e limpa, num lugar bem iluminado. | [passo-2.jpg](img/passo-2.jpg) | `2794:35461` |
| 3 | Enquadre a frente do documento | Posicione o documento dentro da moldura e confira se a imagem está nítida e todas as informações legíveis. | [passo-3.jpg](img/passo-3.jpg) + moldura do DS | `2794:35483` |

## Melhorias em relação ao Figma

| # | Figma | Hub | Por quê |
|---|---|---|---|
| 1 | Passo 2: "Posicione o documento em uma superfície plana" / "A superfície deve ser plana, de cor clara, limpa, e em um ambiente bem iluminado." | "Coloque o documento numa superfície plana" / "Use uma superfície clara e limpa, num lugar bem iluminado." | Mesmo texto aprovado no CRNM (DOC-03). |
| 2 | Passo 3: "Enquadre a frente do documento na moldura" | "Enquadre a frente do documento" | Mesmo texto aprovado no CRNM (DOC-03). |
| 3 | Passo 1 em texto igual ao do Figma | Sem mudança | Texto do Figma mantido. |

## Pendências

- **Imagens provisórias:** o Figma usa a arte do CRNM nas telas do DPRNM (passo 3). A foto do passo 3 aqui também é a do CRNM, como no Figma. Trocar pela foto do DPRNM quando estiver pronta.
- O texto do passo 2 e do passo 3 mudou em relação ao Figma. Levar ao Figma se aprovados.
- Confirmar se o DPRNM tem a moldura de cartão (ID-1) como o CRNM.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | DPRNM · Tirar foto do documento | Caminho principal | — |
| DOC-17 | DPRNM · câmera da frente | Voltar | Voltar | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | Voltar no passo 1 | Voltar | — |
| DOC-17 | DPRNM · câmera da frente | Abrir câmera ou Pular | Caminho principal | — |

## Critérios de aceite

- Abre no passo 1, com Voltar, "Foto do documento" e "Pular".
- No passo 3 aparecem a moldura e o botão "Abrir câmera".
- Voltar no passo 1 retorna à seleção do documento.
