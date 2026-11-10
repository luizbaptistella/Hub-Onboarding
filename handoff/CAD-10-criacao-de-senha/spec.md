# CAD-10 · Criação de senha

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Novo (2026-11-09).** Criação da senha no primeiro acesso, com requisitos, confirmação e estados de erro. Desenhada no Figma; marcação em 8 variantes (padrão, preenchido, 5 erros e carregando).

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `CAD-10` |
| Raia | Entrada e cadastro · depois de CAD-09 |
| Figma | `1676:35055` (frame `screen-define`), com estados em `1676:35111`, `1676:35023` (carregando), `1845:55507`, `1845:55547`, `1845:55587`, `2070:19955`, `2104:20483` · arquivo `apbNVzymCikALAJtrz0Zjp` |
| Status | Desenhada no Figma (seção `1676:35192`) |
| Marcação | 8 variantes: [screen.html](screen.html) (Padrão) e [telas/](telas/) (7 variações) |
| Entradas / saídas | 1 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados e variantes · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Criar a senha de acesso com confirmação, mostrando os requisitos enquanto a pessoa digita.

## 2. Componentes

Componentes do DS: `AppHeader`, `PageHeading`, `TextField` (preset password, com mostrar e ocultar), `Button` (Confirmar, primário, largura total) e `LegalFooter`. Mensagens de erro por campo usam o padrão de campo inválido do DS (`po-field-invalid` com `po-msg`). Notificação de regra de negócio usa o alerta de perigo do DS (`po-alert po-alert-danger`, com título e texto).

Fora do DS (propostas, como em REC-06): lista de requisitos com ícone de cumprido ou pendente. A barra de status do celular é mock e não entra na implementação.

## 3. Campos e validações

| Campo | Controle | Regra | Mensagem de erro |
|---|---|---|---|
| Nova senha | `password` · autocomplete=`new-password` · mostrar/ocultar | Obrigatória e cumprir os 4 requisitos abaixo | "Digite sua senha" (vazia) · "A senha não atende aos requisitos." (incompleta) |
| Confirmar senha | `password` · autocomplete=`new-password` · mostrar/ocultar | Obrigatória e igual à nova senha | "Repita sua senha" (vazia) · "As senhas não coincidem." |

Requisitos (mesmos de REC-06, com o mesmo texto do Figma):

1. 8 caracteres ou mais
2. Letra maiúscula
3. Número
4. Caractere especial

Os requisitos atualizam enquanto a pessoa digita: cumprido com ícone preenchido e verde; pendente com contorno.

Regras de bloqueio (ao confirmar):

| Caso | Mensagem |
|---|---|
| Senha igual às duas últimas usadas | Título "Senha já utilizada." Texto: "Você não pode repetir as 2 últimas senhas. Crie uma senha diferente." |
| Senha com termos ligados ao Palmeiras (Palmeiras, SEP, Sociedade Esportiva Palmeiras) | Título "Senha muito frágil." Texto: "Não utilize termos relacionados ao Palmeiras, incluindo Palmeiras e SEP (Sociedade Esportiva Palmeiras), pois tornam a senha mais previsível." |

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [CAD-09 · Primeiro acesso](../CAD-09-primeiro-acesso-criar-senha/spec.md) | — |
| Confirmar | [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) (brasileiro) ou [DOC-02 · Seleção do documento · estrangeiro](../DOC-02-selecao-documento-estrangeiro/spec.md) (estrangeiro) | Só com todos os requisitos, confirmação igual e sem bloqueio. Passa pelo estado Carregando. |
| Mostrar / ocultar senha | — | Alterna o campo entre texto e pontos, nos dois campos. |

## 5. Estados e variantes

Cada estado é uma variante da tela, na pasta [telas/](telas/), com o mesmo padrão de REC-06 e ENT-02. A variante Padrão é o [screen.html](screen.html) da pasta.

