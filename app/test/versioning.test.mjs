import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { parseMessage, mentionedCodes, createVersioning } from '../src/versioning.mjs';

test('parseMessage: trailers, PR no título, co-autores e comentários do modelo', () => {
  const m = parseMessage('Troca o texto do SMS (#12)', [
    '<!-- instrução do modelo -->',
    'Tela: CAD-02, cad-03',
    'Motivo: pedido do jurídico',
    'Ref: Figma 1620:29884',
    '',
    'Detalhe livre.',
    'Co-Authored-By: Alguém <a@b.c>',
  ].join('\n'));
  assert.equal(m.title, 'Troca o texto do SMS');
  assert.equal(m.pr, 12);
  assert.deepEqual(m.telas, ['CAD-02', 'CAD-03']);
  assert.equal(m.why, 'pedido do jurídico');
  assert.equal(m.details, 'Detalhe livre.');
  assert.equal(m.ref, 'Figma 1620:29884');
});

test('parseMessage: sem Motivo, o corpo livre vira o porquê; trailer vazio é ignorado', () => {
  const m = parseMessage('Ajusta a CAD-02', 'Tela: <!-- vazio -->\nO botão estava cortado.\nCo-authored-by: X <x@y>');
  assert.equal(m.why, 'O botão estava cortado.');
  assert.deepEqual(m.telas, []);
  assert.equal(parseMessage('Só título', '').why, null);
});

test('mentionedCodes: códigos conhecidos e intervalos', () => {
  const known = new Set(['DOC-47', 'DOC-48', 'DOC-49', 'BIO-01', 'FAM-G2-1']);
  assert.deepEqual(mentionedCodes('Cria DOC-47 a DOC-49; liga FAM-G2-1 à BIO-01 e XYZ-99', known).sort(), ['BIO-01', 'DOC-47', 'DOC-48', 'DOC-49', 'FAM-G2-1']);
});

// Repositório git de mentira: main com 3 commits, uma branch pendente e uma já mesclada por squash.
let dir;
const handoffOf = (root) => {
  const nodes = [
    { code: 'CAD-01', folder: 'CAD-01-dados' },
    { code: 'CAD-02', folder: 'CAD-02-sms' },
    { code: 'BIO-01', folder: 'BIO-01-tutorial' },
  ];
  return { dir: path.join(root, 'handoff'), nodes, byCode: new Map(nodes.map((n) => [n.code, n])) };
};
const sh = (args) => execFileSync('git', args, { cwd: dir, stdio: 'pipe' }).toString();
const commit = async (file, text, message) => {
  await mkdir(path.dirname(path.join(dir, file)), { recursive: true });
  await writeFile(path.join(dir, file), text);
  sh(['add', '-A']);
  sh(['commit', '-q', '-m', message]);
};

before(async () => {
  dir = await mkdtemp(path.join(os.tmpdir(), 'hub-versioning-'));
  sh(['init', '-q', '-b', 'main']);
  sh(['config', 'user.email', 'teste@example.com']);
  sh(['config', 'user.name', 'Teste']);
  await commit('handoff/flow.json', '{}', 'Cria o fluxo');
  await commit('handoff/CAD-02-sms/spec.md', 'v1', 'Cria a CAD-02\n\nTela: CAD-02\nMotivo: primeira versão');
  await commit('handoff/flow.json', '{"a":1}', 'Liga a CAD-01 à BIO-01');
  // Branch mesclada por squash: o mesmo patch entra na main com outro commit.
  sh(['checkout', '-q', '-b', 'fix/ja-mesclada']);
  await commit('handoff/CAD-01-dados/spec.md', 'x', 'Ajuste na CAD-01');
  sh(['checkout', '-q', 'main']);
  await commit('handoff/CAD-01-dados/spec.md', 'x', 'Ajuste na CAD-01 (#1)');
  // Branch pendente: muda a CAD-02 e o fluxo.
  sh(['checkout', '-q', '-b', 'feat/sms-novo']);
  await commit('handoff/CAD-02-sms/spec.md', 'v2', 'Troca o texto do SMS\n\nMotivo: feedback do jurídico');
  await commit('handoff/flow.json', '{"a":2}', 'Ajusta a saída da CAD-02');
  sh(['checkout', '-q', 'main']);
});
after(() => rm(dir, { recursive: true, force: true }));

