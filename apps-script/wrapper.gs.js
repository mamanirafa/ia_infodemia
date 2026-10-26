
/* =========================================================
   INFODEMIA · Backend en Google Apps Script
   ---------------------------------------------------------
   1. Creá una Hoja de cálculo de Google nueva (ej.: "Infodemia 5.º Naturales").
   2. Extensiones → Apps Script. Borrá todo y pegá ESTE archivo completo.
   3. Cambiá TEACHER_PIN si querés (y el mismo PIN en js/config.js).
   4. Implementar → Nueva implementación → Tipo: Aplicación web
        · Ejecutar como: Yo
        · Quién tiene acceso: Cualquier usuario
   5. Copiá la URL que termina en /exec y pegala en js/config.js (scriptUrl).
   Cada pestaña de la hoja guarda un registro: Integrantes, Noticias,
   Votos, Vacunas, Dilemas, Salida, Bonus y Control.
   ========================================================= */
var TEACHER_PIN = '2026';

var TABLES = {
  members:  { sheet: 'Integrantes', cols: [['team', 'Equipo'], ['name', 'Nombre y apellido'], ['role', 'Rol'], ['ts', 'Fecha']] },
  news:     { sheet: 'Noticias',    cols: [['team', 'Equipo'], ['slot', 'Letra'], ['title', 'Titular'], ['text', 'Texto'], ['source', 'Fuente'], ['image', 'Imagen'], ['isFake', 'Es falsa'], ['technique', 'Técnica'], ['prompt', 'Prompt'], ['ts', 'Fecha']] },
  votes:    { sheet: 'Votos',       cols: [['kind', 'Tipo'], ['team', 'Equipo que vota'], ['target', 'Objetivo'], ['pick', 'Elección'], ['criteria', 'Criterios'], ['why', 'Justificación'], ['ts', 'Fecha']] },
  vaccines: { sheet: 'Vacunas',     cols: [['team', 'Equipo'], ['name', 'Nombre del bot'], ['mission', 'Misión'], ['equity', 'A · Equidad'], ['transparency', 'B · Transparencia'], ['empathy', 'C · Empatía'], ['detected', 'Detectó la falsa'], ['answer', 'Respuesta del bot'], ['prompt', 'Instrucciones'], ['ts', 'Fecha']] },
  dilemmas: { sheet: 'Dilemas',     cols: [['team', 'Equipo'], ['dilemma', 'Dilema (0-3)'], ['side', 'Postura'], ['ts', 'Fecha']] },
  exits:    { sheet: 'Salida',      cols: [['team', 'Equipo'], ['name', 'Estudiante'], ['a1', '¿Qué cepa te habría contagiado?'], ['a2', 'Criterio que usará'], ['ts', 'Fecha']] },
  bonus:    { sheet: 'Bonus',       cols: [['team', 'Equipo'], ['points', 'Puntos'], ['reason', 'Motivo'], ['ts', 'Fecha']] }
};
var BOOL = { isFake: 1, detected: 1 };
var LIST = { criteria: 1 };
var NUM = { dilemma: 1, points: 1 };
var CACHE_KEY = 'infodemia_state_v1';

function sheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold').setBackground('#0b1f3a').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  return sh;
}

function readTable_(key) {
  var def = TABLES[key];
  var sh = sheet_(def.sheet, def.cols.map(function (c) { return c[1]; }));
  var n = sh.getLastRow() - 1;
  if (n < 1) return [];
  var vals = sh.getRange(2, 1, n, def.cols.length).getValues();
  return vals.filter(function (r) { return String(r[0]) !== ''; }).map(function (r) {
    var o = {};
    def.cols.forEach(function (c, i) {
      var v = r[i], k = c[0];
      if (v instanceof Date) v = v.toISOString();
      if (BOOL[k]) v = (v === true || String(v).toUpperCase() === 'TRUE' || String(v).toUpperCase() === 'SÍ');
      else if (LIST[k]) v = String(v) ? String(v).split(/\s*,\s*/) : [];
      else if (NUM[k]) v = Number(v) || 0;
      else v = String(v);
      o[k] = v;
    });
    return o;
  });
}

function cell_(v, k) {
  if (BOOL[k]) return v ? 'SÍ' : 'NO';
  if (LIST[k]) return (v || []).join(', ');
  var s = v == null ? '' : String(v);
  if (/^[=+\-@]/.test(s)) s = "'" + s;   // evita fórmulas
  return s;
}

function writeTable_(key, rows) {
  var def = TABLES[key];
  var sh = sheet_(def.sheet, def.cols.map(function (c) { return c[1]; }));
  var last = sh.getLastRow();
  if (last > 1) sh.getRange(2, 1, last - 1, def.cols.length).clearContent();
  if (!rows.length) return;
  var data = rows.map(function (o) { return def.cols.map(function (c) { return cell_(o[c[0]], c[0]); }); });
  var rg = sh.getRange(2, 1, data.length, def.cols.length);
  rg.setNumberFormat('@');
  rg.setValues(data);
}

function readControl_() {
  var sh = sheet_('Control', ['Clave', 'Valor']);
  var c = InfodemiaCore.emptyDb().control;
  var n = sh.getLastRow() - 1;
  if (n > 0) sh.getRange(2, 1, n, 2).getValues().forEach(function (r) {
    try { c[r[0]] = JSON.parse(r[1]); } catch (e) {}
  });
  return c;
}

function writeControl_(c) {
  var sh = sheet_('Control', ['Clave', 'Valor']);
  var keys = Object.keys(c);
  var last = sh.getLastRow();
  if (last > 1) sh.getRange(2, 1, last - 1, 2).clearContent();
  var rg = sh.getRange(2, 1, keys.length, 2);
  rg.setNumberFormat('@');
  rg.setValues(keys.map(function (k) { return [k, JSON.stringify(c[k])]; }));
}

function loadDb_() {
  var db = { control: readControl_() };
  Object.keys(TABLES).forEach(function (k) { db[k] = readTable_(k); });
  return db;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function stateJson_() {
  var cache = CacheService.getScriptCache();
  var hit = cache.get(CACHE_KEY);
  if (hit) return hit;
  var s = JSON.stringify(InfodemiaCore.publicState(loadDb_()));
  try { cache.put(CACHE_KEY, s, 5); } catch (e) {}
  return s;
}

function doGet(e) {
  return ContentService.createTextOutput(stateJson_()).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var p = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var db = loadDb_();
    var res = InfodemiaCore.apply(db, p.action, p, TEACHER_PIN);
    if (res.ok) {
      res.changed.forEach(function (k) { if (k === 'control') writeControl_(db.control); else writeTable_(k, db[k]); });
      SpreadsheetApp.flush();
      var s = JSON.stringify(InfodemiaCore.publicState(db));
      try { CacheService.getScriptCache().put(CACHE_KEY, s, 5); } catch (e2) {}
    }
    return json_(res);
  } catch (err) {
    return json_({ ok: false, error: 'server', detail: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (e3) {}
  }
}

/* Ejecutá esta función una vez desde el editor para crear todas las pestañas. */
function setup() {
  writeControl_(InfodemiaCore.emptyDb().control);
  Object.keys(TABLES).forEach(function (k) { readTable_(k); });
}
