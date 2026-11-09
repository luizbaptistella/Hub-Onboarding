# FAM-17 · Área do convidado · Meus familiares e Sou familiar de

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-17` |
| Id no protótipo | `familiar-recebidos` (`prototipo.html#familiar-recebidos`) |
| Raia | Familiares · Inclusão e gestão de vínculos |
| Figma | sem node no Figma |
| Status | Só no protótipo (sem node no Figma) |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 3 / 3 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Mostrar Meus familiares com atividade: familiares vinculados, convites enviados e, para o convidado, os vínculos em que ele é o familiar.

## 2. Componentes

53 peças nesta tela: **23 instâncias de 6 componentes do DS** (`Badge`, `Button`, `LegalFooter`, `ProfileMenu`, `Tabs`, `Toast`) e **30 peças fora do DS**.

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | Cabeçalho do perfil (avatar + nome + badge) _(fora do DS)_ | name: Mariana Costa; avatar: foto de perfil editável | — | Fora do DS (area-user, area-avatar). |
| 2 | ↳ `Badge` | `<Badge tone="success">Cadastro completo</Badge>` | — | — |
| 3 | Botão de ícone do topo _(fora do DS)_ | label: Ajuda e atendimento | — | Fora do DS; equivalente: IconButton variant="subtle". |
| 4 | Botão de ícone do topo _(fora do DS)_ | label: Notificações, 1 não lida | — | Fora do DS; equivalente: IconButton variant="subtle". |
| 5 | `ProfileMenu` | `<ProfileMenu items={[{ id: "modo-escuro", label: "Modo escuro", icon: "dark_mode" }, { id: "privacidade", label: "Privacidade", icon: "lock" }, { id: "seguran-a", label: "Segurança", icon: "shield" }, { id: "senha", label: "Senha", icon: "password" }, { id: "sair", label: "Sair", icon: "logout", tone: "danger" }]} language divider />` | fechado; aberto; Modo escuro ligado ou desligado | — |
| 6 | `Tabs` | `<Tabs items={[{ value: "Meus cadastro", label: "Meus cadastro" }, { value: "Meus familiares", label: "Meus familiares" }]} value="Meus familiares" />` | aba ativa: Meus familiares | — |
| 7 | `Toast` | `<Toast tone="success" title="Convite aceito." />` | oculto; visível por 4 s depois de trocar o e-mail | Vai dentro da ToastRegion, logo depois do AppHeader. Oculto no layout padrão. |
| 8 | `Badge` | `<Badge tone="info">Pendente</Badge>` | — | Oculto no layout padrão. |
| 9 | `Button` | `<Button variant="secondary" fullWidth={false}>Copiar link</Button>` | — | Oculto no layout padrão. |
| 10 | `Badge` | `<Badge tone="warning">Expirado</Badge>` | — | Oculto no layout padrão. |
| 11 | `Button` | `<Button variant="secondary" fullWidth={false}>Reenviar convite</Button>` | — | Oculto no layout padrão. |
| 12 | Card de familiar _(fora do DS)_ | name: Leandro Costa; meta: Filho | — | Fora do DS (classes area-family-*). |
| 13 | ↳ `Badge` | `<Badge tone="success">Ativo</Badge>` | — | — |
| 14 | ↳ Acordeão de seção _(fora do DS)_ | title: Contatos; description: E-mail e telefone; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 15 | ↳ Acordeão de seção _(fora do DS)_ | title: Dados pessoais; description: Nome, CPF e endereço; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 16 | ↳ Acordeão de seção _(fora do DS)_ | title: Validação de identidade; description: Documento e biometria facial; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 17 | ↳ Acordeão de seção _(fora do DS)_ | title: Benefício Meia-Entrada; description: Meia-entrada para estudantes; status: Validado | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 18 | ↳ ↳ `Badge` | `<Badge tone="success">Ativo</Badge>` | — | Oculto no layout padrão. |
| 19 | ↳ Ação destrutiva em texto _(fora do DS)_ | children: Desvincular familiar; abre: Modal Desvincular familiar | — | Fora do DS; no DS o mais próximo é Button variant="tertiary" com cor danger. Oculto no layout padrão. |
| 20 | Card de familiar _(fora do DS)_ | name: Márcia Costa; meta: Mãe | — | Fora do DS (classes area-family-*). |
| 21 | ↳ `Badge` | `<Badge tone="success">Ativo</Badge>` | — | — |
| 22 | ↳ Acordeão de seção _(fora do DS)_ | title: Contatos; description: E-mail e telefone; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 23 | ↳ Acordeão de seção _(fora do DS)_ | title: Dados pessoais; description: Nome, CPF e endereço; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 24 | ↳ Acordeão de seção _(fora do DS)_ | title: Validação de identidade; description: Documento e biometria facial; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 25 | ↳ Acordeão de seção _(fora do DS)_ | title: Benefício Meia-Entrada; description: Meia-entrada para estudantes; status: Validado | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 26 | ↳ ↳ `Badge` | `<Badge tone="success">Ativo</Badge>` | — | Oculto no layout padrão. |
| 27 | ↳ Ação destrutiva em texto _(fora do DS)_ | children: Desvincular familiar; abre: Modal Desvincular familiar | — | Fora do DS; no DS o mais próximo é Button variant="tertiary" com cor danger. Oculto no layout padrão. |
| 28 | `Button` | `<Button variant="secondary" fullWidth={false} iconEnd="add">Incluir novo familiar</Button>` | — | — |
| 29 | `Badge` | `<Badge tone="info">Pendente</Badge>` | — | Oculto no layout padrão. |
| 30 | `Button` | `<Button variant="primary" fullWidth={false}>Aceitar</Button>` | — | Oculto no layout padrão. |
| 31 | `Button` | `<Button variant="secondary" fullWidth={false}>Recusar</Button>` | — | Oculto no layout padrão. |
| 32 | Card de familiar _(fora do DS)_ | name: Carlos Silva; meta: Você como Cônjuge | — | Fora do DS (classes area-family-*). Oculto no layout padrão. |
| 33 | ↳ `Badge` | `<Badge tone="success">Ativo</Badge>` | — | Oculto no layout padrão. |
| 34 | ↳ Acordeão de seção _(fora do DS)_ | title: Contatos; description: E-mail e telefone; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 35 | ↳ Acordeão de seção _(fora do DS)_ | title: Dados pessoais; description: Nome, CPF e endereço; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 36 | ↳ Acordeão de seção _(fora do DS)_ | title: Validação de identidade; description: Documento e biometria facial; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 37 | ↳ Acordeão de seção _(fora do DS)_ | title: Benefício Meia-Entrada; description: Meia-entrada para estudantes; status: Validado | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 38 | ↳ ↳ `Badge` | `<Badge tone="success">Ativo</Badge>` | — | Oculto no layout padrão. |
| 39 | Card de familiar _(fora do DS)_ | name: Ana Paula Costa; meta: Você como Filha | — | Fora do DS (classes area-family-*). Oculto no layout padrão. |
| 40 | ↳ `Badge` | `<Badge tone="success">Ativo</Badge>` | — | Oculto no layout padrão. |
| 41 | ↳ Acordeão de seção _(fora do DS)_ | title: Contatos; description: E-mail e telefone; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 42 | ↳ Acordeão de seção _(fora do DS)_ | title: Dados pessoais; description: Nome, CPF e endereço; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 43 | ↳ Acordeão de seção _(fora do DS)_ | title: Validação de identidade; description: Documento e biometria facial; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 44 | ↳ Acordeão de seção _(fora do DS)_ | title: Benefício Meia-Entrada; description: Meia-entrada para estudantes; status: Validado | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 45 | ↳ ↳ `Badge` | `<Badge tone="success">Ativo</Badge>` | — | Oculto no layout padrão. |
| 46 | Card de familiar _(fora do DS)_ | name: Roberto Silva; meta: Você como Filha | — | Fora do DS (classes area-family-*). Oculto no layout padrão. |
| 47 | ↳ `Badge` | `<Badge tone="success">Ativo</Badge>` | — | Oculto no layout padrão. |
| 48 | ↳ Acordeão de seção _(fora do DS)_ | title: Contatos; description: E-mail e telefone; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 49 | ↳ Acordeão de seção _(fora do DS)_ | title: Dados pessoais; description: Nome, CPF e endereço; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 50 | ↳ Acordeão de seção _(fora do DS)_ | title: Validação de identidade; description: Documento e biometria facial; status: Concluído | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 51 | ↳ Acordeão de seção _(fora do DS)_ | title: Benefício Meia-Entrada; description: Meia-entrada para estudantes; status: Validado | fechado; aberto | Fora do DS (classes area-acc-*): candidato a componente Accordion. Oculto no layout padrão. |
| 52 | ↳ ↳ `Badge` | `<Badge tone="success">Ativo</Badge>` | — | Oculto no layout padrão. |
| 53 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| Modal Desvincular familiar _(fora do DS)_ | alertdialog com Button variant="danger" "Desvincular" e Button variant="secondary" "Cancelar" | Toque em Desvincular familiar. Fora do DS (desv-*): candidato a componente Dialog. |
| Folha de foto de perfil _(fora do DS)_ | Tirar foto · Escolher da galeria · Remover foto · Cancelar | Toque no avatar. Fora do DS (photo-sheet). |

