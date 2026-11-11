# DOC-21 · DPRNM · upload da frente e do verso

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-09.** Mesmo layout do upload do CRNM (DOC-09): uma tela com frente e verso, e o código do verso lido por OCR.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-21` |
| Raia | Documento de identidade · estrangeiro · DPRNM |
| Figma | `2794:35764` (upload da frente), `2794:35840` (upload do verso) · seção `2283:33539` |
| Status | Desenhada no Figma · layout igual ao do CRNM (DOC-09) |
| Marcação | 9 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · imagens de exemplo em [img/](img/) · gerador `build-tools/estrangeiro/doc21-dprnm-upload.html` |

## Objetivo

Enviar o PDF oficial da frente e do verso do DPRNM. O código do verso é lido por OCR do arquivo enviado.

## Componentes

4 componentes do DS, 29 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar" }} title="Captura de documentos" progress={{ current: 2, total: 4 }} language={false} help={{ label: "Ajuda" }} />` | — | — |
| `PageHeading` | 1 | `<PageHeading tone="neutral" title="Envie a frente e o verso do DPRNM" subtitle="O código do verso é lido automaticamente. Use o PDF oficial, com todas as informações legíveis." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `UploadArea` | 18 | `<UploadArea id="crnm-frente" label="Frente do DPRNM" status="idle" hint="PDF ou imagem, até 5 MB." onFile={() => {}} onRemove={() => {}} />` | error, file, hint, id, label, status | — |
| `Button` | 9 | `<Button variant="primary" iconEnd="arrow_forward" disabled onClick={() => {}}>Enviar documento</Button>` | disabled | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Miniatura do arquivo | Imagem escolhida no lugar do ícone do UploadArea. O DS não tem miniatura; proposta para o UploadArea. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Vazio | [`2794:35764`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2794-35764) | [telas/vazio](telas/vazio/screen.html) |
| 2 | Frente escolhida (imagem, com miniatura) | sem Figma | [telas/frente-escolhida](telas/frente-escolhida/screen.html) |
| 3 | Frente e verso escolhidos (miniaturas) | [`2794:35840`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2794-35840) | [telas/completo](telas/completo/screen.html) |
| 4 | Erro: código não encontrado no verso (sem Figma) | sem Figma | [telas/erro-mrz-verso](telas/erro-mrz-verso/screen.html) |
| 5 | Erro: formato não aceito (sem Figma) | sem Figma | [telas/erro-formato](telas/erro-formato/screen.html) |
| 6 | Erro: acima de 5 MB (sem Figma) | sem Figma | [telas/erro-tamanho](telas/erro-tamanho/screen.html) |
| 7 | Erro: PDF com senha (sem Figma) | sem Figma | [telas/erro-senha](telas/erro-senha/screen.html) |
| 8 | Erro: PDF corrompido (sem Figma) | sem Figma | [telas/erro-corrompido](telas/erro-corrompido/screen.html) |
| 9 | Erro: falha no envio (sem Figma) | sem Figma | [telas/erro-envio](telas/erro-envio/screen.html) |

## Componentes e regras

Igual à DOC-09:
- Dois `UploadArea` do DS empilhados (frente e verso), PDF ou imagem, até 5 MB.
- Miniatura para imagem; ícone para PDF.
- "Enviar documento" desabilitado até os dois arquivos estarem escolhidos.
- Erros de arquivo e de código no campo do verso, sem trocar de tela.
- Ao enviar, sem erro, segue para o status de documento recebido (DOC-10), que leva à biometria facial.

## Pendências

- O texto do verso fala em "código", como no CRNM, por pedido de 2026-11-09. O DPRNM tem QR Code; confirmar o texto.
- As imagens de exemplo têm nome "crnm-…", por serem simulações.
- Os erros de arquivo e os de sistema (DOC-12 a DOC-15) são os mesmos do CRNM; ligar ao DPRNM depois da aprovação.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | DPRNM · Fazer upload do documento | Caminho principal | — |
| DOC-11 | Falha na validação do documento | Tentar novamente | Caminho alternativo | Envio do DPRNM |
| DOC-12 | Sem conexão ao enviar o documento | Tentar novamente | Caminho alternativo | Envio do DPRNM |
| DOC-13 | Tempo excedido ao enviar o documento | Tentar novamente | Caminho alternativo | Envio do DPRNM |
| DOC-14 | Erro inesperado ao enviar o documento | Tentar novamente | Caminho alternativo | Envio do DPRNM |
| DOC-22 | Os dados do documento não conferem | Enviar novos arquivos | Caminho alternativo | Envio do DPRNM |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | Voltar | Voltar | — |
| DOC-10 | Status · documento recebido | Enviar documento | Caminho principal | Frente e verso escolhidos e código lido do verso |
| DOC-12 | Sem conexão ao enviar o documento | Sem conexão ao enviar (DPRNM) | Erro ou nova tentativa | Erro de conexão no envio |
| DOC-13 | Tempo excedido ao enviar o documento | Envio acima de 20 s (DPRNM) | Erro ou nova tentativa | Sem resposta do servidor |
| DOC-14 | Erro inesperado ao enviar o documento | Erro inesperado no envio (DPRNM) | Erro ou nova tentativa | Falha de sistema não identificada |
| DOC-15 | Sessão expirada no documento | Sessão expirada no envio (DPRNM) | Erro ou nova tentativa | Token de sessão inválido |

## Critérios de aceite

- A frente e o verso aparecem em duas áreas empilhadas, na mesma tela.
- "Enviar documento" só fica ativo com os dois arquivos.
- Aceita PDF ou imagem até 5 MB, com o erro do DS quando não atende.
