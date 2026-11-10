# REC-08 · Recuperação da conta (pedido ao suporte)

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão (2026-11-09).** Pedido ao suporte para recuperar a conta. **Proposta do hub, sem desenho no Figma**: layout e textos feitos com o DS, para validar e levar ao Figma.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `REC-08` |
| Raia | Acesso e recuperação de senha |
| Figma | sem Figma (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Proposta do hub (sem Figma), com o DS aplicado |
| Marcação | 3 variantes em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/acesso/gen-REC-08.html` |

## Objetivo

Pedir ajuda ao suporte quando a pessoa não consegue receber o código (perdeu o acesso ao e-mail e ao celular) ou acha que a conta foi comprometida.

## Componentes

6 componentes do DS, 13 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar", href: "file:///Users/baptistella/Projetos/Onboarding-Palmeiras/palmeiras-hub/handoff/REC-01-recuperar-senha/telas/celular-vazio/screen.html" }} title="…` | — | — |
| `PageHeading` | 1 | `<PageHeading title="Recuperação da conta" subtitle="Conte o que aconteceu. Nossa equipe confere sua identidade e responde no contato que você informar." tone="brand" />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Button` | 1 | `<Button variant="primary" onClick={() => {}}>Enviar solicitação</Button>` | — | — |
| `LegalFooter` | 1 | `<LegalFooter className="est-legal">© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |
| `TextField` | 6 | `<TextField label="CPF da conta" preset="cpf" name="cpf" placeholder="000.000.000-00" value="" onChange={() => {}} />` | autoComplete, error, hint, label, name, placeholder, preset, value | — |
| `Select` | 3 | `<Select label="O que aconteceu" options={["Perdi o acesso ao e-mail e ao celular cadastrados", "Acho que minha conta foi comprometida", "Outro motivo"]} placeholder="Selecione" value="" o…` | error, value | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Vazio (sem Figma) | sem Figma | [telas/vazio](telas/vazio/screen.html) |
| 2 | Preenchido (sem Figma) | sem Figma | [telas/preenchido](telas/preenchido/screen.html) |
| 3 | Erro nos campos (sem Figma) | sem Figma | [telas/erro](telas/erro/screen.html) |

## Comportamento

- Três campos: CPF da conta (`TextField` preset cpf), O que aconteceu (`Select` com 3 motivos) e E-mail ou celular para contato (campo livre, validado como e-mail se tiver "@", senão como celular).
- Enviar solicitação valida ao enviar. Erros por campo; o foco vai para o primeiro. Dados válidos abrem REC-09.
- Voltar leva a REC-01.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`). Decisões (DEC-…) são avaliações da própria tela, sem tela própria.

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| REC-01 | Recuperar senha | Solicitar recuperação da conta | Caminho alternativo | Para quem perdeu o acesso ao e-mail e ao celular |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| REC-01 | Recuperar senha | Voltar | Voltar | — |
| REC-09 | Solicitação enviada | Enviar solicitação | Caminho principal | CPF, motivo e contato válidos |

## Pendências

- Proposta sem Figma: campos, motivos e textos a validar.
- Comprovação de identidade (foto do documento, selfie) não está incluída: o suporte decide como conferir.
- O contato novo não é verificado por código antes de enviar. Definir se precisa.
- Não há anexos nem campo de texto livre (o DS não tem área de texto).

## Critérios de aceite

- Com campo vazio ou inválido, mostra o erro no campo e não navega.
- Com dados válidos, abre REC-09.
