# Inventário de componentes · Palmeiras · Onboarding

Quais componentes do DS cada tela usa, com as variantes e os estados. Serve para planejar a implementação: o que construir primeiro e o que reaproveitar.

DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU (Palmeiras · Onboarding), docs em `project/components/<Nome>/README.md`.

## Componentes do DS usados no fluxo

| Componente | Instâncias | Telas | Variantes e props usadas | Estados exigidos no fluxo |
|---|---|---|---|---|
| `Button` | 35 | ENT-01, CAD-01, CAD-03, CAD-05, CAD-06, CAD-07, BIO-01, BIO-04, BIO-05, BIO-06, AREA-01, AJD-01, AJD-02, AREA-04, FAM-01, FAM-03, FAM-09, FAM-10, FAM-11, FAM-12, FAM-13, FAM-16, FAM-17 | variant=primary ×20; variant=secondary ×6; variant=secondary, fullWidth=false ×6; variant=accent ×1; variant=danger ×1; variant=primary, fullWidth=false ×1 | "Número copiado" ou "Copie manualmente", carregando, desativado por 3 s, liberado, padrão |
| `AppHeader` | 28 | ENT-01, CAD-01, CAD-02, CAD-03, CAD-04, CAD-05, CAD-06, CAD-07, DOC-01, BIO-01, BIO-02, BIO-03, BIO-04, BIO-05, BIO-06, AREA-02, AJD-01, AJD-02, AREA-03, AREA-04, FAM-03, FAM-09, FAM-10, FAM-11, FAM-12, FAM-13, FAM-14, FAM-16 | padrão ×28 | — |
| `LegalFooter` | 25 | ENT-01, CAD-01, CAD-02, CAD-03, CAD-04, CAD-05, CAD-06, CAD-07, DOC-01, AREA-01, AREA-02, AJD-01, AJD-02, AREA-03, AREA-04, FAM-01, FAM-03, FAM-09, FAM-10, FAM-11, FAM-12, FAM-13, FAM-14, FAM-16, FAM-17 | padrão ×25 | — |
| `TextField` | 22 | ENT-01, CAD-01, CAD-03, CAD-05, CAD-07, AJD-01, AREA-04, FAM-09, FAM-12, FAM-16 | padrão ×9; preset=email ×4; preset=phone ×3; preset=cpf ×2; preset=password ×2; preset=date ×1; preset=cep ×1 | erro, padrão, preenchido, senha visível ou oculta |
| `PageHeading` | 20 | ENT-01, CAD-01, CAD-02, CAD-03, CAD-04, CAD-05, CAD-07, DOC-01, BIO-04, AJD-01, AJD-02, AREA-04, FAM-03, FAM-09, FAM-10, FAM-11, FAM-12, FAM-13, FAM-14, FAM-16 | tone=neutral ×18; tone=brand ×2 | — |
| `Badge` | 20 | AREA-01, FAM-01, FAM-17 | tone=success ×14; tone=info ×3; tone=warning ×2; tone=danger ×1 | — |
| `ListItem` | 14 | AREA-02, AREA-03, AREA-04 | padrão ×13; tone=danger ×1 | Conectado, Não conectado |
| `Alert` | 12 | ENT-01, CAD-02, CAD-04, CAD-06, BIO-05, BIO-06, FAM-03 | por condição ×7; tone=info ×2; tone=danger ×2; tone=success ×1 | oculto, visível |
| `FormMessage` | 7 | ENT-01, CAD-01, CAD-03, CAD-05, CAD-07, AJD-01, AREA-04 | por condição ×7 | — |
| `List` | 6 | AREA-02, AREA-03, AREA-04 | padrão ×6 | — |
| `Checkbox` | 5 | CAD-01, CAD-07, AREA-01, FAM-13 | padrão ×5 | desativado, desmarcado, erro, marcado |
| `Select` | 5 | CAD-07, AJD-01, FAM-10, FAM-12 | padrão ×5 | aberto, desativado até escolher o estado, erro, padrão, preenchido |
| `Tabs` | 4 | CAD-01, AREA-01, FAM-01, FAM-17 | padrão ×4 | aba ativa: Brasileiro, aba ativa: Meus cadastro, aba ativa: Meus familiares |
| `DocumentOption` | 4 | DOC-01 | padrão ×4 | escolhido e aberto, não escolhido |
| `SocialButton` | 3 | ENT-01 | layout=icon ×3 | — |
| `ProfileMenu` | 3 | AREA-01, FAM-01, FAM-17 | padrão ×3 | Modo escuro ligado ou desligado, aberto, fechado |
| `TextLink` | 2 | ENT-01, CAD-01 | variant=standalone ×1; variant=inline ×1 | — |
| `ContactRow` | 2 | CAD-02, CAD-04 | channel=sms ×1; channel=email ×1 | — |
| `OTPInput` | 2 | CAD-02, CAD-04 | padrão ×2 | bloqueado, erro, padrão, sucesso |
| `ResendPrompt` | 2 | CAD-02, CAD-04 | padrão ×2 | desativado, em espera, padrão |
| `Toast` | 2 | CAD-04, FAM-17 | tone=success ×2 | oculto, visível por 4 s depois de trocar o e-mail |
| `StatusScreen` | 2 | CAD-08, BIO-07 | tone=success ×2 | — |
| `JourneyStepper` | 2 | CAD-08, BIO-07 | padrão ×2 | — |
| `RedirectCountdown` | 2 | CAD-08, BIO-07 | padrão ×2 | contando 10 → 0, pausado com a aba oculta |
| `ActionRow` | 2 | DOC-01 | padrão ×2 | — |
| `OrientationHint` | 2 | BIO-02, BIO-03 | por condição ×2 | — |
| `OptionCard` | 2 | FAM-14 | layout=stacked ×2 | — |
| `DividerText` | 1 | ENT-01 | padrão ×1 | — |
| `ResultHero` | 1 | CAD-06 | tone=success ×1 | — |
| `Tutorial` | 1 | BIO-01 | padrão ×1 | passo 1, passo 2, passo 3 |
| `FaceCapture` | 1 | BIO-02 | padrão ×1 | `countdown` 3-2-1, `frame`, `idle`, `progress` esquerda/direita, `success`, `warning`, pausado com o celular na horizontal |
| `LoadingState` | 1 | BIO-03 | padrão ×1 | — |
| `Image` | 1 | BIO-04 | padrão ×1 | — |

