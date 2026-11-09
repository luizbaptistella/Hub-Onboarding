# DOC-24 · Conclusão do fluxo de documento

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Aprovada em 2026-11-09.** Tela de conclusão do fluxo de documento, com o conteúdo do Figma `2283:34738` (tela de status).

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-24` |
| Raia | Documento de identidade · estrangeiro |
| Figma | `2283:34738` (Tela de status) · seção `2283:33539` |
| Status | Desenhada no Figma · DS aplicado, conteúdo do Figma |
| Marcação | 1 variantes em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/estrangeiro/doc24-documento-em-analise.html` |

## Objetivo

Confirmar que o fluxo de documento foi concluído e levar a pessoa para a próxima etapa sem ação.

## Componentes

3 componentes do DS, 3 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `StatusScreen` | 1 | `<StatusScreen title="Recebemos seus dados cadastrais!" tone="success" />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `JourneyStepper` | 1 | `<JourneyStepper steps={[{ label: "Cadastro", state: "done" }, { label: "Captura de documentos", state: "done", icon: "document" }, { label: "Biometria facial", state: "current", icon: "fa…` | — | — |
| `RedirectCountdown` | 1 | `<RedirectCountdown seconds={10} continueLabel="Continuar agora" onComplete={() => {}}>Redirecionando para a captura de documentos de identidade...</RedirectCountdown>` | — | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão | [`2283:34738`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2283-34738) | [telas/padrao](telas/padrao/screen.html) |

## Pendências

- **Texto do redirecionamento:** o Figma diz "Redirecionando para a captura de documentos de identidade...", mas a etapa seguinte é a biometria facial. Confirmar o texto.
- **Diferença para a DOC-10:** a DOC-10 e esta tela têm o mesmo conteúdo do Figma. A DOC-10 é a confirmação logo após o envio; esta é a conclusão do fluxo, depois da aprovação. Confirmar se as duas são necessárias.
- Os textos precisam estar no Figma, se aprovados.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-10 | Status · documento recebido | Documento aprovado | Caminho principal | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| BIO-01 | Tutorial da captura | 10 s ou Continuar agora | Automática (timer) | Próxima etapa: validação facial |

## Critérios de aceite

- O título é o único `h1`.
- As etapas aparecem na ordem do Figma, com Biometria facial como atual.
- A contagem pausa com a aba oculta e vai para a biometria facial.
