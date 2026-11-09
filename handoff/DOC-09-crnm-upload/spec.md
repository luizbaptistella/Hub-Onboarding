# DOC-09 · CRNM · upload da frente e do verso

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-09.** Versão do CRNM por upload. Uma só tela, com frente e verso.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-09` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | `2788:37354` (upload da frente), `2788:37430` (upload do verso) · seção `2283:33539` |
| Status | Desenhada no Figma · DS aplicado, uma tela no lugar das 7 do Figma |
| Marcação | 9 variantes em [telas/](telas/), interativas ([tela.js](tela.js)) · imagens de exemplo em [img/](img/) · componentes em [components.json](components.json) · gerador `build-tools/estrangeiro/doc09-crnm-upload.html` |

## Objetivo

A pessoa envia o PDF oficial da frente e do verso do CRNM. O código (MRZ) é lido por OCR da imagem do verso; a frente é conferida pelo sistema.

## Componentes

4 componentes do DS, 29 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar" }} title="Captura de documentos" progress={{ current: 2, total: 4 }} language={false} help={{ label: "Ajuda" }} />` | — | — |
| `PageHeading` | 1 | `<PageHeading tone="neutral" title="Envie a frente e o verso do CRNM" subtitle="O código do verso é lido automaticamente. Use o PDF oficial, com todas as informações legíveis." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `UploadArea` | 18 | `<UploadArea id="crnm-frente" label="Frente do CRNM" status="idle" hint="PDF ou imagem, até 5 MB." onFile={() => {}} onRemove={() => {}} />` | error, file, hint, id, label, status | — |
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
| 1 | Vazio | [`2788:37354`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-37354) | [telas/vazio](telas/vazio/screen.html) |
| 2 | Frente escolhida (imagem, com miniatura) | sem Figma | [telas/frente-escolhida](telas/frente-escolhida/screen.html) |
| 3 | Frente e verso escolhidos (miniaturas) | [`2788:37430`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-37430) | [telas/completo](telas/completo/screen.html) |
| 4 | Erro: MRZ não encontrado no verso (sem Figma) | sem Figma | [telas/erro-mrz-verso](telas/erro-mrz-verso/screen.html) |
| 5 | Erro: formato não aceito (sem Figma) | sem Figma | [telas/erro-formato](telas/erro-formato/screen.html) |
| 6 | Erro: acima de 5 MB (sem Figma) | sem Figma | [telas/erro-tamanho](telas/erro-tamanho/screen.html) |
| 7 | Erro: PDF com senha (sem Figma) | sem Figma | [telas/erro-senha](telas/erro-senha/screen.html) |
| 8 | Erro: PDF corrompido (sem Figma) | sem Figma | [telas/erro-corrompido](telas/erro-corrompido/screen.html) |
| 9 | Erro: falha no envio (sem Figma) | sem Figma | [telas/erro-envio](telas/erro-envio/screen.html) |

## Estados

| Variante | O que aparece | Figma |
|---|---|---|
| Vazio | Duas áreas tracejadas; botão desabilitado | `2788:37354` |
| Frente escolhida | Frente com miniatura; verso vazio | — |
| Frente e verso escolhidos | Duas áreas com arquivo e miniatura; botão ativo | `2788:37430` |
| Erro: MRZ não encontrado no verso | Campo do verso com borda de erro e a mensagem "Não encontramos o código MRZ no verso…" (sem Figma) | — |

## Melhorias em relação ao Figma

| # | Figma | Hub | Por quê |
|---|---|---|---|
| 1 | Três telas de upload (intro, frente e verso), cada uma com confirmação | Uma só tela com dois `UploadArea` | Pedido do time: frente e verso na mesma tela. As intros de upload não entram. |
| 2 | "Faça upload da frente do seu CRNM" / "Clique em Fazer upload do documento para enviar…" | "Envie a frente e o verso do CRNM" | Título diz o que fazer, sem repetir o caminho da ação. |
| 3 | Confirmação da frente e do verso em telas separadas | Estado "Enviado" dentro da própria área | A pessoa confere o arquivo no lugar, sem passos a mais. |
| 4 | Botão "Fazer upload do documento" dentro de cada tela | Um botão só, "Enviar documento", no rodapé | Um envio para os dois arquivos. |

## Regras

- PDF ou imagem (PNG, JPG, HEIC), até 5 MB. O `UploadArea` valida tipo e tamanho antes de aceitar o arquivo. (A decisão anterior era só PDF; a imagem entrou por pedido de 2026-11-09.)
- **Miniatura:** quando o arquivo é imagem, a miniatura aparece no lugar do ícone de documento, com o nome, o tamanho e "Trocar" já exibidos. PDF continua com o ícone.
- O MRZ é lido por OCR da imagem do verso. Não há captura de câmera nesta tela.
- Se o OCR não encontra o MRZ, o erro aparece no campo do verso (`status="error"` do DS), sem trocar de tela. O campo volta ao normal quando outro arquivo é escolhido.
- Frente e verso são enviados juntos.

## 5b. Erros no campo de upload

Todos aparecem no campo do verso, com borda de erro e a mensagem embaixo. A tela não troca.

| Erro | Mensagem | Quando | Variante |
|---|---|---|---|
| Formato não aceito | "O arquivo deve ser PDF, JPG ou PNG." (texto padrão do DS) | Arquivo de outro tipo | `erro-formato` |
| Acima de 5 MB | "O arquivo deve ter menos de 5 MB." (texto padrão do DS) | Arquivo grande demais | `erro-tamanho` |
| PDF com senha | "Este PDF tem senha. Envie uma versão sem senha." | PDF protegido | `erro-senha` |
| PDF corrompido | "Não conseguimos abrir este arquivo. Envie o PDF de novo." | Arquivo que não abre | `erro-corrompido` |
| Falha no envio | "Não foi possível enviar o arquivo. Tente de novo." (texto padrão do DS) | Erro do servidor no upload | `erro-envio` |
| MRZ não encontrado | "Não encontramos o código MRZ no verso. Envie uma imagem nítida do verso, com o código inteiro." | OCR não acha o código | `erro-mrz-verso` |

## Comportamento

- "Enviar documento" fica desabilitado até os dois arquivos estarem escolhidos.
- Ao enviar, sem erro de MRZ, a tela segue para o status de documento recebido (DOC-10).
- Voltar leva à seleção do documento (DOC-02).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-02 | Seleção do documento · estrangeiro | CRNM · Fazer upload do documento | Caminho principal | — |
| DOC-11 | Falha na validação do documento | Tentar novamente | Caminho alternativo | — |
| DOC-12 | Sem conexão ao enviar o documento | Tentar novamente | Caminho alternativo | — |
| DOC-13 | Tempo excedido ao enviar o documento | Tentar novamente | Caminho alternativo | — |
| DOC-14 | Erro inesperado ao enviar o documento | Tentar novamente | Caminho alternativo | — |
| DOC-22 | Os dados do documento não conferem | Enviar novos arquivos | Caminho alternativo | Envio do CRNM |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-10 | Status · documento recebido | Enviar documento | Caminho principal | Frente e verso escolhidos e MRZ lido do verso |
| DOC-12 | Sem conexão ao enviar o documento | Enviar documento sem conexão | Erro ou nova tentativa | Erro de conexão no envio |
| DOC-13 | Tempo excedido ao enviar o documento | Envio acima de 20 s | Erro ou nova tentativa | Sem resposta do servidor |
| DOC-14 | Erro inesperado ao enviar o documento | Erro inesperado no envio | Erro ou nova tentativa | Falha de sistema não identificada |
| DOC-15 | Sessão expirada no documento | Sessão expirada no envio | Erro ou nova tentativa | Token de sessão inválido |
| DOC-02 | Seleção do documento · estrangeiro | Voltar | Voltar | — |

## Pendências

- **Falha depois do envio:** a validação do documento pode reprovar depois do status (DOC-10). A tela de falha é a DOC-11.
- **Erros de envio:** formato errado, arquivo acima de 5 MB, PDF com senha ou corrompido, e falha no envio. Usam os textos do `UploadArea` do DS; falta decidir se algum vira tela própria.
- **OCR do verso:** o que acontece se o MRZ não for lido da imagem do verso (aviso na área? nova tentativa?).
- Textos novos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- A frente e o verso aparecem em duas áreas empilhadas, na mesma tela.
- "Enviar documento" só fica ativo com os dois arquivos.
- Aceita PDF ou imagem até 5 MB, com o erro do DS quando não atende.
- Com imagem, a miniatura aparece no lugar do ícone e mostra o nome, o tamanho e "Trocar".
- Se o MRZ não for encontrado no verso, a mensagem aparece no campo do verso, sem trocar de tela.
