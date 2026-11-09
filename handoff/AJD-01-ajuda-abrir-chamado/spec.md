# AJD-01 · Ajuda · abrir chamado

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `AJD-01` |
| Id no protótipo | `ajuda-form` (`prototipo.html#ajuda-form`) |
| Raia | Área logada · Meu cadastro, notificações, ajuda e segurança |
| Figma | sem node no Figma |
| Status | Só no protótipo (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Abrir um chamado de atendimento.

## 2. Componentes

7 peças nesta tela: **6 instâncias de 6 componentes do DS** (`AppHeader`, `Button`, `LegalFooter`, `PageHeading`, `Select`, `TextField`) e **1 peças fora do DS**.

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Ajuda e atendimento" language={false} help={false} />` | — | Forma no protótipo: Edição (classe po-header-task). Navega para `area-cadastro-detalhe`. |
| 2 | `PageHeading` | `<PageHeading title="Como podemos ajudar?" tone="neutral" />` | — | — |
| 3 | `Select` | `<Select label="Categoria" options={["Cadastro e dados pessoais", "Familiares", "Documentos", "Biometria facial", "Acesso e segurança", "Sócio torcedor", "Outros"]} placeholder="Selecione a categoria" required name="categoria" />` | padrão; aberto; preenchido; erro (prop `error`, mostra FormMessage) | — |
| 4 | `TextField` | `<TextField label="O que aconteceu?" name="descricao" placeholder="Conte o problema e o que você tentou fazer" maxLength={1000} />` | padrão; preenchido; erro (prop `error`, mostra FormMessage) | Campo de várias linhas: o TextField do DS não tem textarea; conferir com o DS. |
| 5 | Anexar arquivos _(fora do DS)_ | label: Anexar print ou foto (até 3); accept: image/jpeg,image/png,application/pdf; multiple: True | — | Fora do DS; equivalente: UploadArea. |
| 6 | `Button` | `<Button variant="primary" fullWidth type="submit">Abrir chamado</Button>` | — | — |
| 7 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| `FormMessage` | via `error` do Select e do TextField | Categoria vazia ou descrição com menos de 20 caracteres. |
| `Texto de apoio do campo` | "Faltam n caracteres" (prop `hint`) | Enquanto a descrição tem menos de 20 caracteres. |

Classes locais usadas na tela (fora do DS): `.ajd-actions*`, `.ajd-anexar*`, `.ajd-anexos*`, `.ajd-caption*`, `.ajd-contato*`, `.ajd-link*`, `.ajd-textarea*`.

## 3. Campos e validações

| Campo | id | Controle |
|---|---|---|
| Categoria | `po-sel-5-btn` | `?` |
| O que aconteceu? | `ajd-descricao` | `textarea` · name=`descricao` · maxlength=`1000` · placeholder "Conte o problema e o que você tentou fazer" |

| Campo | Regra | Mensagem de erro |
|---|---|---|
| Categoria | Obrigatória. | Escolha a categoria do problema. |
| Descrição | 20 caracteres ou mais. | Descreva o problema com pelo menos 20 caracteres. |
| Anexos | Até 3 arquivos. | Envie no máximo 3 arquivos. |
| Anexos | Até 5 MB cada. | Cada arquivo pode ter até 5 MB. |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) |  |
| Selecione a categoria | — |  |
| Alterar | [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) |  |
| Abrir chamado | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Vazio
- Contador de caracteres
- Erro por campo
- Anexos escolhidos

## 6. Comportamento

- Categoria (Select do DS) com 7 opções: Cadastro e dados pessoais, Familiares, Documentos, Biometria facial, Acesso e segurança, Sócio torcedor, Outros.
- Descrição: no mínimo 20 e no máximo 1000 caracteres. Enquanto estiver abaixo do mínimo, mostra "Faltam n caracteres".
- Anexos: até 3 arquivos JPG, PNG ou PDF de até 5 MB cada; os nomes aparecem abaixo do campo.
- Mostra o contato de resposta mascarado; Alterar leva a AREA-01.
- Se estiver tudo certo, gera o protocolo PAL-2026-XXXXXX, limpa o formulário e abre AJD-02.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Ajuda e atendimento | — | Caminho alternativo |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [AJD-02 · Ajuda · chamado aberto](../AJD-02-ajuda-chamado-aberto/spec.md) | Abrir chamado | Categoria escolhida e descrição com 20+ caracteres | Caminho principal |
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Voltar ou Alterar contato | — | Voltar |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- O protocolo é gerado no front só para a demonstração; no produto vem do backend.

## 11. Critérios de aceite

- [ ] Sem categoria, não envia e foca a Categoria.
- [ ] Envio válido abre AJD-02 com o protocolo.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
