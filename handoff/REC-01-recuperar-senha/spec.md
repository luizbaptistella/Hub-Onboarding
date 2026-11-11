# REC-01 · Recuperar senha

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão (2026-11-09).** Primeira tela da recuperação de senha: contato e data de nascimento. Desenhada no Figma; DS aplicado.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `REC-01` |
| Raia | Acesso e recuperação de senha |
| Figma | [`1741:42053`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1741-42053) (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma, com o DS aplicado |
| Marcação | 6 variantes em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/acesso/gen-REC-01.html` |

## Objetivo

Pedir o contato (celular ou e-mail) e a data de nascimento de quem esqueceu a senha, para enviar um código de verificação.

## Componentes

7 componentes do DS, 26 instâncias, mais 2 peças fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar", href: "file:///Users/baptistella/Projetos/Onboarding-Palmeiras/ellena-hub/handoff/ENT-01-login/telas/padrao/screen.html" }} title="Recuperar Senha" …` | — | — |
| `PageHeading` | 1 | `<PageHeading title="Recuperação" subtitle="Como você deseja recuperar sua senha?" tone="brand" />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Button` | 1 | `<Button variant="primary" onClick={() => {}}>Continuar</Button>` | — | — |
| `LegalFooter` | 1 | `<LegalFooter className="est-legal">© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |
| `Tabs` | 6 | `<Tabs label="Forma de recuperação" value="celular" items={[{ value: "celular", label: "Celular" }, { value: "email", label: "E-mail" }]} onChange={() => {}} />` | value | — |
| `TextField` | 12 | `<TextField label="Número do celular" preset="phone" name="celular" placeholder="(00) 00000-0000" autoComplete="tel" value="" onChange={() => {}} />` | autoComplete, error, label, name, placeholder, preset, value | — |
| `TextLink` | 4 | `<TextLink variant="standalone" href="file:///Users/baptistella/Projetos/Onboarding-Palmeiras/ellena-hub/handoff/REC-08-recuperacao-da-conta/telas/vazio/screen.html">Solicitar recuperaç…` | — | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Marca do Palmeiras | Escudo com a estrela sobre um círculo branco (assets logo-palmeiras.png e logo-palmeiras-bg-ellipse.svg do DS, grupo Logos). O DS não tem um componente de marca. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Celular · vazio | [`1741:42100`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1741-42100) | [telas/celular-vazio](telas/celular-vazio/screen.html) |
| 2 | Celular · preenchido | [`1741:42142`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1741-42142) | [telas/celular-preenchido](telas/celular-preenchido/screen.html) |
| 3 | Celular · campo vazio (sem Figma) | sem Figma | [telas/celular-erro](telas/celular-erro/screen.html) |
| 4 | E-mail · vazio | [`1741:42053`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1741-42053) | [telas/email-vazio](telas/email-vazio/screen.html) |
| 5 | E-mail · preenchido | [`1741:42184`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1741-42184) | [telas/email-preenchido](telas/email-preenchido/screen.html) |
| 6 | E-mail · campo vazio | [`1741:42342`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1741-42342) | [telas/email-erro](telas/email-erro/screen.html) |

## Comportamento

- Duas abas (`Tabs`): Celular e E-mail. Abre em Celular. Trocar de aba troca o primeiro campo (celular com máscara ou e-mail) e limpa os erros; a data de nascimento fica.
- Continuar valida ao enviar. Campo vazio mostra "Você precisa preencher todos os campos."; valor inválido mostra o erro do DS. O foco vai para o primeiro campo com erro.
- Dados válidos: aba Celular abre REC-02 (SMS); aba E-mail abre REC-04 (e-mail). O contato mascarado é guardado só na sessão (não vai na URL).
- O servidor não confirma se a conta existe: no protótipo qualquer contato válido segue para o código.
- Com erro na tela, o bloco "Não consegue acessar seu e-mail?" some, como no Figma.
- Voltar leva ao login. "Solicitar recuperação da conta" abre o pedido ao suporte (REC-08, proposta sem Figma).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`). Decisões (DEC-…) são avaliações da própria tela, sem tela própria.

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| ENT-01 | Login | Esqueceu sua senha? | Caminho alternativo | — |
| REC-08 | Recuperação da conta (pedido ao suporte) | Voltar | Voltar | — |
| REC-02 | Código por SMS (recuperação) | Editar celular ou Voltar | Caminho alternativo | — |
| REC-04 | Código por e-mail (recuperação) | Editar e-mail ou Voltar | Caminho alternativo | — |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| ENT-01 | Login | Voltar | Voltar | — |
| REC-02 | Código por SMS (recuperação) | Continuar | Caminho principal | Aba Celular; celular e data válidos |
| REC-04 | Código por e-mail (recuperação) | Continuar | Caminho principal | Aba E-mail; e-mail e data válidos |
| REC-08 | Recuperação da conta (pedido ao suporte) | Solicitar recuperação da conta | Caminho alternativo | Para quem perdeu o acesso ao e-mail e ao celular |

## Pendências

- O bloco "Não consegue acessar seu e-mail?" aparece também na aba Celular, com o texto do e-mail. No Figma é assim; o texto deveria falar de celular nessa aba.
- No Figma, o campo da aba Celular de "Data de nascimento" mostra o placeholder de CPF (`000.000.000-00`). Tratado como erro de cópia: aqui usa DD/MM/AAAA.
- **Solicitar recuperação da conta:** REC-08 e REC-09 são propostas sem Figma. Falta definir a comprovação de identidade (documento, selfie) e o canal de resposta.
- Não há limite de pedidos de código por pessoa nem mensagem de conta inexistente.
- A variante de erro da aba Celular não existe no Figma (o Figma repete a do e-mail).

## Critérios de aceite

- A aba Celular abre primeiro.
- Com campo vazio, mostra "Você precisa preencher todos os campos." e não navega.
- Com dados válidos, abre REC-02 (Celular) ou REC-04 (E-mail).
- O contato nunca aparece na URL.
