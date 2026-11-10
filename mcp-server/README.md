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

## Servidor para o time (HTTP, no Render)

A app web do hub (Render) serve o MCP em **`https://<url-do-hub>/mcp`**, no mesmo processo da app. Ela é a forma recomendada: uma URL só, sem rodar nada na máquina de ninguém.

Autenticação: header `Authorization: Bearer <MCP_TOKEN>`. É um token de máquina, separado da senha de login da app. Sem `MCP_TOKEN` configurado, `/mcp` responde 404 e fica desligado.

Para ligar no Render: no painel do serviço `palmeiras-hub`, em **Environment**, defina `MCP_TOKEN` com um valor longo (ex.: `openssl rand -hex 32`). O `render.yaml` já declara a variável como segredo, sem valor no repositório.

Cada pessoa conecta com:

```bash
claude mcp add --transport http palmeiras-hub https://<url-do-hub>/mcp --header "Authorization: Bearer <token>"
```

O token é compartilhado pelo canal de segredos do time, não pelo repositório. Trocar o token: altere `MCP_TOKEN` no Render; quem usa precisa atualizar o header.

### Modo HTTP standalone (opcional)

Para rodar só o endpoint MCP fora da app (por exemplo, em outro host, atrás de um proxy com TLS):

```bash
cd palmeiras-hub/mcp-server
MCP_TOKEN="$(openssl rand -hex 32)" HOST=0.0.0.0 PORT=8790 npm run start:http
```

Health check: `GET /health`. Endpoint MCP: `POST /mcp` com `Authorization: Bearer <token>`. Fora de `localhost`, o servidor exige `MCP_TOKEN`.

## Configuração

| Variável | Onde | Padrão | Uso |
|---|---|---|---|
| `MCP_TOKEN` | app (Render) e standalone | (vazio) | Token Bearer do `/mcp`; sem ele, o endpoint fica desligado (app) ou o servidor não sobe fora de localhost (standalone) |
| `HUB_HANDOFF_DIR` | standalone | `../handoff` | Pasta do handoff a servir |
| `HOST` | standalone | `127.0.0.1` | Interface do modo HTTP |
| `PORT` | standalone | `8790` | Porta do modo HTTP |

## Testes

```bash
npm test                 # loader, ferramentas e cliente MCP via stdio
node test/http-smoke.mjs # sobe o modo HTTP com token e chama uma ferramenta
```

## Estrutura

- `src/hub.mjs`: leitura e consulta do handoff (sem MCP).
- `src/server.mjs`: registro das ferramentas MCP.
- `src/stdio.mjs`: transporte local.
- `src/endpoint.mjs`: endpoint Streamable HTTP com autenticação por token (usado pela app e pelo modo standalone).
- `src/http.mjs`: modo HTTP standalone (`/health` e `/mcp`).
