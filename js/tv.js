/* =========================================================
   INFODEMIA · Panel docente (para proyectar en la Smart TV)
   ========================================================= */
(() => {
  const stage = $('#stage'), side = $('#side'), nav = $('#nav');
  let PIN = (() => { try { return sessionStorage.getItem('infodemia_pin') || ''; } catch (e) { return ''; } })();
  let lastStage = '', lastSide = '', lastPhase = null;
  const st = () => API.state || InfodemiaCore.publicState(InfodemiaCore.emptyDb());

  const studentUrl = (() => {
    const u = new URL('index.html', location.href);
    const api = new URLSearchParams(location.search).get('api');
    if (api) u.searchParams.set('api', api);
    return u.href.replace(/index\.html(\?|$)/, '$1');
  })();

  /* ---------- PIN ---------- */
  const modal = $('#pinModal');
  function askPin() { modal.classList.remove('hidden'); $('#pinInput').value = PIN; setTimeout(() => $('#pinInput').focus(), 50); }
  $('#pinOk').onclick = () => { PIN = $('#pinInput').value.trim(); try { sessionStorage.setItem('infodemia_pin', PIN); } catch (e) {} modal.classList.add('hidden'); paint(true); };
  $('#pinInput').onkeydown = e => { if (e.key === 'Enter') $('#pinOk').click(); };
  $('#pinView').onclick = () => { modal.classList.add('hidden'); };
  $('#lockBtn').onclick = askPin;

  async function teacher(action, payload) {
    try { await API.send(action, Object.assign({ pin: PIN }, payload || {})); }
    catch (e) { toast(errText(e), true); if (e.message === 'pin') askPin(); }
  }

  /* ---------- Temporizador ---------- */
  const T = { left: 0, running: false, last: 0 };
  function setTimer(min) { T.left = min * 60; T.running = false; paintTimer(); }
  function paintTimer() {
    const s = Math.max(0, Math.round(T.left));
    $('#timer').textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    $('#timer').classList.toggle('end', s === 0 && T.running);
    $('#tStart').textContent = T.running ? t('tv.pause') : t('tv.start');
  }
  setInterval(() => { const n = Date.now(); if (T.running) { T.left = Math.max(0, T.left - (n - T.last) / 1000); paintTimer(); } T.last = n; }, 250);
  $('#tStart').onclick = () => { T.running = !T.running; T.last = Date.now(); paintTimer(); };
  $('#tReset').onclick = () => setTimer((PHASES.find(p => p.id === st().control.phase) || PHASES[0]).min);
  $('#tPlus').onclick = () => { T.left += 60; paintTimer(); };

  /* ---------- Navegación de fases ---------- */
  function paintNav() {
    const cur = st().control.phase;
    nav.innerHTML = PHASES.map((p, i) => `<button class="step ${p.id === cur ? 'sel' : ''}" data-ph="${p.id}">${p.icon} ${i + 1}. ${esc(L(p.name))} <span class="mut small" style="margin-left:auto">${p.min}′</span></button>`).join('') +
      `<div style="flex:1"></div>
       <button class="btn sec sm" id="exportCsv">⬇️ ${t('tv.export')}</button>
       <button class="btn sec sm" id="exportJson">⬇️ JSON</button>
       <button class="btn bad sm" id="resetAll">⟲ ${t('tv.reset')}</button>`;
    $$('[data-ph]', nav).forEach(b => b.onclick = () => teacher('setControl', { phase: b.dataset.ph }));
    $('#resetAll').onclick = () => { if (confirm(t('tv.resetConfirm'))) teacher('reset'); };
    $('#exportCsv').onclick = exportCsv;
    $('#exportJson').onclick = () => downloadFile('infodemia-' + new Date().toISOString().slice(0, 10) + '.json', JSON.stringify(API.online ? st() : API.exportLocal(), null, 2), 'application/json');
  }

  /* ---------- Lateral: QR + ranking ---------- */
  function sideHTML() {
    const s = st(), sc = computeScores(s);
    const order = TEAMS.slice().sort((a, b) => sc[b.id].total - sc[a.id].total);
    return `${s.control.phase !== 'registro' ? `<div class="card" style="text-align:center"><div class="mut small">${t('tv.join')}</div><div class="qr" id="qrSmall"></div><div class="url">${esc(studentUrl)}</div></div>` : ''}
      <div class="card"><h3>🏆 ${t('tv.scoreboard')}</h3><div class="rank">${order.map((tm, i) => `
        <div class="r" style="--tc:${tm.color}"><span>${['🥇', '🥈', '🥉'][i] || i + 1}</span><span>${tm.emoji} ${esc(L(tm.name))}</span><b>${sc[tm.id].total}</b>
        <span class="bx"><button class="btn sec sm" data-bonus="${tm.id}" data-p="-10">−</button><button class="btn sec sm" data-bonus="${tm.id}" data-p="10">+</button></span></div>`).join('')}</div>
        <div class="mut small" style="margin-top:8px">${t('tv.bonusHint')}</div></div>`;
  }

  function makeQR(id, size) {
    const el = document.getElementById(id);
    if (!el || el.dataset.done === studentUrl + size) return;
    el.innerHTML = ''; el.dataset.done = studentUrl + size;
    if (window.QRCode) new QRCode(el, { text: studentUrl, width: size, height: size, correctLevel: QRCode.CorrectLevel.M });
    else el.textContent = '📱';
  }

  /* ---------- Escenario por fase ---------- */
  function teamVoteDots(votes, target, fakeSlot) {
    return TEAMS.filter(tm => tm.id !== target).map(tm => {
      const v = votes.find(x => x.team === tm.id);
      const cls = !v ? '' : (fakeSlot == null ? 'ok' : (v.pick === fakeSlot ? 'ok' : 'inf'));
      return `<div class="dot ${cls}" title="${esc(L(tm.name))}">${tm.emoji}</div>`;
    }).join('');
  }

  function stRegistro(s) {
    return `<h1>🧪 ${t('reg.title').replace('🧪 ', '')}</h1>
      <div class="grid" style="grid-template-columns:auto 1fr;gap:24px;align-items:start">
        <div class="card glow" style="text-align:center;margin:0"><h3>${t('tv.join')}</h3><div class="qr" id="qrBig"></div><div class="url" style="max-width:300px;margin-top:8px">${esc(studentUrl)}</div></div>
        <div class="teams">${TEAMS.map(tm => {
          const ms = teamMembers(s, tm.id);
          return `<div class="team" style="--tc:${tm.color};cursor:default"><span class="em">${tm.emoji}</span><b>${esc(L(tm.name))}</b><span class="tp">${esc(L(tm.topic))}</span>
            <ul class="member-list">${ms.length ? ms.map(m => `<li>${(roleById(m.role) || {}).emoji || ''} <b>${esc(m.name)}</b></li>`).join('') : `<li>${t('tv.waitingTeams')}</li>`}</ul></div>`;
        }).join('')}</div>
      </div>`;
  }

  function stBrote(s) {
    const c = s.control, votes = (s.votes || []).filter(v => v.kind === 'brote');
    return `<div class="row" style="justify-content:space-between"><h1>${t('brote.title')}</h1>
        <div class="row">${c.hookRevealed ? `<button class="btn sec" data-unreveal="hook">${t('tv.hide')}</button>` : `<button class="btn big" data-reveal="hook">${t('tv.reveal')}</button>`}</div></div>
      <div class="grid" style="grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:20px;align-items:start">
        <div>${hookCard(c.hookRevealed)}</div>
        <div><div class="card"><h3>${t('brote.q')}</h3><p class="timer">${t('tv.votes', { n: votes.length, m: TEAMS.length })}</p>
          <div class="dots">${TEAMS.map(tm => { const v = votes.find(x => x.team === tm.id); return `<div class="dot ${v ? (c.hookRevealed ? (v.pick === 'fake' ? 'ok' : 'inf') : 'ok') : ''}">${tm.emoji}</div>`; }).join('')}</div></div>
          ${c.hookRevealed ? `<div class="card warn"><p style="margin:0">${esc(L(HOOK.reveal))}</p></div>` : ''}
        </div>
      </div>`;
  }

  function stLab(s) {
    return `<h1>${t('lab.title')}</h1><p class="big-q" style="font-size:24px">${t('lab.mission')}</p>
      <p class="chip acc" style="font-size:18px">💡 ${t('lab.tip')}</p>
      <div class="teams" style="margin-top:16px">${TEAMS.map(tm => {
        const str = STRAINS[tm.strain], ok = teamNews(s, tm.id).length === 2;
        return `<div class="team" style="--tc:${tm.color};cursor:default"><span class="em">${tm.emoji}</span><b>${esc(L(tm.name))}</b>
          <span class="tp">${esc(L(tm.topic))}</span><div class="meta"><span class="chip">${str.emoji} ${esc(L(str.name))}</span>
          <span class="chip ${ok ? 'acc' : ''}">${ok ? '✅ ' + t('tv.newsOk') : '⏳ ' + t('tv.newsNo')}</span></div>
          <div class="mut small" style="margin-top:8px">${esc(L(str.desc))}</div></div>`;
      }).join('')}</div>`;
  }

  function curveSVG(rounds) {
    const W = 560, H = 190, P = 34, max = TEAMS.length * Math.max(1, rounds.length);
    let cum = 0;
    const pts = [[0, 0]].concat(rounds.map((r, i) => { cum += r.infected.length; return [i + 1, cum]; }));
    const nx = Math.max(1, TEAMS.length);
    const X = i => P + (i / nx) * (W - P * 2), Y = v => H - P - (v / Math.max(4, max * 0.6)) * (H - P * 2);
    const poly = pts.map(([i, v]) => `${X(i)},${Y(v)}`).join(' ');
    return `<svg viewBox="0 0 ${W} ${H}" style="width:100%">
      <line x1="${P}" y1="${H - P}" x2="${W - P}" y2="${H - P}" stroke="#23405f"/><line x1="${P}" y1="${P / 2}" x2="${P}" y2="${H - P}" stroke="#23405f"/>
      <polyline points="${poly} ${X(pts.length - 1)},${H - P} ${X(0)},${H - P}" fill="rgba(255,77,109,.18)" stroke="none"/>
      <polyline points="${poly}" fill="none" stroke="#ff4d6d" stroke-width="4" stroke-linejoin="round"/>
      ${pts.map(([i, v], k) => `<circle cx="${X(i)}" cy="${Y(v)}" r="6" fill="#ff4d6d"/>${k ? `<text x="${X(i)}" y="${H - 10}" text-anchor="middle" font-size="18">${teamById(rounds[k - 1].target).emoji}</text><text x="${X(i)}" y="${Y(v) - 12}" text-anchor="middle" font-size="14" fill="#e8f1fb">${v}</text>` : ''}`).join('')}
      <text x="${P + 6}" y="${P / 2 + 8}" font-size="12" fill="#8fa6c1">${esc(t('tv.infected'))}</text>
    </svg>`;
  }

  function stContagio(s) {
    const c = s.control, target = c.target, revealed = c.revealed || [], rounds = contagionRounds(s);
    const picker = `<div class="row" style="margin-bottom:12px"><span class="mut">${t('tv.chooseTeam')}:</span>${TEAMS.map(tm => {
      const ok = teamNews(s, tm.id).length === 2, rev = revealed.includes(tm.id);
      return `<button class="btn ${tm.id === target ? '' : 'sec'} sm" data-target="${tm.id}" ${ok ? '' : 'disabled'}>${tm.emoji} ${esc(L(tm.name))} ${rev ? '✔' : ''}</button>`;
    }).join('')}</div>`;
    const bottom = `<div class="grid g2" style="margin-top:14px">
        <div class="card" style="margin:0"><h3>📈 ${t('tv.curve')}</h3>${curveSVG(rounds)}</div>
        <div class="card" style="margin:0"><h3>🦠 ${t('tv.r0')}</h3><div class="bars">${TEAMS.map(tm => {
          const r = rounds.find(x => x.target === tm.id);
          return `<div class="bar" style="grid-template-columns:150px 1fr 40px"><span>${tm.emoji} ${esc(L(tm.name))}</span><div class="tr"><div class="fl" style="width:${r ? (r.infected.length / (TEAMS.length - 1)) * 100 : 0}%;background:var(--bad)"></div></div><b>${r ? r.infected.length : '–'}</b></div>`;
        }).join('')}</div></div>
      </div>`;
    if (!target) return `<h1>${t('cont.title')}</h1>${picker}<p class="big-q">${t('cont.wait')}</p>${bottom}`;
    const tm = teamById(target), news = teamNews(s, target), isRev = revealed.includes(target);
    const fake = news.find(n => n.isFake === true), fakeSlot = fake ? fake.slot : null;
    const votes = (s.votes || []).filter(v => v.kind === 'contagio' && v.target === target);
    let detail = '';
    if (isRev) {
      detail = `<div class="grid g2" style="margin-top:14px">
        <div class="card" style="margin:0"><h3>🩺 ${t('cont.criteria').split('(')[0]}</h3>${votes.map(v => {
          const vt = teamById(v.team), ok = v.pick === fakeSlot;
          return `<div style="margin-bottom:10px"><b>${vt.emoji} ${esc(L(vt.name))}</b> → ${esc(v.pick)} ${ok ? '🛡️' : '🤒'}
            <div class="row" style="gap:4px;margin-top:4px">${(v.criteria || []).map(id => { const cr = CRITERIA.find(x => x.id === id); return cr ? `<span class="chip small">${cr.emoji} ${esc(L(cr.name))}</span>` : ''; }).join('')}</div>
            ${v.why ? `<div class="mut small">“${esc(v.why)}”</div>` : ''}</div>`;
        }).join('') || '—'}</div>
        <div class="card warn" style="margin:0"><h3>🧪 ${t('tv.howMade')}</h3>${fake ? `<div class="chip">${t('tv.technique')}: ${esc(L((TECHNIQUES.find(x => x.id === fake.technique) || {}).name) || '—')}</div><div class="prompt" style="margin-top:10px">${esc(fake.prompt || '')}</div>` : ''}</div>
      </div>`;
    }
    return `<div class="row" style="justify-content:space-between"><h1>${tm.emoji} ${esc(L(tm.name))}</h1>
        <div class="row"><span class="timer">${t('tv.votes', { n: votes.length, m: TEAMS.length - 1 })}</span>
        ${isRev ? `<button class="btn sec" data-unreveal="${target}">${t('tv.hide')}</button>` : `<button class="btn big" data-reveal="${target}">${t('tv.reveal')}</button>`}</div></div>
      ${picker}
      <div class="pair">${news.map(n => newsCard(n, { kicker: L(tm.topic), verdict: isRev ? (n.slot === fakeSlot ? 'fake' : 'real') : '', showSource: true })).join('')}</div>
      <div class="dots" style="margin-top:14px">${teamVoteDots(votes, target, isRev ? fakeSlot : null)}</div>
      ${detail}${bottom}`;
  }

  function stVacuna(s) {
    const vs = s.vaccines || [];
    return `<h1>${t('vac.title')}</h1><p class="big-q" style="font-size:22px">${t('vac.intro')}</p>
      ${vs.length ? `<div class="grid g2">${vs.map(v => {
        const tm = teamById(v.team);
        return `<div class="card" style="margin:0;border-left:6px solid ${tm.color}"><div class="mut small">${tm.emoji} ${esc(L(tm.name))}</div>
          <h2>🤖 ${esc(v.name)} ${v.detected ? '✅' : ''}</h2><p>${esc(v.mission)}</p>
          <div class="small"><b>A</b> ${esc(v.equity)}<br><b>B</b> ${esc(v.transparency)}<br><b>C</b> ${esc(v.empathy)}</div>
          ${v.answer ? `<div class="prompt" style="margin-top:8px">${esc(v.answer)}</div>` : ''}</div>`;
      }).join('')}</div>` : `<p class="mut">${t('tv.noVaccines')}</p>`}`;
  }

  function stBio(s) {
    const c = s.control, i = Math.min(c.dilemma || 0, DILEMMAS.length - 1), dl = DILEMMAS[i];
    const vs = (s.dilemmas || []).filter(d => Number(d.dilemma) === i);
    const sides = ['si', 'no', 'depende'];
    return `<div class="row" style="justify-content:space-between"><h1>${t('bio.title')}</h1>
        <div class="row"><button class="btn sec" data-dil="${i - 1}" ${i === 0 ? 'disabled' : ''}>${t('tv.prev')}</button>
        <span class="chip acc">${t('tv.dilemma', { n: i + 1, m: DILEMMAS.length })}</span>
        <button class="btn sec" data-dil="${i + 1}" ${i >= DILEMMAS.length - 1 ? 'disabled' : ''}>${t('tv.next')}</button></div></div>
      <div class="card glow"><span class="chip">${esc(L(dl.tag))}</span><p class="big-q">${esc(L(dl.text))}</p></div>
      <div class="card"><div class="bars">${sides.map(sd => {
        const list = vs.filter(v => v.side === sd);
        return `<div class="bar"><span>${{ si: '👍', no: '👎', depende: '🤔' }[sd]} ${t('bio.' + sd)}</span><div class="tr"><div class="fl" style="width:${(list.length / TEAMS.length) * 100}%"></div></div><b>${list.map(v => teamById(v.team).emoji).join('') || '0'}</b></div>`;
      }).join('')}</div></div>`;
  }

  function stCierre(s) {
    const sc = computeScores(s);
    const order = TEAMS.slice().sort((a, b) => sc[b.id].total - sc[a.id].total);
    const pod = [order[1], order[0], order[2]];
    const hts = [170, 230, 130];
    const nStudents = (s.members || []).length, nExit = (s.exits || []).length;
    return `<h1>🏅 ${t('tv.podium')}</h1>
      <div style="display:flex;align-items:flex-end;justify-content:center;gap:16px;margin:30px 0">${pod.map((tm, k) => tm ? `
        <div style="text-align:center;width:200px"><div style="font-size:54px">${tm.emoji}</div><b style="font-size:20px">${esc(L(tm.name))}</b>
          <div style="height:${hts[k]}px;margin-top:8px;border-radius:14px 14px 0 0;background:linear-gradient(180deg,${tm.color},rgba(255,255,255,.05));display:grid;place-items:center;font-size:38px;font-weight:800;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.6)">${['🥈', '🥇', '🥉'][k]}<span style="font-size:22px">${sc[tm.id].total}</span></div></div>` : '').join('')}</div>
      <div class="card glow" style="text-align:center"><p class="big-q" style="font-size:24px">${t('tv.getCert')}</p><p class="timer">${t('tv.exits')}: ${nExit} / ${nStudents}</p></div>`;
  }

  const STAGE = { registro: stRegistro, brote: stBrote, laboratorio: stLab, contagio: stContagio, vacuna: stVacuna, bioetica: stBio, cierre: stCierre };

  function paint(force) {
    const s = st(), ph = s.control.phase;
    if (ph !== lastPhase) { setTimer((PHASES.find(p => p.id === ph) || PHASES[0]).min); lastPhase = ph; force = true; }
    paintNav();
    const html = STAGE[ph](s);
    if (force || html !== lastStage) {
      lastStage = html; stage.innerHTML = html;
      makeQR('qrBig', 260);
      $$('[data-reveal]', stage).forEach(b => b.onclick = () => teacher('reveal', { target: b.dataset.reveal }));
      $$('[data-unreveal]', stage).forEach(b => b.onclick = () => teacher('unreveal', { target: b.dataset.unreveal }));
      $$('[data-target]', stage).forEach(b => b.onclick = () => teacher('setControl', { target: b.dataset.target }));
      $$('[data-dil]', stage).forEach(b => b.onclick = () => teacher('setControl', { dilemma: +b.dataset.dil }));
    }
    const sh = sideHTML();
    if (force || sh !== lastSide) {
      lastSide = sh; side.innerHTML = sh;
      makeQR('qrSmall', 150);
      $$('[data-bonus]', side).forEach(b => b.onclick = () => teacher('bonus', { team: b.dataset.bonus, points: +b.dataset.p, reason: 'TV' }));
    }
  }

  /* ---------- Exportar ---------- */
  function downloadFile(name, content, type) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([content], { type }));
    a.download = name; document.body.appendChild(a); a.click(); a.remove();
  }
  function exportCsv() {
    const s = API.online ? st() : InfodemiaCore.publicState(Object.assign(API.exportLocal(), {}));
    const sc = computeScores(s);
    const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
    const rows = [['Equipo', 'Estudiante', 'Rol', 'Puntaje equipo', 'Ticket: cepa', 'Ticket: criterio'].map(q).join(',')];
    (s.members || []).forEach(m => {
      const ex = (s.exits || []).find(e => e.team === m.team && e.name === m.name) || {};
      rows.push([L(teamById(m.team).name), m.name, L((roleById(m.role) || {}).name), sc[m.team].total, ex.a1, ex.a2].map(q).join(','));
    });
    downloadFile('infodemia-estudiantes-' + new Date().toISOString().slice(0, 10) + '.csv', '﻿' + rows.join('\n'), 'text/csv');
  }

  mountLangButton($('#langHost'));
  applyI18n();
  modeBadge($('#mode'));
  document.addEventListener('langchange', () => { paintTimer(); paint(true); });
  API.onState(() => paint(false));
  API.start();
  paint(true);
  paintTimer();
  if (!PIN) askPin();
})();
