# DOC-67 · RG · upload da frente e do verso

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Status:** Desenhada no hub, sem Figma atualizado.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-67` |
| Raia | Documento de identidade · brasileiro · Etapa 2 de 4 |
| Figma | sem Figma · seção `1620:12039` |
| Status | Desenhada no hub, sem Figma atualizado |
| Marcação | 9 variantes em [telas/](telas/) · componentes em [components.json](components.json) |
| Entradas / saídas | 1 / 6 |

## 1. Objetivo

Enviar o arquivo da frente e do verso (PDF ou imagem), em vez de fotografar. Documento: Registro Geral (RG).

## 2. Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Vazio | sem Figma | [telas/vazio/screen.html](telas/vazio/screen.html) |
| 2 | Frente escolhida (imagem, com miniatura) | sem Figma | [telas/frente-escolhida/screen.html](telas/frente-escolhida/screen.html) |
| 3 | Frente e verso escolhidos (miniaturas) | sem Figma | [telas/completo/screen.html](telas/completo/screen.html) |
| 4 | Erro: verso não identificado (sem Figma) | sem Figma | [telas/erro-mrz-verso/screen.html](telas/erro-mrz-verso/screen.html) |
| 5 | Erro: formato não aceito (sem Figma) | sem Figma | [telas/erro-formato/screen.html](telas/erro-formato/screen.html) |
| 6 | Erro: acima de 5 MB (sem Figma) | sem Figma | [telas/erro-tamanho/screen.html](telas/erro-tamanho/screen.html) |
| 7 | Erro: PDF com senha (sem Figma) | sem Figma | [telas/erro-senha/screen.html](telas/erro-senha/screen.html) |
| 8 | Erro: PDF corrompido (sem Figma) | sem Figma | [telas/erro-corrompido/screen.html](telas/erro-corrompido/screen.html) |
| 9 | Erro: falha no envio (sem Figma) | sem Figma | [telas/erro-envio/screen.html](telas/erro-envio/screen.html) |

## 3. Pendências

- **Figma:** o desenho do Figma pode estar defasado. Este spec segue o hub.
- **Intros do upload:** não desenhadas. A tela de upload entra direto, sem tutorial.
- **Verso no upload:** o arquivo do verso é lido pelo sistema. Mensagem de verso não identificado no lugar da de MRZ.

## 4. Entradas (de onde se chega)

| De | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | Fazer upload do documento | RG escolhido | Caminho principal |

## 5. Saídas (para onde se vai)

| Para | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | Voltar | — | Voltar |
| [DOC-10 · documento recebido](../DOC-10-status-documento-recebido/spec.md) | Enviar documento | Frente e verso escolhidos | Caminho principal |
| [DOC-12 · Sem conexão ao enviar o documento](../DOC-12-sem-conexao/spec.md) | Sem conexão ao enviar o documento | Erro de conexão no envio | Erro ou nova tentativa |
| [DOC-13 · Tempo excedido ao enviar o documento](../DOC-13-tempo-excedido/spec.md) | Envio acima de 20 s | Sem resposta do servidor | Erro ou nova tentativa |
| [DOC-14 · Erro inesperado ao enviar o documento](../DOC-14-erro-inesperado/spec.md) | Erro inesperado no envio | Falha de sistema não identificada | Erro ou nova tentativa |
| [DOC-15 · Sessão expirada no documento](../DOC-15-sessao-expirada/spec.md) | Sessão expirada no envio | Token de sessão inválido | Erro ou nova tentativa |

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
