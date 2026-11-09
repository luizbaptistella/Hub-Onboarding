# FAM-18 · Convite indisponível

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.
>
> **Aprovada.** Tela criada como estado de erro da entrada pelo link (FAM-16). Premissas que precisam de validação estão na seção 10.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-18` (código novo, para não misturar com FAM-16) |
| Id no protótipo | — (não implementada) |
| Raia | Familiares · Inclusão e gestão de vínculos |
| Figma | — |
| Status | Aprovada |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 1 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Informar, na entrada pelo link, que o convite não pode mais ser usado, sem expor dados de quem convidou.

## 2. Componentes

5 peças nesta tela: **5 instâncias de 5 componentes do DS** (`AppHeader`, `Button`, `Hero`, `LegalFooter`, `Icon`).

Lista para máquina: a gerar após validação. Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Convite de familiar" language={false} help={false} />` | — | Forma no protótipo: Edição (classe po-header-task). Navega para `login`. |
| 2 | `Hero` (variante danger) | `<Hero tone="danger" icon="link_off" title="Este convite não está mais disponível" description="Ele expirou ou foi cancelado. Se você já aceitou, entre na sua conta. Se não, peça um novo convite a quem convidou você." />` | — | Selo do DS: disco vermelho-claro com miolo vermelho e ícone `link_off`. Título e texto centralizados. Usa `po-hero` (marcação de referência). |
| 3 | `Button` | `<Button variant="primary" fullWidth>Entrar na minha conta</Button>` | — | Navega para `login`. |
| 4 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

Classes locais usadas na tela (fora do DS): `.indisp-hero` (só espaçamento acima do selo, a partir do cabeçalho). Tom escolhido: vermelho (`po-hero-danger`), como na referência. Alternativa: `po-hero-warning` (amarelo).

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [ENT-01 · Login](../ENT-01-login/spec.md) | |
| Entrar na minha conta | [ENT-01 · Login](../ENT-01-login/spec.md) | |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Padrão (uma mensagem para os três casos: expirado, cancelado ou já usado)

## 6. Comportamento

- Vale para convite expirado, cancelado ou já aceito. O servidor responde 410 (expirado) ou 409 (cancelado ou usado) na entrada pelo link (spec §8.3).
- A mensagem é a mesma para os três casos, para não expor se o convite existiu nem quem convidou.
- Não mostra nome, vínculo nem CPF de quem convidou.
- O botão leva ao login: quem já aceitou entra na conta; quem não tem conta pede um novo convite.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-16 · Convite · entrada pelo link (sem conta)](../FAM-16-convite-entrada-pelo-link-sem-conta/spec.md) | Convidado abre o link | Link expirado, cancelado ou já usado | Erro ou nova tentativa |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [ENT-01 · Login](../ENT-01-login/spec.md) | Entrar na minha conta | — | Caminho principal |

## 9. Dados

- Nenhum dado de convite é exibido.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

**Premissas a validar** (assumidas para desenhar a tela):

- **Uma mensagem para os três casos.** A spec §8.3 separa 410 de 409. Aqui a tela não diferencia, para não mostrar dados. Se preferir textos separados, a tela vira duas variantes.
- **Botão para o login, não para o cadastro.** Quem não tem conta é orientado a pedir novo convite, sem botão de cadastro.
- **Texto do convite:** "Este convite não está mais disponível" vem do texto usado em FAM-17 para convites recebidos indisponíveis.

## 11. Critérios de aceite

- [ ] Link expirado (410) mostra a tela, sem nome de quem convidou.
- [ ] Link cancelado ou já usado (409) mostra a mesma tela.
- [ ] Entrar na minha conta abre ENT-01.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
