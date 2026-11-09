# CAD-03 · Editar celular

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `CAD-03` |
| Id no protótipo | `editar-celular` (`prototipo.html#editar-celular`) |
| Raia | Entrada e cadastro · Etapa 1 de 4 · dados pessoais, contatos e endereço |
| Figma | sem node no Figma |
| Status | Só no protótipo (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 1 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Trocar o celular antes de receber um novo código.

## 2. Componentes

6 peças nesta tela: **6 instâncias de 5 componentes do DS** (`AppHeader`, `Button`, `LegalFooter`, `PageHeading`, `TextField`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Editar celular" language={false} help />` | — | Forma no protótipo: Edição (classe po-header-task). Navega para `otp-sms`. |
| 2 | `PageHeading` | `<PageHeading title="Atualize seu celular" subtitle="Informe o novo número para receber um novo código de verificação." tone="neutral" spaced />` | — | — |
| 3 | `TextField` | `<TextField label="Celular" preset="phone" name="valor" placeholder="(00) 00000-0000" autoComplete="tel-national" />` | padrão; preenchido; erro (prop `error`, mostra FormMessage) | — |
| 4 | `TextField` | `<TextField label="Confirmar Celular" preset="phone" name="confirmacao" placeholder="(00) 00000-0000" />` | padrão; preenchido; erro (prop `error`, mostra FormMessage) | — |
| 5 | `Button` | `<Button variant="primary" fullWidth type="submit">Confirmar e enviar código</Button>` | — | — |
| 6 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| `FormMessage` | via `error` do TextField | Formato inválido ou números diferentes. |

## 3. Campos e validações

| Campo | id | Controle |
|---|---|---|
| Celular | `ed-cel` | `text` · name=`valor` · inputmode=`tel` · autocomplete=`tel-national` · data-mask=`celular` · placeholder "(00) 00000-0000" |
| Confirmar Celular | `ed-cel2` | `text` · name=`confirmacao` · inputmode=`tel` · data-mask=`celular` · placeholder "(00) 00000-0000" |

| Campo | Regra | Mensagem de erro |
|---|---|---|
| Celular | Formato (XX) 9XXXX-XXXX (máscara automática). | Número de celular inválido. Use o formato (XX) XXXXX-XXXX. |
| Confirmar celular | Igual ao primeiro campo. | Os números não coincidem. Digite o mesmo celular nos dois campos. |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [CAD-02 · Código por SMS](../CAD-02-codigo-por-sms/spec.md) |  |
| Ajuda | — |  |
| Confirmar e enviar código | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Vazio
- Erro de formato
- Erro de confirmação

## 6. Comportamento

- Valida ao enviar. Se estiver tudo certo, grava o novo celular, zera as tentativas do SMS e volta para CAD-02.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-02 · Código por SMS](../CAD-02-codigo-por-sms/spec.md) | Editar celular | — | Caminho alternativo |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-02 · Código por SMS](../CAD-02-codigo-por-sms/spec.md) | Confirmar e enviar código | Celular válido e igual nos dois campos; zera as tentativas | Caminho alternativo |

## 9. Dados

- Sobrescreve `celular`.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

_Nenhuma._

## 11. Critérios de aceite

- [ ] Números diferentes mostram o erro no campo de confirmação.
- [ ] Números iguais e válidos voltam a CAD-02 com o novo número mascarado.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