Classes locais usadas na tela (fora do DS): `.area-acc*`, `.area-add*`, `.area-benefit*`, `.area-check*`, `.area-chev*`, `.area-contact*`, `.area-detalhe*`, `.area-doc*`, `.area-family*`, `.area-field*`, `.area-fields*`, `.area-help*`, `.area-link*`, `.area-name*`, `.area-notif*`, `.area-profile*`, `.area-row*`, `.area-section*`, `.area-tabs*`, `.area-top*`, `.area-user*`, `.tl-eyebrow*`.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Ajuda e atendimento | — | Sem fluxo ainda |
| Notificações, 1 não lida | — | Sem fluxo ainda |
| Abrir menu do perfil | — |  |
| PT | — |  |
| Modo escuro | — |  |
| Privacidade | — |  |
| Segurança | — |  |
| Senha | — |  |
| Sair | [ENT-01 · Login](../ENT-01-login/spec.md) |  |
| Meus cadastro | — | Sem fluxo ainda |
| Meus familiares | [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) |  |
| Fechar | — |  |
| Convites enviados 2 convites | — |  |
| Copiar link | — |  |
| Reenviar convite | — |  |
| Leandro Costa Filho Ativo | — |  |
| Contatos E-mail e telefone | — |  |
| Editar | — |  |
| Dados pessoais Nome, CPF e endereço | — |  |
| Validação de identidade Documento e biometria facial | — |  |
| Validação de Documentos | — |  |
| Validação Facial | — |  |
| Benefício Meia-Entrada Meia-entrada para estudantes | — |  |
| Desvincular familiar | — |  |
| Márcia Costa Mãe Ativo | — |  |
| Incluir novo familiar | — | Sem fluxo ainda |
| Convites recebidos 1 convite | — |  |
| Aceitar | — |  |
| Recusar | — |  |
| Carlos Silva Você como Cônjuge Ativo | — |  |
| Ana Paula Costa Você como Filha Ativo | — |  |
| Roberto Silva Você como Filha Ativo | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

