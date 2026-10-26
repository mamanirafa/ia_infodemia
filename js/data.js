/* =========================================================
   INFODEMIA · Paciente Cero — Contenidos (ES / FR / EN)
   Editá este archivo para cambiar temas, cepas, roles o dilemas.
   ========================================================= */

const PHASES = [
  { id: 'registro',    icon: '🧪', min: 5,  name: { es: 'Registro',          fr: 'Inscription',        en: 'Sign-up' } },
  { id: 'brote',       icon: '🚨', min: 6,  name: { es: 'El brote',          fr: "L'épidémie",          en: 'The outbreak' } },
  { id: 'laboratorio', icon: '🧫', min: 22, name: { es: 'Laboratorio',       fr: 'Laboratoire',        en: 'Lab' } },
  { id: 'contagio',    icon: '🦠', min: 25, name: { es: 'Contagio',          fr: 'Contagion',          en: 'Contagion' } },
  { id: 'vacuna',      icon: '💉', min: 12, name: { es: 'La vacuna',         fr: 'Le vaccin',          en: 'The vaccine' } },
  { id: 'bioetica',    icon: '⚖️', min: 6,  name: { es: 'Consejo de Bioética', fr: 'Conseil de bioéthique', en: 'Bioethics Council' } },
  { id: 'cierre',      icon: '🏅', min: 4,  name: { es: 'Certificado',       fr: 'Certificat',         en: 'Certificate' } }
];

/* 19 estudiantes → 4 + 4 + 4 + 4 + 3 (cada equipo admite de 2 a 4) */
const TEAMS = [
  {
    id: 'austral', emoji: '🐧', color: '#38bdf8', size: 4, strain: 'deepfake',
    name:  { es: 'Cepa Austral', fr: 'Souche Australe', en: 'Austral Strain' },
    topic: { es: 'Ecosistemas fueguinos y Canal Beagle', fr: 'Écosystèmes de la Terre de Feu et canal Beagle', en: 'Tierra del Fuego ecosystems & Beagle Channel' },
    ideas: { es: 'pingüinos, castores invasores, bosques de lenga, centollas, ballenas, turberas, krill',
             fr: 'manchots, castors invasifs, forêts de lenga, crabes royaux, baleines, tourbières, krill',
             en: 'penguins, invasive beavers, lenga forests, king crabs, whales, peat bogs, krill' }
  },
  {
    id: 'glaciar', emoji: '🧊', color: '#5eead4', size: 4, strain: 'alucinacion',
    name:  { es: 'Cepa Glaciar', fr: 'Souche Glacier', en: 'Glacier Strain' },
    topic: { es: 'Cambio climático y Antártida', fr: 'Changement climatique et Antarctique', en: 'Climate change & Antarctica' },
    ideas: { es: 'glaciares, capa de ozono, hielo antártico, nivel del mar, CO₂, olas de calor marinas',
             fr: "glaciers, couche d'ozone, glace antarctique, niveau de la mer, CO₂, vagues de chaleur marines",
             en: 'glaciers, ozone layer, Antarctic ice, sea level, CO₂, marine heatwaves' }
  },
  {
    id: 'helice', emoji: '🧬', color: '#c084fc', size: 4, strain: 'bots',
    name:  { es: 'Cepa Hélice', fr: 'Souche Hélice', en: 'Helix Strain' },
    topic: { es: 'Genética y biotecnología', fr: 'Génétique et biotechnologie', en: 'Genetics & biotechnology' },
    ideas: { es: 'ADN, CRISPR, clonación, transgénicos, bacterias que degradan plástico, ADN antiguo',
             fr: 'ADN, CRISPR, clonage, OGM, bactéries qui dégradent le plastique, ADN ancien',
             en: 'DNA, CRISPR, cloning, GMOs, plastic-eating bacteria, ancient DNA' }
  },
  {
    id: 'neurona', emoji: '🧠', color: '#f472b6', size: 4, strain: 'sesgo',
    name:  { es: 'Cepa Neurona', fr: 'Souche Neurone', en: 'Neuron Strain' },
    topic: { es: 'Cuerpo humano y neurociencia', fr: 'Corps humain et neurosciences', en: 'Human body & neuroscience' },
    ideas: { es: 'sueño, memoria, microbiota intestinal, sentidos, músculos, adolescencia y cerebro',
             fr: "sommeil, mémoire, microbiote intestinal, sens, muscles, cerveau à l'adolescence",
             en: 'sleep, memory, gut microbiome, senses, muscles, the teenage brain' }
  },
  {
    id: 'cosmos', emoji: '🌌', color: '#fbbf24', size: 3, strain: 'contexto',
    name:  { es: 'Cepa Cosmos', fr: 'Souche Cosmos', en: 'Cosmos Strain' },
    topic: { es: 'Astronomía y física', fr: 'Astronomie et physique', en: 'Astronomy & physics' },
    ideas: { es: 'auroras australes, meteoritos (Campo del Cielo), exoplanetas, agujeros negros, la Luna',
             fr: 'aurores australes, météorites (Campo del Cielo), exoplanètes, trous noirs, la Lune',
             en: 'southern auroras, meteorites (Campo del Cielo), exoplanets, black holes, the Moon' }
  }
];

