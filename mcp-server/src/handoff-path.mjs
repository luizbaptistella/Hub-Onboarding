import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

// Por padrão, a pasta handoff/ ao lado de mcp-server/. Pode ser trocada com HUB_HANDOFF_DIR.
export const handoffDir = process.env.HUB_HANDOFF_DIR
  ? path.resolve(process.env.HUB_HANDOFF_DIR)
  : path.resolve(here, '../../handoff');
