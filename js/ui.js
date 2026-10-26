/* Utilidades compartidas por el celular y la TV */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem('infodemia_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('infodemia_' + k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem('infodemia_' + k); } catch (e) {} }
};

let toastTimer;
function toast(msg, isErr) {
  const el = $('#toast'); if (!el) return;
  el.textContent = msg; el.className = 'toast show' + (isErr ? ' err' : '');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.className = 'toast', 2600);
}
function errText(e) {
  const k = 'err.' + (e && e.message);
  return I18N.es[k] ? t(k) : (e instanceof TypeError ? t('err.network') : t('err.generic'));
}
async function copyText(txt) {
  try { await navigator.clipboard.writeText(txt); }
  catch (e) { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
  toast(t('common.copied'));
}

function phaseIdx(id) { return PHASES.findIndex(p => p.id === id); }
function teamMembers(st, team) { return ((st && st.members) || []).filter(m => m.team === team); }
function teamNews(st, team) { return ((st && st.news) || []).filter(n => n.team === team).sort((a, b) => a.slot.localeCompare(b.slot)); }
function linkify(src) {
  const s = esc(src);
  return /^https?:\/\//i.test(src) ? `<a href="${s}" target="_blank" rel="noopener">${s}</a>` : s;
}

/* Tarjeta de noticia (estilo diario) */
function newsCard(n, opts = {}) {
  const stamp = opts.verdict ? `<div class="stamp ${opts.verdict === 'real' ? 'real' : ''}">${opts.verdict === 'real' ? t('tv.real') : t('tv.fake')}</div>` : '';
  const img = n.image ? `<img src="${esc(n.image)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : '';
  const src = n.source && opts.showSource !== false ? `<div class="src">${t('cont.source')}: ${linkify(n.source)}</div>` : '';
  return `<article class="news ${opts.verdict || ''}">
    <div class="slot">${esc(n.slot)}</div>
    <div class="kicker">${esc(opts.kicker || '')}</div>
    <h4>${esc(n.title)}</h4>${img}<p>${esc(n.text)}</p>${src}${stamp}
  </article>`;
}

/* Ilustración de la noticia gancho (plancton brillante) */
function hookArt() {
  let dots = '';
  for (let i = 0; i < 70; i++) {
    const x = (i * 97) % 600, y = 120 + ((i * 53) % 110), r = 1.5 + (i % 4);
    dots += `<circle cx="${x}" cy="${y}" r="${r}" fill="#7dd3fc" opacity="${0.4 + (i % 5) / 8}"/>`;
  }
  return `<svg viewBox="0 0 600 240" style="width:100%;border-radius:10px;display:block;margin:8px 0" role="img" aria-label="plancton">
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#020617"/><stop offset="1" stop-color="#0b2545"/></linearGradient>
    <filter id="gl"><feGaussianBlur stdDeviation="3"/></filter></defs>
    <rect width="600" height="240" fill="url(#sky)"/>
    <path d="M0 95 L70 60 L120 80 L190 35 L260 75 L330 50 L400 85 L470 40 L540 70 L600 55 L600 115 L0 115Z" fill="#111827"/>
    <rect y="112" width="600" height="128" fill="#031527"/>
    <g filter="url(#gl)">${dots}</g><g>${dots}</g>
    <text x="14" y="228" fill="#94a3b8" font-size="12" font-family="monospace">FOTO: Instituto Austral de Biología Marina</text>
  </svg>`;
}
function hookCard(revealed) {
  const stamp = revealed ? `<div class="stamp">${t('tv.fake')}</div>` : '';
  return `<article class="news ${revealed ? 'fake' : ''}">
    <div class="kicker">${esc(L(HOOK.kicker))}</div>
    <h4 style="margin-right:0">${esc(L(HOOK.title))}</h4>${hookArt()}<p>${esc(L(HOOK.text))}</p>${stamp}
  </article>`;
}

function scoreRows(s) {
  return ['fooled', 'detected', 'justified', 'hook', 'vaccine', 'dilemmas', 'bonus']
    .map(k => `<div><span>${t('sc.' + k)}</span><b>${s[k]}</b></div>`).join('') +
    `<div class="tot"><span>${t('sc.total')}</span><span>${s.total} ${t('common.pts')}</span></div>`;
}

function modeBadge(el) {
  if (!el) return;
  const paint = err => {
    el.className = 'mode ' + (err ? 'off' : (API.online ? 'live' : ''));
    el.textContent = err ? t('mode.offline') : (API.online ? '● ' + t('mode.online') : t('mode.local'));
  };
  paint(null);
  API.onError(paint);
  document.addEventListener('langchange', () => paint(null));
}
