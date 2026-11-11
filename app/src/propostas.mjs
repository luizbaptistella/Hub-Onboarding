// Propostas de alteração feitas no modo de edição do hub. A edição nunca altera a marcação direto:
// vira uma proposta estruturada (tela, alvo, antes, depois, motivo), salva como PR no GitHub ou,
// em desenvolvimento local, como arquivo em handoff/<pasta>/propostas/. A incorporação no código
// (screen.html, components.json, spec.md) é feita depois, seguindo handoff/PROPOSTAS.md.
import { createHash, randomBytes } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as hub from '../../mcp-server/src/hub.mjs';

export const SCHEMA = 'ellena-hub/proposta@1';
const ESCOPOS = new Set(['tela', 'padrao']);
const MAX_CHANGES = 50;

const fail = (status, error) => Object.assign(new Error(error), { status, publicMessage: error });
const isStr = (v, min, max) => typeof v === 'string' && v.trim().length >= min && v.length <= max;

export const markupHash = (html) => createHash('sha256').update(html).digest('hex');

// Valida o que veio do navegador contra o handoff atual e devolve a proposta normalizada.
export async function buildProposal(handoff, input, { now = new Date(), commit = process.env.RENDER_GIT_COMMIT ?? null } = {}) {
  if (!input || typeof input !== 'object') throw fail(400, 'Proposta vazia.');
  const node = hub.getNode(handoff, input.screen);
  if (!node || !node.folder) throw fail(404, 'Tela não encontrada.');

  const markup = await hub.getScreenMarkup(handoff, node.code, input.variant);
  if (!markup || markup.error) throw fail(400, 'Variante da tela não encontrada.');
  if (input.base?.markupSha256 !== markupHash(markup.html)) {
    throw fail(409, 'A tela mudou desde que você abriu o modo de edição. Recarregue a página e refaça as alterações.');
  }

  if (!isStr(input.motivo, 10, 2000)) throw fail(400, 'Explique o motivo da alteração (pelo menos 10 caracteres).');
  if (!ESCOPOS.has(input.escopo)) throw fail(400, 'Escolha se a alteração vale só para esta tela ou para o padrão.');
  if (input.autor !== undefined && input.autor !== '' && !isStr(input.autor, 1, 80)) throw fail(400, 'Nome do autor inválido.');
  if (!Array.isArray(input.changes) || !input.changes.length) throw fail(400, 'Nenhuma alteração na proposta.');
  if (input.changes.length > MAX_CHANGES) throw fail(400, `No máximo ${MAX_CHANGES} alterações por proposta.`);

  const comps = await hub.getScreenComponents(handoff, node.code);
  const instances = comps?.raw ? JSON.parse(comps.raw).instances ?? [] : [];
  const changes = input.changes.map((c, i) => normalizeChange(c, i, instances));

  const stamp = now.toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
  const id = `PROP-${stamp}-${node.code.toLowerCase()}-${randomBytes(2).toString('hex')}`;
  return {
    schema: SCHEMA,
    id,
    screen: node.code,
    screenName: node.name,
    folder: node.folder,
    variant: { id: markup.variant.id, label: markup.variant.label, file: markup.variant.file },
    base: { markupSha256: markupHash(markup.html), commit },
    autor: input.autor?.trim() || null,
    createdAt: now.toISOString(),
    escopo: input.escopo,
    motivo: input.motivo.trim(),
    changes,
  };
}

function normalizeChange(c, i, instances) {
  const where = `Alteração ${i + 1}`;
  if (!c || typeof c !== 'object') throw fail(400, `${where}: formato inválido.`);
  const instance = c.instance == null ? null : instances.find((x) => x.id === c.instance);
  if (c.instance != null && !instance) throw fail(400, `${where}: componente ${c.instance} não existe nesta tela.`);
  const target = {
    selector: isStr(c.selector, 1, 600) ? c.selector : null,
    instance: instance?.id ?? null,
    component: instance?.component ?? null,
  };

  if (c.kind === 'texto') {
    if (!target.selector) throw fail(400, `${where}: elemento sem seletor.`);
    if (typeof c.before !== 'string' || !isStr(c.after, 0, 2000) || c.before.length > 2000) throw fail(400, `${where}: texto inválido.`);
    if (c.before === c.after) throw fail(400, `${where}: o texto não mudou.`);
    return { kind: 'texto', target, before: c.before, after: c.after };
  }

  if (c.kind === 'prop') {
    if (!instance) throw fail(400, `${where}: troca de propriedade precisa de um componente do DS.`);
    const opt = instance.propOptions?.[c.prop];
    if (!opt) throw fail(400, `${where}: ${instance.component} não tem a propriedade "${c.prop}" nesta tela.`);
    // Só valores que o DS oferece: é o que impede a edição de criar estilos fora do design system.
    if (!opt.options.includes(String(c.after))) throw fail(400, `${where}: "${c.after}" não é uma opção de ${c.prop} no DS.`);
    const before = opt.used == null ? null : String(opt.used);
    if (before === String(c.after)) throw fail(400, `${where}: a propriedade não mudou.`);
    return { kind: 'prop', target: { ...target, selector: target.selector ?? instance.selector }, prop: c.prop, before, after: String(c.after) };
  }

  throw fail(400, `${where}: tipo "${c.kind}" não suportado.`);
}