/* Tipos de desinformación (Unidad 5) → cada equipo usa una para su noticia falsa */
const STRAINS = {
  deepfake: {
    emoji: '🎭',
    name: { es: 'Deepfake', fr: 'Deepfake', en: 'Deepfake' },
    desc: { es: 'Imagen, audio o cita falsa de un “experto” que nunca existió.',
            fr: "Image, audio ou citation fausse d'un « expert » qui n'a jamais existé.",
            en: 'A fake image, audio or quote from an “expert” who never existed.' },
    howto: { es: 'incluí una cita textual de un científico inventado y describí una foto “exclusiva” generada con IA',
             fr: "inclus une citation d'un scientifique inventé et décris une photo « exclusive » générée par IA",
             en: 'include a direct quote from an invented scientist and describe an “exclusive” AI-generated photo' }
  },
  alucinacion: {
    emoji: '🌀',
    name: { es: 'Alucinación de IA', fr: "Hallucination d'IA", en: 'AI hallucination' },
    desc: { es: 'Datos, estudios o revistas inventadas que suenan muy reales.',
            fr: 'Données, études ou revues inventées qui semblent très réelles.',
            en: 'Invented data, studies or journals that sound very real.' },
    howto: { es: 'citá un estudio, una revista científica y porcentajes precisos que no existen',
             fr: "cite une étude, une revue scientifique et des pourcentages précis qui n'existent pas",
             en: "cite a study, a scientific journal and precise percentages that don't exist" }
  },
  bots: {
    emoji: '🤖',
    name: { es: 'Amplificación por bots', fr: 'Amplification par bots', en: 'Bot amplification' },
    desc: { es: 'Parece viral: miles de “compartidos” y testimonios repetidos.',
            fr: 'Elle semble virale : des milliers de « partages » et de témoignages répétés.',
            en: 'It looks viral: thousands of “shares” and repeated testimonials.' },
    howto: { es: 'escribila como posteo viral con cifras de compartidos y 2 comentarios de “usuarios” que dicen lo mismo',
             fr: 'écris-la comme un post viral avec des chiffres de partages et 2 commentaires « d’utilisateurs » qui disent la même chose',
             en: 'write it as a viral post with share counts and 2 “user” comments saying the same thing' }
  },
  sesgo: {
    emoji: '⚖️',
    name: { es: 'Sesgo', fr: 'Biais', en: 'Bias' },
    desc: { es: 'Muestra solo una parte de la evidencia, con lenguaje exagerado.',
            fr: "Ne montre qu'une partie des preuves, avec un langage exagéré.",
            en: 'Shows only part of the evidence, with exaggerated language.' },
    howto: { es: 'exagerá un efecto con palabras como “milagroso” o “definitivo” y ocultá las limitaciones',
             fr: 'exagère un effet avec des mots comme « miraculeux » ou « définitif » et cache les limites',
             en: 'exaggerate an effect with words like “miraculous” or “definitive” and hide the limitations' }
  },
  contexto: {
    emoji: '🧩',
    name: { es: 'Fuera de contexto', fr: 'Hors contexte', en: 'Out of context' },
    desc: { es: 'Un dato real usado en otro lugar, fecha o situación.',
            fr: 'Une donnée réelle utilisée dans un autre lieu, une autre date ou situation.',
            en: 'A real fact used in another place, date or situation.' },
    howto: { es: 'tomá un hecho real y cambiale el lugar o la fecha para que parezca que pasó hoy en Tierra del Fuego',
             fr: "prends un fait réel et change le lieu ou la date pour qu'il semble s'être passé aujourd'hui en Terre de Feu",
             en: 'take a real fact and change its place or date so it seems it happened today in Tierra del Fuego' }
  }
};