| Variante | Arquivo | Figma | Quando |
|---|---|---|---|
| Padrão (vazio) | [screen.html](screen.html) | `1676:35055` | Primeira entrada; campos vazios, requisitos pendentes. |
| Preenchido | [telas/preenchido](telas/preenchido/screen.html) | `1676:35111` | Nova senha digitada e confirmação ainda vazia. Requisitos refletem a senha digitada (ver Lacunas). |
| Campos obrigatórios | [telas/campos-obrigatorios](telas/campos-obrigatorios/screen.html) | `1845:55587` | Confirmar com campos vazios: erro "Digite sua senha" e "Repita sua senha". |
| Requisitos pendentes | [telas/requisitos-pendentes](telas/requisitos-pendentes/screen.html) | `1845:55507` | Confirmar com senha que não cumpre os 4 requisitos: erro no campo Nova senha. |
| Senhas diferentes | [telas/senhas-diferentes](telas/senhas-diferentes/screen.html) | `1845:55547` | Confirmar com a confirmação diferente: erro "As senhas não coincidem.". |
| Senha já utilizada | [telas/senha-usada](telas/senha-usada/screen.html) | `2070:19955` | Senha igual às duas últimas: notificação no topo do formulário. |
| Senha relacionada ao Palmeiras | [telas/senha-palmeiras](telas/senha-palmeiras/screen.html) | `2104:20483` | Senha com termos do Palmeiras: notificação no topo do formulário. |
| Carregando | [telas/carregando](telas/carregando/screen.html) | `1676:35023` | Após Confirmar válido: logo, barra de progresso e "Carregando informações...". |

## 6. Comportamento

- Os requisitos e a força mudam ao digitar. O botão Confirmar fica ativo e valida ao tocar.
- Erros aparecem por campo (abaixo do campo, texto vermelho) ou como notificação no topo quando a regra é de negócio (senha já usada, termo do Palmeiras).
- Ao confirmar com tudo certo, mostra o estado Carregando e segue para a próxima etapa.
- Mostrar e ocultar senha não limpa o valor digitado.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-09 · Primeiro acesso](../CAD-09-primeiro-acesso-criar-senha/spec.md) | Continuar | — | Caminho principal |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [DOC-01 · Seleção de documento](../DOC-01-selecao-de-documento/spec.md) | Confirmar (carregando concluído) | Usuário brasileiro · 4 requisitos, confirmação igual e sem bloqueio | Caminho principal |
| [DOC-02 · Seleção do documento · estrangeiro](../DOC-02-selecao-documento-estrangeiro/spec.md) | Confirmar (carregando concluído) | Usuário estrangeiro · 4 requisitos, confirmação igual e sem bloqueio | Caminho principal |
| [CAD-09 · Primeiro acesso](../CAD-09-primeiro-acesso-criar-senha/spec.md) | Voltar | — | Voltar |

## 9. Dados

- A senha é enviada ao servidor só ao confirmar; não é guardada no dispositivo.
- A verificação de "senha já utilizada" depende do histórico de senhas do servidor.

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- **Destino após Carregando:** o Figma não mostra a tela seguinte. Assumido: DOC-01 ou DOC-02, conforme o tipo de usuário.
- **Duração do Carregando:** não definida no Figma.
- **Inconsistência no Figma (Preenchido):** o frame `1676:35111` mostra a senha `Verdao1914` com o requisito 4 (caractere especial) marcado como cumprido, mas a senha não tem caractere especial. A variante do hub calcula os requisitos pela regra, então o requisito 4 aparece pendente. Corrigir o Figma ou o exemplo.
- **Inconsistência no Figma (Preenchido):** o frame mostra o campo Confirmar senha vazio, enquanto a spec anterior dizia "senha e confirmação digitadas". A variante segue o Figma.
- **Apelido do clube:** "Verdao" é apelido do Palmeiras e não está na lista de termos (só "Palmeiras" e "SEP"). Decidir se apelidos e variações também bloqueiam.
- **Regra de histórico:** "as 2 últimas senhas" é a regra do Figma. Confirmar com o time de produto e o servidor.
- **Regra do Palmeiras:** lista de termos proibidos, se é só o termo ou também variações, e se vale para o nome do usuário. Não definida.
- **Erro de rede ao confirmar:** não desenhado. Ver DOC-12/13/14 para o padrão de erro de sistema.
- **Força da senha:** o Figma não mostra o medidor de força; REC-06 usa um. Confirmar se aqui também entra.
- **Relação com FAM-G2:** FAM-G2 diz que a senha é criada no celular do titular (spec §6.5), e FAM-14 diz que o familiar cria a senha no fim do cadastro. Esta tela assume o primeiro acesso do próprio titular.

## 11. Critérios de aceite

- [ ] Os requisitos e o texto de cada um aparecem como no Figma e mudam ao digitar.
- [ ] Confirmar com campos vazios mostra "Digite sua senha" e "Repita sua senha" e não navega.
- [ ] Confirmar com requisito faltando mostra o erro no campo Nova senha e não navega.
- [ ] Confirmar com senhas diferentes mostra "As senhas não coincidem." e não navega.
- [ ] Senha igual às duas últimas mostra "Senha já utilizada" e não navega.
- [ ] Senha com termo do Palmeiras mostra "Senha muito frágil" e não navega.
- [ ] Com tudo certo, mostra Carregando e abre DOC-01 (brasileiro) ou DOC-02 (estrangeiro).

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
