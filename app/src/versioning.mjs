// Versionamento das telas: histórico por tela (commits da main) e o que está em validação (PRs e branches fora da main).
// Fonte: git local quando o clone tem histórico completo; API do GitHub quando há GITHUB_TOKEN (necessária para PRs).
// O token fica só aqui no servidor. A interface recebe apenas títulos, autores, datas, links e códigos de tela.
import { execFile } from 'node:child_process';
import path from 'node:path';
import { realpath } from 'node:fs/promises';

const TRAILER = /^(tela|telas|motivo|por que|porque|ref|refs|referência|referencia)\s*:\s*(.*)$/i;
const COAUTHOR = /^co-authored-by:/i;
const SEP_FIELD = '\x1f';
const SEP_COMMIT = '\x1e';

// Lê título e corpo de um commit ou PR. "Por quê" vem do trailer Motivo; sem ele, do corpo livre.
export function parseMessage(subject = '', body = '') {
  const prMatch = String(subject).match(/\s*\(#(\d+)\)\s*$/);
  const title = String(subject).replace(/\s*\(#\d+\)\s*$/, '').trim();
  const cleanBody = String(body ?? '').replace(/<!--[\s\S]*?-->/g, '').replace(/\r/g, '');
  const trailers = { telas: [], motivo: null, ref: null };
  const free = [];
  for (const line of cleanBody.split('\n')) {
    const t = line.trim().match(TRAILER);
    if (t) {
      const key = t[1].toLowerCase();
      const value = t[2].trim();
      if (!value) continue;
      if (key.startsWith('tela')) trailers.telas.push(...value.split(/[,;]\s*|\s+e\s+/).map((s) => s.trim().toUpperCase()).filter(Boolean));
      else if (key.startsWith('ref')) trailers.ref = value;
      else trailers.motivo = value;
      continue;
    }
    if (COAUTHOR.test(line.trim())) continue;
    free.push(line);
  }
  const freeText = free.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  return {
    title,
    pr: prMatch ? Number(prMatch[1]) : null,
    why: trailers.motivo ?? (freeText || null),
    details: trailers.motivo && freeText ? freeText : null,
    ref: trailers.ref,
    telas: [...new Set(trailers.telas)],
  };
}

// Códigos de tela citados num texto. Entende intervalos como "DOC-47 a DOC-55".
export function mentionedCodes(text, known) {
  const found = new Set();
  const src = String(text ?? '');
  for (const m of src.matchAll(/\b([A-Z]{2,5})-(\d{2,3})\s+(?:a|até|-|–)\s+\1-(\d{2,3})\b/g)) {
    const [from, to] = [Number(m[2]), Number(m[3])];
    if (to > from && to - from <= 50) {
      for (let i = from; i <= to; i++) {
        const code = `${m[1]}-${String(i).padStart(m[2].length, '0')}`;
        if (known.has(code)) found.add(code);
      }
    }
  }
  for (const m of src.matchAll(/\b[A-Z]{2,5}(?:-[A-Z0-9]+)+\b/g)) if (known.has(m[0])) found.add(m[0]);
  return [...found];
}

export function createVersioning({
  repoDir,
  handoff,
  token = process.env.GITHUB_TOKEN ?? '',
  repo = process.env.GITHUB_REPO ?? '',
  fetchImpl = globalThis.fetch,
  ttlMs = 60_000,
  git = runGit,
} = {}) {
  const known = new Set(handoff.nodes.map((n) => n.code));
  const folderToCode = new Map(handoff.nodes.filter((n) => n.folder).map((n) => [n.folder, n.code]));
  const cache = new Map();
  const memo = async (key, fn) => {
    const hit = cache.get(key);
    if (hit && Date.now() - hit.at < ttlMs) return hit.value;
    const value = await fn();
    cache.set(key, { at: Date.now(), value });
    return value;
  };

  // Detecta, uma vez, o que o ambiente oferece: git local completo? repositório no GitHub?
  const env = memo('env', async () => {
    const top = await git(repoDir, ['rev-parse', '--show-toplevel']).catch(() => null);
    if (!top) return { git: false, repo: repo || null, prefix: 'handoff' };
    const root = await realpath(top.trim()).catch(() => top.trim());
    const handoffReal = await realpath(handoff.dir).catch(() => handoff.dir);
    const shallow = (await git(root, ['rev-parse', '--is-shallow-repository']).catch(() => 'true')).trim() === 'true';
    const remote = (await git(root, ['remote', 'get-url', 'origin']).catch(() => '')).trim();
    const fromRemote = remote.match(/github\.com[:/]([^/]+\/[^/]+?)(?:\.git)?$/)?.[1] ?? null;
    const hasMain = await git(root, ['rev-parse', '--verify', '--quiet', 'refs/heads/main']).then(() => 'main', () => null)
      ?? await git(root, ['rev-parse', '--verify', '--quiet', 'refs/remotes/origin/main']).then(() => 'origin/main', () => null);
    return {
      git: true,
      root,
      shallow,
      repo: repo || fromRemote,
      main: hasMain ?? 'HEAD',
      prefix: path.relative(root, handoffReal).split(path.sep).join('/') || '.',
    };
  });

  const links = (r) => ({
    commit: (sha) => (r ? `https://github.com/${r}/commit/${sha}` : null),
    pr: (n) => (r && n ? `https://github.com/${r}/pull/${n}` : null),
    branch: (b) => (r ? `https://github.com/${r}/tree/${encodeURIComponent(b).replace(/%2F/g, '/')}` : null),
    compare: (b, main) => (r ? `https://github.com/${r}/compare/${main}...${encodeURIComponent(b).replace(/%2F/g, '/')}` : null),
  });

  const codesFromFiles = (files, prefix) => {
    const codes = new Set();
    let flowChanged = false;
    for (const f of files) {
      if (!f.startsWith(prefix + '/')) continue;
      const rest = f.slice(prefix.length + 1);
      if (rest === 'flow.json') flowChanged = true;
      const code = folderToCode.get(rest.split('/')[0]);
      if (code) codes.add(code);
    }
    return { codes: [...codes], flowChanged };
  };

  const github = async (p) => {
    const r = await fetchImpl(`https://api.github.com${p}`, {
      headers: { accept: 'application/vnd.github+json', authorization: `Bearer ${token}`, 'x-github-api-version': '2022-11-28', 'user-agent': 'palmeiras-hub' },
    });
    if (!r.ok) throw new Error(`GitHub respondeu ${r.status}`);
    return r.json();
  };

  // Todos os commits da main com os arquivos tocados, lidos do git local.
  const localLog = () => memo('localLog', async () => {
    const e = await env;
    const out = await git(e.root, ['log', e.main, `--format=${SEP_COMMIT}%H${SEP_FIELD}%an${SEP_FIELD}%aI${SEP_FIELD}%s${SEP_FIELD}%b${SEP_FIELD}`, '--name-only'], 50 * 1024 * 1024);
    return out.split(SEP_COMMIT).filter(Boolean).map((chunk) => {
      const [sha, author, date, subject, body, names = ''] = chunk.split(SEP_FIELD);
      return { sha, author, date, subject, body, files: names.split('\n').map((s) => s.trim()).filter(Boolean) };
    });
  });

  const toEntry = (c, lk, touched) => {
    const msg = parseMessage(c.subject, c.body);
    return {
      sha: c.sha,
      short: c.sha.slice(0, 7),
      date: c.date,
      author: c.author,
      title: msg.title,
      why: msg.why,
      details: msg.details,
      ref: msg.ref,
      pr: msg.pr,
      prUrl: lk.pr(msg.pr),
      url: lk.commit(c.sha),
      touched,
    };
  };

  async function history(code) {
    const node = handoff.byCode.get(String(code ?? '').trim().toUpperCase());
    if (!node) return null;
    const e = await env;
    const lk = links(e.repo);
    const folderPath = node.folder ? `${e.prefix}/${node.folder}/` : null;

    if (e.git && !e.shallow) {
      const commits = (await localLog()).filter((c) => {
        const touched = folderPath && c.files.some((f) => f.startsWith(folderPath));
        const msg = parseMessage(c.subject, c.body);
        return touched || msg.telas.includes(node.code) || mentionedCodes(`${c.subject}\n${c.body}`, known).includes(node.code);
      });
      return { code: node.code, source: 'git', commits: commits.map((c) => toEntry(c, lk, Boolean(folderPath && c.files.some((f) => f.startsWith(folderPath))))) };
    }

    if (token && e.repo) {
      const rows = await memo(`gh-history:${node.code}`, async () => {
        const byPath = folderPath ? await github(`/repos/${e.repo}/commits?path=${encodeURIComponent(folderPath.slice(0, -1))}&per_page=100`) : [];
        const recent = await memo('gh-recent', () => github(`/repos/${e.repo}/commits?per_page=100`));
        const pathShas = new Set(byPath.map((c) => c.sha));
        const all = new Map();
        for (const c of [...byPath, ...recent]) {
          const [subject, ...bodyLines] = c.commit.message.split('\n');
          const body = bodyLines.join('\n');
          const msg = parseMessage(subject, body);
          if (!pathShas.has(c.sha) && !msg.telas.includes(node.code) && !mentionedCodes(c.commit.message, known).includes(node.code)) continue;
          all.set(c.sha, { sha: c.sha, author: c.commit.author?.name ?? c.author?.login ?? '', date: c.commit.author?.date, subject, body, touched: pathShas.has(c.sha) });
        }
        return [...all.values()].sort((a, b) => String(b.date).localeCompare(String(a.date)));
      });
      return { code: node.code, source: 'github', commits: rows.map((c) => toEntry(c, lk, c.touched)) };
    }

    return { code: node.code, source: 'indisponivel', commits: [], note: 'O servidor não tem o histórico do git (clone raso) e não há GITHUB_TOKEN configurado.' };
  }

  async function pendingFromGitHub(e, lk) {
    const meta = await github(`/repos/${e.repo}`);
    const main = meta.default_branch ?? 'main';
    const pulls = await github(`/repos/${e.repo}/pulls?state=all&sort=updated&direction=desc&per_page=100`);
    const items = [];
    for (const p of pulls.filter((x) => x.state === 'open')) {
      const files = (await github(`/repos/${e.repo}/pulls/${p.number}/files?per_page=100`)).map((f) => f.filename);
      const msg = parseMessage(p.title, p.body ?? '');
      const fromFiles = codesFromFiles(files, e.prefix);
      const codes = [...new Set([...fromFiles.codes, ...msg.telas.filter((c) => known.has(c))])];
      items.push({
        kind: 'pr',
        number: p.number,
        title: msg.title,
        why: msg.why,
        ref: msg.ref,
        author: p.user?.login ?? '',
        branch: p.head?.ref ?? '',
        draft: Boolean(p.draft),
        createdAt: p.created_at,
        updatedAt: p.updated_at,
        url: p.html_url,
        codes,
        mentioned: mentionedCodes(`${p.title}\n${p.body ?? ''}`, known).filter((c) => !codes.includes(c)),
        flowChanged: fromFiles.flowChanged,
        files: files.length,
      });
    }
    const openHeads = new Set(items.map((i) => i.branch));
    const mergedHeads = new Map(pulls.filter((x) => x.merged_at).map((x) => [x.head?.ref, x.number]));
    const branches = await github(`/repos/${e.repo}/branches?per_page=100`);
    const merged = [];
    for (const b of branches) {
      if (b.name === main || openHeads.has(b.name)) continue;
      if (mergedHeads.has(b.name)) { merged.push({ branch: b.name, pr: mergedHeads.get(b.name), url: lk.branch(b.name) }); continue; }
      const cmp = await github(`/repos/${e.repo}/compare/${encodeURIComponent(main)}...${encodeURIComponent(b.name)}`);
      if (!cmp.ahead_by) { merged.push({ branch: b.name, pr: null, url: lk.branch(b.name) }); continue; }
      const last = cmp.commits?.at(-1);
      const [subject, ...bodyLines] = (last?.commit?.message ?? b.name).split('\n');
      const msg = parseMessage(subject, bodyLines.join('\n'));
      const fromFiles = codesFromFiles((cmp.files ?? []).map((f) => f.filename), e.prefix);
      items.push({
        kind: 'branch', number: null, title: msg.title, why: msg.why, ref: msg.ref,
        author: last?.commit?.author?.name ?? '', branch: b.name, draft: false,
        createdAt: cmp.commits?.[0]?.commit?.author?.date ?? null, updatedAt: last?.commit?.author?.date ?? null,
        url: lk.compare(b.name, main), codes: [...new Set([...fromFiles.codes, ...msg.telas.filter((c) => known.has(c))])],
        mentioned: [], flowChanged: fromFiles.flowChanged, files: (cmp.files ?? []).length, commits: cmp.ahead_by,
      });
    }
    return { source: 'github', main, items, merged };
  }

  // Sem token: só branches, pelo git local. Um commit vindo de squash merge tem o mesmo patch-id e conta como já na main.
  async function pendingFromGit(e, lk) {
    const refs = (await git(e.root, ['for-each-ref', '--format=%(refname)', 'refs/heads', 'refs/remotes/origin'])).split('\n').map((s) => s.trim()).filter(Boolean);
    const byName = new Map();
    for (const ref of refs) {
      const local = ref.startsWith('refs/heads/');
      const name = ref.replace(/^refs\/heads\//, '').replace(/^refs\/remotes\/origin\//, '');
      if (name === 'HEAD' || name === 'main' || name === e.main) continue;
      const entry = byName.get(name) ?? { name, local: null, remote: null };
      entry[local ? 'local' : 'remote'] = ref;
      byName.set(name, entry);
    }
    const mainShort = e.main.replace(/^origin\//, '');
    const items = [];
    const merged = [];
    for (const b of byName.values()) {
      const ref = b.remote ?? b.local;
      const cherry = (await git(e.root, ['cherry', e.main, ref])).split('\n').filter((l) => l.startsWith('+ '));
      if (!cherry.length) { merged.push({ branch: b.name, pr: null, url: b.remote ? lk.branch(b.name) : null, localOnly: !b.remote }); continue; }
      const files = (await git(e.root, ['diff', '--name-only', `${e.main}...${ref}`])).split('\n').map((s) => s.trim()).filter(Boolean);
      const [sha, author, date, subject, body] = (await git(e.root, ['log', '-1', `--format=%H${SEP_FIELD}%an${SEP_FIELD}%aI${SEP_FIELD}%s${SEP_FIELD}%b`, ref])).split(SEP_FIELD);
      const first = (await git(e.root, ['log', '--reverse', '--format=%aI', `${e.main}..${ref}`])).split('\n')[0]?.trim() || date;
      const msg = parseMessage(subject, body);
      const fromFiles = codesFromFiles(files, e.prefix);
      items.push({
        kind: 'branch', number: null, title: msg.title, why: msg.why, ref: msg.ref, author, branch: b.name, draft: false,
        createdAt: first, updatedAt: date, url: b.remote ? lk.compare(b.name, mainShort) : null, sha,
        codes: [...new Set([...fromFiles.codes, ...msg.telas.filter((c) => known.has(c))])], mentioned: [],
        flowChanged: fromFiles.flowChanged, files: files.length, commits: cherry.length, localOnly: !b.remote,
      });
    }
    return { source: 'git', main: mainShort, items, merged, note: 'Sem GITHUB_TOKEN: o hub vê branches, mas não os PRs nem quem aprovou.' };
  }

  async function pending() {
    return memo('pending', async () => {
      const e = await env;
      const lk = links(e.repo);
      let result;
      let warning = null;
      if (token && e.repo) {
        try {
          result = await pendingFromGitHub(e, lk);
        } catch (err) {
          warning = `Não foi possível ler o GitHub (${err.message}). Mostrando o git local.`;
        }
      }
      if (!result && e.git) result = await pendingFromGit(e, lk);
      if (!result) result = { source: 'indisponivel', main: 'main', items: [], merged: [], note: 'Sem git local e sem GITHUB_TOKEN configurado.' };
      result.items.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
      const byCode = {};
      for (const it of result.items) {
        for (const c of it.codes) (byCode[c] ??= []).push({ kind: it.kind, number: it.number, branch: it.branch, url: it.url });
      }
      return { ...result, warning, byCode, checkedAt: new Date().toISOString() };
    });
  }

  return { history, pending };
}

function runGit(cwd, args, maxBuffer = 10 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    execFile('git', args, { cwd, maxBuffer, timeout: 15_000 }, (err, stdout) => (err ? reject(err) : resolve(stdout)));
  });
}
