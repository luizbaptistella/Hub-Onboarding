# DOC-10 · Status · documento recebido

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-09.** Tela de status logo depois do envio do documento. Usa o mesmo padrão do status de dados recebidos (CAD-08 e BIO-07).

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-10` |
| Raia | Documento de identidade · estrangeiro · Etapa 2 de 4 |
| Figma | `2283:34738` (Tela de status) · seção `2283:33539` |
| Status | Desenhada no Figma · DS aplicado |
| Marcação | 1 variantes em [telas/](telas/) ([tela.js](tela.js)) · componentes em [components.json](components.json) |

## Objetivo

Confirmar que o documento foi recebido e levar a pessoa para a validação facial (BIO-01) sem ação: a contagem de 10 segundos leva à biometria, e "Continuar agora" pula a espera.

## Componentes

3 componentes do DS, 3 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `StatusScreen` | 1 | `<StatusScreen title="Recebemos seus dados cadastrais!" tone="success" />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `JourneyStepper` | 1 | `<JourneyStepper steps={[{ label: "Cadastro", state: "done" }, { label: "Captura de documentos", state: "done", icon: "document" }, { label: "Biometria facial", state: "current", icon: "fa…` | — | — |
| `RedirectCountdown` | 1 | `<RedirectCountdown seconds={10} continueLabel="Continuar agora" onComplete={() => {}}>Vamos para a validação facial.</RedirectCountdown>` | — | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão | [`2283:34738`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2283-34738) | [telas/padrao](telas/padrao/screen.html) |

## Melhorias em relação ao Figma

| # | Figma | Hub | Por quê |
|---|---|---|---|
| 1 | "Redirecionando para a captura de documentos de identidade..." | "Vamos para a validação facial." | O documento já foi enviado; o próximo passo é a biometria (pedido de 2026-11-09). |
| 2 | Etapa "Biometria facial" marcada como concluída no desenho | "Biometria facial" como atual | A biometria é a etapa que começa agora. |

## Comportamento

- A contagem de 10 segundos leva à validação facial (BIO-01). Pausar segura a tela; "Continuar agora" vai na hora.
- Se a validação do documento reprovar depois, a pessoa cai na falha do documento (DOC-11).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-09 | CRNM · upload da frente e do verso | Enviar documento | Caminho principal | Frente e verso escolhidos e MRZ lido do verso |
| DOC-21 | DPRNM · upload da frente e do verso | Enviar documento | Caminho principal | Frente e verso escolhidos e código lido do verso |
| DOC-31 | RNE · upload da frente e do verso | Enviar documento | Caminho principal | Frente e verso escolhidos e código lido do verso |
| DOC-38 | Cédula · confirmação do verso | Continuar | Caminho principal | — |
| DOC-44 | Passaporte · confirmação do código | Continuar | Caminho principal | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| BIO-01 | Tutorial da captura | 10 s ou Continuar agora | Automática (timer) | Próxima etapa: validação facial |
| DOC-11 | Falha na validação do documento | Validação do documento reprovada | Erro ou nova tentativa | — |
| DOC-22 | Os dados do documento não conferem | Dados lidos não conferem com os informados | Erro ou nova tentativa | Número, país, tipo ou validade diferentes |
| DOC-23 | Documento vencido | Validade impressa já passou | Erro ou nova tentativa | Documento vencido |
| DOC-24 | Conclusão do fluxo de documento | Documento aprovado | Caminho principal | — |

## Pendências

- Confirmar se a biometria só começa depois da validação do documento, ou se pode começar em paralelo (a ligação para a BIO-01 hoje é direta).
- O texto "Vamos para a validação facial." precisa ir para o Figma, se aprovado.

## Critérios de aceite

- O título é "Recebemos seus dados cadastrais!", em `h1` único.
- Os três primeiros passos aparecem como concluídos ou atual, nessa ordem.
- A contagem é anunciada no início e pausa com a aba oculta.