- Primeiro convite, sem vínculos
- Com convites e familiares
- Convite expirado no topo
- Modal de recusa aberto
- Modal de cancelar convite aberto
- Modal de desvincular aberto

## 6. Comportamento

- Sem nenhuma atividade na seção, a área abre FAM-01 sem controles. Os controles aparecem na primeira atividade: cadastro de familiar, recebimento ou envio de convite.
- Duas abas: Meus familiares (convites enviados e familiares vinculados) e Sou familiar de (vínculos em que o usuário é o familiar). A aba Sou familiar de e a barra de seleção só aparecem com atividade: convite recebido ou vínculo aceito. Sem atividade nela, a tela mostra só Meus familiares.
- Cada seção pode ser recolhida. Cada familiar expande e mostra as etapas de validação.
- Convites expirados vêm primeiro e pedem ação. O card mostra só o prazo (Expira em 7 dias, Expirou há 3 dias).
- Reenviar abre a confirmação de contatos (FAM-11). Ao confirmar, o convite volta a pendente com novo prazo e o link anterior deixa de valer. Limite de 3 reenvios por convite: ao atingi-lo, o card some. Para enviar de novo, o titular busca o familiar e cadastra os contatos outra vez.
- Cancelar convite enviado (pendente ou expirado) tem botão dedicado no card. Pede confirmação em modal e tira o convite da lista depois de confirmar.
- Desvincular familiar tem botão dedicado no card de dados cadastrais do familiar e abre o modal de confirmação. Sem familiares restantes, abre FAM-01.
- Recusar um convite pede confirmação em modal de desvincular. Aceitar move o familiar para Sou familiar de.
- Convite recebido expirado some da lista, sem card de Expirado.
- Familiar com conta inativa ou bloqueada vira pendência no status do vínculo. Enquanto estiver assim, não usa os benefícios do vínculo. Titular e familiar veem o status no card.
- Familiar menor de idade: badge "Menor de idade" no card expansível, junto ao nome. A badge some quando ele completa 18 anos; o vínculo continua e o titular não precisa fazer nada.
- Familiar que encerrou a conta: o vínculo termina, o card some de Meus familiares e o titular recebe notificação em AREA-02.
- Limite de 10 familiares por titular. Ao atingi-lo, o botão Incluir novo familiar fica desabilitado e um aviso informa que o limite foi excedido.
- Reprovado, em cadastro e sem senha aparecem como status no card, para titular e familiar.
- Vínculo recíproco automático: o titular aparece na aba Sou familiar de do convidado.
- O titular recebe em AREA-02 notificações com o status dos convites que enviou (aceito, recusado, expirado).
- Notificação de convite recebido abre esta tela direto em Sou familiar de, com a seção expandida.
- Incluir novo familiar abre FAM-03.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-11 · Confirmação de contatos e convite](../FAM-11-confirmacao-de-contatos-e-convite/spec.md) | Enviar convite | Pelo menos um canal marcado (spec §5 e §7) | Caminho principal |
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Aba Meus familiares | Com familiares ou convites | Caminho alternativo |
| [AREA-02 · Notificações](../AREA-02-notificacoes/spec.md) | Notificação de convite recebido | — | Caminho alternativo |
| [FAM-03 · Adicionar familiar · introdução](../FAM-03-adicionar-familiar-introducao/spec.md) | Voltar | Sempre volta para a lista, mesmo vindo do estado vazio | Voltar |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-03 · Adicionar familiar · introdução](../FAM-03-adicionar-familiar-introducao/spec.md) | Incluir novo familiar | — | Caminho principal |
| [FAM-01 · Meus familiares · vazio](../FAM-01-meus-familiares-vazio/spec.md) | Desvincular o último familiar | — | Automática (timer) |
| [FAM-19 · Cancelar convite (modal)](../FAM-19-cancelar-convite/spec.md) | Cancelar convite | Convite enviado, pendente ou expirado | Caminho alternativo |
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Aba Meu cadastro | — | Caminho alternativo |

