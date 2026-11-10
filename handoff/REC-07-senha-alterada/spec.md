# REC-07 · Senha alterada com sucesso

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão (2026-11-09).** Fim da recuperação de senha. Desenhada no Figma; DS aplicado.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `REC-07` |
| Raia | Acesso e recuperação de senha |
| Figma | [`1741:42025`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1741-42025) (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma, com o DS aplicado |
| Marcação | 1 variante em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/acesso/gen-REC-07.html` |

## Objetivo

Confirmar que a senha foi alterada e levar ao login.

## Componentes

4 componentes do DS, 4 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={false} title="Recuperar Senha" language={false} help={false} />` | — | — |
| `ResultHero` | 1 | `<ResultHero tone="success" title="Senha alterada com sucesso!" description="Sua senha foi redefinida. Faça login com sua nova senha." />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Button` | 1 | `<Button variant="primary" onClick={() => {}}>Ir para o login</Button>` | — | — |
| `LegalFooter` | 1 | `<LegalFooter className="est-legal">© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão | [`1741:42025`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1741-42025) | [telas/padrao](telas/padrao/screen.html) |

## Comportamento

- `ResultHero` de sucesso com o título "Senha alterada com sucesso!" e a orientação para entrar com a nova senha.
- "Ir para o login" abre ENT-01 limpo, sem login automático e sem aviso extra.
- Sem seta de voltar: a recuperação terminou.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`). Decisões (DEC-…) são avaliações da própria tela, sem tela própria.

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| REC-06 | Nova senha | Salvar senha | Caminho principal | Os 4 requisitos cumpridos e senhas iguais |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| ENT-01 | Login | Ir para o login | Caminho principal | Sem login automático |

## Pendências

- O Figma mantém a seta de voltar no cabeçalho desta tela; aqui foi removida, porque voltar levaria a uma tela já usada.
- Avisar a pessoa por e-mail ou SMS que a senha foi alterada (segurança) não está definido.
- O Figma usa um selo verde circular; o `ResultHero` do DS desenha o selo com anel.

## Critérios de aceite

- O título é o único `h1`.
- "Ir para o login" abre ENT-01.