const ROLES = [
  { id: 'virologo', emoji: '🧪',
    name: { es: 'Virólogo/a de prompts', fr: 'Virologue des prompts', en: 'Prompt virologist' },
    desc: { es: 'Crea la noticia falsa con IA usando Role Prompting o Few-Shot.',
            fr: "Crée la fausse nouvelle avec l'IA (Role Prompting ou Few-Shot).",
            en: 'Creates the fake news with AI using Role or Few-Shot Prompting.' } },
  { id: 'rastreador', emoji: '🔎',
    name: { es: 'Rastreador/a de fuentes', fr: 'Traqueur·se de sources', en: 'Source tracker' },
    desc: { es: 'Busca la noticia verdadera en una fuente confiable.',
            fr: 'Cherche la vraie nouvelle dans une source fiable.',
            en: 'Finds the true news in a reliable source.' } },
  { id: 'epidemiologo', emoji: '🩺',
    name: { es: 'Epidemiólogo/a', fr: 'Épidémiologiste', en: 'Epidemiologist' },
    desc: { es: 'Aplica los 7 criterios para detectar las falsas de otros equipos.',
            fr: 'Applique les 7 critères pour détecter les fausses nouvelles des autres.',
            en: 'Applies the 7 criteria to detect the other teams’ fakes.' } },
  { id: 'vocero', emoji: '🎤',
    name: { es: 'Vocero/a', fr: 'Porte-parole', en: 'Spokesperson' },
    desc: { es: 'Presenta las noticias en la TV sin delatar cuál es la falsa.',
            fr: 'Présente les nouvelles à la TV sans trahir la fausse.',
            en: 'Presents the news on TV without giving away the fake one.' } }
];

/* Los 7 criterios para validar información (Unidad 5) */
const CRITERIA = [
  { id: 'relevancia',   emoji: '🎯', name: { es: 'Relevancia',   fr: 'Pertinence',   en: 'Relevance' },
    q: { es: '¿Responde a lo que necesito saber?', fr: 'Répond-elle à mon besoin ?', en: 'Does it answer what I need?' } },
  { id: 'alcance',      emoji: '🔭', name: { es: 'Alcance',      fr: 'Portée',       en: 'Scope' },
    q: { es: '¿Tiene profundidad o deja lagunas?', fr: 'Est-elle approfondie ou incomplète ?', en: 'Is it deep enough or full of gaps?' } },
  { id: 'autoridad',    emoji: '🎓', name: { es: 'Autoridad',    fr: 'Autorité',     en: 'Authority' },
    q: { es: '¿Quién lo dice? ¿Es verificable?', fr: 'Qui le dit ? Est-ce vérifiable ?', en: 'Who says it? Is it verifiable?' } },
  { id: 'credibilidad', emoji: '🧾', name: { es: 'Credibilidad', fr: 'Crédibilité',  en: 'Credibility' },
    q: { es: '¿Hay evidencia que lo respalde?', fr: 'Y a-t-il des preuves ?', en: 'Is there evidence behind it?' } },
  { id: 'actualidad',   emoji: '📅', name: { es: 'Actualidad',   fr: 'Actualité',    en: 'Currency' },
    q: { es: '¿Es reciente y tiene fecha?', fr: 'Est-ce récent et daté ?', en: 'Is it recent and dated?' } },
  { id: 'objetividad',  emoji: '🪞', name: { es: 'Objetividad',  fr: 'Objectivité',  en: 'Objectivity' },
    q: { es: '¿Es imparcial o busca manipular?', fr: 'Est-ce impartial ou manipulateur ?', en: 'Is it impartial or manipulative?' } },
  { id: 'exactitud',    emoji: '📏', name: { es: 'Exactitud',    fr: 'Exactitude',   en: 'Accuracy' },
    q: { es: '¿Los datos son correctos o exagerados?', fr: 'Les données sont-elles justes ou exagérées ?', en: 'Are the data correct or exaggerated?' } }
];

