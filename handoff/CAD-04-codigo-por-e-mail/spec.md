# CAD-04 · Código por e-mail

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `CAD-04` |
| Raia | Entrada e cadastro · Etapa 1 de 4 · dados pessoais, contatos e endereço |
| Figma | `1619:11471` (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 4 / 4 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Confirmar o e-mail com um código de 6 dígitos.

## 2. Componentes

7 peças nesta tela: **7 instâncias de 7 componentes do DS** (`AppHeader`, `ContactRow`, `LegalFooter`, `OTPInput`, `PageHeading`, `ResendPrompt`, `Toast`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Cadastro" progress={{ current: 1, total: 4 }} language={false} help />` | — | Forma atual: Verificação (classe po-header-module). Navega para `otp-sms`. |
| 2 | `Toast` | `<Toast tone="success" title="E-mail alterado com sucesso" />` | oculto; visível por 4 s depois de trocar o e-mail | Vai dentro da ToastRegion, logo depois do AppHeader. Oculto no layout padrão. |
| 3 | `PageHeading` | `<PageHeading title="Insira o seu código" subtitle="Enviamos um código de 6 dígitos para o seu e-mail." tone="neutral" spaced />` | — | — |
| 4 | ↳ `ContactRow` | `<ContactRow channel="email" value={maskEmail(email)} editLabel="Editar Email" />` | — | Navega para `editar-email`. |
| 5 | `OTPInput` | `<OTPInput length={6} state="default" />` | padrão; erro ("Tentativas restantes: n/3"); sucesso; bloqueado (`disabled`, 3 erros) | — |
| 6 | `ResendPrompt` | `<ResendPrompt question="Não recebeu o código?" actionLabel="Reenviar código" cooldown={30} />` | padrão; em espera ("Reenviar código em 0:ss", 30 s); desativado (código bloqueado) | — |
| 7 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| `Alert` | tone="danger" title="Código incorreto" | Código errado com tentativas restantes. |
| `Alert` | tone="danger" title="Excesso de tentativas." | No 3º código errado. |
| `Alert` | tone="success" title="E-mail verificado" | Código certo, por 1,8 s antes de abrir CAD-06. |

Classes locais usadas na tela (fora do DS): `.otp-block*`, `.otp-feedback*`.

## 3. Campos e validações

| Campo | Regra | Mensagem de erro |
|---|---|---|
| Código | 6 dígitos. | Código incorreto · Tentativas restantes: n/3 |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [CAD-02 · Código por SMS](../CAD-02-codigo-por-sms/spec.md) |  |
| Ajuda | — |  |
| Fechar | — |  |
| Editar Email | [CAD-05 · Editar e-mail](../CAD-05-editar-e-mail/spec.md) |  |
| Reenviar código | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Padrão
- Erro (n/3)
- Bloqueado
- Sucesso
- Com toast de e-mail alterado

## 6. Comportamento

- Mesmo comportamento de CAD-02 (OTP, 3 tentativas, bloqueio, reenvio em 30 s), com o canal e-mail.
- Acertou: "E-mail verificado" e, depois de 1,8 s, abre CAD-06.
- Vindo de CAD-05, mostra o toast "E-mail alterado com sucesso" sobre o cabeçalho por 4 s (duração provisória).
- O e-mail aparece mascarado: joao****@email.com.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-02 · Código por SMS](../CAD-02-codigo-por-sms/spec.md) | Código SMS correto? Sim · após 1,8 s | Código confere | Caminho principal |
| [CAD-04 · Código por e-mail](../CAD-04-codigo-por-e-mail/spec.md) | Código e-mail correto? Não · tenta de novo | Até 3 erros; no 3º o campo bloqueia | Erro ou nova tentativa |
| [CAD-05 · Editar e-mail](../CAD-05-editar-e-mail/spec.md) | Confirmar e enviar código | E-mail válido e igual nos dois campos; mostra o toast | Caminho alternativo |
| [CAD-06 · E-mail verificado](../CAD-06-e-mail-verificado/spec.md) | Voltar | — | Voltar |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-06 · E-mail verificado](../CAD-06-e-mail-verificado/spec.md) | 6º dígito digitado → Código e-mail correto? Sim · após 1,8 s | Código confere | Caminho principal |
| [CAD-04 · Código por e-mail](../CAD-04-codigo-por-e-mail/spec.md) | 6º dígito digitado → Código e-mail correto? Não · tenta de novo | Até 3 erros; no 3º o campo bloqueia | Erro ou nova tentativa |
| [CAD-05 · Editar e-mail](../CAD-05-editar-e-mail/spec.md) | Editar e-mail | — | Caminho alternativo |
| [CAD-02 · Código por SMS](../CAD-02-codigo-por-sms/spec.md) | Voltar | — | Voltar |

## 9. Dados

- Lê `email` (mascarado).
- Tentativas por canal: 3.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- A duração do toast não está definida no Figma.

## 11. Critérios de aceite

- [ ] Com 123456, abre CAD-06.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
