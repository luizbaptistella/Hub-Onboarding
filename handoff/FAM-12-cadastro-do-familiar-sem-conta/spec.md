# FAM-12 · Cadastro do familiar (sem conta)

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-12` |
| Id no protótipo | `familiar-cadastro` (`prototipo.html#familiar-cadastro`) |
| Raia | Familiares · Inclusão e gestão de vínculos |
| Figma | sem node no Figma |
| Status | Só no protótipo (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 3 / 3 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Cadastrar um familiar que ainda não tem conta (Caminho B), com consulta à Receita Federal pelo CPF.

## 2. Componentes

9 peças nesta tela: **9 instâncias de 6 componentes do DS** (`AppHeader`, `Button`, `LegalFooter`, `PageHeading`, `Select`, `TextField`).

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Cadastrar familiar" language={false} help={false} />` | — | Forma no protótipo: Edição (classe po-header-task). Navega para `familiar-busca`. |
| 2 | `PageHeading` | `<PageHeading title="Dados do familiar" tone="neutral" spaced />` | — | — |
| 3 | `Select` | `<Select label="Tipo de vínculo" options={["Filho(a)", "Pai ou mãe", "Irmão ou irmã", "Cônjuge ou companheiro(a)", "Sobrinho(a)", "Outros"]} placeholder="Selecione o tipo de vínculo" required name="relation" />` | padrão; aberto; preenchido | — |
| 4 | `TextField` | `<TextField label="CPF" name="cpf" placeholder="000.000.000-00" required autoComplete="off" />` | padrão; preenchido | — |
| 5 | `TextField` | `<TextField label="Nome completo" name="nome" placeholder="Nome e sobrenome" required autoComplete="off" />` | padrão; preenchido | — |
| 6 | `TextField` | `<TextField label="E-mail" preset="email" name="email" placeholder="nome@email.com" required autoComplete="off" />` | padrão; preenchido | — |
| 7 | `TextField` | `<TextField label="Celular" name="celular" placeholder="(00) 00000-0000" required autoComplete="off" />` | padrão; preenchido | — |
| 8 | `Button` | `<Button variant="primary" fullWidth type="submit" iconEnd="arrow_forward">Continuar</Button>` | — | — |
| 9 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

Classes locais usadas na tela (fora do DS): `.area-form*`.

## 3. Campos e validações

| Campo | id | Controle |
|---|---|---|
| Tipo de vínculo | `po-sel-4-btn` | `?` |
| CPF | `cad-fam-cpf` | `text` · name=`cpf` · inputmode=`numeric` · autocomplete=`off` · obrigatório · placeholder "000.000.000-00" |
| Nome completo | `cad-fam-nome` | `text` · name=`nome` · autocomplete=`off` · obrigatório · placeholder "Nome e sobrenome" |
| E-mail | `cad-fam-email` | `email` · name=`email` · autocomplete=`off` · obrigatório · placeholder "nome@email.com" |
| Celular | `cad-fam-cel` | `text` · name=`celular` · inputmode=`tel` · autocomplete=`off` · obrigatório · placeholder "(00) 00000-0000" |

| Campo | Regra | Mensagem de erro |
|---|---|---|
| CPF | 11 dígitos com dígitos verificadores válidos; rejeita todos iguais. Máscara 000.000.000-00. | CPF inválido. Use o formato 000.000.000-00. |
| Data de nascimento | DD/MM/AAAA, data existente, no passado e com ano depois de 1900. | Data de nascimento inválida. Use o formato DD/MM/AAAA. |
| E-mail | nome@dominio.tld, com 2+ letras no final. | E-mail inválido. Use o formato nome@exemplo.com. |
| Celular | Formato (XX) 9XXXX-XXXX (máscara automática). | Número de celular inválido. Use o formato (XX) XXXXX-XXXX. |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [FAM-09 · Buscar familiar](../FAM-09-buscar-familiar/spec.md) |  |
| Selecione o tipo de vínculo | — |  |
| Continuar | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Padrão
- Erro por campo
- Receita indisponível (503): erro genérico de conexão, pedindo para tentar mais tarde. Sem tela própria.

## 6. Comportamento

- CPF com máscara e dígito verificador validado no cliente, antes de chamar a Receita.
- Campos vazios, sem pré-preenchimento com dados da Receita.
- Contatos: e-mail e celular. Cada contato informado passa por OTP (spec §6.4).
- A Receita informa se o familiar é menor de idade: menor abre FAM-13; maior abre FAM-14.
- A consulta acontece aqui, e não na busca.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-09 · Buscar familiar](../FAM-09-buscar-familiar/spec.md) | Cadastrar novo familiar | Sem conta ativa, o titular cadastra o familiar (spec §6) | Caminho alternativo |
| [FAM-13 · Termo de responsabilidade · menor](../FAM-13-termo-de-responsabilidade-menor/spec.md) | Voltar | — | Voltar |
| [FAM-14 · Decisão do titular · maior de idade](../FAM-14-decisao-do-titular-maior-de-idade/spec.md) | Voltar | — | Voltar |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-09 · Buscar familiar](../FAM-09-buscar-familiar/spec.md) | Voltar | — | Voltar |
| [FAM-15 · Código do contato do familiar](../FAM-15-codigo-do-contato-do-familiar/spec.md) | Continuar | Contatos do familiar informados (e-mail e celular). Depois, FAM-13 (menor) ou FAM-14 (maior), conforme a Receita (spec §6.1) | Caminho principal |

## 9. Dados

- POST /v1/family-links/new-family com os dados e a consulta à Receita.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- OTP de contatos (spec §6.4): tela em FAM-15 (aprovada).
- Receita indisponível (P11): erro genérico de conexão e pedido para tentar mais tarde. Confirmar se a tela tenta de novo sozinha antes de mostrar o erro.
- Retenção de cadastros abandonados: 30 dias (P5). Assumido o mesmo prazo para as validações da Receita; confirmar.

## 11. Critérios de aceite

- [ ] CPF inválido mostra o erro e não consulta a Receita.
- [ ] Receita indisponível mostra erro genérico de conexão e pede para tentar mais tarde.
- [ ] Menor de idade abre FAM-13; maior abre FAM-14.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
