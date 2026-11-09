// Login compartilhado: uma senha (APP_PASSWORD) para o time inteiro. Sessão em cookie assinado (HMAC).
import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const COOKIE = 'hub_session';
const SESSION_MS = 12 * 60 * 60 * 1000;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

const sha = (s) => createHash('sha256').update(s).digest();
const safeEqual = (a, b) => timingSafeEqual(sha(a), sha(b));

export function createAuth({ password, secret = randomBytes(32).toString('hex') } = {}) {
  const attempts = new Map();

  const sign = (exp) => createHmac('sha256', secret).update(String(exp)).digest('hex');

  function issueCookie({ secure }) {
    const exp = Date.now() + SESSION_MS;
    const value = `${exp}.${sign(exp)}`;
    return `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_MS / 1000}${secure ? '; Secure' : ''}`;
  }

  function clearCookie({ secure }) {
    return `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure ? '; Secure' : ''}`;
  }

  function hasSession(req) {
    const raw = parseCookies(req.headers.cookie)[COOKIE];
    if (!raw) return false;
    const [expStr, sig] = raw.split('.');
    const exp = Number(expStr);
    if (!Number.isFinite(exp) || exp < Date.now() || !sig) return false;
    return safeEqual(sig, sign(exp));
  }

  // Retorna true se a senha confere; registra tentativas por IP.
  function checkPassword(ip, given) {
    const now = Date.now();
    const entry = attempts.get(ip) ?? { count: 0, resetAt: now + WINDOW_MS };
    if (now > entry.resetAt) {
      entry.count = 0;
      entry.resetAt = now + WINDOW_MS;
    }
    if (entry.count >= MAX_ATTEMPTS) {
      attempts.set(ip, entry);
      return { ok: false, locked: true };
    }
    entry.count += 1;
    attempts.set(ip, entry);
    const ok = typeof given === 'string' && safeEqual(given, password);
    if (ok) attempts.delete(ip);
    return { ok, locked: false };
  }

  return { enabled: Boolean(password), issueCookie, clearCookie, hasSession, checkPassword };
}

export function parseCookies(header = '') {
  return Object.fromEntries(
    header.split(';').map((p) => p.trim()).filter(Boolean).map((p) => {
      const i = p.indexOf('=');
      return [p.slice(0, i), decodeURIComponent(p.slice(i + 1))];
    }),
  );
}
