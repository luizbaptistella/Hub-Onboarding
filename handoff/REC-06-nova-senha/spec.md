# REC-06 · Nova senha

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Em revisão (2026-11-09).** Criação da nova senha, com medidor de força e requisitos. Desenhada no Figma; DS aplicado.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `REC-06` |
| Raia | Acesso e recuperação de senha |
| Figma | [`1741:41956`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1741-41956) (arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma, com o DS aplicado |
| Marcação | 4 variantes em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/acesso/gen-REC-06.html` |

## Objetivo

Criar a nova senha depois do código validado, com os requisitos visíveis e a confirmação.

## Componentes

5 componentes do DS, 12 instâncias, mais 4 peças fora do DS. Todos são renderizados pelo bundle real do DS (`ellena-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={{ label: "Voltar", href: "file:///Users/baptistella/Projetos/Onboarding-Palmeiras/ellena-hub/handoff/ENT-01-login/telas/padrao/screen.html" }} title="Nova Senha" langu…` | — | — |
| `PageHeading` | 1 | `<PageHeading title="Crie sua nova senha" subtitle="Sua nova senha deve ter pelo menos 8 caracteres." tone="neutral" />` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Button` | 1 | `<Button variant="primary" onClick={() => {}}>Salvar senha</Button>` | — | — |
| `LegalFooter` | 1 | `<LegalFooter className="est-legal">© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |
| `TextField` | 8 | `<TextField label="Nova senha" preset="password" name="nova-senha" autoComplete="new-password" value="" onChange={() => {}} />` | error, label, name, value | — |

Peças fora do DS (só implementadas ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |
| Marca do Palmeiras | Escudo com a estrela sobre um círculo branco (assets logo-palmeiras.png e logo-palmeiras-bg-ellipse.svg do DS, grupo Logos). O DS não tem um componente de marca. |
| Medidor de força da senha | Rótulo "Força da senha:", nível (Fraca, Média, Boa, Forte) e quatro traços. O Figma só mostra Fraca e Forte; Média e Boa são proposta. Proposta para o DS. |
| Lista de requisitos da senha | Quatro requisitos com ícone de cumprido ou pendente e texto para leitor de tela. Proposta para o DS (List com estado). |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Vazia (sem Figma) | sem Figma | [telas/vazia](telas/vazia/screen.html) |
| 2 | Senha fraca | [`1741:42276`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1741-42276) | [telas/fraca](telas/fraca/screen.html) |
| 3 | Senha forte | [`1741:41956`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=1741-41956) | [telas/forte](telas/forte/screen.html) |
| 4 | Senhas diferentes (sem Figma) | sem Figma | [telas/erro-confirmacao](telas/erro-confirmacao/screen.html) |

## Comportamento

- Dois campos (`TextField` preset password, com mostrar e ocultar). Medidor de força e lista de requisitos atualizam enquanto a pessoa digita.
- Requisitos: mínimo de 8 caracteres, 1 ou mais números, 1 letra maiúscula, 1 ou mais caracteres especiais. Força: Fraca (0 a 1 requisito), Média (2), Boa (3), Forte (4).
- Salvar senha fica sempre ativo e valida ao enviar: se faltar requisito, erro no campo "A senha precisa cumprir todos os requisitos abaixo."; se as senhas diferirem, erro na confirmação.
- Tudo certo: abre a tela de sucesso (REC-07). Voltar leva ao login (o código já foi usado).

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`). Decisões (DEC-…) são avaliações da própria tela, sem tela própria.

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DEC-06 | Código SMS correto? | Sim | Caminho principal | Código correto e dentro da validade |
| DEC-07 | Código e-mail correto? | Sim | Caminho principal | Código correto e dentro da validade |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| REC-07 | Senha alterada com sucesso | Salvar senha | Caminho principal | Os 4 requisitos cumpridos e senhas iguais |
| ENT-01 | Login | Voltar | Voltar | O código já foi usado: não volta a REC-04 |

## Pendências

- O Figma só mostra os níveis Fraca e Forte; Média e Boa são proposta.
- A força é só pela contagem de requisitos: senhas comuns ("Senha@123") contam como fortes. Definir lista de senhas proibidas e se a nova senha pode ser igual à anterior.
- Medidor e lista de requisitos são peças fora do DS (proposta).
- O Figma deixa o botão Salvar senha ativo mesmo com a senha fraca; mantido, com erro ao enviar.
- Expiração do link: quanto tempo a pessoa tem para criar a senha depois de validar o código. Não definido.

## Critérios de aceite

- Os requisitos e a força mudam ao digitar.
- Com requisito faltando ou senhas diferentes, mostra o erro e não navega.
- Com os 4 requisitos e senhas iguais, abre REC-07.
