# FAM-15 · Código do contato do familiar

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.
>
> **Aprovada pelo titular** no comportamento do código. Os estados de erro, expirado, bloqueado e sucesso ainda não estão na marcação. Premissas listadas na seção 10.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-15` (código livre no índice; antes não havia FAM-15) |
| Id no protótipo | — (não implementada) |
| Raia | Familiares · Cadastro do familiar sem conta (Caminho B) |
| Figma | — |
| Status | Aprovada; estados pendentes na marcação |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 3 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Confirmar, com um código de 6 dígitos, que o titular tem acesso ao e-mail e ao celular informados para o familiar sem conta (spec §6.4). Cada contato informado em FAM-12 passa por esta tela, uma vez.

## 2. Componentes

6 peças nesta tela: **6 instâncias de 6 componentes do DS** (`AppHeader`, `PageHeading`, `ContactRow`, `OTPInput`, `ResendPrompt`, `LegalFooter`).

Lista para máquina: a gerar após validação. Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Cadastro do familiar" language={false} help />` | — | Sem barra de progresso: a etapa aparece no rótulo acima do título. Navega para FAM-12. |
| 2 | `PageHeading` | `<PageHeading title="Insira o código" subtitle="Enviamos um código de 6 dígitos para o e-mail do familiar." tone="neutral" spaced />` | — | Rótulo "Confirmação 1 de 2 · E-mail do familiar" acima do título (local, ver abaixo). |
| 3 | ↳ `ContactRow` | `<ContactRow channel="email" value={maskEmail(email)} />` | — | Sem ação de edição: para trocar o contato, volta para FAM-12. |
| 4 | `OTPInput` | `<OTPInput length={6} state="default" />` | padrão; erro ("Tentativas restantes: n/5"); sucesso; expirado; bloqueado | — |
| 5 | `ResendPrompt` | `<ResendPrompt question="Não recebeu o código?" actionLabel="Reenviar código" cooldown={30} />` | padrão; em espera ("Reenviar código em 0:ss"); desativado (bloqueado) | — |
| 6 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| `Alert` | tone="danger" title="Código incorreto" | Código errado com tentativas restantes. |
| `Alert` | tone="danger" title="Excesso de tentativas." | No 5º código errado. |
| `Alert` | tone="danger" title="Código expirado." | Passados 5 minutos desde o envio. |
| `Status` | title="E-mail do familiar confirmado" | Código certo, por 1,8 s antes de avançar. |

Classes locais usadas na tela (fora do DS): `.fam-otp-step` (rótulo da etapa), `.otp-block*` e `.otp-feedback*` (mesmas de CAD-04).

## 3. Campos e validações

| Campo | Regra | Mensagem de erro |
|---|---|---|
| Código | 6 dígitos. | Código incorreto · Tentativas restantes: n/5 |
| Código | Vale por 5 minutos a partir do envio. | Código expirado. Peça um novo código. |
| Código | Após 5 tentativas erradas, bloqueado. | Excesso de tentativas. Você excedeu o limite de 5 tentativas. Tente novamente em 30 minutos. |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [FAM-12 · Cadastro do familiar (sem conta)](../FAM-12-cadastro-do-familiar-sem-conta/spec.md) | Trocar o contato zera as tentativas e o bloqueio. |
| Ajuda | — | |
| Reenviar código | — | Só gera um novo código. Mantém as tentativas. Desativado durante o bloqueio e por 30 s após cada envio. |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Padrão
- Erro (n/5)
- Expirado (depois de 5 minutos)
- Bloqueado (depois de 5 erros)
- Sucesso ("E-mail do familiar confirmado", por 1,8 s)
- Reenvio em espera (30 s)

## 6. Comportamento

- Mesma mecânica de CAD-02 e CAD-04: 6 células, colar distribui os dígitos, Backspace volta uma célula, valida ao completar o 6º dígito.
- Diferença para o cadastro do titular: **5 tentativas** (spec §6.4), não 3.
- Acertou: "E-mail do familiar confirmado" e, depois de 1,8 s, avança (ver Saídas).
- Errou: estado de erro, alerta "Código incorreto" e "Tentativas restantes: n/5".
- No 5º erro, as células ficam somente leitura, aparece o alerta de excesso de tentativas e o Reenviar fica desativado.
- Passados 5 minutos do envio, o código expira: células somente leitura até o reenvio, com alerta "Código expirado".
- Reenviar gera um código novo, espera 30 s ("Reenviar código em 0:ss") e mantém as tentativas.
- Trocar o contato (Voltar para FAM-12 e corrigir o e-mail ou celular) zera tentativas, bloqueio e validade.
- O contato aparece mascarado, como em CAD-04: `ma****@email.com`.
- No protótipo, o código de demonstração é `123456`, como nas telas de CAD.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-12 · Cadastro do familiar (sem conta)](../FAM-12-cadastro-do-familiar-sem-conta/spec.md) | Continuar | Contatos preenchidos. Primeiro o e-mail, depois o celular (premissa, seção 10). | Caminho principal |
| [FAM-15 · Código do contato do familiar](../FAM-15-codigo-do-contato-do-familiar/spec.md) | Confirmação do e-mail · avança para o celular | E-mail confirmado (mesma tela, outro canal) | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| FAM-15 (canal celular) | Código do e-mail confirmado · após 1,8 s | Há um segundo contato a confirmar | Caminho principal |
| [FAM-13 · Termo de responsabilidade · menor](../FAM-13-termo-de-responsabilidade-menor/spec.md) | Último contato confirmado · após 1,8 s | Receita informou familiar menor de idade | Caminho principal |
| [FAM-14 · Decisão do titular · maior de idade](../FAM-14-decisao-do-titular-maior-de-idade/spec.md) | Último contato confirmado · após 1,8 s | Receita informou familiar maior de idade | Caminho principal |
| [FAM-12 · Cadastro do familiar (sem conta)](../FAM-12-cadastro-do-familiar-sem-conta/spec.md) | Voltar | Trocar o contato zera tentativas e bloqueio | Voltar |

## 9. Dados

- Lê `email` ou `celular` do familiar, mascarados, conforme o canal da tela.
- Tentativas por canal: 5. Validade do código: 5 minutos. Bloqueio: 30 minutos. Intervalo de reenvio: 30 s.
- Endpoint de verificação do código: a definir com o backend (spec §6.4).

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

**Premissas a validar** (assumidas para desenhar a tela):

- **Quem digita o código:** o titular, no próprio celular, durante o cadastro. O código chega ao contato do familiar, e é o familiar quem o repassa.
- **Ordem:** e-mail primeiro, depois celular, na mesma tela com o canal trocado.
- **Bloqueio de 30 minutos:** copiado do cadastro do titular (CAD-02). A spec §6.4 não define o tempo.
- **Validade de 5 minutos e estado "Expirado":** o estado não existe nas telas de CAD. Foi criado aqui.
- **Layout:** reaproveita a estrutura de CAD-04, sem barra de progresso.

**Em aberto:**

- Endpoint e formato da verificação do código.
- Texto da notificação, se houver, quando o contato for confirmado. Hoje não há.

## 11. Critérios de aceite

- [ ] Com `123456`, confirma o contato e avança.
- [ ] Ao 5º código errado, o campo bloqueia e o Reenviar fica desativado.
- [ ] Após 5 minutos sem confirmar, o código expira e o campo fica somente leitura até o reenvio.
- [ ] Reenviar espera 30 s antes de liberar outro envio.
- [ ] Voltar para FAM-12 e trocar o contato zera as tentativas.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
