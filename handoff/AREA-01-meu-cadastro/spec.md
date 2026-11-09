# AREA-01 · Meu cadastro

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `AREA-01` |
| Raia | Área logada · Meu cadastro, notificações, ajuda e segurança |
| Figma | `2831:36859` (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma |
| Marcação | 13 variantes: completo, pendente, reprovado, em análise e as variações por acordeão da seção 5 (ver tabela) |
| Entradas / saídas | 8 / 7 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Mostrar a situação do cadastro do titular e dar acesso à conta.

## 2. Componentes

17 peças nesta tela: **6 instâncias de 5 componentes do DS** (`Badge`, `Checkbox`, `LegalFooter`, `ProfileMenu`, `Tabs`) e **11 peças fora do DS**.

Lista para máquina: [components.json](components.json). Docs de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`. Hover, pressionado e foco vêm prontos do DS; a coluna Estados lista só o que esta tela precisa mostrar.

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | Cabeçalho do perfil (avatar + nome + badge) _(fora do DS)_ | name: Roberto Silva; avatar: foto de perfil editável | — | Fora do DS (area-user, area-avatar). |
| 2 | ↳ `Badge` | `<Badge tone="success">Cadastro completo</Badge>` | — | — |
| 3 | Botão de ícone do topo _(fora do DS)_ | label: Ajuda e atendimento; navega para: ajuda-form | — | Fora do DS; equivalente: IconButton variant="subtle". Navega para `ajuda-form`. |
| 4 | Botão de ícone do topo _(fora do DS)_ | label: Notificações, 2 não lidas; navega para: notificacoes | — | Fora do DS; equivalente: IconButton variant="subtle". Navega para `notificacoes`. |
| 5 | `ProfileMenu` | `<ProfileMenu items={[{ id: "modo-escuro", label: "Modo escuro", icon: "dark_mode" }, { id: "privacidade", label: "Privacidade", icon: "lock" }, { id: "seguran-a", label: "Segurança", icon: "shield" }, { id: "senha", label: "Senha", icon: "password" }, { id: "sair", label: "Sair", icon: "logout", tone: "danger" }]} language divider />` | fechado; aberto; Modo escuro ligado ou desligado | — |
| 6 | `Tabs` | `<Tabs items={[{ value: "Meus cadastro", label: "Meus cadastro" }, { value: "Meus familiares", label: "Meus familiares" }]} value="Meus cadastro" />` | aba ativa: Meus cadastro | — |
| 7 | Acordeão de seção _(fora do DS)_ | title: Contatos; description: E-mail e telefone; status: Concluído | fechado; aberto; status por cenário: Concluído, Ação necessária, Reprovado, Em análise | Fora do DS (classes area-acc-*): candidato a componente Accordion. |
| 8 | ↳ Botão Editar (de ContactRow) _(fora do DS)_ | children: Editar | — | Mesmo visual do botão Editar do ContactRow, usado fora dele. Oculto no layout padrão. |
| 9 | ↳ Botão Editar (de ContactRow) _(fora do DS)_ | children: Editar | — | Mesmo visual do botão Editar do ContactRow, usado fora dele. Oculto no layout padrão. |
| 10 | Acordeão de seção _(fora do DS)_ | title: Dados pessoais; description: Nome, CPF e endereço; status: Concluído | fechado; aberto; status por cenário: Concluído, Ação necessária, Reprovado, Em análise | Fora do DS (classes area-acc-*): candidato a componente Accordion. |
| 11 | ↳ Botão Editar (de ContactRow) _(fora do DS)_ | children: Editar | — | Mesmo visual do botão Editar do ContactRow, usado fora dele. Oculto no layout padrão. |
| 12 | ↳ `Checkbox` | `<Checkbox disabled>Não possuo complemento</Checkbox>` | desmarcado; marcado; desativado (só leitura) | Oculto no layout padrão. |
| 13 | Acordeão de seção _(fora do DS)_ | title: Validação de identidade; description: Documento e biometria facial; status: Concluído | fechado; aberto; status por cenário: Concluído, Ação necessária, Reprovado, Em análise | Fora do DS (classes area-acc-*): candidato a componente Accordion. |
| 14 | Acordeão de seção _(fora do DS)_ | title: Benefício Meia-Entrada; description: Meia-entrada para estudantes; status: Validado | fechado; aberto; status por cenário: Concluído, Ação necessária, Reprovado, Em análise | Fora do DS (classes area-acc-*): candidato a componente Accordion. |
| 15 | ↳ `Badge` | `<Badge tone="success">Ativo</Badge>` | — | Oculto no layout padrão. |
| 16 | Grade de atalhos _(fora do DS)_ | items: ["Comprar ingresso", "Produtos do clube", "Sócio Avanti Palmeiras"] | — | Fora do DS (area-atalho-*). |
| 17 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

**Só em outras variantes desta tela:**

- _Pendente_: `Badge` `<Badge tone="warning">Cadastro pendente</Badge>`
- _Pendente_: `Acordeão de seção` title: Validação de identidade; description: Falta validar documento e foto; status: Ação necessária
- _Pendente_: `Button` `<Button variant="primary" fullWidth iconEnd="arrow_forward">Concluir validação</Button>`
- _Pendente_: `Acordeão de seção` title: Benefício Meia-Entrada; description: Liberado após validar sua identidade; status: Ação necessária
- _Reprovado_: `Badge` `<Badge tone="danger">Cadastro reprovado</Badge>`
- _Reprovado_: `Acordeão de seção` title: Validação de identidade; description: Não conseguimos aprovar sua foto; status: Reprovado
- _Reprovado_: `Button` `<Button variant="primary" fullWidth iconEnd="arrow_forward">Tentar novamente</Button>`
- _Em análise_: `Badge` `<Badge tone="info">Cadastro em análise</Badge>`
- _Em análise_: `Acordeão de seção` title: Validação de identidade; description: Documento e selfie em análise; status: Em análise

**Aparecem por condição** (não estão na marcação padrão):

| Componente | Como | Quando |
|---|---|---|
| Folha de foto de perfil _(fora do DS)_ | Tirar foto · Escolher da galeria · Remover foto · Cancelar | Toque no avatar. Fora do DS (photo-sheet). |
| Recorte da foto _(fora do DS)_ | prévia quadrada + zoom 1–3× + Salvar foto | Depois de escolher a imagem. Fora do DS (photo-edit). |

Classes locais usadas na tela (fora do DS): `.area-acc*`, `.area-atalho*`, `.area-atalhos*`, `.area-avatar*`, `.area-benefit*`, `.area-check*`, `.area-chev*`, `.area-contact*`, `.area-detalhe*`, `.area-doc*`, `.area-field*`, `.area-fields*`, `.area-help*`, `.area-name*`, `.area-notif*`, `.area-profile*`, `.area-promo*`, `.area-row*`, `.area-section*`, `.area-tabs*`, `.area-top*`, `.area-user*`, `.tl-eyebrow*`.

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
| Contatos E-mail e telefone | — |  |
| Editar | — |  |
| Dados pessoais Nome, CPF e endereço | — |  |
| Validação de identidade Documento e biometria facial | — |  |
| Validação de Documentos | — |  |
| Validação Facial | — |  |
| Benefício Meia-Entrada Meia-entrada para estudantes | — |  |
| Comprar ingresso | — |  |
| Produtos do clube | — |  |
| Sócio Avanti Palmeiras | — |  |

As ações sem destino que dependem de script (envio de formulário, timers) estão em **Saídas**.

## 5. Estados

Cenário do titular (um por variante; os demais acordeões seguem o cenário completo):

| Cenário | Cabeçalho | Acordeão alterado | Marcação |
|---|---|---|---|
| Completo | Cadastro completo | — | [screen.html](screen.html) |
| Pendente | Cadastro pendente | Identidade: Ação necessária | [screen--pendente.html](screen--pendente.html) |
| Reprovado | Cadastro reprovado | Identidade: Reprovado | [screen--reprovado.html](screen--reprovado.html) |
| Em análise | Cadastro em análise | Identidade: Em análise | [screen--em-analise.html](screen--em-analise.html) |
| Contatos · ação necessária | Cadastro pendente | Contatos: Ação necessária (confirmar celular → CAD-03) | [screen--contatos-pendente.html](screen--contatos-pendente.html) |
| Contatos · em análise | Cadastro em análise | Contatos: Em análise (novo e-mail verificado) | [screen--contatos-analise.html](screen--contatos-analise.html) |
| Dados · ação necessária | Cadastro pendente | Dados pessoais: Ação necessária (endereço → CAD-07) | [screen--dados-pendente.html](screen--dados-pendente.html) |
| Dados · reprovado | Cadastro reprovado | Dados pessoais: Reprovado (dados não conferem → CAD-01) | [screen--dados-reprovado.html](screen--dados-reprovado.html) |
| Dados · em análise | Cadastro em análise | Dados pessoais: Em análise | [screen--dados-analise.html](screen--dados-analise.html) |
| Identidade · bloqueada | Cadastro reprovado | Identidade: Bloqueado (limite de tentativas; → AJD-01) | [screen--identidade-bloqueada.html](screen--identidade-bloqueada.html) |
| Benefício · reprovado | Cadastro completo | Benefício: Reprovado (→ DOC-01) | [screen--beneficio-reprovado.html](screen--beneficio-reprovado.html) |
| Benefício · em análise | Cadastro completo | Benefício: Em análise | [screen--beneficio-analise.html](screen--beneficio-analise.html) |
| Benefício · aguardando | Cadastro completo | Benefício: Aguardando (liberação em breve, sem eyebrow) | [screen--beneficio-aguardando.html](screen--beneficio-aguardando.html) |

Estados por acordeão: Concluído, Validado, Ação necessária, Reprovado, Em análise, Bloqueado e Aguardando. Os dados dos cenários estão em `CENARIOS`, `DESCRICAO`, `DETALHE` e `CABECALHO` em [area.js](../../area.js); o seletor de cenários fica no menu de telas da implementação atual.

## 6. Comportamento

- Cabeçalho da área logada (compartilhado por AREA-01, FAM-01 e FAM-17): avatar com folha de foto de perfil, nome, badge de situação do cadastro, Ajuda (→ AJD-01), Notificações com ponto de não lidas (→ AREA-02) e menu do perfil (Idioma, Modo escuro, Privacidade, Segurança → AREA-03, Senha, Sair → ENT-01).
- Abas: Meu cadastro (esta tela) e Meus familiares (→ FAM-01).
- Acordeões: Contatos, Dados pessoais, Validação de identidade e Benefício Meia-Entrada. Os cards começam fechados.
- Cenários do titular: completo, pendente (CTA "Concluir validação" → DOC-01), reprovado (CTA "Tentar novamente" → DOC-01, com o motivo), em análise (só informa) e as variações por acordeão da tabela da seção 5. Cada variação altera um acordeão; os demais seguem o cenário completo.
- O badge do cabeçalho segue o pior status do cadastro: Cadastro reprovado (identidade bloqueada ou dados reprovados), pendente (ação necessária em contatos, dados ou identidade), em análise, ou completo quando só o benefício está pendente, em análise, reprovado ou aguardando.
- Acordeão "Bloqueado" (identidade) mostra o motivo e leva ao atendimento (→ AJD-01, "Falar com o atendimento"), não a DOC-01. Acordeão "Aguardando" (benefício) não tem eyebrow; o badge fica no topo do corpo.
- Foto de perfil: Tirar foto, Escolher da galeria ou Remover; recorte quadrado com zoom; salva em 256 px JPEG e aplica em todos os avatares.
- Atalhos: Comprar ingresso, Produtos do clube e Sócio Avanti, ainda sem destino.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [ENT-01 · Login](../ENT-01-login/spec.md) | Entrar | CPF válido e senha preenchida | Caminho principal |
| [BIO-07 · Status · identidade enviada](../BIO-07-status-identidade-enviada/spec.md) | 10 s ou Continuar agora | Provisório até existir a validação de benefícios | Automática (timer) |
| [AREA-02 · Notificações](../AREA-02-notificacoes/spec.md) | Voltar | — | Voltar |
| [AJD-01 · Ajuda · abrir chamado](../AJD-01-ajuda-abrir-chamado/spec.md) | Voltar ou Alterar contato | — | Voltar |
| [AJD-02 · Ajuda · chamado aberto](../AJD-02-ajuda-chamado-aberto/spec.md) | Voltar para a área logada ou Fechar | — | Caminho principal |
| [AREA-03 · Segurança](../AREA-03-seguranca/spec.md) | Voltar | — | Voltar |
| [FAM-01 · Meus familiares · vazio](../FAM-01-meus-familiares-vazio/spec.md) | Aba Meu cadastro | — | Caminho alternativo |
| [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) | Aba Meu cadastro | — | Caminho alternativo |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [AREA-02 · Notificações](../AREA-02-notificacoes/spec.md) | Sino de notificações | — | Caminho alternativo |
| [AJD-01 · Ajuda · abrir chamado](../AJD-01-ajuda-abrir-chamado/spec.md) | Ajuda e atendimento | — | Caminho alternativo |
| [AREA-03 · Segurança](../AREA-03-seguranca/spec.md) | Menu › Segurança | — | Caminho alternativo |
| [ENT-01 · Login](../ENT-01-login/spec.md) | Menu › Sair | — | Sair do fluxo |
| [FAM-01 · Meus familiares · vazio](../FAM-01-meus-familiares-vazio/spec.md) | Aba Meus familiares | Sem familiares nem convites | Caminho alternativo |
| [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) | Aba Meus familiares | Com familiares ou convites | Caminho alternativo |
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | Concluir validação ou Tentar novamente | Cenário pendente ou reprovado | Caminho alternativo |

## 9. Dados

- Nome, CPF, e-mail, telefone e endereço do titular.
- Cenário de validação do titular.
- Foto de perfil (na implementação atual, salva no navegador).

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Destinos dos atalhos.
- Privacidade e Senha no menu não têm fluxo.
- O banner Avanti está oculto nesta fase.

## 11. Critérios de aceite

- [ ] Cada cenário mostra o badge e o CTA certos.
- [ ] No cenário pendente, Concluir validação abre DOC-01.
- [ ] Cada variação por acordeão (seção 5) mostra o eyebrow, o status e o CTA da tabela.
- [ ] Os CTAs de Contatos, Dados e Identidade bloqueada levam ao destino indicado na tabela.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