## 9. Dados

- Estados do convite: PENDENTE, EXPIRADO (volta a PENDENTE ao reenviar), ACEITO, RECUSADO, CANCELADO.
- Lista de familiares: nome, parentesco, CPF mascarado (`***.456.789-**`) e status.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Convite expirado mantém o vínculo em PENDENTE_CONVITE até reenvio ou cancelamento (P8). O cancelamento existe, com botão dedicado (decisão 8).
- Convite expirado, cancelado ou já usado: tela em FAM-18 (aprovada).
- No protótipo, a aba Meus familiares da área logada só abre FAM-01: a troca para esta lista quando há atividade não está desenhada.
- Cancelar convite: modal em FAM-19 (aprovado). Falta ligar no protótipo.
- Convidado com validação de identidade pendente pode aceitar o convite.
- Convites de vários titulares: a seção funciona como lista e o ponto conta todos (assumido; confirmar).

## 11. Critérios de aceite

- [ ] Aceitar move o familiar para Sou familiar de.
- [ ] Recusar só remove depois de confirmar no modal.
- [ ] Reenviar gera novo prazo.
- [ ] Cancelar tira o convite da lista.
- [ ] Após 3 reenvios, o card do convite some e não aparece mais o botão Reenviar.
- [ ] Convite recebido expirado some da lista.
- [ ] Sem atividade em Sou familiar de, a aba e a barra de seleção não aparecem.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