const TECHNIQUES = [
  { id: 'role',    name: { es: 'Role Prompting', fr: 'Role Prompting', en: 'Role Prompting' } },
  { id: 'fewshot', name: { es: 'Few-Shot (con ejemplos)', fr: 'Few-Shot (avec exemples)', en: 'Few-Shot (with examples)' } },
  { id: 'cot',     name: { es: 'Chain of Thought (paso a paso)', fr: 'Chain of Thought (étape par étape)', en: 'Chain of Thought (step by step)' } },
  { id: 'mix',     name: { es: 'Combinada', fr: 'Combinée', en: 'Combined' } }
];

const SOURCES = ['CONICET', 'CADIC-CONICET', 'Agencia CTyS', 'NASA', 'ESA', 'UNESCO', 'National Geographic', 'Agencia SINC', 'BBC Mundo', 'Nature News'];

/* Noticia gancho del inicio (es FALSA: la “creó el docente con IA”) */
const HOOK = {
  kicker: { es: 'ÚLTIMO MOMENTO · Ushuaia', fr: 'DERNIÈRE MINUTE · Ushuaia', en: 'BREAKING · Ushuaia' },
  title: { es: 'Descubren en el Canal Beagle un plancton que brilla cuando detecta microplásticos',
           fr: 'Découverte dans le canal Beagle d’un plancton qui brille quand il détecte des microplastiques',
           en: 'Plankton that glows when it detects microplastics discovered in the Beagle Channel' },
  text: { es: '“Es un sensor vivo: se ilumina de azul en contacto con partículas plásticas”, explicó la Dra. Marina Albarracín, del Instituto Austral de Biología Marina. Según el estudio, publicado en la revista Oceanic Frontiers, el 87 % de las muestras tomadas frente a la costa ya brillan de noche.',
          fr: '« C’est un capteur vivant : il s’illumine en bleu au contact des particules de plastique », a expliqué la Dre Marina Albarracín, de l’Institut Austral de Biologie Marine. Selon l’étude, publiée dans la revue Oceanic Frontiers, 87 % des échantillons prélevés près de la côte brillent déjà la nuit.',
          en: '“It is a living sensor: it glows blue when it touches plastic particles,” explained Dr. Marina Albarracín from the Austral Institute of Marine Biology. According to the study, published in the journal Oceanic Frontiers, 87% of samples taken off the coast already glow at night.' },
  reveal: { es: 'FALSA. La creó tu profe con IA en 5 minutos: la científica, el instituto, la revista y el 87 % son inventados (alucinación + deepfake). Lo único real: existe plancton bioluminiscente. Hoy ustedes son el Paciente Cero.',
            fr: 'FAUSSE. Ton prof l’a créée avec l’IA en 5 minutes : la scientifique, l’institut, la revue et les 87 % sont inventés (hallucination + deepfake). Seule chose vraie : le plancton bioluminescent existe. Aujourd’hui, vous êtes le Patient Zéro.',
            en: 'FAKE. Your teacher made it with AI in 5 minutes: the scientist, the institute, the journal and the 87% are invented (hallucination + deepfake). The only real part: bioluminescent plankton exists. Today, you are Patient Zero.' }
};

