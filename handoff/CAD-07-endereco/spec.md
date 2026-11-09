# CAD-07 · Endereço

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `CAD-07` |
| Id no protótipo | `endereco` (`prototipo.html#endereco`) |
| Raia | Entrada e cadastro · Etapa 1 de 4 · dados pessoais, contatos e endereço |
| Figma | `1619:11471` (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Coletar o endereço para concluir a etapa de cadastro.

## 2. Componentes

11 peças nesta tela: **11 instâncias de 7 componentes do DS** (`AppHeader`, `Button`, `Checkbox`, `LegalFooter`, `PageHeading`, `Select`, `TextField`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Cadastro" progress={{ current: 1, total: 4 }} language={false} help />` | — | Forma no protótipo: Verificação (classe po-header-module). Navega para `email-atualizado`. |
| 2 | `PageHeading` | `<PageHeading title="Qual é o seu endereço?" subtitle="Informe onde você mora para concluir o cadastro." tone="neutral" />` | — | — |
| 3 | `TextField` | `<TextField label="CEP" preset="cep" name="cep" placeholder="00000-000" required autoComplete="postal-code" />` | padrão; preenchido; erro (prop `error`, mostra FormMessage) | Campo no tamanho lg (classe po-input-lg); o DS não tem prop de tamanho. |
| 4 | `TextField` | `<TextField label="Rua" name="rua" placeholder="Nome da rua" required autoComplete="address-line1" />` | padrão; preenchido; erro (prop `error`, mostra FormMessage) | Campo no tamanho lg (classe po-input-lg); o DS não tem prop de tamanho. |
| 5 | `TextField` | `<TextField label="Número" name="numero" placeholder="000" required />` | padrão; preenchido; erro (prop `error`, mostra FormMessage) | Campo no tamanho lg (classe po-input-lg); o DS não tem prop de tamanho. |
| 6 | `TextField` | `<TextField label="Complemento" name="complemento" placeholder="Apto, bloco" optional autoComplete="address-line2" />` | padrão; preenchido; erro (prop `error`, mostra FormMessage) | Campo no tamanho lg (classe po-input-lg); o DS não tem prop de tamanho. |
| 7 | `Checkbox` | `<Checkbox name="sem-complemento">Não possuo complemento</Checkbox>` | desmarcado; marcado | — |
| 8 | `Select` | `<Select label="Cidade" options={cidadesDoEstado} placeholder="Selecione a cidade" disabled required name="cidade" />` | padrão; aberto; preenchido; erro (prop `error`, mostra FormMessage); desativado até escolher o estado | — |
| 9 | `Select` | `<Select label="Estado" options={["SP", "RJ", "MG", "PR", "RS", "BA", "PE", "DF"]} placeholder="Selecione" required name="uf" />` | padrão; aberto; preenchido; erro (prop `error`, mostra FormMessage) | — |
| 10 | `Button` | `<Button variant="primary" fullWidth type="submit">Continuar</Button>` | — | — |
| 11 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| `FormMessage` | via `error` do TextField e do Select | Campo obrigatório vazio ou CEP inválido. |

## 3. Campos e validações

| Campo | id | Controle |
|---|---|---|
| CEP | `end-cep` | `text` · name=`cep` · inputmode=`numeric` · autocomplete=`postal-code` · data-mask=`cep` · obrigatório · placeholder "00000-000" |
| Rua | `end-rua` | `text` · name=`rua` · autocomplete=`address-line1` · obrigatório · placeholder "Nome da rua" |
| Número | `end-num` | `text` · name=`numero` · inputmode=`numeric` · obrigatório · placeholder "000" |
| Complemento (Opcional) | `end-comp` | `text` · name=`complemento` · autocomplete=`address-line2` · placeholder "Apto, bloco" |
| Cidade | `po-sel-1-btn` | `?` |
| Estado | `po-sel-2-btn` | `?` |

| Campo | Regra | Mensagem de erro |
|---|---|---|
| CEP | 00000-000 (9 caracteres com a máscara). | CEP inválido. Use o formato 00000-000. |
| Rua | Obrigatória. | Informe o nome da rua. |
| Número | Obrigatório. | Informe o número. |
| Estado | Obrigatório. | Selecione o estado. |
| Cidade | Obrigatória depois de escolher o estado. | Selecione a cidade. |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [CAD-06 · E-mail verificado](../CAD-06-e-mail-verificado/spec.md) |  |
| Ajuda | — |  |
| Selecione a cidade | — |  |
| Selecione | — |  |
| Continuar | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Vazio
- Cidade desativada até escolher o estado
- Erro por campo

## 6. Comportamento

- O Estado vem preenchido com SP, RJ, MG, PR, RS, BA, PE e DF. Ao escolher um estado, a Cidade é liberada com a lista daquele estado.
- Marcar "Não possuo complemento" desativa e limpa o Complemento.
- Os selects usam o Select do DS (lista própria, teclado com setas, Home, End, Enter e Esc), e o <select> nativo continua no formulário.
- Valida ao enviar; se estiver tudo certo, abre CAD-08.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-06 · E-mail verificado](../CAD-06-e-mail-verificado/spec.md) | Continuar | — | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-08 · Status · dados recebidos](../CAD-08-status-dados-recebidos/spec.md) | Continuar | CEP, rua, número, estado e cidade preenchidos | Caminho principal |
| [CAD-06 · E-mail verificado](../CAD-06-e-mail-verificado/spec.md) | Voltar | — | Voltar |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Busca de endereço pelo CEP: não existe; a cidade vem do estado, com uma lista de demonstração.
- Os estados de erro não existem no Figma; os textos são provisórios.
- O node do Figma citado (1619:11471) é o mesmo de CAD-04. Conferir o node certo.

## 11. Critérios de aceite

- [ ] Sem estado, a Cidade fica desativada.
- [ ] Com todos os campos válidos, abre CAD-08.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
