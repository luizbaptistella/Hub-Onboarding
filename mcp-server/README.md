# Palmeiras Hub · servidor MCP

Expõe o handoff do Palmeiras · Onboarding (`../handoff/`) como ferramentas MCP. Quem está no time consome as telas, specs, componentes e fluxo direto no Claude, sem abrir pastas.

Somente leitura: nenhuma ferramenta escreve no handoff. O servidor lê os arquivos da pasta `handoff/` a cada chamada (os specs e a marcação); o mapa do fluxo (`flow.json`) e o índice de busca são carregados na inicialização, então reinicie o servidor depois de atualizar o `flow.json`.

## Ferramentas

| Ferramenta | Para que serve |
|---|---|
| `hub_list_screens` | Lista telas, gaps e decisões. Filtros: `lane`, `status`, `query`. |
| `hub_get_screen` | Spec completo da tela (`spec.md`). |
| `hub_get_screen_components` | Componentes do DS da tela, com props, JSX e estados (`components.json`). |
| `hub_get_screen_markup` | Marcação de referência (`screen.html`), com `variant` para os estados. |
| `hub_get_flow` | Entradas, saídas, gatilhos, condições e decisões de uma tela. |
| `hub_get_decision` | Regra de uma decisão do fluxo (ex.: `DEC-01`). |
| `hub_get_doc` | Documentos gerais: `index`, `readme`, `dados`, `componentes`, `componentes-estrangeiro`, `componente:<Nome>`. |
| `hub_search` | Busca em specs, componentes e documentos, sem diferenciar acento nem maiúscula. |
| `hub_info` | Resumo do handoff carregado e links do DS e do Figma. |

Exemplo de uso no Claude: "Me passa o spec do CAD-02 e os componentes que ele usa."

## Rodar localmente (cada pessoa, na própria máquina)

Pré-requisito: Node 20+.

```bash
cd palmeiras-hub/mcp-server
npm install
```

Adicione ao Claude Code:

```bash
claude mcp add palmeiras-hub -- node /caminho/absoluto/para/palmeiras-hub/mcp-server/src/stdio.mjs
```

Para o Claude Desktop, adicione no `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "palmeiras-hub": {
      "command": "node",
      "args": ["/caminho/absoluto/para/palmeiras-hub/mcp-server/src/stdio.mjs"]
    }
  }
}
```

## Rodar como serviço para o time (HTTP)

Um host do time roda o servidor e as pessoas conectam por URL. Fora de `localhost`, o servidor exige um token.

```bash
cd palmeiras-hub/mcp-server
MCP_TOKEN="$(openssl rand -hex 32)" HOST=0.0.0.0 PORT=8790 npm run start:http
```

Health check: `GET /health`. Endpoint MCP: `POST /mcp` com `Authorization: Bearer <token>`.

Cada pessoa conecta com:

```bash
claude mcp add --transport http palmeiras-hub http://HOST:8790/mcp --header "Authorization: Bearer <token>"
```

O token é compartilhado pelo canal de segredos do time, não pelo repositório. Para servir por HTTPS, coloque o servidor atrás de um proxy reverso (nginx, Caddy ou similar) com TLS.

## Configuração

| Variável | Padrão | Uso |
|---|---|---|
| `HUB_HANDOFF_DIR` | `../handoff` | Pasta do handoff a servir |
| `HOST` | `127.0.0.1` | Interface do modo HTTP |
| `PORT` | `8790` | Porta do modo HTTP |
| `MCP_TOKEN` | (vazio) | Token do modo HTTP; obrigatório se `HOST` não for local |

## Testes

```bash
npm test                 # loader, ferramentas e cliente MCP via stdio
node test/http-smoke.mjs # sobe o modo HTTP com token e chama uma ferramenta
```

## Estrutura

- `src/hub.mjs`: leitura e consulta do handoff (sem MCP).
- `src/server.mjs`: registro das ferramentas MCP.
- `src/stdio.mjs`: transporte local.
- `src/http.mjs`: transporte HTTP com autenticação por token.