/* Dilemas éticos (Unidad 4) */
const DILEMMAS = [
  { tag: { es: 'Empleo', fr: 'Emploi', en: 'Jobs' },
    text: { es: 'Un laboratorio de análisis clínicos reemplaza a la mitad de sus técnicos por una IA que detecta bacterias el doble de rápido. ¿Está bien?',
            fr: 'Un laboratoire d’analyses remplace la moitié de ses techniciens par une IA qui détecte les bactéries deux fois plus vite. Est-ce acceptable ?',
            en: 'A clinical lab replaces half of its technicians with an AI that detects bacteria twice as fast. Is that OK?' } },
  { tag: { es: 'Privacidad', fr: 'Vie privée', en: 'Privacy' },
    text: { es: 'Una app gratuita mide tu sueño y usa esos datos para entrenar su IA y venderla a farmacéuticas. ¿La usarías?',
            fr: 'Une appli gratuite mesure ton sommeil et utilise ces données pour entraîner son IA et la vendre à des laboratoires. L’utiliserais-tu ?',
            en: 'A free app tracks your sleep and uses that data to train its AI and sell it to drug companies. Would you use it?' } },
  { tag: { es: 'Dependencia', fr: 'Dépendance', en: 'Dependence' },
    text: { es: 'El colegio permite hacer todos los informes de laboratorio de Biología con IA. ¿Es buena idea?',
            fr: 'Le lycée autorise à faire tous les comptes rendus de TP de biologie avec l’IA. Bonne idée ?',
            en: 'The school allows all Biology lab reports to be written with AI. Good idea?' } },
  { tag: { es: 'Decisiones automatizadas', fr: 'Décisions automatisées', en: 'Automated decisions' },
    text: { es: 'Un hospital usa una IA para decidir qué paciente recibe primero un trasplante. ¿Estás de acuerdo?',
            fr: 'Un hôpital utilise une IA pour décider quel patient reçoit une greffe en premier. Es-tu d’accord ?',
            en: 'A hospital uses an AI to decide which patient gets a transplant first. Do you agree?' } }
];

/* Puntaje (se calcula a partir del estado público) */
const POINTS = { fooled: 100, detected: 100, justified: 30, hook: 20, vaccine: 150, vaccineTest: 50, dilemma: 10 };

function teamById(id) { return TEAMS.find(t => t.id === id); }
function roleById(id) { return ROLES.find(r => r.id === id); }

function computeScores(st) {
  const out = {};
  TEAMS.forEach(t => out[t.id] = { total: 0, fooled: 0, detected: 0, justified: 0, hook: 0, vaccine: 0, dilemmas: 0, bonus: 0 });
  if (!st) return out;
  const c = st.control || {};
  const revealed = c.revealed || [];
  const fakeSlot = {};
  (st.news || []).forEach(n => { if (n.isFake === true) fakeSlot[n.team] = n.slot; });
  (st.votes || []).forEach(v => {
    if (!out[v.team]) return;
    if (v.kind === 'brote' && c.hookRevealed && v.pick === 'fake') out[v.team].hook += POINTS.hook;
    if (v.kind === 'contagio' && revealed.indexOf(v.target) >= 0 && fakeSlot[v.target] && v.team !== v.target) {
      if (v.pick === fakeSlot[v.target]) {
        out[v.team].detected += POINTS.detected;
        if ((v.criteria || []).length >= 2 && (v.why || '').length >= 20) out[v.team].justified += POINTS.justified;
      } else if (out[v.target]) {
        out[v.target].fooled += POINTS.fooled;
      }
    }
  });
  (st.vaccines || []).forEach(x => {
    if (!out[x.team]) return;
    if (x.name && x.mission && x.equity && x.transparency && x.empathy) out[x.team].vaccine += POINTS.vaccine;
    if (x.detected === true) out[x.team].vaccine += POINTS.vaccineTest;
  });
  (st.dilemmas || []).forEach(d => { if (out[d.team]) out[d.team].dilemmas += POINTS.dilemma; });
  (st.bonus || []).forEach(b => { if (out[b.team]) out[b.team].bonus += Number(b.points) || 0; });
  Object.values(out).forEach(o => o.total = o.fooled + o.detected + o.justified + o.hook + o.vaccine + o.dilemmas + o.bonus);
  return out;
}

/* Curva de contagio: por cada ronda revelada, cuántos equipos fueron “infectados” (engañados) */
function contagionRounds(st) {
  if (!st) return [];
  const c = st.control || {};
  const fakeSlot = {};
  (st.news || []).forEach(n => { if (n.isFake === true) fakeSlot[n.team] = n.slot; });
  return (c.revealed || []).map(target => {
    const votes = (st.votes || []).filter(v => v.kind === 'contagio' && v.target === target && v.team !== target);
    const infected = votes.filter(v => v.pick !== fakeSlot[target]).map(v => v.team);
    const healthy = votes.filter(v => v.pick === fakeSlot[target]).map(v => v.team);
    return { target, infected, healthy, fake: fakeSlot[target] };
  });
}
