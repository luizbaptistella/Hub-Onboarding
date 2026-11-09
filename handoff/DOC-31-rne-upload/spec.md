# DOC-31 · RNE · upload da frente e do verso

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão.** Tela gerada a partir da tela aprovada de referência; validar em conjunto com as demais telas do fluxo de estrangeiro.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-31` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | [`1620:13176`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-13176) (seção `2283:33539`) |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 9 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · componentes em [components.json](components.json) |

## Objetivo

Enviar o PDF ou a imagem da frente e do verso do RNE. O código do verso é lido por OCR do arquivo enviado.

## Componentes

4 componentes do DS, 29 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar" }} title="Captura de documentos" progress={{ current: 2, total: 4 }} language={false} help={{ label: "Ajuda" }} />` | — | — |
| `PageHeading` | 1 | `<PageHeading tone="neutral" title="Envie a frente e o verso do RNE" subtitle="O código do verso é lido automaticamente. Use o PDF oficial, com todas as informações legíveis." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `UploadArea` | 18 | `<UploadArea id="crnm-frente" label="Frente do RNE" status="idle" hint="PDF ou imagem, até 5 MB." onFile={() => {}} onRemove={() => {}} />` | error, file, hint, id, label, status | — |
| `Button` | 9 | `<Button variant="primary" iconEnd="arrow_forward" disabled onClick={() => {}}>Enviar documento</Button>` | disabled | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Miniatura do arquivo | Imagem escolhida no lugar do ícone do UploadArea. O DS não tem miniatura; proposta para o UploadArea. |

## Notas de componentes

- Barra de status (mock do sistema, não implementar).
- `AppHeader` e `PageHeading`.
- Dois `UploadArea` do DS empilhados (frente e verso), com miniatura para imagem.
- `Button` "Enviar documento" no rodapé.

## Variantes

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Vazio | [`1620:13176`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-13176) | [telas/vazio](telas/vazio/screen.html) |
| 2 | Frente escolhida (imagem, com miniatura) | sem Figma | [telas/frente-escolhida](telas/frente-escolhida/screen.html) |
| 3 | Frente e verso escolhidos (miniaturas) | [`1620:12672`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-12672) | [telas/completo](telas/completo/screen.html) |
| 4 | Erro: código não encontrado no verso (sem Figma) | sem Figma | [telas/erro-mrz-verso](telas/erro-mrz-verso/screen.html) |
| 5 | Erro: formato não aceito (sem Figma) | sem Figma | [telas/erro-formato](telas/erro-formato/screen.html) |
| 6 | Erro: acima de 5 MB (sem Figma) | sem Figma | [telas/erro-tamanho](telas/erro-tamanho/screen.html) |
| 7 | Erro: PDF com senha (sem Figma) | sem Figma | [telas/erro-senha](telas/erro-senha/screen.html) |
| 8 | Erro: PDF corrompido (sem Figma) | sem Figma | [telas/erro-corrompido](telas/erro-corrompido/screen.html) |
| 9 | Erro: falha no envio (sem Figma) | sem Figma | [telas/erro-envio](telas/erro-envio/screen.html) |

## Comportamento

- Aceita PDF ou imagem, até 5 MB. "Enviar documento" só fica ativo com os dois arquivos.
- Erros de arquivo e de código aparecem no campo do verso, sem trocar de tela.
- Ao enviar, sem erro, segue para o status de documento recebido (DOC-10).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | RNE · Fazer upload do documento | Caminho principal | — |
| DOC-11 | Falha na validação do documento | Tentar novamente | Caminho alternativo | Envio do RNE |
| DOC-12 | Sem conexão ao enviar o documento | Tentar novamente | Caminho alternativo | Envio do RNE |
| DOC-13 | Tempo excedido ao enviar o documento | Tentar novamente | Caminho alternativo | Envio do RNE |
| DOC-14 | Erro inesperado ao enviar o documento | Tentar novamente | Caminho alternativo | Envio do RNE |
| DOC-22 | Os dados do documento não conferem | Enviar novos arquivos | Caminho alternativo | Envio do RNE |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | Voltar | Voltar | — |
| DOC-10 | Status · documento recebido | Enviar documento | Caminho principal | Frente e verso escolhidos e código lido do verso |
| DOC-12 | Sem conexão ao enviar o documento | Sem conexão ao enviar (RNE) | Erro ou nova tentativa | Erro de conexão no envio |
| DOC-13 | Tempo excedido ao enviar o documento | Envio acima de 20 s (RNE) | Erro ou nova tentativa | Sem resposta do servidor |
| DOC-14 | Erro inesperado ao enviar o documento | Erro inesperado no envio (RNE) | Erro ou nova tentativa | Falha de sistema não identificada |
| DOC-15 | Sessão expirada no documento | Sessão expirada no envio (RNE) | Erro ou nova tentativa | Token de sessão inválido |

## Pendências

- O texto do verso fala em "código", como no CRNM.
- Os nomes dos arquivos de exemplo ainda são "crnm-…" (simulação).
- As telas de erro de sistema compartilhadas voltam a este upload pela variante "RNE".
- Textos novos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- Frente e verso em duas áreas empilhadas.
- "Enviar documento" só ativo com os dois arquivos.
- Erro de arquivo ou de código aparece no campo do verso.
