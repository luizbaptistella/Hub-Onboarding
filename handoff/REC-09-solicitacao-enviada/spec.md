# REC-09 · Solicitação enviada

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão (2026-11-09).** Confirmação do pedido de recuperação da conta. **Proposta do hub, sem desenho no Figma**: layout e textos feitos com o DS, para validar e levar ao Figma.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `REC-09` |
| Raia | Acesso e recuperação de senha |
| Figma | sem Figma (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Proposta do hub (sem Figma), com o DS aplicado |
| Marcação | 1 variante em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/acesso/gen-REC-09.html` |

## Objetivo

Confirmar o pedido de recuperação da conta e dizer o que acontece agora.

## Componentes

4 componentes do DS, 4 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={false} title="Recuperar conta" language={false} help={false} />` | — | — |
| `ResultHero` | 1 | `<ResultHero tone="success" icon="mark_email_read" title="Solicitação enviada!" description="Vamos conferir seus dados e responder em até 3 dias úteis, no contato que você informou. Protoc…` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Button` | 1 | `<Button variant="primary" onClick={() => {}}>Voltar ao login</Button>` | — | — |
| `LegalFooter` | 1 | `<LegalFooter className="est-legal">© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão (sem Figma) | sem Figma | [telas/padrao](telas/padrao/screen.html) |

## Comportamento

- `ResultHero` de sucesso com "Solicitação enviada!", prazo de resposta e protocolo.
- "Voltar ao login" abre ENT-01. Sem seta de voltar: o pedido já foi enviado.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`). Decisões (DEC-…) são avaliações da própria tela, sem tela própria.

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| REC-08 | Recuperação da conta (pedido ao suporte) | Enviar solicitação | Caminho principal | CPF, motivo e contato válidos |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| ENT-01 | Login | Voltar ao login | Caminho principal | — |

## Pendências

- Proposta sem Figma. O prazo (3 dias úteis) e o protocolo (PAL-48213) são exemplos: o prazo precisa vir do atendimento e o protocolo do servidor.
- Enviar confirmação por e-mail ou SMS para o contato informado não está definido.

## Critérios de aceite

- O título é o único `h1`.
- "Voltar ao login" abre ENT-01.