// Menções viram texto: o corpo do PR não deve notificar ninguém no GitHub.
const safe = (s) => String(s ?? '').replace(/@/g, '@​').replace(/\r/g, '');
const cell = (s) => safe(s).replace(/\|/g, '\\|').replace(/\n/g, ' ↵ ');

export function proposalPath(p) {
  return `handoff/${p.folder}/propostas/${p.id}.json`;
}

export function prTitle(p) {
  const n = p.changes.length;
  return `Proposta ${p.screen}: ${n} alteração${n > 1 ? 'ões' : ''} na tela ${p.screenName}`;
}

export function prBody(p) {
  const rows = p.changes.map((c, i) => {
    const alvo = c.target.component ? `\`${c.target.component}\`` : '—';
    const what = c.kind === 'prop' ? `prop \`${cell(c.prop)}\`` : 'texto';
    return `| ${i + 1} | ${alvo} | ${what} | ${cell(c.before ?? '(padrão)')} | ${cell(c.after)} |`;
  });
  return [
    `**Tela:** \`${p.screen}\` · ${safe(p.screenName)} — variante *${safe(p.variant.label)}* (\`${p.variant.file}\`)`,
    `**Escopo:** ${p.escopo === 'padrao' ? 'vale para o padrão (outras telas que usam o mesmo componente ou padrão)' : 'só esta tela'}`,
    `**Autor:** ${safe(p.autor ?? 'não informado')} · ${p.createdAt}`,
    '',
    '### Motivo',
    ...safe(p.motivo).split('\n').map((l) => `> ${l}`),
    '',
    '### Alterações',
    '| # | Componente | O quê | Antes | Depois |',
    '|---|---|---|---|---|',
    ...rows,
    '',
    `Proposta completa (com seletores e versão de base): [\`${proposalPath(p)}\`](${proposalPath(p)})`,
    '',
    '### Para incorporar',
    'Siga [`handoff/PROPOSTAS.md`](handoff/PROPOSTAS.md). Resumo:',
    '- [ ] Aplicar as alterações na marcação da variante (e nas outras variantes da tela que mostram o mesmo elemento)',
    '- [ ] Atualizar `components.json` (props, `jsx`, `propOptions.used`) e as seções afetadas do `spec.md`',
    '- [ ] Registrar a linha em **Histórico de alterações** do `spec.md`, com o motivo e o link deste PR',
    p.escopo === 'padrao' ? '- [ ] Escopo padrão: listar as outras telas afetadas e aplicar ou justificar cada uma' : null,
    '- [ ] Conferir contra o DS: se a alteração contrariar o DS, não aplicar e comentar aqui',
    '- [ ] Apagar o arquivo da proposta no mesmo PR depois de incorporada (o histórico fica no spec e no git)',
  ].filter((l) => l !== null).join('\n');
}

// Grava a proposta como branch + commit + PR no GitHub, com a API REST e um token de escopo mínimo
// (Contents e Pull requests: escrita, só neste repositório).
export function createGithubStore({ token, repo, baseBranch = 'main', fetchImpl = fetch }) {
  const gh = async (method, route, body) => {
    const r = await fetchImpl(`https://api.github.com/repos/${repo}${route}`, {
      method,
      headers: { authorization: `Bearer ${token}`, accept: 'application/vnd.github+json', 'x-github-api-version': '2022-11-28', 'user-agent': 'ellena-hub' },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw fail(502, `GitHub recusou a proposta (${r.status}${data.message ? `: ${data.message}` : ''}).`);
    return data;
  };
  return {
    mode: 'github',
    async save(p) {
      const branch = `proposta/${p.id.toLowerCase()}`;
      const ref = await gh('GET', `/git/ref/heads/${encodeURIComponent(baseBranch)}`);
      await gh('POST', '/git/refs', { ref: `refs/heads/${branch}`, sha: ref.object.sha });
      await gh('PUT', `/contents/${proposalPath(p).split('/').map(encodeURIComponent).join('/')}`, {
        message: `Proposta ${p.screen}: ${p.changes.length} alteração(ões) feitas no hub`,
        content: Buffer.from(JSON.stringify(p, null, 2) + '\n').toString('base64'),
        branch,
      });
      const pr = await gh('POST', '/pulls', { title: prTitle(p), head: branch, base: baseBranch, body: prBody(p), draft: false });
      return { mode: 'github', id: p.id, url: pr.html_url, number: pr.number, branch };
    },
  };
}

// Desenvolvimento local: grava o arquivo da proposta no handoff. O resto do fluxo (branch e PR) fica com quem incorpora.
export function createLocalStore(hubRoot) {
  return {
    mode: 'local',
    async save(p) {
      const file = path.join(hubRoot, proposalPath(p));
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, JSON.stringify(p, null, 2) + '\n', { flag: 'wx' });
      return { mode: 'local', id: p.id, path: proposalPath(p) };
    },
  };
}

export function storeFromEnv({ hubRoot, passwordSet }) {
  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BASE_BRANCH } = process.env;
  if (GITHUB_TOKEN && GITHUB_REPO) return createGithubStore({ token: GITHUB_TOKEN, repo: GITHUB_REPO, baseBranch: GITHUB_BASE_BRANCH || 'main' });
  // Sem senha o servidor só sobe em loopback (ver server.mjs): é a máquina de quem está editando.
  if (!passwordSet || process.env.PROPOSTAS_LOCAL === '1') return createLocalStore(hubRoot);
  return null;
}
