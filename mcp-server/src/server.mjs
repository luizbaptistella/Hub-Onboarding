// Registro das ferramentas MCP do hub. Todas são somente leitura.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import * as hub from './hub.mjs';

const READ_ONLY = { readOnlyHint: true, destructiveHint: false, openWorldHint: false };

const text = (value) => ({
  content: [{ type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }],
});
const fail = (message) => ({ content: [{ type: 'text', text: message }], isError: true });
const notFound = (code) => fail(`Tela "${code}" não encontrada. Use hub_list_screens para ver os códigos válidos.`);

const INSTRUCTIONS = [
  'Hub do Palmeiras · Onboarding: telas, specs, componentes e fluxo do handoff.',
  'Fluxo recomendado: hub_list_screens para achar o código (ex.: CAD-02); hub_get_screen para a spec;',
  'hub_get_screen_components para os componentes do DS; hub_get_flow para entradas e saídas;',
  'hub_search para buscar texto em todo o handoff.',
  'Precedência de fonte: DS Palmeiras · Onboarding > spec.md > protótipo.',
].join(' ');

export function createHubServer(handoff) {
  const server = new McpServer(
    { name: 'ellena-hub', version: '0.1.0' },
    { instructions: INSTRUCTIONS },
  );

  server.registerTool(
    'hub_list_screens',
    {
      title: 'Listar telas',
      description: 'Lista telas, estados e gaps do fluxo. Filtros opcionais: lane (cadastro, documento, estrangeiro, biometria, area, ajuda, familiares, ...), status (ex.: "desenhada", "proposta", "sem-figma", "lacuna"), query (busca por código ou nome).',
      inputSchema: {
        lane: z.string().optional().describe('ID da raia, ex.: "cadastro"'),
        status: z.string().optional().describe('Trecho do status, ex.: "proposta"'),
        query: z.string().optional().describe('Texto a buscar em código, nome ou id do protótipo'),
      },
      annotations: READ_ONLY,
    },
    async (args) => {
      const rows = hub.listScreens(handoff, args);
      return text({ total: rows.length, screens: rows });
    },
  );

  server.registerTool(
    'hub_get_screen',
    {
      title: 'Spec da tela',
      description: 'Retorna o spec.md completo de uma tela (objetivo, componentes, campos, ações, estados, comportamento, entradas e saídas, dados, lacunas e critérios de aceite).',
      inputSchema: { code: z.string().describe('Código da tela, ex.: "CAD-02"') },
      annotations: READ_ONLY,
    },
    async ({ code }) => {
      const r = await hub.getScreenSpec(handoff, code);
      if (!r) return notFound(code);
      if (r.spec === null) return fail(`A tela ${r.node.code} não tem spec.md (status: ${r.node.status}).`);
      return text(`${r.spec}\n\n---\nDS: ${handoff.flow.artifact}\nFigma: ${r.node.figma ?? 'sem node'}`);
    },
  );

  server.registerTool(
    'hub_get_screen_components',
    {
      title: 'Componentes da tela',
      description: 'Retorna o components.json de uma tela: instâncias de componentes do DS com props, JSX, estados e comportamento.',
      inputSchema: { code: z.string().describe('Código da tela, ex.: "AJD-02"') },
      annotations: READ_ONLY,
    },
    async ({ code }) => {
      const r = await hub.getScreenComponents(handoff, code);
      if (!r) return notFound(code);
      if (r.raw === null) return fail(`A tela ${r.node.code} não tem components.json.`);
      return text(r.raw);
    },
  );

  server.registerTool(
    'hub_get_screen_markup',
    {
      title: 'Marcação da tela',
      description: 'Retorna o screen.html (marcação de referência) de uma tela. Use "variant" para escolher uma variante (ex.: estados de erro). Conteúdo longo é cortado.',
      inputSchema: {
        code: z.string().describe('Código da tela'),
        variant: z.string().optional().describe('ID ou rótulo da variante, quando a tela tem mais de uma'),
      },
      annotations: READ_ONLY,
    },
    async ({ code, variant }) => {
      const r = await hub.getScreenMarkup(handoff, code, variant);
      if (!r) return notFound(code);
      if (r.error) return fail(`${r.error}\nVariantes: ${JSON.stringify(r.variants.map((v) => v.id))}`);
      const note = r.truncated ? '\n<!-- cortado: arquivo maior que o limite -->' : '';
      return text(`<!-- ${r.node.code} · variante ${r.variant.id} · ${r.variant.file} -->\n${r.html}${note}`);
    },
  );

  server.registerTool(
    'hub_get_flow',
    {
      title: 'Fluxo de uma tela',
      description: 'Mostra as ligações de uma tela: de onde o usuário chega (entradas), para onde vai (saídas), com gatilho e condição, e as decisões que a tela avalia.',
      inputSchema: { code: z.string().describe('Código da tela ou decisão, ex.: "CAD-02"') },
      annotations: READ_ONLY,
    },
    async ({ code }) => {
      const r = hub.getFlow(handoff, code);
      if (!r) return notFound(code);
      return text(r);
    },
  );

  server.registerTool(
    'hub_get_decision',
    {
      title: 'Decisão do fluxo',
      description: 'Retorna a regra de uma decisão do fluxo (ex.: DEC-01). Sem "id", lista todas.',
      inputSchema: { id: z.string().optional().describe('ID da decisão, ex.: "DEC-01"') },
      annotations: READ_ONLY,
    },
    async ({ id }) => {
      const r = hub.getDecision(handoff, id);
      if (r === null) return fail(`Decisão "${id}" não existe.`);
      return text(r);
    },
  );

  server.registerTool(
    'hub_get_doc',
    {
      title: 'Documento geral do handoff',
      description: 'Lê um documento geral do handoff. Nomes: "index" (índice de telas), "readme" (como ler o handoff), "dados" (dados compartilhados), "componentes" (inventário componente × tela), "componentes-estrangeiro", ou "componente:<Nome>" (ex.: "componente:Button").',
      inputSchema: { name: z.string().describe('Nome do documento') },
      annotations: READ_ONLY,
    },
    async ({ name }) => {
      const r = await hub.getGeneralDoc(handoff, name);
      if (!r) return fail(`Documento "${name}" não existe. Opções: index, readme, dados, componentes, componentes-estrangeiro, componente:<Nome>.`);
      if (r.text === null) return fail(`Arquivo do documento "${name}" não encontrado no handoff.`);
      return text(r.text);
    },
  );

  server.registerTool(
    'hub_search',
    {
      title: 'Buscar no handoff',
      description: 'Busca um texto (sem diferenciar acentos nem maiúsculas) em specs, components.json, documentos gerais e docs de componentes. Retorna arquivo, tela e linha.',
      inputSchema: {
        query: z.string().min(2).describe('Texto a buscar, ex.: "CPF" ou "tentativas"'),
        limit: z.number().int().min(1).max(100).optional().describe('Máximo de resultados (padrão 20)'),
      },
      annotations: READ_ONLY,
    },
    async ({ query, limit }) => {
      const hits = await hub.search(handoff, query, limit ?? 20);
      return text({ query, total: hits.length, hits });
    },
  );

  server.registerTool(
    'hub_info',
    {
      title: 'Resumo do hub',
      description: 'Resumo do handoff carregado: quantidade de telas, ligações, decisões, raias e links do DS e do Figma.',
      inputSchema: {},
      annotations: READ_ONLY,
    },
    async () => text(await hub.hubStats(handoff)),
  );

  return server;
}
