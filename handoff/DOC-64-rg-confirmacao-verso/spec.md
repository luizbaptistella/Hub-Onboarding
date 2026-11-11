# DOC-64 · RG · confirmação do verso

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Status:** Desenhada no hub, sem Figma atualizado.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-64` |
| Raia | Documento de identidade · brasileiro · Etapa 2 de 4 |
| Figma | sem Figma · seção `1620:12039` |
| Status | Desenhada no hub, sem Figma atualizado |
| Marcação | 1 variantes em [telas/](telas/) · componentes em [components.json](components.json) |
| Entradas / saídas | 1 / 7 |

## 1. Objetivo

Mostrar a foto do verso e permitir confirmar ou tirar outra. Confirmar leva à conclusão do fluxo. Documento: Registro Geral (RG).

## 2. Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão | sem Figma | [telas/padrao/screen.html](telas/padrao/screen.html) |

## 3. Pendências

- **Figma:** o desenho do Figma pode estar defasado. Este spec segue o hub.
- **Imagens do verso:** a arte do verso da Cédula foi reaproveitada. Trocar pela do documento.

## 4. Entradas (de onde se chega)

| De | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-63 · câmera do verso](../DOC-63-rg-camera-verso/spec.md) | Foto tirada | Captura automática ou Tirar foto | Caminho principal |

## 5. Saídas (para onde se vai)

| Para | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-63 · câmera do verso](../DOC-63-rg-camera-verso/spec.md) | Tirar outra foto ou Voltar | — | Caminho alternativo |
| [DOC-24 · Conclusão do fluxo de documento](../DOC-24-documento-em-analise/spec.md) | Continuar | Documento brasileiro aprovado | Caminho principal |
| [DOC-11 · Falha na validação do documento](../DOC-11-falha-validacao-documento/spec.md) | Validação do documento reprovada | RG · verso não validado | Erro ou nova tentativa |
| [DOC-12 · Sem conexão ao enviar o documento](../DOC-12-sem-conexao/spec.md) | Sem conexão ao enviar o documento | Erro de conexão no envio | Erro ou nova tentativa |
| [DOC-13 · Tempo excedido ao enviar o documento](../DOC-13-tempo-excedido/spec.md) | Envio acima de 20 s | Sem resposta do servidor | Erro ou nova tentativa |
| [DOC-14 · Erro inesperado ao enviar o documento](../DOC-14-erro-inesperado/spec.md) | Erro inesperado no envio | Falha de sistema não identificada | Erro ou nova tentativa |
| [DOC-15 · Sessão expirada no documento](../DOC-15-sessao-expirada/spec.md) | Sessão expirada no envio | Token de sessão inválido | Erro ou nova tentativa |

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
