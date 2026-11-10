import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/server.mjs';
import { parseTokens, parseSections, parseJsx, examplesFromJsx, examplesOf, parseBundleManifest, parseRules } from '../src/ds.mjs';

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

test('parseSections: tabelas, listas e textos na ordem do arquivo', () => {
  const sections = parseSections([
    '# X', '', 'Intro `x`.', '',
    '## Props', '', '| Prop | Opções | Uso |', '|---|---|---|', '| `size` | md · sm | — |', '',
    '## Estados', '', '- **Nesta tela**: `variant="primary"`', '- Outro', '',
  ].join('\n'));
  assert.deepEqual(sections.map((s) => s.title), ['Props', 'Estados']);
  assert.deepEqual(sections[0].blocks, [{ type: 'table', columns: ['Prop', 'Opções', 'Uso'], rows: [['size', 'md · sm', '—']] }]);
  assert.deepEqual(sections[1].blocks, [{ type: 'list', items: ['Nesta tela: variant="primary"', 'Outro'] }]);
});

test('parseJsx: atributos string, booleanos, numéricos e children', () => {
  assert.deepEqual(parseJsx('<SocialButton provider="google" layout="icon" intent="signin" />').props,
    { provider: 'google', layout: 'icon', intent: 'signin' });
  assert.deepEqual(parseJsx('<AppHeader title="Ajuda" language={false} help />').props, { title: 'Ajuda', language: false, help: true });
  assert.deepEqual(parseJsx('<DividerText>ou entrar com:</DividerText>'), { component: 'DividerText', props: { children: 'ou entrar com:' } });
  assert.equal(parseJsx('texto qualquer'), null);
});

test('examplesFromJsx usa só as linhas do componente e sem repetir props', () => {
  const sections = parseSections([
    '## Instâncias no fluxo', '', '| Tela | Instância | JSX | Diferenças |', '|---|---|---|---|',
    '| DOC-01 | 102 | <ActionRow icon="camera">Tirar foto</ActionRow> | nenhuma |',
    '| DOC-01 | 103 | <ActionRow icon="camera">Tirar foto</ActionRow> | nenhuma |',
    '| DOC-01 | 104 | <Button>Outro</Button> | nenhuma |',
  ].join('\n'));
  const ex = examplesFromJsx(sections, 'ActionRow');
  assert.equal(ex.length, 1);
  assert.equal(ex[0].label, 'DOC-01 · instância 102');
  assert.deepEqual(ex[0].props, { icon: 'camera', children: 'Tirar foto' });
});

test('examplesOf: estados únicos a partir de renderStates', () => {
  const ex = examplesOf([
    { screen: 'A', states: [{ label: 'Nesta tela', props: { variant: 'primary' } }, { label: 'x', props: { variant: 'primary' } }] },
    { screen: 'B', states: [{ label: 'Nesta tela', props: { variant: 'secondary' } }] },
  ]);
  assert.deepEqual(ex.map((e) => e.props.variant), ['primary', 'secondary']);
  assert.equal(ex[0].label, 'A · Nesta tela');
});

test('parseBundleManifest lê os componentes do manifesto do bundle', () => {
  const names = parseBundleManifest('/* @ds-bundle: {"format":4,"components":[{"name":"Button"},{"name":"Tabs"}]} */\nwindow.x = 1;');
  assert.deepEqual([...names], ['Button', 'Tabs']);
  assert.equal(parseBundleManifest('sem manifesto').size, 0);
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

test('API /api/design-system: tokens, componentes com exemplos e regras reais', async () => {
  const res = await fetch(`${base}/api/design-system`);
  assert.equal(res.status, 200);
  const ds = await res.json();
  assert.match(ds.tokens.version, /^v\d+ \(/);
  assert.ok(ds.tokens.total > 300);
  assert.ok(ds.tokens.groups.some((g) => g.id === 'green'));
  assert.equal(ds.components.total, 31);
  assert.ok(ds.components.categories.includes('Ações'));
  const button = ds.components.items.find((c) => c.name === 'Button');
  assert.equal(button.instances, 35);
  assert.equal(button.category, 'Ações');
  assert.equal(button.inBundle, true);
  assert.ok(button.examples.length > 0 && button.examples[0].props.variant);
  assert.ok(button.sections.some((s) => s.title === 'Props'));
  // Sem estados nos components.json, os exemplos vêm do JSX da ficha.
  const social = ds.components.items.find((c) => c.name === 'SocialButton');
  assert.equal(social.examples[0].props.provider, 'google');
  assert.equal(ds.components.items.filter((c) => c.examples.length === 0).length, 0);
  assert.equal(ds.rules.decisions.length, 8);
  assert.ok(ds.rules.attention.length > 0);
  assert.ok(ds.rules.conventions.some((c) => /Precedência/.test(c)));
});

test('SPA: a tela Design System é servida e a rota é a mesma do app', async () => {
  const html = await (await fetch(`${base}/`)).text();
  assert.match(html, /href="#\/ds"/);
  const js = await (await fetch(`${base}/app.js`)).text();
  assert.match(js, /\/api\/design-system/);
  assert.match(js, /\/hub\/ds-render\.html/);
});
