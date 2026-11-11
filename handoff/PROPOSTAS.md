# Propostas de alteração feitas no hub

O modo de edição da prévia (aba **Telas** de cada tela no hub) não altera o código. Ao salvar, ele gera uma
**proposta**: um arquivo `handoff/<pasta da tela>/propostas/PROP-….json` numa branch `proposta/…`, com um PR aberto
para a `main`. Este documento diz como a proposta é feita e como ela entra no código.

## O que dá para editar

- **Texto** de qualquer elemento com texto próprio (títulos, parágrafos, rótulos, botões). Ícones ficam de fora.
- **Propriedades de componentes do DS**, só entre as opções que o `components.json` da tela lista em `propOptions`
  (ex.: `variant` do `Button`). Não existem valores livres de cor, espaçamento ou tamanho: é isso que mantém a
  edição dentro do design system.

Ao salvar, quem editou informa obrigatoriamente o **motivo** e o **escopo**: só esta tela, ou o padrão (vale para
outras telas que usam o mesmo componente ou padrão).

## Formato da proposta (`ellena-hub/proposta@1`)

| Campo | O que é |
|---|---|
| `id` | `PROP-<data>-<hora>-<tela>-<sufixo>` |
| `screen`, `folder`, `variant` | Tela, pasta no handoff e variante editada (`id`, `label`, `file`) |
| `base.markupSha256` | Hash da marcação aberta no editor. O servidor recusa a proposta se a tela mudou antes de salvar |
| `base.commit` | Commit em produção quando a proposta foi feita (no Render) |
| `autor`, `createdAt` | Quem editou (informado no hub, que tem login compartilhado) e quando |
| `escopo` | `tela` ou `padrao` |
| `motivo` | Por que a alteração foi feita |
| `changes[]` | `kind` (`texto` ou `prop`), `target` (`selector`, `instance` e `component` do `components.json`), `prop`, `before`, `after` |

## Como incorporar (Claude Code ou quem for revisar)

Trabalhe na própria branch do PR da proposta.

1. **Confira a base.** Se `base.markupSha256` não bate mais com a marcação da `main`, alguém mudou a tela depois.
   Reaplique as alterações sobre a versão nova e comente no PR o que precisou ser adaptado.
2. **Confira contra o DS.** O DS ganha do spec. Se a alteração contrariar uma regra do DS (o artefato do DS
   Palmeiras · Onboarding), não aplique: comente no PR com a regra e feche ou ajuste a proposta.
3. **Aplique na marcação** da variante (`variant.file`) e nas outras variantes da mesma tela que mostram o mesmo
   elemento. Troca de `prop` muda as classes do componente para a forma que o DS define para aquela opção.
4. **Atualize o `components.json`:** `dsProps`, `jsx`, `propOptions.<prop>.used`, `renderStates` e `note` da instância.
5. **Atualize o `spec.md`:** as seções afetadas (Componentes, Campos, Ações, Estados) e uma linha nova em
   **Histórico de alterações** (última seção do spec; crie se não existir):

   ```markdown
   ## Histórico de alterações

   | Data | O que mudou | Motivo | Autor | PR |
   |---|---|---|---|---|
   | 2026-11-11 | Botão Continuar: `primary` → `secondary` | <motivo da proposta> | <autor> | #<número> |
   ```

   Não confundir com as **Decisões** (`DEC-xx`) do `flow.json`, que são os desvios do fluxo.
6. **Escopo padrão:** liste no PR as outras telas que usam o mesmo componente ou padrão (o `componentes.md` tem o
   inventário) e aplique ou justifique cada uma. Cada tela alterada ganha a sua linha no Histórico.
7. **Apague o arquivo da proposta** no mesmo PR. O registro permanente fica no Histórico do spec e no git.
8. Rode os testes da app (`npm test` em `app/`) e peça a revisão do PR.

## Configuração do servidor

- **Produção (Render):** `GITHUB_TOKEN` (token *fine-grained* só deste repositório, com escrita em *Contents* e
  *Pull requests*), `GITHUB_REPO` (`dono/repositorio`) e, se a base não for `main`, `GITHUB_BASE_BRANCH`. Sem o token,
  o botão de salvar fica desligado.
- **Local, sem senha:** a proposta é gravada direto em `handoff/<pasta>/propostas/`, sem branch nem PR.