## Componentes do DS que o fluxo não usa

`CameraCapture`, `CarouselDots`, `CheckboxGroup`, `ErrorSummary`, `IconButton`, `LanguageSelector`, `ProgressBar`, `Radio`, `RadioGroup`, `ScanFrame`, `SegmentedControl`, `StatusCard`, `StepNumber`, `ToastRegion`, `TutorialSlide`, `UploadArea`.

Alguns têm uso previsto nas lacunas: `UploadArea`, `CameraCapture` e `ScanFrame` na captura do documento (DOC-G1); `ErrorSummary` nos formulários longos; `SegmentedControl` como alternativa às abas Brasileiro/Estrangeiro.

## Peças fora do DS

Feitas com classes locais no protótipo. As que se repetem são candidatas a virar componente.

| Peça | Telas | Equivalente ou sugestão |
|---|---|---|
| Cabeçalho do perfil (avatar + nome + badge) | AREA-01, FAM-01, FAM-17 | Fora do DS (area-user, area-avatar). |
| Botão de ícone do topo | AREA-01, FAM-01, FAM-17 | Fora do DS; equivalente: IconButton variant="subtle". |
| Folha de foto de perfil | AREA-01, FAM-01, FAM-17 | Toque no avatar. Fora do DS (photo-sheet). |
| Acordeão de seção | AREA-01, FAM-17 | Fora do DS (classes area-acc-*): candidato a componente Accordion. |
| Logo Palmeiras | ENT-01 | Asset do DS (grupo Logos). |
| Painel de atendimento | BIO-06 | Fora do DS (lv-support-*). |
| Botão Editar (de ContactRow) | AREA-01 | Mesmo visual do botão Editar do ContactRow, usado fora dele. |
| Grade de atalhos | AREA-01 | Fora do DS (area-atalho-*). |
| Recorte da foto | AREA-01 | Depois de escolher a imagem. Fora do DS (photo-edit). |
| Anexar arquivos | AJD-01 | Fora do DS; equivalente: UploadArea. |
| Texto de apoio do campo | AJD-01 | Enquanto a descrição tem menos de 20 caracteres. |
| Bloco de protocolo | AJD-02 | Fora do DS (ajd-proto-*). |
| Estado vazio | FAM-01 | Fora do DS (area-empty-*): candidato a componente EmptyState. |
| Lista de parentescos | FAM-03 | Fora do DS; equivalente: List com ListItem. |
| Card de familiar | FAM-17 | Fora do DS (classes area-family-*). |
| Ação destrutiva em texto | FAM-17 | Fora do DS; no DS o mais próximo é Button variant="tertiary" com cor danger. |
| Modal Desvincular familiar | FAM-17 | Toque em Desvincular familiar. Fora do DS (desv-*): candidato a componente Dialog. |

