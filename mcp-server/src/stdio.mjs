// Transporte stdio: uso local. Cada pessoa roda o servidor na própria máquina.
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createHubServer } from './server.mjs';
import { loadHub } from './hub.mjs';
import { handoffDir } from './handoff-path.mjs';

const handoff = await loadHub(handoffDir);
const server = createHubServer(handoff);
await server.connect(new StdioServerTransport());
console.error(`[palmeiras-hub] stdio pronto · ${handoff.nodes.length} nós · ${handoffDir}`);
