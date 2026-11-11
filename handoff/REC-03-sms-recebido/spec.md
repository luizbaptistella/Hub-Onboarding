# REC-03 · SMS recebido (apoio do protótipo)

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão (2026-11-09).** Mensagem recebida por SMS, apoio do protótipo. Desenhada no Figma; DS aplicado.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `REC-03` |
| Raia | Acesso e recuperação de senha |
| Figma | [`1914:60087`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-60087) (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma, com o DS aplicado |
| Marcação | 1 variante em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/acesso/gen-REC-03.html` |

## Objetivo

Mostrar o SMS que o sistema envia com o código de recuperação. Apoio do protótipo para a leitura do fluxo, não é tela do app.

## Componentes

0 componentes do DS, 0 instâncias, mais 3 peças fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Marca do Palmeiras | Escudo com a estrela sobre um círculo branco (assets logo-palmeiras.png e logo-palmeiras-bg-ellipse.svg do DS, grupo Logos). O DS não tem um componente de marca. |
| SMS recebido (mock do sistema) | Conversa do app de mensagens com o SMS do código. Mock do sistema operacional, não implementar. |

Sem componente do DS. Imita o app de mensagens do sistema: não implementar, só usar como referência do texto do SMS.

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão | [`1914:60087`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1914-60087) | [telas/padrao](telas/padrao/screen.html) |

## Comportamento

- Texto do SMS: "Palmeiras: Seu código de verificação é 847 291. Válido por 10 minutos. Não compartilhe com ninguém. Se não foi você, ignore esta mensagem."
- A seta de voltar leva de volta ao app (REC-02).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`). Decisões (DEC-…) são avaliações da própria tela, sem tela própria.

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| REC-02 | Código por SMS (recuperação) | SMS enviado | Automática (timer) | Apoio do protótipo: mostra a mensagem recebida |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| REC-02 | Código por SMS (recuperação) | Voltar ao app | Voltar | — |

## Pendências

- O texto do SMS precisa ser aprovado pelo jurídico e pelo provedor de SMS (limite de caracteres).
- O código vale 10 minutos no SMS; confirmar o mesmo prazo para o e-mail (REC-05).

## Critérios de aceite

- O SMS tem o código, a validade e o aviso de não compartilhar.
