# DOC-02 · Seleção do documento · estrangeiro

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.
> **Aprovada em 2026-11-08.** Primeira tela da reconstrução do fluxo de documento de estrangeiro (fluxo paralelo ao DOC-01, de brasileiro). As telas seguintes entram depois da aprovação desta.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-02` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | `2788:34526` (CRNM aberto) · seção `2283:33539` |
| Status | Desenhada no Figma · marcação com o DS aplicado |
| Marcação | 6 variantes em [telas/](telas/), interativas: cada uma abre no estado da variante e o [tela.js](tela.js) monta a tela com o DS real (escolher abre e fecha as opções) · componentes em [components.json](components.json) · gerador `build-tools/estrangeiro/doc02-selecao.html` |
| Regras do módulo | [regras-do-modulo.md](regras-do-modulo.md) (spec antigo do módulo inteiro, para consulta) |

## Objetivo

A pessoa estrangeira escolhe qual documento vai enviar e como vai enviar (foto ou upload). É a porta de entrada do fluxo de estrangeiro. Quem marcou a aba Brasileiro no cadastro vai para o DOC-01.

## Componentes

6 componentes do DS, 22 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar" }} title="Captura de documentos" progress={{ current: 2, total: 4 }} language={false} help={{ label: "Ajuda" }} />` | — | — |
| `PageHeading` | 1 | `<PageHeading tone="neutral" title="Documento de identidade" subtitle="Escolha o documento que você vai enviar. Depois, escolha como enviar." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `DocumentOption` | 5 | `<DocumentOption value="crnm" title="CRNM" description="Carteira de Registro Nacional Migratório" />` | description, title, value | — |
| `LegalFooter` | 1 | `<LegalFooter />` | — | — |
| `RadioGroup` | 6 | `<RadioGroup legend="Qual documento você vai enviar?" hideLegend value="" onChange={() => {}} />` | value | — |
| `ActionRow` | 8 | `<ActionRow icon="camera" description="A câmera captura a frente e o verso sozinha">Tirar foto do documento</ActionRow>` | children, description, icon | — |

Peças fora do DS (só no protótipo ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Lista fechada | [`2283:37196`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2283-37196) | [telas/fechada](telas/fechada/screen.html) |
| 2 | CRNM aberto | [`2788:34526`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34526) | [telas/crnm-aberto](telas/crnm-aberto/screen.html) |
| 3 | DPRNM aberto | [`2794:35275`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2794-35275) | [telas/dprnm-aberto](telas/dprnm-aberto/screen.html) |
| 4 | RNE aberto (sem Figma) | sem Figma | [telas/rne-aberto](telas/rne-aberto/screen.html) |
| 5 | Passaporte aberto | [`3080:59740`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=3080-59740) | [telas/passaporte-aberto](telas/passaporte-aberto/screen.html) |
| 6 | Cédula aberta | [`2799:36027`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2799-36027) | [telas/cedula-aberta](telas/cedula-aberta/screen.html) |

## Opções e ações

| Documento | Descrição | Ações |
|---|---|---|
| CRNM | Carteira de Registro Nacional Migratório | Tirar foto · Fazer upload |
| DPRNM | Documento Provisório de Registro Nacional Migratório | Tirar foto · Fazer upload |
| RNE | Registro Nacional de Estrangeiros | Tirar foto · Fazer upload (sem Figma; mesmo padrão de CRNM e DPRNM) |
| Passaporte | Documento internacional | Tirar foto (decidido: sem upload) |
| Cédula de identidade | Documento de identidade do país de origem (Mercosul) | Tirar foto (decidido: sem upload) |

Linhas de apoio das ações:

| Ação | Linha de apoio |
|---|---|
| Tirar foto (CRNM, DPRNM, RNE) | A câmera captura a frente e o verso sozinha |
| Fazer upload | Arquivo em PDF, de até 5 MB |
| Tirar foto (Passaporte) | Página com sua foto e a faixa de código |
| Tirar foto (Cédula) | Antes, você informa o país e o tipo do documento |

## Melhorias em relação ao Figma

| # | Figma | Hub (DS aplicado) | Por quê |
|---|---|---|---|
| 1 | Header "Validação de Identidade", sem etapa | `AppHeader` com "Captura de documentos · Etapa 2 de 4", igual ao DOC-01 | Mesma etapa da jornada para brasileiro e estrangeiro. |
| 2 | CRNM já aberto | Lista abre **fechada** | Regra do DS: nada pré-selecionado. |
| 3 | Lista solta | `RadioGroup` com legend oculta | Leitor de tela anuncia a pergunta e o grupo. |
| 4 | Só o subtítulo "Selecione um dos documentos…" | "Escolha o documento que você vai enviar. Depois, escolha como enviar." | Diz que há dois passos na mesma tela. |
| 5 | Ações sem linha de apoio | `ActionRow` com `description` (captura automática, PDF até 5 MB, página do passaporte, formulário da Cédula) | A pessoa sabe o que vem antes de tocar. Usa as regras já decididas. |
| 6 | Sem rodapé | `LegalFooter` | LGPD e consistência com o DOC-01. |
| 7 | Ícones de câmera e upload soltos | `ActionRow icon="camera"` / `"upload"` | Atalhos do DS. |

## Estados

| Variante | Figma |
|---|---|
| Lista fechada (padrão) | `2283:37196` |
| CRNM aberto | `2788:34526` |
| DPRNM aberto | `2794:35275` |
| RNE aberto | sem Figma |
| Passaporte aberto | `3080:59740` (no Figma o frame se chama "DPRNM/selecao-documento") |
| Cédula aberta | `2799:36027` |

## Comportamento

- Uma opção aberta por vez. Escolher outra fecha a anterior.
- **Clicar de novo no card aberto recolhe o card e volta ao estado inicial**: nenhum documento escolhido, todos fechados. No teclado, Espaço no rádio já escolhido faz o mesmo e o foco continua no rádio. Clicar numa ação dentro do card não recolhe. O rádio nativo não desmarca sozinho; a tela trata o clique no cabeçalho do card já escolhido ([tela.js](tela.js)). Proposta para o DS: levar esse comportamento ao `DocumentOption`.
- A linha inteira da opção é clicável; a linha inteira da ação é o botão.
- Voltar leva ao CAD-08. Ajuda abre a ajuda do módulo.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| CAD-08 | Status · dados recebidos | 10 s ou Continuar agora | Automática (timer) | Usuário estrangeiro (aba Estrangeiro no cadastro) |
| DOC-03 | CRNM · tutorial da frente | Voltar no passo 1 | Voltar | — |
| DOC-04 | CRNM · câmera da frente | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| DOC-07 | CRNM · câmera do verso (código) | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| DOC-14 | Erro inesperado ao enviar o documento | Voltar | Voltar | — |
| DOC-16 | DPRNM · tutorial da frente | Voltar no passo 1 | Voltar | — |
| DOC-17 | DPRNM · câmera da frente | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| DOC-20 | DPRNM · captura do código do verso | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| DOC-21 | DPRNM · upload da frente e do verso | Voltar | Voltar | — |
| DOC-22 | Os dados do documento não conferem | Revisar dados informados | Caminho alternativo | — |
| DOC-23 | Documento vencido | Escolher outro documento | Caminho principal | — |
| DOC-26 | RNE · tutorial da frente | Voltar no passo 1 | Voltar | — |
| DOC-27 | RNE · câmera da frente | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| DOC-30 | RNE · leitura do código MRZ (verso) | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| DOC-31 | RNE · upload da frente e do verso | Voltar | Voltar | — |
| DOC-32 | Cédula · formulário | Voltar | Voltar | — |
| DOC-34 | Cédula · câmera da frente | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| DOC-37 | Cédula · câmera do verso | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| DOC-39 | Passaporte · tutorial da página | Voltar | Voltar | — |
| DOC-40 | Passaporte · câmera da página | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| DOC-43 | Passaporte · leitura do código MRZ | Voltar para a seleção | Caminho alternativo | Sem acesso à câmera ou câmera indisponível |
| DOC-09 | CRNM · upload da frente e do verso | Voltar | Voltar | — |
| AREA-01 | Meu cadastro | Concluir validação ou Tentar novamente | Caminho alternativo | Estrangeiro com cenário pendente ou reprovado |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| CAD-08 | Status · dados recebidos | Voltar | Voltar | — |
| DOC-03 | CRNM · tutorial da frente | CRNM · Tirar foto do documento | Caminho principal | — |
| DOC-09 | CRNM · upload da frente e do verso | CRNM · Fazer upload do documento | Caminho principal | — |
| DOC-16 | DPRNM · tutorial da frente | DPRNM · Tirar foto do documento | Caminho principal | — |
| DOC-21 | DPRNM · upload da frente e do verso | DPRNM · Fazer upload do documento | Caminho principal | — |
| DOC-26 | RNE · tutorial da frente | RNE · Tirar foto do documento | Caminho principal | RNE aberto (sem Figma da seleção) |
| DOC-31 | RNE · upload da frente e do verso | RNE · Fazer upload do documento | Caminho principal | — |
| DOC-32 | Cédula · formulário | Cédula · Tirar foto do documento | Caminho principal | — |
| DOC-39 | Passaporte · tutorial da página | Passaporte · Tirar foto do documento | Caminho principal | — |

## Pendências

- RNE aberto não está desenhado no Figma.
- Renomear no Figma o frame `3080:59740` (mostra o Passaporte, mas se chama DPRNM).
- Linhas de apoio das ações são propostas do hub: levar ao Figma se aprovadas.

## Critérios de aceite

- A lista abre sem nada escolhido.
- Clicar de novo no documento aberto (ou Espaço no rádio dele) fecha o card e deixa a lista sem nada escolhido.
- Escolher um documento abre só as ações dele; Passaporte e Cédula mostram só "Tirar foto do documento".
- Leitor de tela anuncia "Qual documento você vai enviar?", o nome e a descrição de cada documento e a linha de apoio de cada ação.
- Termos de Uso e Política de Privacidade abrem em nova aba.