test('histórico pelo git: pasta da tela e citações na mensagem', async () => {
  const v = createVersioning({ repoDir: dir, handoff: handoffOf(dir), token: '' });
  const cad02 = await v.history('cad-02');
  assert.equal(cad02.source, 'git');
  assert.deepEqual(cad02.commits.map((c) => c.title), ['Cria a CAD-02']);
  assert.equal(cad02.commits[0].why, 'primeira versão');
  assert.equal(cad02.commits[0].touched, true);
  const bio = await v.history('BIO-01');
  assert.deepEqual(bio.commits.map((c) => [c.title, c.touched]), [['Liga a CAD-01 à BIO-01', false]]);
  const cad01 = await v.history('CAD-01');
  assert.equal(cad01.commits[0].pr, 1);
  assert.equal(await v.history('NAO-EXISTE'), null);
});

test('em validação pelo git: branch pendente com telas; squash merge vai para mescladas', async () => {
  const v = createVersioning({ repoDir: dir, handoff: handoffOf(dir), token: '' });
  const p = await v.pending();
  assert.equal(p.source, 'git');
  assert.equal(p.items.length, 1);
  const [it] = p.items;
  assert.equal(it.branch, 'feat/sms-novo');
  assert.deepEqual(it.codes, ['CAD-02']);
  assert.equal(it.flowChanged, true);
  assert.equal(it.commits, 2);
  assert.equal(it.localOnly, true);
  assert.deepEqual(p.merged.map((m) => m.branch), ['fix/ja-mesclada']);
  assert.deepEqual(Object.keys(p.byCode), ['CAD-02']);
});

test('em validação pelo GitHub: PR aberto, branch sem PR e branch de PR mesclado', async () => {
  const calls = [];
  const routes = {
    '/repos/o/r': { default_branch: 'main' },
    '/repos/o/r/pulls?state=all&sort=updated&direction=desc&per_page=100': [
      { number: 7, state: 'open', draft: false, title: 'Troca o SMS', body: 'Tela: CAD-02\nMotivo: jurídico\nCita BIO-01', user: { login: 'ana' }, head: { ref: 'feat/sms' }, created_at: '2026-11-01T00:00:00Z', updated_at: '2026-11-09T00:00:00Z', html_url: 'https://github.com/o/r/pull/7' },
      { number: 3, state: 'closed', merged_at: '2026-10-01T00:00:00Z', title: 'Antigo', head: { ref: 'fix/velha' } },
    ],
    '/repos/o/r/pulls/7/files?per_page=100': [{ filename: 'handoff/CAD-02-sms/spec.md' }, { filename: 'handoff/flow.json' }],
    '/repos/o/r/branches?per_page=100': [{ name: 'main' }, { name: 'feat/sms' }, { name: 'fix/velha' }, { name: 'rascunho' }],
    '/repos/o/r/compare/main...rascunho': { ahead_by: 1, files: [{ filename: 'handoff/CAD-01-dados/spec.md' }], commits: [{ commit: { message: 'Testa CAD-01', author: { name: 'bia', date: '2026-11-08T00:00:00Z' } } }] },
  };
  const fetchImpl = async (url, opts) => {
    const p = url.replace('https://api.github.com', '');
    calls.push(opts.headers.authorization);
    if (!(p in routes)) return { ok: false, status: 404 };
    return { ok: true, json: async () => routes[p] };
  };
  const v = createVersioning({ repoDir: dir, handoff: handoffOf(dir), token: 'tok', repo: 'o/r', fetchImpl });
  const p = await v.pending();
  assert.equal(p.source, 'github');
  assert.ok(calls.every((a) => a === 'Bearer tok'));
  const pr = p.items.find((i) => i.kind === 'pr');
  assert.equal(pr.number, 7);
  assert.deepEqual(pr.codes, ['CAD-02']);
  assert.deepEqual(pr.mentioned, ['BIO-01']);
  assert.equal(pr.why, 'jurídico');
  assert.equal(pr.flowChanged, true);
  const br = p.items.find((i) => i.kind === 'branch');
  assert.equal(br.branch, 'rascunho');
  assert.deepEqual(br.codes, ['CAD-01']);
  assert.deepEqual(p.merged, [{ branch: 'fix/velha', pr: 3, url: 'https://github.com/o/r/tree/fix/velha' }]);
  assert.deepEqual(Object.keys(p.byCode).sort(), ['CAD-01', 'CAD-02']);
});

test('GitHub fora do ar: cai para o git local com aviso', async () => {
  const v = createVersioning({ repoDir: dir, handoff: handoffOf(dir), token: 'tok', repo: 'o/r', fetchImpl: async () => ({ ok: false, status: 503 }) });
  const p = await v.pending();
  assert.equal(p.source, 'git');
  assert.match(p.warning, /503/);
});
