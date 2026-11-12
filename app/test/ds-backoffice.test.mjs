import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from '../src/server.mjs';
import { parseBackofficeTokens, parseBackofficeComponents, parseBackofficeRules, loadBackofficeDs } from '../src/ds-backoffice.mjs';

const hubRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

let server, base;
before(async () => {
  server = await createApp();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

test('parseBackofficeTokens: tema escuro é a base, claro sobrescreve, aliases resolvem', () => {
  const t = parseBackofficeTokens([
    { group: 'Cores', css: `:root,.dark,[data-theme="dark"]{ --bg: 0 0% 10%; --brand: #0b1c25; --fg: var(--bg); }
      [data-theme="light"],.light{ --bg: 0 0% 95%; }` },
  ]);
  assert.equal(t.total, 3);
  const bg = t.groups[0].items.find((i) => i.name === '--bg');
  assert.equal(bg.resolved, 'hsl(0 0% 10%)');
  assert.equal(bg.isColor, true);
  const fg = t.groups[0].items.find((i) => i.name === '--fg');
  assert.equal(fg.alias, 'bg');
  assert.equal(fg.resolved, 'hsl(0 0% 10%)');
  const light = t.themes.find((x) => x.id === 'light').values;
  assert.equal(light.bg, 'hsl(0 0% 95%)');
  assert.equal(light.fg, 'hsl(0 0% 95%)');
  assert.equal(light.brand, '#0b1c25');
});

test('parseBackofficeTokens: nome repetido em dois arquivos vale só o primeiro', () => {
  const t = parseBackofficeTokens([
    { group: 'A', css: ':root{ --radius: 1px; }' },
    { group: 'B', css: ':root{ --radius: 9px; --gap: 4px; }' },
  ]);
  assert.equal(t.total, 2);
  assert.equal(t.groups[0].items[0].resolved, '1px');
  assert.equal(t.groups[1].items.length, 1);
});

test('parseBackofficeTokens: keyframes aninhados não viram tokens', () => {
  const t = parseBackofficeTokens([{ group: 'M', css: '@keyframes spin{to{transform:rotate(360deg)}} :root{ --d: 200ms; }' }]);
  assert.equal(t.total, 1);
});

test('parseBackofficeComponents: lê o manifesto @ds-bundle e agrupa por pasta', () => {
  const js = '/* @ds-bundle: {"format":4,"components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"AppShell","sourcePath":"components/backoffice/AppShell.jsx"}]} */\n';
  const c = parseBackofficeComponents(js);
  assert.equal(c.total, 2);
  assert.deepEqual(c.categories, ['Backoffice', 'Base']);
  assert.equal(c.items.find((i) => i.name === 'Button').category, 'Base');
});

test('parseBackofficeComponents: sem manifesto, lista vazia', () => {
  assert.deepEqual(parseBackofficeComponents('var x = 1;').items, []);
});

test('parseBackofficeRules: caveats, adições e adaptações do README', () => {
  const md = [
    '# Título', '',
    '## CONTENT FUNDAMENTALS', '', '- **Tom:** direto.', '',
    '## Caveats', '- **Fontes** são carregadas do Google Fonts,', '  sem binários.', '- **Ícone** não existe.', '',
    '## Components', '', '### Intentional additions', '- **`backoffice/` group** — o shell.', '',
    '### Intentional omissions / adaptations', '- `Form` fora.', '',
    '## Using it', '- não entra aqui',
  ].join('\n');
  const r = parseBackofficeRules(md);
  assert.deepEqual(r.conventions, ['Tom: direto.']);
  assert.equal(r.attention.length, 2);
  assert.equal(r.attention[0].title, 'Fontes');
  assert.equal(r.attention[0].body, 'são carregadas do Google Fonts, sem binários.');
  assert.deepEqual(r.decisions.map((d) => d.id), ['A1', 'O1']);
});

test('loadBackofficeDs lê o snapshot do repositório', async () => {
  const ds = await loadBackofficeDs({ hubRoot });
  assert.equal(ds.title, '[P - ELL] Backoffice');
  assert.ok(ds.tokens.total > 100);
  assert.ok(ds.components.total > 100);
});

test('GET /api/design-system/backoffice responde com o DS do backoffice', async () => {
  const res = await fetch(`${base}/api/design-system/backoffice`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.title, '[P - ELL] Backoffice');
  assert.ok(Array.isArray(body.tokens.groups));
  assert.ok(Array.isArray(body.components.categories));
});
