# CAD-02 · Código por SMS

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `CAD-02` |
| Raia | Entrada e cadastro · Etapa 1 de 4 · dados pessoais, contatos e endereço |
| Figma | `1620:29884` (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 4 / 4 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Confirmar o celular com um código de 6 dígitos enviado por SMS.

## 2. Componentes

6 peças nesta tela: **6 instâncias de 6 componentes do DS** (`AppHeader`, `ContactRow`, `LegalFooter`, `OTPInput`, `PageHeading`, `ResendPrompt`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Cadastro" progress={{ current: 1, total: 4 }} language={false} help />` | — | Forma atual: Verificação (classe po-header-module). Navega para `cadastro`. |
| 2 | `PageHeading` | `<PageHeading title="Insira o seu código" subtitle="Enviamos um código de 6 dígitos por SMS para o seu celular." tone="neutral" spaced />` | — | — |
| 3 | ↳ `ContactRow` | `<ContactRow channel="sms" value={maskPhone(celular)} editLabel="Editar Celular" />` | — | Navega para `editar-celular`. |
| 4 | `OTPInput` | `<OTPInput length={6} state="default" />` | padrão; erro ("Tentativas restantes: n/3"); sucesso; bloqueado (`disabled`, 3 erros) | — |
| 5 | `ResendPrompt` | `<ResendPrompt question="Não recebeu o código?" actionLabel="Reenviar código" cooldown={30} />` | padrão; em espera ("Reenviar código em 0:ss", 30 s); desativado (código bloqueado) | — |
| 6 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| `Alert` | tone="danger" title="Código incorreto" | Código errado com tentativas restantes. |
| `Alert` | tone="danger" title="Excesso de tentativas." | No 3º código errado; o OTPInput bloqueia. |
| `Alert` | tone="success" title="Celular verificado" | Código certo, por 1,8 s antes de abrir CAD-04. |

Classes locais usadas na tela (fora do DS): `.otp-block*`, `.otp-feedback*`.

## 3. Campos e validações

| Campo | Regra | Mensagem de erro |
|---|---|---|
| Código | 6 dígitos; compara com o código enviado. | Código incorreto · Tentativas restantes: n/3 |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [CAD-01 · Cadastro · Dados pessoais](../CAD-01-cadastro-dados-pessoais/spec.md) |  |
| Ajuda | — |  |
| Editar Celular | [CAD-03 · Editar celular](../CAD-03-editar-celular/spec.md) |  |
| Reenviar código | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Padrão
- Erro (n/3)
- Bloqueado
- Sucesso
- Reenvio em espera

## 6. Comportamento

- OTPInput com 6 células (3 + 3). Colar distribui os dígitos; Backspace apaga e volta uma célula; a 1ª célula usa autocomplete one-time-code.
- Valida sozinho ao completar o 6º dígito. Código de demonstração: 123456.
- Acertou: estado de sucesso, mensagem "Celular verificado" e, depois de 1,8 s, abre CAD-04.
- Errou: estado de erro, alerta "Código incorreto" e "Tentativas restantes: n/3".
- No 3º erro o campo bloqueia: as células ficam somente leitura, aparece o alerta "Excesso de tentativas. ... Tente novamente em 30 minutos." e o Reenviar fica desativado.
- Reenviar código: depois de cada envio espera 30 s ("Reenviar código em 0:ss"). Reenviar mantém as tentativas; só um contato novo (CAD-03) zera tudo.
- O celular aparece mascarado: (11) 9****-5432.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-01 · Cadastro · Dados pessoais](../CAD-01-cadastro-dados-pessoais/spec.md) | Iniciar validação | CPF, data, celular e e-mail válidos e Termos aceitos | Caminho principal |
| [CAD-02 · Código por SMS](../CAD-02-codigo-por-sms/spec.md) | Código SMS correto? Não · tenta de novo | Até 3 erros; no 3º o campo bloqueia | Erro ou nova tentativa |
| [CAD-03 · Editar celular](../CAD-03-editar-celular/spec.md) | Confirmar e enviar código | Celular válido e igual nos dois campos; zera as tentativas | Caminho alternativo |
| [CAD-04 · Código por e-mail](../CAD-04-codigo-por-e-mail/spec.md) | Voltar | — | Voltar |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-04 · Código por e-mail](../CAD-04-codigo-por-e-mail/spec.md) | 6º dígito digitado → Código SMS correto? Sim · após 1,8 s | Código confere | Caminho principal |
| [CAD-02 · Código por SMS](../CAD-02-codigo-por-sms/spec.md) | 6º dígito digitado → Código SMS correto? Não · tenta de novo | Até 3 erros; no 3º o campo bloqueia | Erro ou nova tentativa |
| [CAD-03 · Editar celular](../CAD-03-editar-celular/spec.md) | Editar celular | — | Caminho alternativo |
| [CAD-01 · Cadastro · Dados pessoais](../CAD-01-cadastro-dados-pessoais/spec.md) | Voltar | — | Voltar |

## 9. Dados

- Lê `celular` (mascarado).
- Tentativas por canal: 3.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- O botão Ajuda do cabeçalho não tem ação.
- Tempo real do bloqueio: o texto diz 30 min, mas a implementação atual não conta o tempo.

## 11. Critérios de aceite

- [ ] Com 123456, abre CAD-04 em cerca de 1,8 s.
- [ ] Depois de 3 códigos errados, bloqueia e desativa o Reenviar.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
