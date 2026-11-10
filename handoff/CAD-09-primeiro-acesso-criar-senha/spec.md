# CAD-09 · Primeiro acesso · introdução da senha

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Novo (2026-11-09).** Primeira tela da criação de senha, logo depois do cadastro (CAD-08). Desenhada no Figma; marcação ainda não gerada.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `CAD-09` |
| Raia | Entrada e cadastro · depois da Etapa 1 de 4 (cadastro concluído) |
| Figma | `1676:35028` (frame `screen-welcome`, arquivo `apbNVzymCikALAJtrz0Zjp`) |
| Status | Desenhada no Figma |
| Marcação | Pendente (`screen.html` ainda não gerado) |
| Entradas / saídas | 1 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Avisar que este é o primeiro acesso à plataforma e que a pessoa precisa definir uma senha antes de continuar.

## 2. Componentes

Previstos (a confirmar ao gerar a marcação):

| Componente | Uso |
|---|---|
| `AppHeader` | Título "Primeiro Acesso", seta de voltar. |
| `PageHeading` | Título "Crie sua senha" e texto de introdução. |
| `Button` | "Continuar" (primário, largura total). |
| `LegalFooter` | "© 2026 Ellena. Todos os direitos reservados." |

Barra de status do celular é mock do sistema operacional e não entra na implementação.

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [CAD-08 · Status · dados recebidos](../CAD-08-status-dados-recebidos/spec.md) | Volta ao status do cadastro. |
| Continuar | [CAD-10 · Criação de senha](../CAD-10-criacao-de-senha/spec.md) | Sem validação nesta tela. |

## 5. Estados

- Único estado: texto de introdução e botão Continuar.

## 6. Comportamento

- Texto: "Este é seu primeiro acesso à plataforma oficial do Palmeiras. Defina uma senha para garantir a segurança da sua conta e continuar."
- Continuar abre CAD-10.

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-08 · Status · dados recebidos](../CAD-08-status-dados-recebidos/spec.md) | 10 s ou Continuar agora | Usuário brasileiro ou estrangeiro | Automática (timer) |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [CAD-10 · Criação de senha](../CAD-10-criacao-de-senha/spec.md) | Continuar | — | Caminho principal |
| [CAD-08 · Status · dados recebidos](../CAD-08-status-dados-recebidos/spec.md) | Voltar | — | Voltar |

## 9. Dados

_Nenhum dado compartilhado._

Visão geral: [dados.md](../dados.md).

## 10. Lacunas e perguntas

- Esta tela não tem título na barra ("Primeiro Acesso") igual ao da tela seguinte ("Crie sua senha"); confirmar que é o comportamento desejado.
- Marcação (`screen.html`) ainda não gerada a partir do Figma.

## 11. Critérios de aceite

- [ ] A tela aparece depois de CAD-08, sem interação ou depois de 10 s.
- [ ] Continuar abre CAD-10.
- [ ] Voltar retorna a CAD-08.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
