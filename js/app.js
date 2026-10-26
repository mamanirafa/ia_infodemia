/* =========================================================
   INFODEMIA · App del estudiante (celular)
   ========================================================= */
(() => {
  const main = $('#main');
  let TEAM = store.get('team', null);
  if (TEAM && !teamById(TEAM)) TEAM = null;
  let VIEW = null, manual = false, lastPhase = null, lastKey = '', live = null;

  const st = () => API.state || InfodemiaCore.publicState(InfodemiaCore.emptyDb());
  const ctrl = () => st().control;
  const unlocked = id => !API.online || phaseIdx(id) <= phaseIdx(ctrl().phase);
  const myTeam = () => teamById(TEAM);

  async function act(btn, msgEl, action, payload, okText) {
    if (btn) { btn.disabled = true; btn.dataset.label = btn.dataset.label || btn.textContent; btn.textContent = t('common.sending'); }
    try {
      await API.send(action, Object.assign({ team: TEAM }, payload));
      if (msgEl) { msgEl.className = 'msg ok'; msgEl.textContent = okText || t('common.saved'); }
      toast(okText || t('common.saved'));
      return true;
    } catch (e) {
      if (msgEl) { msgEl.className = 'msg err'; msgEl.textContent = errText(e); }
      toast(errText(e), true);
      return false;
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; }
    }
  }

  /* ---------------- Inicio: elegir equipo ---------------- */
  function renderHome() {
    const s = st();
    main.innerHTML = `
      <section class="hero">
        <h1>INFO<span>DEMIA</span></h1>
        <div class="sub">${t('app.subtitle')}</div>
        <p>${t('app.tagline')}</p>
      </section>
      <h2 style="margin-top:22px">${t('home.choose')}</h2>
      <div class="teams">${TEAMS.map(tm => {
        const n = teamMembers(s, tm.id).length, str = STRAINS[tm.strain];
        return `<button class="team" style="--tc:${tm.color}" data-team="${tm.id}">
          <span class="em">${tm.emoji}</span><b>${esc(L(tm.name))}</b>
          <span class="tp">${esc(L(tm.topic))}</span>
          <div class="meta"><span class="chip">${str.emoji} ${esc(L(str.name))}</span>
          <span class="chip ${n ? 'acc' : ''}">${n ? t('home.registered', { n }) : t('home.slots', { n: tm.size })}</span></div>
        </button>`;
      }).join('')}</div>`;
    $$('[data-team]', main).forEach(b => b.onclick = () => {
      TEAM = b.dataset.team; store.set('team', TEAM); manual = false; VIEW = null; render(true);
      window.scrollTo(0, 0);
    });
  }

  /* ---------------- Cabecera del equipo + fases ---------------- */
  function headHTML() {
    const tm = myTeam(), str = STRAINS[tm.strain];
    return `<div class="teamhead" style="--tc:${tm.color}">
        <span class="em">${tm.emoji}</span>
        <div style="flex:1;min-width:0"><b>${esc(L(tm.name))}</b><div class="mut small">${esc(L(tm.topic))} · ${str.emoji} ${esc(L(str.name))}</div></div>
        <button class="linkbtn" id="changeTeam">${t('team.change')}</button>
      </div>
      <nav class="steps" id="steps"></nav>
      <div id="phase"></div>`;
  }
  function paintSteps() {
    const el = $('#steps'); if (!el) return;
    const cur = ctrl().phase;
    const html = PHASES.map(p => `<button class="step ${p.id === VIEW ? 'sel' : ''} ${p.id === cur ? 'cur' : ''} ${unlocked(p.id) ? '' : 'lock'}" data-ph="${p.id}">${p.icon} ${esc(L(p.name))}</button>`).join('');
    if (el.dataset.html === html) return;          // sin cambios: no tocar nada
    el.dataset.html = html;
    el.innerHTML = html;
    $$('[data-ph]', el).forEach(b => b.onclick = () => { VIEW = b.dataset.ph; manual = VIEW !== ctrl().phase; render(true); });
    // Centrar la fase elegida SOLO en horizontal (nunca mover la página)
    const sel = $('.step.sel', el);
    if (sel) el.scrollLeft = sel.offsetLeft - (el.clientWidth - sel.offsetWidth) / 2;
  }

  /* ---------------- Fase 1: Registro ---------------- */
  function renderRegistro(el) {
    const tm = myTeam(), str = STRAINS[tm.strain];
    const saved = teamMembers(st(), TEAM);
    let rows = store.get('reg_' + TEAM, null) || (saved.length ? saved.map(m => ({ name: m.name, role: m.role })) : Array.from({ length: tm.size }, () => ({ name: '', role: '' })));
    el.innerHTML = `
      <div class="card glow">
        <h2>${t('reg.title')}</h2><p class="mut">${t('reg.intro')}</p>
        <div id="rows"></div>
        <button class="btn ghost sm" id="addRow">${t('reg.add')}</button>
        <p class="mut small">${t('reg.three')}</p>
        <button class="btn block" id="saveReg">${t('reg.save')}</button>
        <div class="msg" id="regMsg"></div>
      </div>
      <div class="card alt">
        <div class="grid g2">
          <div><div class="mut small">${t('team.topic')}</div><h3>${tm.emoji} ${esc(L(tm.topic))}</h3><div class="mut small">${t('lab.ideas')}: ${esc(L(tm.ideas))}</div></div>
          <div><div class="mut small">${t('team.strain')}</div><h3>${str.emoji} ${esc(L(str.name))}</h3><div class="mut small">${esc(L(str.desc))}</div></div>
        </div>
      </div>
      <div class="card"><h3>${t('reg.rolesTitle')}</h3>
        <div class="grid g2">${ROLES.map(r => `<div><b>${r.emoji} ${esc(L(r.name))}</b><div class="mut small">${esc(L(r.desc))}</div></div>`).join('')}</div>
      </div>`;
    const box = $('#rows', el);
    const draw = () => {
      box.innerHTML = rows.map((r, i) => `<div class="member">
          <input type="text" data-i="${i}" data-k="name" value="${esc(r.name)}" placeholder="${t('reg.name')}" autocomplete="off" maxlength="60">
          <select data-i="${i}" data-k="role"><option value="">${t('reg.choose')}</option>${ROLES.map(x => `<option value="${x.id}" ${x.id === r.role ? 'selected' : ''}>${x.emoji} ${esc(L(x.name))}</option>`).join('')}</select>
          <button class="btn sec sm" data-del="${i}" title="${t('reg.remove')}" ${rows.length <= 2 ? 'disabled' : ''}>✕</button>
        </div>`).join('');
      $('#addRow', el).disabled = rows.length >= 4;
      $$('[data-k]', box).forEach(inp => inp.oninput = inp.onchange = () => { rows[inp.dataset.i][inp.dataset.k] = inp.value; store.set('reg_' + TEAM, rows); });
      $$('[data-del]', box).forEach(b => b.onclick = () => { rows.splice(+b.dataset.del, 1); store.set('reg_' + TEAM, rows); draw(); });
    };
    draw();
    $('#addRow', el).onclick = () => { if (rows.length < 4) { rows.push({ name: '', role: '' }); draw(); } };
    $('#saveReg', el).onclick = e => {
      const ms = rows.filter(r => r.name.trim());
      act(e.currentTarget, $('#regMsg', el), 'registerTeam', { members: ms }, t('reg.done'));
    };
    return () => {
      const n = teamMembers(st(), TEAM).length, m = $('#regMsg', el);
      if (n && m && !m.textContent) { m.className = 'msg ok'; m.textContent = t('reg.done') + ` (${n})`; }
    };
  }

  /* ---------------- Fase 2: El brote ---------------- */
  function renderBrote(el) {
    const c = ctrl();
    const mine = (st().votes || []).find(v => v.kind === 'brote' && v.team === TEAM);
    let html = `<div class="card glow"><h2>${t('brote.title')}</h2>${hookCard(c.hookRevealed)}`;
    if (c.hookRevealed) {
      const ok = mine && mine.pick === 'fake';
      html += `<div class="card ${ok ? 'glow' : 'warn'}" style="margin-bottom:0"><h3>${mine ? (ok ? t('brote.right', { p: POINTS.hook }) : t('brote.wrong')) : ''}</h3><p>${esc(L(HOOK.reveal))}</p></div>`;
    } else {
      const my = store.get('hook_' + TEAM, null);
      html += `<h3 style="margin-top:16px">${t('brote.q')}</h3>
        <div class="choice"><button class="btn big ${my === 'real' ? 'on' : ''}" data-v="real" style="background:var(--good)">${t('brote.real')}</button>
        <button class="btn big bad ${my === 'fake' ? 'on' : ''}" data-v="fake">${t('brote.fake')}</button></div>
        <div class="msg" id="hookMsg"></div>`;
    }
    el.innerHTML = html + '</div>';
    $$('[data-v]', el).forEach(b => b.onclick = async () => {
      store.set('hook_' + TEAM, b.dataset.v);
      $$('[data-v]', el).forEach(x => x.classList.toggle('on', x === b));
      await act(null, $('#hookMsg', el), 'vote', { kind: 'brote', pick: b.dataset.v }, t('brote.voted', { v: b.textContent }));
    });
    return () => {
      const m = $('#hookMsg', el), my = store.get('hook_' + TEAM, null);
      const sent = (st().votes || []).some(v => v.kind === 'brote' && v.team === TEAM);
      if (m && my && sent && !m.textContent) { m.className = 'msg ok'; m.textContent = t('brote.voted', { v: t('brote.' + my) }); }
    };
  }

  /* ---------------- Fase 3: Laboratorio ---------------- */
  function renderLab(el) {
    const tm = myTeam(), str = STRAINS[tm.strain];
    const saved = teamNews(st(), TEAM);
    let d = store.get('news_' + TEAM, null);
    if (!d) d = { fake: null, items: [0, 1].map(i => Object.assign({ title: '', text: '', source: '', image: '', prompt: '', technique: '' }, saved[i] ? { title: saved[i].title, text: saved[i].text, source: saved[i].source, image: saved[i].image } : {})) };
    const prompt = t('lab.prompt', { topic: L(tm.topic).toLowerCase(), ideas: L(tm.ideas), howto: L(str.howto) });
    const q = encodeURIComponent(L(tm.ideas).split(',')[0] + ' dato curioso ciencia CONICET');
    el.innerHTML = `
      <div class="card glow"><h2>${t('lab.title')}</h2><p>${t('lab.mission')}</p><p class="chip acc">💡 ${t('lab.tip')}</p></div>
      <div class="grid g2">
        <div class="card alt" style="margin:0"><h3>🦠 ${t('lab.howFake')}: ${str.emoji} ${esc(L(str.name))}</h3><p class="mut small">${esc(L(str.desc))}</p>
          <div class="mut small" style="margin-bottom:6px">${t('lab.promptTitle')}</div>
          <div class="prompt" id="labPrompt">${esc(prompt)}</div>
          <div class="row" style="margin-top:10px"><button class="btn sm" id="copyPrompt">📋 ${t('common.copy')}</button>
          <a class="btn sec sm" href="https://gemini.google.com/app" target="_blank" rel="noopener">Gemini ↗</a>
          <a class="btn sec sm" href="https://chatgpt.com/" target="_blank" rel="noopener">ChatGPT ↗</a></div>
        </div>
        <div class="card alt" style="margin:0"><h3>🔎 ${t('lab.searchTitle')}</h3>
          <p class="mut small">${t('lab.searchTip', { sources: SOURCES.join(', ') })}</p>
          <p class="small">${t('lab.ideas')}: ${esc(L(tm.ideas))}</p>
          <a class="btn sec sm" href="https://www.google.com/search?q=${q}" target="_blank" rel="noopener">${t('lab.openSearch')} ↗</a>
        </div>
      </div>
      <div id="editors"></div>
      <div class="card warn small">⚠️ ${t('lab.ethics')}</div>
      <button class="btn block big" id="saveNews">${t('lab.save')}</button>
      <div class="msg" id="newsMsg"></div>`;
    const box = $('#editors', el);
    const persist = () => store.set('news_' + TEAM, d);
    const draw = () => {
      box.innerHTML = d.items.map((n, i) => `<div class="card ${d.fake === i ? 'warn' : ''}">
        <div class="row" style="justify-content:space-between"><h3 style="margin:0">${t('lab.news', { n: i + 1 })}</h3>
          <label class="radio ${d.fake === i ? 'on' : ''}"><input type="radio" name="fake" data-fake="${i}" ${d.fake === i ? 'checked' : ''}> ${t('lab.isFake')}</label></div>
        <label>${t('lab.headline')} *</label><input type="text" data-i="${i}" data-k="title" maxlength="140" value="${esc(n.title)}">
        <label>${t('lab.body')} *</label><textarea data-i="${i}" data-k="text" maxlength="700">${esc(n.text)}</textarea>
        <label>${t('lab.source')}${d.fake === i ? '' : ' *'}</label><input type="text" data-i="${i}" data-k="source" maxlength="300" value="${esc(n.source)}">
        <label>${t('lab.image')}</label><input type="url" data-i="${i}" data-k="image" maxlength="500" value="${esc(n.image)}" placeholder="https://…">
        ${d.fake === i ? `<label>${t('lab.technique')} *</label><select data-i="${i}" data-k="technique"><option value="">${t('lab.chooseTech')}</option>${TECHNIQUES.map(x => `<option value="${x.id}" ${x.id === n.technique ? 'selected' : ''}>${esc(L(x.name))}</option>`).join('')}</select>
          <label>${t('lab.promptUsed')} *</label><textarea data-i="${i}" data-k="prompt" maxlength="1500">${esc(n.prompt)}</textarea>` : ''}
      </div>`).join('');
      $$('[data-k]', box).forEach(inp => inp.oninput = inp.onchange = () => { d.items[inp.dataset.i][inp.dataset.k] = inp.value; persist(); });
      $$('[data-fake]', box).forEach(r => r.onchange = () => { d.fake = +r.dataset.fake; persist(); draw(); });
    };
    draw();
    $('#copyPrompt', el).onclick = () => copyText(prompt);
    $('#saveNews', el).onclick = e => {
      const msg = $('#newsMsg', el);
      if (d.fake == null) { msg.className = 'msg err'; msg.textContent = t('err.fake'); return; }
      const real = d.items[1 - d.fake], fake = d.items[d.fake];
      if (d.items.some(n => !n.title.trim() || !n.text.trim()) || !real.source.trim() || !fake.prompt.trim() || !fake.technique) {
        msg.className = 'msg err'; msg.textContent = t('err.empty'); return;
      }
      const flip = Math.random() < 0.5;
      const items = d.items.map((n, i) => Object.assign({}, n, { slot: (i === 0) !== flip ? 'A' : 'B', isFake: i === d.fake }));
      act(e.currentTarget, msg, 'submitNews', { items }, t('lab.done'));
    };
    return () => {
      const c = ctrl(), locked = c.target === TEAM || (c.revealed || []).includes(TEAM);
      const b = $('#saveNews', el); if (b) b.disabled = locked;
      const m = $('#newsMsg', el);
      if (m && locked) { m.className = 'msg err'; m.textContent = t('err.locked'); }
      else if (m && !m.textContent && teamNews(st(), TEAM).length === 2) { m.className = 'msg ok'; m.textContent = t('lab.done'); }
    };
  }

  /* ---------------- Fase 4: Contagio ---------------- */
  function renderContagio(el) {
    const s = st(), c = s.control, target = c.target, revealed = c.revealed || [];
    const rounds = contagionRounds(s);
    const hist = rounds.length ? `<div class="card"><h3>${t('cont.history')}</h3><div class="row">${rounds.map(r => {
      const tm = teamById(r.target);
      const mark = r.target === TEAM ? `R0 ${r.infected.length}` : (r.healthy.includes(TEAM) ? '🛡️' : (r.infected.includes(TEAM) ? '🤒' : '—'));
      return `<span class="chip">${tm.emoji} ${esc(L(tm.name))} · ${mark}</span>`;
    }).join('')}</div></div>` : '';

    if (!target) { el.innerHTML = `<div class="card glow"><h2>${t('cont.title')}</h2><p>${t('cont.wait')}</p></div>${hist}`; return; }
    const tm = teamById(target), news = teamNews(s, target), isRev = revealed.includes(target);
    const fakeSlot = (news.find(n => n.isFake === true) || {}).slot;
    const cards = news.length ? `<div class="pair">${news.map(n => newsCard(n, { kicker: L(tm.name), verdict: isRev ? (n.slot === fakeSlot ? 'fake' : 'real') : '' })).join('')}</div>` : `<p class="mut">${t('cont.noNews')}</p>`;
    const head = `<div class="card glow"><div class="mut small">${t('cont.on')}</div><h2>${tm.emoji} ${esc(L(tm.name))}</h2><div class="mut small">${esc(L(tm.topic))}</div></div>`;

    if (target === TEAM) {
      const r = rounds.find(x => x.target === TEAM);
      el.innerHTML = head + `<div class="card warn"><h3>${isRev && r ? t('cont.fooled', { n: r.infected.length }) : t('cont.own')}</h3></div>` + cards + hist;
      return;
    }
    if (isRev) {
      const mine = (s.votes || []).find(v => v.kind === 'contagio' && v.team === TEAM && v.target === target);
      const ok = mine && mine.pick === fakeSlot;
      el.innerHTML = head + `<div class="card ${ok ? 'glow' : 'warn'}"><h3>${mine ? (ok ? t('cont.right', { p: POINTS.detected }) : t('cont.wrong', { v: fakeSlot })) : t('cont.wrong', { v: fakeSlot })}</h3></div>` + cards + hist;
      return;
    }
    const dk = 'vote_' + TEAM + '_' + target;
    const d = store.get(dk, { pick: '', criteria: [], why: '' });
    el.innerHTML = head + cards + `
      <div class="card glow">
        <h3>${t('cont.which')}</h3>
        <div class="choice"><button class="btn big sec ${d.pick === 'A' ? 'on' : ''}" data-pick="A">🦠 A</button><button class="btn big sec ${d.pick === 'B' ? 'on' : ''}" data-pick="B">🦠 B</button></div>
        <label>${t('cont.criteria')}</label>
        <div class="crit">${CRITERIA.map(cr => `<label class="${d.criteria.includes(cr.id) ? 'on' : ''}"><input type="checkbox" value="${cr.id}" ${d.criteria.includes(cr.id) ? 'checked' : ''}><span>${cr.emoji} ${esc(L(cr.name))}<small>${esc(L(cr.q))}</small></span></label>`).join('')}</div>
        <label>${t('cont.why')}</label><textarea id="why" maxlength="400">${esc(d.why)}</textarea>
        <button class="btn block big" id="sendVote" style="margin-top:12px">${t('cont.send')}</button>
        <div class="msg" id="voteMsg"></div>
      </div>` + hist;
    const save = () => store.set(dk, d);
    $$('[data-pick]', el).forEach(b => b.onclick = () => { d.pick = b.dataset.pick; save(); $$('[data-pick]', el).forEach(x => x.classList.toggle('on', x === b)); });
    $$('.crit input', el).forEach(cb => cb.onchange = () => { d.criteria = $$('.crit input:checked', el).map(x => x.value); cb.parentElement.classList.toggle('on', cb.checked); save(); });
    $('#why', el).oninput = e => { d.why = e.target.value; save(); };
    $('#sendVote', el).onclick = e => {
      const m = $('#voteMsg', el);
      if (!d.pick) { m.className = 'msg err'; m.textContent = t('err.pick'); return; }
      act(e.currentTarget, m, 'vote', { kind: 'contagio', target, pick: d.pick, criteria: d.criteria, why: d.why }, t('cont.sent', { v: d.pick }));
    };
    return () => {
      const m = $('#voteMsg', el);
      const sent = (st().votes || []).some(v => v.kind === 'contagio' && v.team === TEAM && v.target === target);
      if (m && sent && !m.textContent && d.pick) { m.className = 'msg ok'; m.textContent = t('cont.sent', { v: d.pick }); }
    };
  }

  /* ---------------- Fase 5: VacunaBot ---------------- */
  function renderVacuna(el) {
    const saved = (st().vaccines || []).find(v => v.team === TEAM);
    const d = store.get('vac_' + TEAM, null) || (saved ? Object.assign({}, saved) : { name: '', mission: '', equity: '', transparency: '', empathy: '', detected: null, answer: '' });
    const fields = ['name', 'mission', 'equity', 'transparency', 'empathy'];
    const build = () => t('vac.template', {
      name: d.name || '…', mission: d.mission || '…', equity: d.equity || '…', transparency: d.transparency || '…', empathy: d.empathy || '…'
    });
    el.innerHTML = `
      <div class="card glow"><h2>${t('vac.title')}</h2><p>${t('vac.intro')}</p>
        ${fields.map(f => `<label>${t('vac.' + f)} *</label><input type="text" data-k="${f}" maxlength="${f === 'name' ? 60 : 300}" value="${esc(d[f])}">`).join('')}
      </div>
      <div class="card alt"><h3>🤖 ${t('vac.preview')}</h3><div class="prompt" id="vacPrompt"></div>
        <div class="row" style="margin-top:10px"><button class="btn sm" id="copyVac">📋 ${t('common.copy')}</button>
        <a class="btn sec sm" href="https://gemini.google.com/app" target="_blank" rel="noopener">Gemini ↗</a>
        <a class="btn sec sm" href="https://chatgpt.com/" target="_blank" rel="noopener">ChatGPT ↗</a></div>
      </div>
      <div class="card"><h3>🧪 ${t('vac.test')}</h3>
        <label>${t('vac.detected')}</label>
        <div class="choice"><button class="btn sec ${d.detected === true ? 'on' : ''}" data-det="1">✅ ${t('vac.yes')}</button><button class="btn sec ${d.detected === false ? 'on' : ''}" data-det="0">❌ ${t('vac.no')}</button></div>
        <label>${t('vac.answer')}</label><textarea data-k="answer" maxlength="800">${esc(d.answer)}</textarea>
      </div>
      <button class="btn block big" id="saveVac">${t('vac.save')}</button>
      <div class="msg" id="vacMsg"></div>`;
    const paint = () => { $('#vacPrompt', el).textContent = build(); store.set('vac_' + TEAM, d); };
    $$('[data-k]', el).forEach(i => i.oninput = () => { d[i.dataset.k] = i.value; paint(); });
    $$('[data-det]', el).forEach(b => b.onclick = () => { d.detected = b.dataset.det === '1'; $$('[data-det]', el).forEach(x => x.classList.toggle('on', x === b)); paint(); });
    $('#copyVac', el).onclick = () => copyText(build());
    $('#saveVac', el).onclick = e => {
      const m = $('#vacMsg', el);
      if (fields.some(f => !String(d[f] || '').trim())) { m.className = 'msg err'; m.textContent = t('err.empty'); return; }
      act(e.currentTarget, m, 'submitVaccine', Object.assign({}, d, { prompt: build() }), t('vac.done'));
    };
    paint();
  }

  /* ---------------- Fase 6: Bioética ---------------- */
  function renderBio(el) {
    const c = ctrl(), i = Math.min(c.dilemma || 0, DILEMMAS.length - 1), dl = DILEMMAS[i];
    el.innerHTML = `<div class="card glow"><h2>${t('bio.title')}</h2><p class="mut">${t('bio.intro')}</p>
      <span class="chip acc">${t('tv.dilemma', { n: i + 1, m: DILEMMAS.length })} · ${esc(L(dl.tag))}</span>
      <p class="big-q" style="font-size:22px">${esc(L(dl.text))}</p>
      <div class="grid g3">${['si', 'no', 'depende'].map(s => `<button class="btn big sec" data-side="${s}">${{ si: '👍', no: '👎', depende: '🤔' }[s]} ${t('bio.' + s)}</button>`).join('')}</div>
      <div class="msg" id="bioMsg"></div></div>`;
    $$('[data-side]', el).forEach(b => b.onclick = () => act(null, $('#bioMsg', el), 'dilemmaVote', { dilemma: i, side: b.dataset.side }, t('bio.voted', { v: t('bio.' + b.dataset.side) })));
    return () => {
      const mine = (st().dilemmas || []).find(x => x.team === TEAM && Number(x.dilemma) === i);
      $$('[data-side]', el).forEach(b => b.classList.toggle('on', !!mine && mine.side === b.dataset.side));
      const m = $('#bioMsg', el); if (mine && m && !m.textContent) { m.className = 'msg ok'; m.textContent = t('bio.voted', { v: t('bio.' + mine.side) }); }
    };
  }

  /* ---------------- Fase 7: Cierre y certificado ---------------- */
  function renderCierre(el) {
    const s = st(), tm = myTeam(), members = teamMembers(s, TEAM);
    const sc = computeScores(s)[TEAM];
    if (!members.length) { el.innerHTML = `<div class="card warn">${t('cier.noMembers')}</div>`; return; }
    const d = store.get('exit_' + TEAM, { name: '', a1: '', a2: '' });
    el.innerHTML = `
      <div class="card"><h2>${t('cier.title')}</h2><h3>${t('cier.score')}</h3><div class="score" id="scoreBox">${scoreRows(sc)}</div></div>
      <div class="card glow">
        <label>${t('cier.who')}</label>
        <select id="who"><option value="">${t('cier.chooseName')}</option>${members.map(m => `<option ${m.name === d.name ? 'selected' : ''}>${esc(m.name)}</option>`).join('')}</select>
        <label>${t('cier.q1')}</label><textarea id="a1" maxlength="400">${esc(d.a1)}</textarea>
        <label>${t('cier.q2')}</label><textarea id="a2" maxlength="400">${esc(d.a2)}</textarea>
        <button class="btn block big" id="sendExit" style="margin-top:12px">${t('cier.send')}</button>
        <div class="msg" id="exitMsg"></div>
      </div>
      <div id="certBox" class="card hidden">
        <canvas id="certCanvas"></canvas>
        <div class="row" style="margin-top:12px"><button class="btn" id="dl">${t('cier.download')}</button><button class="btn sec" id="pr">${t('cier.print')}</button></div>
      </div>`;
    const sv = () => store.set('exit_' + TEAM, d);
    $('#who', el).onchange = e => { d.name = e.target.value; sv(); };
    $('#a1', el).oninput = e => { d.a1 = e.target.value; sv(); };
    $('#a2', el).oninput = e => { d.a2 = e.target.value; sv(); };
    const showCert = async () => {
      const m = members.find(x => x.name === d.name); if (!m) return;
      const date = new Date().toLocaleDateString(LANG === 'en' ? 'en-GB' : LANG, { day: 'numeric', month: 'long', year: 'numeric' });
      const box = $('#certBox', el); box.classList.remove('hidden');
      const cv = $('#certCanvas', el);
      await Cert.draw(cv, {
        name: m.name, role: L((roleById(m.role) || {}).name), team: L(tm.name), date,
        points: computeScores(st())[TEAM].total, code: Cert.code(m.name + '|' + TEAM + '|' + new Date().toDateString())
      });
      $('#dl', el).onclick = () => Cert.download(cv, m.name);
      $('#pr', el).onclick = () => Cert.print(cv);
      box.scrollIntoView({ behavior: 'smooth' });
    };
    $('#sendExit', el).onclick = async e => {
      const m = $('#exitMsg', el);
      if (!d.name || !d.a1.trim() || !d.a2.trim()) { m.className = 'msg err'; m.textContent = t('err.empty'); return; }
      if (await act(e.currentTarget, m, 'exitTicket', { name: d.name, a1: d.a1, a2: d.a2 })) showCert();
    };
    return () => { const b = $('#scoreBox', el); if (b) b.innerHTML = scoreRows(computeScores(st())[TEAM]); };
  }

  const RENDER = { registro: renderRegistro, brote: renderBrote, laboratorio: renderLab, contagio: renderContagio, vacuna: renderVacuna, bioetica: renderBio, cierre: renderCierre };

  /* Clave de re-render: cambia solo cuando cambia la estructura de la vista
     (así no se borra lo que el estudiante está escribiendo) */
  function viewKey() {
    const s = st(), c = s.control;
    if (!TEAM) return 'home|' + LANG + '|' + TEAMS.map(x => teamMembers(s, x.id).length).join(',');
    let k = TEAM + '|' + VIEW + '|' + LANG + '|' + unlocked(VIEW);
    if (VIEW === 'brote') k += '|' + c.hookRevealed;
    if (VIEW === 'contagio') k += '|' + c.target + '|' + (c.revealed || []).join(',') + '|' + teamNews(s, c.target).length + '|' + teamNews(s, c.target).map(n => n.title).join('');
    if (VIEW === 'bioetica') k += '|' + c.dilemma;
    if (VIEW === 'cierre') k += '|' + teamMembers(s, TEAM).map(m => m.name).join(',');
    return k;
  }

  function render(force) {
    const c = ctrl();
    if (TEAM) {
      if (lastPhase !== c.phase) { VIEW = c.phase; lastPhase = c.phase; manual = false; }
      if (!VIEW) VIEW = c.phase;
    }
    const key = viewKey();
    if (!force && key === lastKey) { paintSteps(); if (live) live(); return; }
    lastKey = key; live = null;
    if (!TEAM) { renderHome(); return; }
    main.innerHTML = headHTML();
    $('#changeTeam').onclick = () => { TEAM = null; store.del('team'); render(true); };
    paintSteps();
    const ph = $('#phase');
    if (!unlocked(VIEW)) { ph.innerHTML = `<div class="card warn"><h3>${t('phase.locked')}</h3></div>`; return; }
    live = RENDER[VIEW](ph) || null;
    if (live) live();
  }

  mountLangButton($('#langHost'));
  applyI18n();
  modeBadge($('#mode'));
  document.addEventListener('langchange', () => render(true));
  API.onState(() => render(false));
  API.start();
  render(true);
})();