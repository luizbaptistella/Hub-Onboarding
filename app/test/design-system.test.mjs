import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/server.mjs';
import { parseTokens, parseProps, parseRules } from '../src/ds.mjs';

let server, base;
before(async () => {
  server = await createApp();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

test('parseTokens resolve aliases e agrupa por prefixo', () => {
  const t = parseTokens(`:root {
    /* comentário com --falso: 1 */
    --green-800: #00522e;
    --brand-primary: var(--green-800);
    --space-4: 16px;
    --gap-x: 4px;
  }`);
  assert.equal(t.total, 4);
  const brand = t.groups.find((g) => g.id === 'brand').items[0];
  assert.equal(brand.alias, 'green-800');
  assert.equal(brand.resolved, '#00522e');
  assert.equal(brand.isColor, true);
  assert.equal(t.groups.find((g) => g.id === 'space').items[0].isColor, false);
  assert.equal(t.groups.find((g) => g.id === 'outros').items[0].name, '--gap-x');
});

test('parseTokens: referência circular não trava', () => {
  const t = parseTokens(':root { --a: var(--b); --b: var(--a); }');
  assert.equal(t.total, 2);
});

test('parseProps lê as colunas do cabeçalho', () => {
  const p = parseProps('# X\n\n## Props\n\n| Prop | Opções | Uso |\n|---|---|---|\n| `size` | md · sm | — |\n\n## Outra\n');
  assert.deepEqual(p.columns, ['Prop', 'Opções', 'Uso']);
  assert.deepEqual(p.rows, [['size', 'md · sm', '—']]);
  assert.deepEqual(parseProps('# Sem props'), { columns: [], rows: [] });
});

test('parseRules: convenções, pontos de atenção e decisões', () => {
  const r = parseRules({
    readme: '## Convenções\n\n- Códigos: `ENT` entrada.\n- Precedência: DS > spec.md.\n\n## Outra\n- fora\n',
    rulesMd: '## Pontos de atenção\n\n1. **Dois campos** — `40px` e `32px`\n   continuação da regra\n2. Sem título aqui\n',
    decisions: { 'DEC-02': 'dois', 'DEC-01': 'um' },
  });
  assert.deepEqual(r.conventions, ['Códigos: ENT entrada.', 'Precedência: DS > spec.md.']);
  assert.deepEqual(r.attention[0], { n: 1, title: 'Dois campos', body: '40px e 32px continuação da regra' });
  assert.equal(r.attention[1].title, '');
  assert.deepEqual(r.decisions.map((d) => d.id), ['DEC-01', 'DEC-02']);
});

test('API /api/design-system: tokens, componentes e regras reais', async () => {
  const res = await fetch(`${base}/api/design-system`);
  assert.equal(res.status, 200);
  const ds = await res.json();
  assert.match(ds.tokens.version, /^v\d+ \(/);
  assert.ok(ds.tokens.total > 300);
  assert.ok(ds.tokens.groups.some((g) => g.id === 'green'));
  assert.equal(ds.components.total, 31);
  const button = ds.components.items.find((c) => c.name === 'Button');
  assert.equal(button.instances, 35);
  assert.ok(button.props.rows.length > 0);
  assert.equal(ds.rules.decisions.length, 8);
  assert.ok(ds.rules.attention.length > 0);
  assert.ok(ds.rules.conventions.some((c) => /Precedência/.test(c)));
});

test('SPA: a tela Design System é servida e a rota é a mesma do app', async () => {
  const html = await (await fetch(`${base}/`)).text();
  assert.match(html, /href="#\/ds"/);
  const js = await (await fetch(`${base}/app.js`)).text();
  assert.match(js, /\/api\/design-system/);
});
