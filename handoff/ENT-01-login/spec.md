# ENT-01 · Login

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão (2026-11-09).** Login com CPF ou e-mail e senha. Inclui os estados de erro nos campos, credenciais inválidas e conta encerrada. Desenhada no Figma; DS aplicado.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `ENT-01` |
| Raia | Acesso e recuperação de senha |
| Figma | [`1620:26870`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-26870) (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma, com o DS aplicado |
| Marcação | 6 variantes em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/acesso/gen-ENT-01.html` |

## Objetivo

Entrar com CPF ou e-mail e senha, recuperar a senha ou começar um cadastro novo.

## Componentes

9 componentes do DS, 44 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={false} title="Login" language={{ defaultValue: "pt-BR" }} help={false} />` | — | — |
| `PageHeading` | 1 | `<PageHeading title="Faça seu login" subtitle="Faça seu login para começar ou cadastre-se." tone="brand" />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `TextLink` | 1 | `<TextLink variant="standalone" href="file:///Users/baptistella/Projetos/Onboarding-Palmeiras/ellena-hub/handoff/REC-01-recuperar-senha/telas/celular-vazio/screen.html">Esqueceu sua sen…` | — | — |
| `Button` | 2 | `<Button variant="primary" type="submit">Entrar</Button>` | children, type, variant | — |
| `LegalFooter` | 1 | `<LegalFooter className="est-legal">© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |
| `TextField` | 12 | `<TextField label="Número do seu CPF ou E-Mail" name="identificador" placeholder="000.000.000-00" autoComplete="username" inputMode="text" value="" onChange={() => {}} />` | autoComplete, className, error, inputMode, label, name, placeholder, preset, value | — |
| `DividerText` | 6 | `<DividerText>ou entrar com:</DividerText>` | — | — |
| `SocialButton` | 18 | `<SocialButton provider="google" layout="icon" intent="signin" type="button" loading={false} onClick={() => {}} />` | loading, provider | — |
| `Alert` | 2 | `<Alert tone="danger" title="Credenciais inválidas">Confira seu CPF, e-mail ou senha e tente novamente.</Alert>` | children, title, tone | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Marca do Palmeiras | Escudo com a estrela sobre um círculo branco (assets logo-palmeiras.png e logo-palmeiras-bg-ellipse.svg do DS, grupo Logos). O DS não tem um componente de marca. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão | [`1620:26870`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-26870) | [telas/padrao](telas/padrao/screen.html) |
| 2 | Preenchido | [`1620:26928`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1620-26928) | [telas/preenchido](telas/preenchido/screen.html) |
| 3 | Erro nos campos (sem Figma) | sem Figma | [telas/erro-campos](telas/erro-campos/screen.html) |
| 4 | Credenciais inválidas | [`1845:54220`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1845-54220) | [telas/credenciais-invalidas](telas/credenciais-invalidas/screen.html) |
| 5 | Conta encerrada (sem Figma) | sem Figma | [telas/conta-encerrada](telas/conta-encerrada/screen.html) |
| 6 | Abrindo o login do Google (sem Figma) | sem Figma | [telas/social-abrindo](telas/social-abrindo/screen.html) |

## Comportamento

- O campo de acesso detecta o tipo: enquanto houver só dígitos e pontuação de CPF, aplica a máscara 000.000.000-00 e valida os dígitos verificadores; com "@" ou letras, vira e-mail, sem máscara, validado pelo formato.
- Entrar fica sempre ativo e valida ao enviar (regra do DS). O foco vai para o primeiro campo com erro e nada é enviado. Erros: CPF ou e-mail inválido (texto do DS) e "Informe sua senha.".
- Campos válidos: abre o carregamento (ENT-02). Se o servidor rejeitar, o login volta com o aviso "Credenciais inválidas" no topo, os dois campos em vermelho e o texto do erro só no aviso (o texto do campo fica oculto na tela e disponível ao leitor de tela). No protótipo, a senha `errada` simula a rejeição.
- Conta encerrada: quando se chega de AREA-04, aparece o aviso informativo "Sua conta foi encerrada." (`?encerrada=1`). Ele some ao digitar.
- Esqueceu sua senha? abre REC-01. Criar cadastro abre CAD-01.
- Google, Apple e Microsoft: o botão mostra o carregamento ("Abrindo…") e abre o login do provedor, que é uma tela externa, fora do hub (DEC-08). Volta com um de três resultados: entra (ENT-02), conta sem cadastro (ENT-03) ou erro do provedor (ENT-04). No protótipo: Google entra, Apple não tem cadastro, Microsoft falha.
- O seletor de idioma do cabeçalho (PT-BR, ES, EN) vem do DS; a troca de textos entre idiomas não está definida para esta tela.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`). Decisões (DEC-…) são avaliações da própria tela, sem tela própria.

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| CAD-01 | Cadastro · Dados pessoais | Voltar | Voltar | — |
| BIO-05 | Bloqueio · 3 tentativas | Sair e continuar depois | Sair do fluxo | — |
| BIO-06 | Erro com suporte | Sair e continuar depois | Sair do fluxo | — |
| AREA-01 | Meu cadastro | Menu › Sair | Sair do fluxo | — |
| FAM-16 | Convite · entrada pelo link (sem conta) | Já tenho conta | Caminho alternativo | — |
| AREA-04 | Encerrar conta | Encerrar conta | Caminho principal | Senha preenchida; o login mostra o aviso de conta encerrada |
| DOC-15 | Sessão expirada no documento | Entrar | Sair do fluxo | Volta para esta etapa depois do login |
| DOC-25 | Bloqueio por tentativas no documento | Sair e continuar depois | Sair do fluxo | Dados e documentos enviados ficam salvos |
| FAM-18 | Convite indisponível (expirado, cancelado ou já usado) | Entrar na minha conta | Caminho principal | — |
| ENT-00 | Splash | Cerca de 2 s | Automática (timer) | Ao abrir o app |
| DEC-04 | Preencheu corretamente? | Não · erro no campo | Erro ou nova tentativa | CPF ou e-mail malformado, ou senha vazia |
| DEC-05 | Credenciais aceitas? | Não · credenciais inválidas | Erro ou nova tentativa | Aviso no topo e campos em vermelho |
| ENT-03 | Login social · conta sem cadastro | Entrar com CPF ou e-mail, ou Voltar | Caminho alternativo | — |
| ENT-04 | Login social · erro do provedor | Tentar novamente ou Voltar | Erro ou nova tentativa | — |
| REC-01 | Recuperar senha | Voltar | Voltar | — |
| REC-09 | Solicitação enviada | Voltar ao login | Caminho principal | — |
| REC-02 | Código por SMS (recuperação) | Voltar ao login | Sair do fluxo | Só no bloqueio por tentativas |
| REC-04 | Código por e-mail (recuperação) | Voltar ao login | Sair do fluxo | Só no bloqueio por tentativas |
| REC-06 | Nova senha | Voltar | Voltar | O código já foi usado: não volta a REC-04 |
| REC-07 | Senha alterada com sucesso | Ir para o login | Caminho principal | Sem login automático |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DEC-04 | Preencheu corretamente? | Entrar | Caminho principal | — |
| CAD-01 | Cadastro · Dados pessoais | Criar cadastro | Caminho principal | — |
| REC-01 | Recuperar senha | Esqueceu sua senha? | Caminho alternativo | — |
| DEC-08 | Login social concluído? | Entrar com Google, Apple ou Microsoft | Caminho alternativo | Abre o login do provedor (tela externa) |

## Pendências

- **Login social:** as telas ENT-03 e ENT-04 são propostas sem Figma. A tela de consentimento do provedor é externa e não está desenhada aqui. Falta definir se a conta social vincula a um cadastro existente pelo e-mail.
- **Conta não encontrada, bloqueio por tentativas e senha expirada:** o Figma só desenha "Credenciais inválidas". Definir se há limite de tentativas e o que acontece depois dele.
- Os textos de erro de CPF e e-mail são os do DS (provisórios, ver DESIGN-SYSTEM.md).
- O Figma usa o título "Login" pequeno no cabeçalho, sem seta de voltar; o DS aplica `AppHeader` com `back={false}`.
- O botão do Google, Apple e Microsoft usa o layout só com ícone (`layout="icon"`), marcado como depreciado no DS. O padrão do DS é largura total com texto.

## Critérios de aceite

- Com CPF ou e-mail inválido, ou senha vazia, mostra o erro no campo e não navega.
- Com campos válidos, abre ENT-02; com senha `errada`, volta com "Credenciais inválidas".
- Esqueceu sua senha? abre REC-01; Criar cadastro abre CAD-01.
- O aviso de credenciais inválidas e o de conta encerrada nunca aparecem juntos.