## Matriz componente × tela

Número de instâncias de cada componente do DS por tela (inclui as variantes e o que aparece por condição).

| Tela | `Button` | `AppHeader` | `LegalFooter` | `TextField` | `PageHeading` | `Badge` | `ListItem` | `Alert` | `FormMessage` | `List` | `Checkbox` | `Select` | `Tabs` | `DocumentOption` | `SocialButton` | `ProfileMenu` | `TextLink` | `ContactRow` | `OTPInput` | `ResendPrompt` | `Toast` | `StatusScreen` | `JourneyStepper` | `RedirectCountdown` | `ActionRow` | `OrientationHint` | `OptionCard` | `DividerText` | `ResultHero` | `Tutorial` | `FaceCapture` | `LoadingState` | `Image` |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-01 · Login | 2 | 1 | 1 | 2 | 1 |  |  | 2 | 1 |  |  |  |  |  | 3 |  | 1 |  |  |  |  |  |  |  |  |  |  | 1 |  |  |  |  |  |
| CAD-01 · Cadastro · Dados pessoais | 1 | 1 | 1 | 4 | 1 |  |  |  | 1 |  | 2 |  | 1 |  |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| CAD-02 · Código por SMS |  | 1 | 1 |  | 1 |  |  | 3 |  |  |  |  |  |  |  |  |  | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| CAD-03 · Editar celular | 1 | 1 | 1 | 2 | 1 |  |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| CAD-04 · Código por e-mail |  | 1 | 1 |  | 1 |  |  | 3 |  |  |  |  |  |  |  |  |  | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |
| CAD-05 · Editar e-mail | 1 | 1 | 1 | 2 | 1 |  |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| CAD-06 · E-mail verificado | 1 | 1 | 1 |  |  |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 1 |  |  |  |  |
| CAD-07 · Endereço | 1 | 1 | 1 | 4 | 1 |  |  |  | 1 |  | 1 | 2 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| CAD-08 · Status · dados recebidos |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |
| DOC-01 · Seleção de documento |  | 1 | 1 |  | 1 |  |  |  |  |  |  |  |  | 4 |  |  |  |  |  |  |  |  |  |  | 2 |  |  |  |  |  |  |  |  |
| BIO-01 · Tutorial da captura | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 1 |  |  |  |
| BIO-02 · Captura facial |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 1 |  |  |  |  | 1 |  |  |
| BIO-03 · Validando a foto |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 1 |  |  |  |  |  | 1 |  |
| BIO-04 · Conferência da foto | 2 | 1 |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 1 |
| BIO-07 · Status · identidade enviada |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |
| BIO-05 · Bloqueio · 3 tentativas | 1 | 1 |  |  |  |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| BIO-06 · Erro com suporte | 2 | 1 |  |  |  |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| AREA-01 · Meu cadastro | 2 |  | 1 |  |  | 5 |  |  |  |  | 1 |  | 1 |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| AREA-02 · Notificações |  | 1 | 1 |  |  |  | 4 |  |  | 2 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| AJD-01 · Ajuda · abrir chamado | 1 | 1 | 1 | 1 | 1 |  |  |  | 1 |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| AJD-02 · Ajuda · chamado aberto | 2 | 1 | 1 |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| AREA-03 · Segurança |  | 1 | 1 |  |  |  | 6 |  |  | 3 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| AREA-04 · Encerrar conta | 2 | 1 | 1 | 1 | 1 |  | 4 |  | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| FAM-01 · Meus familiares · vazio | 1 |  | 1 |  |  | 1 |  |  |  |  |  |  | 1 |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| FAM-03 · Adicionar familiar · introdução | 1 | 1 | 1 |  | 1 |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| FAM-09 · Buscar familiar | 1 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| FAM-10 · Card e tipo de vínculo | 1 | 1 | 1 |  | 1 |  |  |  |  |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| FAM-11 · Confirmação de contatos e convite | 2 | 1 | 1 |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| FAM-12 · Cadastro do familiar (sem conta) | 1 | 1 | 1 | 4 | 1 |  |  |  |  |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| FAM-13 · Termo de responsabilidade · menor | 1 | 1 | 1 |  | 1 |  |  |  |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| FAM-14 · Decisão do titular · maior de idade |  | 1 | 1 |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | 2 |  |  |  |  |  |  |
| FAM-16 · Convite · entrada pelo link (sem conta) | 2 | 1 | 1 | 1 | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| FAM-17 · Área do convidado · Meus familiares e Sou familiar de | 5 |  | 1 |  |  | 14 |  |  |  |  |  |  | 1 |  |  | 1 |  |  |  |  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |
