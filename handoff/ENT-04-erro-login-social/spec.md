# ENT-04 · Login social · erro do provedor

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão (2026-11-09).** Login social: cancelado ou erro do provedor. **Proposta do hub, sem desenho no Figma**: layout e textos feitos com o DS, para validar e levar ao Figma.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `ENT-04` |
| Raia | Acesso e recuperação de senha |
| Figma | sem Figma (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Proposta do hub (sem Figma), com o DS aplicado |
| Marcação | 3 variantes em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/acesso/gen-ENT-04.html` |

## Objetivo

Avisar que o login com o provedor foi cancelado ou falhou e deixar tentar de novo.

## Componentes

4 componentes do DS, 8 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `Button` | 1 | `<Button variant="primary" onClick={() => {}}>Tentar novamente</Button>` | — | — |
| `LegalFooter` | 1 | `<LegalFooter className="est-legal">© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |
| `AppHeader` | 3 | `<AppHeader back={{ label: "Voltar", href: "file:///Users/baptistella/Projetos/Onboarding-Palmeiras/palmeiras-hub/handoff/ENT-01-login/telas/padrao/screen.html" }} title="Entrar com Google…` | title | — |
| `ResultHero` | 3 | `<ResultHero tone="danger" title="Não foi possível entrar com o Google" description="O login foi cancelado ou o serviço não respondeu. Tente de novo ou entre com seu CPF ou e-mail." />` | title | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Google (sem Figma) | sem Figma | [telas/google](telas/google/screen.html) |
| 2 | Apple (sem Figma) | sem Figma | [telas/apple](telas/apple/screen.html) |
| 3 | Microsoft (sem Figma) | sem Figma | [telas/microsoft](telas/microsoft/screen.html) |

## Comportamento

- `ResultHero` em tom de erro (`danger`, regra do DS para falha) com o título "Não foi possível entrar com o Google" (ou Apple, Microsoft).
- "Tentar novamente" e Voltar levam ao login (ENT-01), onde a pessoa escolhe o provedor ou usa CPF ou e-mail.
- Cobre cancelamento na tela do provedor, falta de resposta e erro do provedor, sem distinguir os casos.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`). Decisões (DEC-…) são avaliações da própria tela, sem tela própria.

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DEC-08 | Login social concluído? | Não · cancelado ou erro do provedor | Erro ou nova tentativa | Pessoa cancelou ou o serviço não respondeu |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| ENT-01 | Login | Tentar novamente ou Voltar | Erro ou nova tentativa | — |

## Pendências

- Proposta sem Figma: textos a validar.
- Separar "cancelou" (sem erro, só voltar) de "falhou" (mensagem de erro) se o produto quiser.
- Sem tela de falta de conexão: usar as telas de erro de sistema (DOC-12 a DOC-14) como base.

## Critérios de aceite

- O título é o único `h1`.
- "Tentar novamente" leva ao login.
