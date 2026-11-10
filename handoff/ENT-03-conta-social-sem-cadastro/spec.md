# ENT-03 · Login social · conta sem cadastro

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão (2026-11-09).** Login social: o provedor autenticou, mas a conta não tem cadastro. **Proposta do hub, sem desenho no Figma**: layout e textos feitos com o DS, para validar e levar ao Figma.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `ENT-03` |
| Raia | Acesso e recuperação de senha |
| Figma | sem Figma (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Proposta do hub (sem Figma), com o DS aplicado |
| Marcação | 3 variantes em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/acesso/gen-ENT-03.html` |

## Objetivo

Avisar que o provedor (Google, Apple ou Microsoft) autenticou a pessoa, mas não há cadastro do Palmeiras ligado a essa conta, e oferecer criar um ou entrar de outra forma.

## Componentes

4 componentes do DS, 9 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `Button` | 2 | `<Button variant="primary" onClick={() => {}}>Criar cadastro</Button>` | children, variant | — |
| `LegalFooter` | 1 | `<LegalFooter className="est-legal">© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |
| `AppHeader` | 3 | `<AppHeader back={{ label: "Voltar", href: "file:///Users/baptistella/Projetos/Onboarding-Palmeiras/palmeiras-hub/handoff/ENT-01-login/telas/padrao/screen.html" }} title="Entrar com Google…` | title | — |
| `ResultHero` | 3 | `<ResultHero tone="warning" icon="person_search" title="Não encontramos seu cadastro" description="Não há cadastro do Palmeiras ligado a esta conta do Google. Crie um cadastro ou entre com…` | description | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |

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

- `ResultHero` em tom de aviso (`warning`) com o título "Não encontramos seu cadastro"; o texto cita o provedor (conta do Google, da Apple ou do Microsoft).
- "Criar cadastro" abre CAD-01. "Entrar com CPF ou e-mail" e Voltar levam ao login (ENT-01).
- O provedor chega pela URL (`?p=google|apple|microsoft`); no hub cada variante já abre com o seu.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`). Decisões (DEC-…) são avaliações da própria tela, sem tela própria.

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DEC-08 | Login social concluído? | Não · conta sem cadastro | Caminho alternativo | Autenticou, mas não há cadastro ligado a essa conta |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| CAD-01 | Cadastro · Dados pessoais | Criar cadastro | Caminho principal | — |
| ENT-01 | Login | Entrar com CPF ou e-mail, ou Voltar | Caminho alternativo | — |

## Pendências

- Proposta sem Figma: textos e botões a validar.
- Definir se, ao criar o cadastro por aqui, o e-mail da conta social já vem preenchido e verificado em CAD-01.
- Definir se a conta social deve ser vinculada automaticamente quando o e-mail bate com um cadastro existente (hoje cairia nesta tela).

## Critérios de aceite

- O título é o único `h1` e cita o motivo sem culpar a pessoa.
- "Criar cadastro" abre CAD-01; a outra saída volta ao login.
