# FAM-01 · Meus familiares · vazio

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-01` |
| Id no protótipo | `area-familiares-vazio` (`prototipo.html#area-familiares-vazio`) |
| Raia | Familiares · Inclusão e gestão de vínculos |
| Figma | `2831:38227` (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 3 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Convidar a incluir o primeiro familiar.

## 2. Componentes

9 peças nesta tela: **5 instâncias de 5 componentes do DS** (`Badge`, `Button`, `LegalFooter`, `ProfileMenu`, `Tabs`) e **4 peças fora do DS**.

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | Cabeçalho do perfil (avatar + nome + badge) _(fora do DS)_ | name: Roberto Silva; avatar: foto de perfil editável | — | Fora do DS (area-user, area-avatar). |
| 2 | ↳ `Badge` | `<Badge tone="success">Cadastro completo</Badge>` | — | — |
| 3 | Botão de ícone do topo _(fora do DS)_ | label: Ajuda e atendimento; navega para: ajuda-form | — | Fora do DS; equivalente: IconButton variant="subtle". Navega para `ajuda-form`. |
| 4 | Botão de ícone do topo _(fora do DS)_ | label: Notificações, 2 não lidas; navega para: notificacoes | — | Fora do DS; equivalente: IconButton variant="subtle". Navega para `notificacoes`. |
| 5 | `ProfileMenu` | `<ProfileMenu items={[{ id: "modo-escuro", label: "Modo escuro", icon: "dark_mode" }, { id: "privacidade", label: "Privacidade", icon: "lock" }, { id: "seguran-a", label: "Segurança", icon: "shield" }, { id: "senha", label: "Senha", icon: "password" }, { id: "sair", label: "Sair", icon: "logout", tone: "danger" }]} language divider />` | fechado; aberto; Modo escuro ligado ou desligado | — |
| 6 | `Tabs` | `<Tabs items={[{ value: "Meus cadastro", label: "Meus cadastro" }, { value: "Meus familiares", label: "Meus familiares" }]} value="Meus familiares" />` | aba ativa: Meus familiares | — |
| 7 | Estado vazio _(fora do DS)_ | title: Nenhum familiar cadastrado; description: Você pode cadastrar seu cônjuge ou companheiro(a), seus filhos menores de 18 anos e seus pais aposentados ou com mais de 60 anos. | — | Fora do DS (area-empty-*): candidato a componente EmptyState. |
| 8 | ↳ `Button` | `<Button variant="secondary" fullWidth={false} iconEnd="add">Incluir novo familiar</Button>` | — | Navega para `familiar-intro`. |
| 9 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| Folha de foto de perfil _(fora do DS)_ | Tirar foto · Escolher da galeria · Remover foto · Cancelar | Toque no avatar. Fora do DS (photo-sheet). |

Classes locais usadas na tela (fora do DS): `.area-add*`, `.area-avatar*`, `.area-empty*`, `.area-help*`, `.area-name*`, `.area-notif*`, `.area-profile*`, `.area-promo*`, `.area-tabs*`, `.area-top*`, `.area-user*`.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Alterar foto de perfil | — |  |
| Ajuda e atendimento | [AJD-01 · Ajuda · abrir chamado](../AJD-01-ajuda-abrir-chamado/spec.md) |  |
| Notificações, 2 não lidas | [AREA-02 · Notificações](../AREA-02-notificacoes/spec.md) |  |
| Abrir menu do perfil | — |  |
| PT | — |  |
| Modo escuro | — |  |
| Privacidade | — |  |
| Segurança | [AREA-03 · Segurança](../AREA-03-seguranca/spec.md) |  |
| Senha | — |  |
| Sair | [ENT-01 · Login](../ENT-01-login/spec.md) |  |
| Torne-se Sócio Torcedor Programa Avanti Avanti Acesse benefícios exclusivos → | — |  |
| Meus cadastro | [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) |  |
| Meus familiares | [FAM-01 · Meus familiares · vazio](../FAM-01-meus-familiares-vazio/spec.md) |  |
| Incluir novo familiar | [FAM-03 · Adicionar familiar · introdução](../FAM-03-adicionar-familiar-introducao/spec.md) |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Vazio

## 6. Comportamento

- Cabeçalho da área logada (compartilhado por AREA-01, FAM-01 e FAM-17): avatar com folha de foto de perfil, nome, badge de situação do cadastro, Ajuda (→ AJD-01), Notificações com ponto de não lidas (→ AREA-02) e menu do perfil (Idioma, Modo escuro, Privacidade, Segurança → AREA-03, Senha, Sair → ENT-01).
- Incluir novo familiar abre FAM-03.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-09 · Buscar familiar](../FAM-09-buscar-familiar/spec.md) | Voltar | — | Voltar |
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Aba Meus familiares | Sem familiares nem convites | Caminho alternativo |
| [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) | Desvincular o último familiar | — | Automática (timer) |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-03 · Adicionar familiar · introdução](../FAM-03-adicionar-familiar-introducao/spec.md) | Incluir novo familiar | — | Caminho principal |
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Aba Meu cadastro | — | Caminho alternativo |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- O texto (cônjuge, filhos menores de 18 e pais aposentados ou 60+) não bate com FAM-03, que também lista irmãos e avós. Definir a regra de parentesco.

## 11. Critérios de aceite

- [ ] Incluir novo familiar abre FAM-03.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
