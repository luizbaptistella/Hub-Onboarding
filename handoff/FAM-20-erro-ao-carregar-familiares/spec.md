# FAM-20 · Meus familiares · erro ao carregar

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
>
> **Proposta, ainda não validada.** Estado de erro da lista Meus familiares (FAM-17), para falha de rede, 5xx ou timeout. Usa o mesmo padrão de FAM-18 (selo do DS com ícone). Premissas na seção 10.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-20` (estado de erro de FAM-17) |
| Raia | Familiares · Inclusão e gestão de vínculos |
| Figma | — (padrão de FAM-18 e do Hero do DS) |
| Status | Proposta, a validar |
| Marcação | [screen.html](screen.html) (Padrão) |
| Entradas / saídas | 1 / 1 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Premissas e lacunas · 11. Critérios de aceite

## 1. Objetivo

Avisar que a lista Meus familiares não carregou e permitir tentar de novo. A lista não aparece vazia: vazio parece que não há familiares.

## 2. Componentes

| # | Componente | JSX nesta tela | Estados nesta tela | Observação |
|---|---|---|---|---|
| 1 | `AppHeader` | `<AppHeader back={{ label: "Voltar" }} title="Meus familiares" language={false} help={false} />` | — | Forma de FAM-18. |
| 2 | `Hero` (variante danger) | `<Hero tone="danger" icon="cloud_off" title="Não conseguimos carregar seus familiares" description="Verifique sua conexão e tente de novo. Seus familiares continuam vinculados à sua conta." />` | — | Selo vermelho do DS, como em FAM-18. `role="alert"`. |
| 3 | `Button` | `<Button variant="primary" fullWidth iconStart="refresh">Tentar novamente</Button>` | normal; carregando (durante a nova tentativa) | Usa o `loading` do DS durante a nova tentativa. |
| 4 | `LegalFooter` | `<LegalFooter>© 2026 Ellena. Todos os direitos reservados.</LegalFooter>` | — | — |

## 3. Campos e validações

_Sem campos._

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) | Volta à área logada. |
| Tentar novamente | [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) | Carrega a lista de novo. Se falhar, volta a esta tela. |

## 5. Estados

- Erro (padrão)
- Tentando de novo (botão em loading)

## 6. Comportamento

- Aparece quando a lista de FAM-17 não carrega por rede, 5xx ou timeout.
- Nunca mostra lista vazia nem a frase "nenhum familiar" no lugar do erro.
- Tentar novamente faz uma nova chamada. Sucesso: mostra a lista de FAM-17. Falha: volta a esta tela.
- Se a falha for só de uma aba, a outra aba segue normal (ver seção 10).
- Sem conexão, o aviso de offline é outro estado (a desenhar).

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) | Falha ao carregar a lista | Rede, 5xx ou timeout | Erro ou nova tentativa |

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [FAM-17 · Área do convidado · Meus familiares e Sou familiar de](../FAM-17-area-do-convidado-meus-familiares-e-sou-familiar-de/spec.md) | Tentar novamente | Sucesso: lista carregada | Caminho principal |

## 9. Dados

- Nenhum dado de familiar é exibido nesta tela.

Visão geral: [dados.md](../dados.md).

## 10. Premissas e lacunas

**Premissas a validar:**

- **Mesmo padrão de FAM-18:** selo do DS e uma ação. O ícone `cloud_off` é escolha minha.
- **Texto:** "Seus familiares continuam vinculados à sua conta." Assume que a falha não altera os vínculos.
- **Sem limite de tentativas:** cada toque faz uma chamada. O produto pode querer um intervalo entre tentativas.

**Em aberto:**

- **Uma aba falha, outra não:** a spec diz que só a aba afetada mostra o erro. Esta tela cobre a lista inteira. Falta a variante com erro só em uma aba.
- **Sessão expirada (401):** é outro estado, que leva ao login (a desenhar).
- **Offline:** aviso próprio, com as ações bloqueadas e o conteúdo já carregado visível (a desenhar).

## 11. Critérios de aceite

- [ ] Com falha de rede, 5xx ou timeout, a tela de erro aparece no lugar da lista.
- [ ] Tentar novamente com sucesso mostra a lista de FAM-17.
- [ ] Tentar novamente com falha volta a esta tela.
- [ ] A lista nunca aparece vazia no lugar do erro.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
