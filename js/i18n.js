/* =========================================================
   Idiomas: Español (por defecto) · Français · English
   ========================================================= */
const I18N = {
  es: {
    'app.subtitle': 'Paciente Cero',
    'app.tagline': 'Un brote de desinformación científica se expande por Ushuaia. Tu equipo puede propagarlo… o detenerlo.',
    'mode.local': 'Modo local (demo)', 'mode.online': 'En vivo', 'mode.offline': 'Sin conexión, reintentando…',
    'home.choose': 'Elegí tu equipo', 'home.slots': 'hasta {n} integrantes', 'home.registered': '{n} registrados',
    'team.change': 'Cambiar equipo', 'team.topic': 'Tema', 'team.strain': 'Su cepa',
    'phase.locked': '🔒 Tu profe todavía no abrió esta fase.',
    'common.saved': '¡Guardado!', 'common.sending': 'Enviando…', 'common.copy': 'Copiar', 'common.copied': '¡Copiado!',
    'common.pts': 'pts', 'common.required': 'obligatorio',
    'err.members': 'Carguen entre 2 y 4 integrantes con nombre y apellido.', 'err.role': 'Cada integrante necesita un rol.',
    'err.locked': 'Ya no se puede modificar: está en pantalla o ya se reveló.', 'err.fake': 'Marquen cuál de las dos es la falsa.',
    'err.empty': 'Completen los campos obligatorios.', 'err.items': 'Faltan noticias.', 'err.pin': 'PIN incorrecto.',
    'err.network': 'Sin conexión. Lo escrito queda guardado en este celu: prueben de nuevo.', 'err.generic': 'No se pudo guardar. Intenten de nuevo.',
    'err.target': 'Elegí otro equipo.', 'err.pick': 'Elijan A o B.',

    'reg.title': '🧪 Registro del equipo', 'reg.intro': 'Escriban el nombre completo de cada integrante y su rol (de 2 a 4 por equipo).',
    'reg.name': 'Nombre y apellido', 'reg.choose': 'Elegí un rol…', 'reg.add': '+ Agregar integrante', 'reg.remove': 'Quitar',
    'reg.save': 'Registrar equipo', 'reg.done': '✅ Equipo registrado', 'reg.rolesTitle': 'Los roles del laboratorio',
    'reg.three': 'Si son 3 (o 2), una persona cubre dos roles: elijan el principal.',

    'brote.title': '🚨 Alerta en la TV', 'brote.q': '¿Esta noticia es real o falsa?', 'brote.real': '✅ Real', 'brote.fake': '🦠 Falsa',
    'brote.voted': 'Voto registrado: {v}. Esperen la revelación…', 'brote.right': '🛡️ ¡No se contagiaron! +{p} pts',
    'brote.wrong': '🤒 Se contagiaron… ¡Le pasa a casi todo el mundo!',

    'lab.title': '🧫 Laboratorio de cepas',
    'lab.mission': 'Misión: traigan 2 noticias sobre su tema. Una VERDADERA (buscada en internet) y una FALSA (creada con IA). Los otros equipos tendrán que adivinar cuál es la falsa.',
    'lab.tip': 'Truco: la verdadera conviene que suene increíble; la falsa, muy creíble.',
    'lab.ideas': 'Ideas', 'lab.howFake': 'Cómo fabricar su falsa', 'lab.promptTitle': 'Prompt sugerido: cópienlo, péguenlo en la IA y mejórenlo',
    'lab.prompt': 'Actuá como periodista científico de un portal de noticias argentino. Para un juego escolar de detección de desinformación, escribí una noticia FALSA pero muy creíble sobre {topic} (por ejemplo: {ideas}). Para que sea difícil de detectar, {howto}. Formato: un titular de máximo 15 palabras y un texto de 60 palabras. Ejemplo de estilo: «Titular: Hallan en Tierra del Fuego un musgo que crece tres veces más rápido / Texto: Investigadores…». No uses nombres de personas reales.',
    'lab.searchTitle': 'Buscar la verdadera', 'lab.searchTip': 'Busquen un dato sorprendente pero real en fuentes confiables ({sources}) y copien el enlace.',
    'lab.openAI': 'Abrir IA', 'lab.openSearch': 'Buscar en Google', 'lab.news': 'Noticia {n}',
    'lab.headline': 'Titular', 'lab.body': 'Texto (máx. 700 caracteres)', 'lab.source': 'Fuente o enlace', 'lab.image': 'Enlace a una imagen (opcional)',
    'lab.isFake': '🦠 Esta es la FALSA', 'lab.promptUsed': 'Prompt que usaron', 'lab.technique': 'Técnica de prompting',
    'lab.chooseTech': 'Elegí la técnica…',
    'lab.ethics': 'Reglas de bioseguridad: nada de personas reales ni contenido que ofenda o ponga en riesgo la salud. Las falsas no salen del aula.',
    'lab.save': 'Enviar al laboratorio central', 'lab.done': '✅ Noticias recibidas: se mostrarán mezcladas como A y B.',

    'cont.title': '🦠 Contagio', 'cont.wait': 'Atentos a la TV: tu profe va a mostrar las noticias de cada equipo.',
    'cont.own': '🎤 ¡Es su turno! El/la Vocero/a presenta las dos noticias. No se delaten.',
    'cont.on': 'En pantalla', 'cont.which': '¿Cuál es la FALSA?', 'cont.criteria': '¿Qué criterios la delatan? (marquen al menos 2)',
    'cont.why': 'Justificación breve', 'cont.send': 'Enviar diagnóstico', 'cont.sent': 'Diagnóstico enviado: {v}. Pueden cambiarlo hasta la revelación.',
    'cont.right': '🛡️ ¡Inmunes! Detectaron la falsa. +{p} pts', 'cont.wrong': '🤒 Infectados: la falsa era la {v}.',
    'cont.fooled': 'Su noticia contagió a {n} equipo(s). R0 = {n}', 'cont.noNews': 'Este equipo todavía no cargó noticias.',
    'cont.source': 'Fuente', 'cont.history': 'Rondas reveladas',

    'vac.title': '💉 VacunaBot', 'vac.intro': 'Diseñen un bot que ayude a adolescentes a verificar noticias científicas aplicando el ABC ético.',
    'vac.name': 'Nombre del bot', 'vac.mission': 'Misión del bot (1 frase)',
    'vac.equity': 'A · Equidad: ¿cómo evita sesgos y respeta la diversidad?',
    'vac.transparency': 'B · Transparencia: ¿qué aclara sobre lo que es y lo que no puede hacer?',
    'vac.empathy': 'C · Empatía: ¿cómo responde si alguien ya creyó una falsa?',
    'vac.preview': 'Instrucciones del bot (se arman solas)',
    'vac.test': 'Prueba de laboratorio: peguen estas instrucciones en la IA, después la noticia falsa de otro equipo, y miren qué responde.',
    'vac.detected': '¿Su bot detectó la falsa?', 'vac.yes': 'Sí', 'vac.no': 'No', 'vac.answer': 'Peguen un fragmento de la respuesta del bot',
    'vac.save': 'Registrar vacuna', 'vac.done': '✅ Vacuna registrada',
    'vac.template': 'Sos {name}, un asistente que ayuda a estudiantes de secundaria a verificar noticias científicas.\nMisión: {mission}\n\nReglas éticas:\nA · Equidad: {equity}\nB · Transparencia: {transparency}\nC · Empatía: {empathy}\n\nCuando te pasen una noticia:\n1. Analizala con los 7 criterios: relevancia, alcance, autoridad, credibilidad, actualidad, objetividad y exactitud.\n2. Indicá si parece verdadera, falsa o dudosa, y por qué.\n3. Sugerí cómo verificarla en fuentes confiables.\nNunca inventes fuentes ni datos. Si no sabés algo, decilo.',

    'bio.title': '⚖️ Consejo de Bioética', 'bio.intro': 'Debatan en equipo, voten y prepárense para defender su postura en voz alta.',
    'bio.si': 'De acuerdo', 'bio.no': 'En desacuerdo', 'bio.depende': 'Depende', 'bio.voted': 'Postura del equipo: {v}',

    'cier.title': '🏅 Cierre y certificado', 'cier.score': 'Puntaje del equipo', 'cier.who': '¿Quién sos?', 'cier.chooseName': 'Elegí tu nombre…',
    'cier.q1': '¿Qué cepa te habría contagiado a vos? ¿Por qué?', 'cier.q2': '¿Qué criterio vas a usar desde hoy antes de compartir algo?',
    'cier.send': 'Enviar y obtener mi certificado', 'cier.download': '⬇️ Descargar PNG', 'cier.print': '🖨️ Imprimir / PDF',
    'cier.noMembers': 'Primero registren al equipo en la fase 1.',

    'sc.fooled': 'Engaños (R0)', 'sc.detected': 'Detecciones', 'sc.justified': 'Justificaciones', 'sc.hook': 'Brote',
    'sc.vaccine': 'Vacuna', 'sc.dilemmas': 'Bioética', 'sc.bonus': 'Bonus', 'sc.total': 'Total',

    'cert.heading': 'CERTIFICADO DE FINALIZACIÓN', 'cert.certifies': 'Se certifica que',
    'cert.body': 'completó la misión INFODEMIA: Paciente Cero como {role} del equipo {team}, demostrando que sabe detectar desinformación, validar fuentes con 7 criterios y diseñar un bot ético con IA.',
    'cert.badge': 'DETECTOR/A DE FAKE', 'cert.badgeSub': 'Insignia', 'cert.course': '5.º año · Orientación Ciencias Naturales',
    'cert.units': 'EsencIA · Unidad 4: Herramientas de IA · Unidad 5: Desinformación', 'cert.date': 'Fecha', 'cert.points': 'Puntaje del equipo', 'cert.code': 'Código',

    'tv.title': 'Panel docente', 'tv.pin': 'PIN docente', 'tv.enter': 'Entrar', 'tv.view': 'Solo ver',
    'tv.join': 'Entrá desde tu celu', 'tv.start': '▶ Iniciar', 'tv.pause': '⏸ Pausa', 'tv.reveal': '👁 Revelar', 'tv.hide': 'Ocultar',
    'tv.votes': '{n} de {m} equipos votaron', 'tv.next': 'Siguiente ▶', 'tv.prev': '◀ Anterior', 'tv.scoreboard': 'Ranking',
    'tv.curve': 'Curva de contagio', 'tv.infected': 'Infectados', 'tv.healthy': 'Inmunes', 'tv.chooseTeam': 'Elegí qué equipo mostrar',
    'tv.status': 'Estado de los equipos', 'tv.members': 'Integrantes', 'tv.newsOk': 'Noticias listas', 'tv.newsNo': 'Sin noticias',
    'tv.reset': 'Reiniciar clase', 'tv.resetConfirm': 'Esto borra TODOS los datos de la clase. ¿Seguro?', 'tv.export': 'Exportar CSV',
    'tv.noVaccines': 'Todavía no hay vacunas registradas.', 'tv.podium': 'Podio final', 'tv.getCert': 'Completen el ticket de salida y descarguen su certificado desde el celu.',
    'tv.howMade': 'Así la fabricaron', 'tv.technique': 'Técnica', 'tv.r0': 'R0', 'tv.dilemma': 'Dilema {n} de {m}',
    'tv.fake': '🦠 FALSA', 'tv.real': '✅ VERDADERA', 'tv.waitingTeams': 'Esperando equipos…', 'tv.lockedHint': 'Ingresá el PIN para controlar la clase.',
    'tv.bonusHint': 'Tocá +/− para dar bonus', 'tv.exits': 'Tickets de salida', 'tv.notRevealed': 'Sin revelar'
  },

  fr: {
    'app.subtitle': 'Patient Zéro',
    'app.tagline': 'Une épidémie de désinformation scientifique se répand à Ushuaia. Ton équipe peut la propager… ou l’arrêter.',
    'mode.local': 'Mode local (démo)', 'mode.online': 'En direct', 'mode.offline': 'Hors ligne, nouvelle tentative…',
    'home.choose': 'Choisis ton équipe', 'home.slots': 'jusqu’à {n} membres', 'home.registered': '{n} inscrits',
    'team.change': 'Changer d’équipe', 'team.topic': 'Thème', 'team.strain': 'Votre souche',
    'phase.locked': '🔒 Ton prof n’a pas encore ouvert cette phase.',
    'common.saved': 'Enregistré !', 'common.sending': 'Envoi…', 'common.copy': 'Copier', 'common.copied': 'Copié !',
    'common.pts': 'pts', 'common.required': 'obligatoire',
    'err.members': 'Inscrivez de 2 à 4 membres avec prénom et nom.', 'err.role': 'Chaque membre a besoin d’un rôle.',
    'err.locked': 'Modification impossible : c’est à l’écran ou déjà révélé.', 'err.fake': 'Indiquez laquelle des deux est fausse.',
    'err.empty': 'Complétez les champs obligatoires.', 'err.items': 'Il manque des nouvelles.', 'err.pin': 'PIN incorrect.',
    'err.network': 'Pas de connexion. Votre texte reste sur ce téléphone : réessayez.', 'err.generic': 'Impossible d’enregistrer. Réessayez.',
    'err.target': 'Choisis une autre équipe.', 'err.pick': 'Choisissez A ou B.',

    'reg.title': '🧪 Inscription de l’équipe', 'reg.intro': 'Écrivez le nom complet de chaque membre et son rôle (2 à 4 par équipe).',
    'reg.name': 'Prénom et nom', 'reg.choose': 'Choisis un rôle…', 'reg.add': '+ Ajouter un membre', 'reg.remove': 'Retirer',
    'reg.save': 'Inscrire l’équipe', 'reg.done': '✅ Équipe inscrite', 'reg.rolesTitle': 'Les rôles du laboratoire',
    'reg.three': 'Si vous êtes 3 (ou 2), une personne couvre deux rôles : choisissez le principal.',

    'brote.title': '🚨 Alerte à la TV', 'brote.q': 'Cette nouvelle est-elle vraie ou fausse ?', 'brote.real': '✅ Vraie', 'brote.fake': '🦠 Fausse',
    'brote.voted': 'Vote enregistré : {v}. Attendez la révélation…', 'brote.right': '🛡️ Pas contaminés ! +{p} pts',
    'brote.wrong': '🤒 Contaminés… Ça arrive à presque tout le monde !',

    'lab.title': '🧫 Laboratoire des souches',
    'lab.mission': 'Mission : apportez 2 nouvelles sur votre thème. Une VRAIE (trouvée sur internet) et une FAUSSE (créée avec l’IA). Les autres équipes devront deviner laquelle est fausse.',
    'lab.tip': 'Astuce : la vraie doit sembler incroyable ; la fausse, très crédible.',
    'lab.ideas': 'Idées', 'lab.howFake': 'Comment fabriquer votre fausse nouvelle', 'lab.promptTitle': 'Prompt suggéré : copiez-le, collez-le dans l’IA et améliorez-le',
    'lab.prompt': 'Agis comme un journaliste scientifique d’un site d’actualités argentin. Pour un jeu scolaire de détection de la désinformation, écris une nouvelle FAUSSE mais très crédible sur {topic} (par exemple : {ideas}). Pour qu’elle soit difficile à détecter, {howto}. Format : un titre de 15 mots maximum et un texte de 60 mots. Exemple de style : « Titre : Une mousse qui pousse trois fois plus vite découverte en Terre de Feu / Texte : Des chercheurs… ». N’utilise pas de noms de personnes réelles.',
    'lab.searchTitle': 'Chercher la vraie', 'lab.searchTip': 'Cherchez un fait surprenant mais réel dans des sources fiables ({sources}) et copiez le lien.',
    'lab.openAI': 'Ouvrir l’IA', 'lab.openSearch': 'Chercher sur Google', 'lab.news': 'Nouvelle {n}',
    'lab.headline': 'Titre', 'lab.body': 'Texte (700 caractères max.)', 'lab.source': 'Source ou lien', 'lab.image': 'Lien vers une image (facultatif)',
    'lab.isFake': '🦠 C’est la FAUSSE', 'lab.promptUsed': 'Prompt utilisé', 'lab.technique': 'Technique de prompting',
    'lab.chooseTech': 'Choisis la technique…',
    'lab.ethics': 'Règles de biosécurité : pas de personnes réelles ni de contenu offensant ou dangereux pour la santé. Les fausses nouvelles ne sortent pas de la classe.',
    'lab.save': 'Envoyer au laboratoire central', 'lab.done': '✅ Nouvelles reçues : elles seront mélangées en A et B.',

    'cont.title': '🦠 Contagion', 'cont.wait': 'Regardez la TV : le prof va montrer les nouvelles de chaque équipe.',
    'cont.own': '🎤 C’est votre tour ! Le/la porte-parole présente les deux nouvelles. Ne vous trahissez pas.',
    'cont.on': 'À l’écran', 'cont.which': 'Laquelle est FAUSSE ?', 'cont.criteria': 'Quels critères la trahissent ? (au moins 2)',
    'cont.why': 'Brève justification', 'cont.send': 'Envoyer le diagnostic', 'cont.sent': 'Diagnostic envoyé : {v}. Modifiable jusqu’à la révélation.',
    'cont.right': '🛡️ Immunisés ! Vous avez détecté la fausse. +{p} pts', 'cont.wrong': '🤒 Contaminés : la fausse était la {v}.',
    'cont.fooled': 'Votre nouvelle a contaminé {n} équipe(s). R0 = {n}', 'cont.noNews': 'Cette équipe n’a pas encore chargé ses nouvelles.',
    'cont.source': 'Source', 'cont.history': 'Manches révélées',

    'vac.title': '💉 VaccinBot', 'vac.intro': 'Concevez un bot qui aide les ados à vérifier les nouvelles scientifiques en appliquant l’ABC éthique.',
    'vac.name': 'Nom du bot', 'vac.mission': 'Mission du bot (1 phrase)',
    'vac.equity': 'A · Équité : comment évite-t-il les biais et respecte-t-il la diversité ?',
    'vac.transparency': 'B · Transparence : que précise-t-il sur ce qu’il est et ce qu’il ne peut pas faire ?',
    'vac.empathy': 'C · Empathie : comment répond-il à quelqu’un qui a déjà cru une fausse nouvelle ?',
    'vac.preview': 'Instructions du bot (générées automatiquement)',
    'vac.test': 'Test de laboratoire : collez ces instructions dans l’IA, puis la fausse nouvelle d’une autre équipe, et regardez sa réponse.',
    'vac.detected': 'Votre bot a-t-il détecté la fausse ?', 'vac.yes': 'Oui', 'vac.no': 'Non', 'vac.answer': 'Collez un extrait de la réponse du bot',
    'vac.save': 'Enregistrer le vaccin', 'vac.done': '✅ Vaccin enregistré',
    'vac.template': 'Tu es {name}, un assistant qui aide des lycéens à vérifier des nouvelles scientifiques.\nMission : {mission}\n\nRègles éthiques :\nA · Équité : {equity}\nB · Transparence : {transparency}\nC · Empathie : {empathy}\n\nQuand on te donne une nouvelle :\n1. Analyse-la avec les 7 critères : pertinence, portée, autorité, crédibilité, actualité, objectivité et exactitude.\n2. Dis si elle semble vraie, fausse ou douteuse, et pourquoi.\n3. Suggère comment la vérifier dans des sources fiables.\nN’invente jamais de sources ni de données. Si tu ne sais pas, dis-le.',

    'bio.title': '⚖️ Conseil de bioéthique', 'bio.intro': 'Débattez en équipe, votez et préparez-vous à défendre votre position à voix haute.',
    'bio.si': 'D’accord', 'bio.no': 'Pas d’accord', 'bio.depende': 'Ça dépend', 'bio.voted': 'Position de l’équipe : {v}',

    'cier.title': '🏅 Clôture et certificat', 'cier.score': 'Score de l’équipe', 'cier.who': 'Qui es-tu ?', 'cier.chooseName': 'Choisis ton nom…',
    'cier.q1': 'Quelle souche t’aurait contaminé·e ? Pourquoi ?', 'cier.q2': 'Quel critère vas-tu utiliser dès aujourd’hui avant de partager quelque chose ?',
    'cier.send': 'Envoyer et obtenir mon certificat', 'cier.download': '⬇️ Télécharger PNG', 'cier.print': '🖨️ Imprimer / PDF',
    'cier.noMembers': 'Inscrivez d’abord l’équipe à la phase 1.',

    'sc.fooled': 'Tromperies (R0)', 'sc.detected': 'Détections', 'sc.justified': 'Justifications', 'sc.hook': 'Épidémie',
    'sc.vaccine': 'Vaccin', 'sc.dilemmas': 'Bioéthique', 'sc.bonus': 'Bonus', 'sc.total': 'Total',

    'cert.heading': 'CERTIFICAT DE RÉUSSITE', 'cert.certifies': 'Nous certifions que',
    'cert.body': 'a accompli la mission INFODEMIA : Patient Zéro en tant que {role} de l’équipe {team}, en montrant sa capacité à détecter la désinformation, à valider des sources avec 7 critères et à concevoir un bot éthique avec l’IA.',
    'cert.badge': 'DÉTECTEUR·RICE DE FAKE', 'cert.badgeSub': 'Badge', 'cert.course': '5e année · Option Sciences naturelles',
    'cert.units': 'EsencIA · Unité 4 : Outils d’IA · Unité 5 : Désinformation', 'cert.date': 'Date', 'cert.points': 'Score de l’équipe', 'cert.code': 'Code',

    'tv.title': 'Tableau du prof', 'tv.pin': 'PIN du prof', 'tv.enter': 'Entrer', 'tv.view': 'Voir seulement',
    'tv.join': 'Entre depuis ton téléphone', 'tv.start': '▶ Démarrer', 'tv.pause': '⏸ Pause', 'tv.reveal': '👁 Révéler', 'tv.hide': 'Masquer',
    'tv.votes': '{n} équipes sur {m} ont voté', 'tv.next': 'Suivant ▶', 'tv.prev': '◀ Précédent', 'tv.scoreboard': 'Classement',
    'tv.curve': 'Courbe de contagion', 'tv.infected': 'Contaminés', 'tv.healthy': 'Immunisés', 'tv.chooseTeam': 'Choisis l’équipe à montrer',
    'tv.status': 'État des équipes', 'tv.members': 'Membres', 'tv.newsOk': 'Nouvelles prêtes', 'tv.newsNo': 'Pas de nouvelles',
    'tv.reset': 'Réinitialiser', 'tv.resetConfirm': 'Cela efface TOUTES les données de la classe. Sûr ?', 'tv.export': 'Exporter CSV',
    'tv.noVaccines': 'Aucun vaccin enregistré pour l’instant.', 'tv.podium': 'Podium final', 'tv.getCert': 'Remplissez le ticket de sortie et téléchargez votre certificat sur le téléphone.',
    'tv.howMade': 'Comment ils l’ont fabriquée', 'tv.technique': 'Technique', 'tv.r0': 'R0', 'tv.dilemma': 'Dilemme {n} sur {m}',
    'tv.fake': '🦠 FAUSSE', 'tv.real': '✅ VRAIE', 'tv.waitingTeams': 'En attente des équipes…', 'tv.lockedHint': 'Saisis le PIN pour piloter la classe.',
    'tv.bonusHint': 'Touche +/− pour donner un bonus', 'tv.exits': 'Tickets de sortie', 'tv.notRevealed': 'Non révélée'
  },

  en: {
    'app.subtitle': 'Patient Zero',
    'app.tagline': 'An outbreak of science misinformation is spreading through Ushuaia. Your team can spread it… or stop it.',
    'mode.local': 'Local mode (demo)', 'mode.online': 'Live', 'mode.offline': 'Offline, retrying…',
    'home.choose': 'Choose your team', 'home.slots': 'up to {n} members', 'home.registered': '{n} signed up',
    'team.change': 'Change team', 'team.topic': 'Topic', 'team.strain': 'Your strain',
    'phase.locked': '🔒 Your teacher hasn’t opened this phase yet.',
    'common.saved': 'Saved!', 'common.sending': 'Sending…', 'common.copy': 'Copy', 'common.copied': 'Copied!',
    'common.pts': 'pts', 'common.required': 'required',
    'err.members': 'Add 2 to 4 members with first and last name.', 'err.role': 'Every member needs a role.',
    'err.locked': 'Can’t be changed: it’s on screen or already revealed.', 'err.fake': 'Mark which one is the fake.',
    'err.empty': 'Fill in the required fields.', 'err.items': 'Some news is missing.', 'err.pin': 'Wrong PIN.',
    'err.network': 'No connection. Your text stays on this phone: try again.', 'err.generic': 'Could not save. Try again.',
    'err.target': 'Choose another team.', 'err.pick': 'Choose A or B.',

    'reg.title': '🧪 Team sign-up', 'reg.intro': 'Write each member’s full name and role (2 to 4 per team).',
    'reg.name': 'First and last name', 'reg.choose': 'Choose a role…', 'reg.add': '+ Add member', 'reg.remove': 'Remove',
    'reg.save': 'Register team', 'reg.done': '✅ Team registered', 'reg.rolesTitle': 'Lab roles',
    'reg.three': 'If you are 3 (or 2), one person covers two roles: pick the main one.',

    'brote.title': '🚨 Alert on TV', 'brote.q': 'Is this news real or fake?', 'brote.real': '✅ Real', 'brote.fake': '🦠 Fake',
    'brote.voted': 'Vote saved: {v}. Wait for the reveal…', 'brote.right': '🛡️ Not infected! +{p} pts',
    'brote.wrong': '🤒 Infected… It happens to almost everyone!',

    'lab.title': '🧫 Strain lab',
    'lab.mission': 'Mission: bring 2 news items about your topic. One TRUE (found online) and one FAKE (made with AI). The other teams will have to guess which one is fake.',
    'lab.tip': 'Tip: the true one should sound unbelievable; the fake one, very believable.',
    'lab.ideas': 'Ideas', 'lab.howFake': 'How to make your fake', 'lab.promptTitle': 'Suggested prompt: copy it, paste it into the AI and improve it',
    'lab.prompt': 'Act as a science journalist for an Argentine news site. For a school game about detecting misinformation, write a FAKE but very believable news story about {topic} (for example: {ideas}). To make it hard to detect, {howto}. Format: a headline of up to 15 words and a 60-word text. Style example: “Headline: Moss that grows three times faster found in Tierra del Fuego / Text: Researchers…”. Do not use real people’s names.',
    'lab.searchTitle': 'Find the true one', 'lab.searchTip': 'Look for a surprising but real fact in reliable sources ({sources}) and copy the link.',
    'lab.openAI': 'Open AI', 'lab.openSearch': 'Search Google', 'lab.news': 'News {n}',
    'lab.headline': 'Headline', 'lab.body': 'Text (max. 700 characters)', 'lab.source': 'Source or link', 'lab.image': 'Image link (optional)',
    'lab.isFake': '🦠 This is the FAKE', 'lab.promptUsed': 'Prompt you used', 'lab.technique': 'Prompting technique',
    'lab.chooseTech': 'Choose the technique…',
    'lab.ethics': 'Biosafety rules: no real people and nothing offensive or harmful to health. Fakes never leave the classroom.',
    'lab.save': 'Send to the central lab', 'lab.done': '✅ News received: they will be shown shuffled as A and B.',

    'cont.title': '🦠 Contagion', 'cont.wait': 'Watch the TV: your teacher will show each team’s news.',
    'cont.own': '🎤 Your turn! The spokesperson presents both news items. Don’t give it away.',
    'cont.on': 'On screen', 'cont.which': 'Which one is FAKE?', 'cont.criteria': 'Which criteria give it away? (pick at least 2)',
    'cont.why': 'Short justification', 'cont.send': 'Send diagnosis', 'cont.sent': 'Diagnosis sent: {v}. You can change it until the reveal.',
    'cont.right': '🛡️ Immune! You spotted the fake. +{p} pts', 'cont.wrong': '🤒 Infected: the fake was {v}.',
    'cont.fooled': 'Your news infected {n} team(s). R0 = {n}', 'cont.noNews': 'This team hasn’t uploaded its news yet.',
    'cont.source': 'Source', 'cont.history': 'Revealed rounds',

    'vac.title': '💉 VaccineBot', 'vac.intro': 'Design a bot that helps teens check science news using the ethical ABC.',
    'vac.name': 'Bot name', 'vac.mission': 'Bot mission (1 sentence)',
    'vac.equity': 'A · Equity: how does it avoid bias and respect diversity?',
    'vac.transparency': 'B · Transparency: what does it say about what it is and what it can’t do?',
    'vac.empathy': 'C · Empathy: how does it respond to someone who already believed a fake?',
    'vac.preview': 'Bot instructions (built automatically)',
    'vac.test': 'Lab test: paste these instructions into the AI, then another team’s fake news, and see what it says.',
    'vac.detected': 'Did your bot detect the fake?', 'vac.yes': 'Yes', 'vac.no': 'No', 'vac.answer': 'Paste a snippet of the bot’s answer',
    'vac.save': 'Register vaccine', 'vac.done': '✅ Vaccine registered',
    'vac.template': 'You are {name}, an assistant that helps high-school students check science news.\nMission: {mission}\n\nEthical rules:\nA · Equity: {equity}\nB · Transparency: {transparency}\nC · Empathy: {empathy}\n\nWhen you receive a news item:\n1. Analyse it with the 7 criteria: relevance, scope, authority, credibility, currency, objectivity and accuracy.\n2. Say whether it looks true, fake or doubtful, and why.\n3. Suggest how to check it in reliable sources.\nNever invent sources or data. If you don’t know something, say so.',

    'bio.title': '⚖️ Bioethics Council', 'bio.intro': 'Discuss as a team, vote and get ready to defend your position out loud.',
    'bio.si': 'Agree', 'bio.no': 'Disagree', 'bio.depende': 'It depends', 'bio.voted': 'Team position: {v}',

    'cier.title': '🏅 Wrap-up & certificate', 'cier.score': 'Team score', 'cier.who': 'Who are you?', 'cier.chooseName': 'Choose your name…',
    'cier.q1': 'Which strain would have infected you? Why?', 'cier.q2': 'Which criterion will you use from today before sharing something?',
    'cier.send': 'Send and get my certificate', 'cier.download': '⬇️ Download PNG', 'cier.print': '🖨️ Print / PDF',
    'cier.noMembers': 'First register your team in phase 1.',

    'sc.fooled': 'Deceptions (R0)', 'sc.detected': 'Detections', 'sc.justified': 'Justifications', 'sc.hook': 'Outbreak',
    'sc.vaccine': 'Vaccine', 'sc.dilemmas': 'Bioethics', 'sc.bonus': 'Bonus', 'sc.total': 'Total',

    'cert.heading': 'CERTIFICATE OF COMPLETION', 'cert.certifies': 'This certifies that',
    'cert.body': 'completed the mission INFODEMIA: Patient Zero as {role} of team {team}, showing the ability to detect misinformation, validate sources with 7 criteria and design an ethical AI bot.',
    'cert.badge': 'FAKE DETECTOR', 'cert.badgeSub': 'Badge', 'cert.course': '5th year · Natural Sciences track',
    'cert.units': 'EsencIA · Unit 4: AI tools · Unit 5: Misinformation', 'cert.date': 'Date', 'cert.points': 'Team score', 'cert.code': 'Code',

    'tv.title': 'Teacher panel', 'tv.pin': 'Teacher PIN', 'tv.enter': 'Enter', 'tv.view': 'View only',
    'tv.join': 'Join from your phone', 'tv.start': '▶ Start', 'tv.pause': '⏸ Pause', 'tv.reveal': '👁 Reveal', 'tv.hide': 'Hide',
    'tv.votes': '{n} of {m} teams voted', 'tv.next': 'Next ▶', 'tv.prev': '◀ Previous', 'tv.scoreboard': 'Leaderboard',
    'tv.curve': 'Contagion curve', 'tv.infected': 'Infected', 'tv.healthy': 'Immune', 'tv.chooseTeam': 'Choose which team to show',
    'tv.status': 'Team status', 'tv.members': 'Members', 'tv.newsOk': 'News ready', 'tv.newsNo': 'No news',
    'tv.reset': 'Reset class', 'tv.resetConfirm': 'This deletes ALL class data. Are you sure?', 'tv.export': 'Export CSV',
    'tv.noVaccines': 'No vaccines registered yet.', 'tv.podium': 'Final podium', 'tv.getCert': 'Fill in the exit ticket and download your certificate on your phone.',
    'tv.howMade': 'How they made it', 'tv.technique': 'Technique', 'tv.r0': 'R0', 'tv.dilemma': 'Dilemma {n} of {m}',
    'tv.fake': '🦠 FAKE', 'tv.real': '✅ TRUE', 'tv.waitingTeams': 'Waiting for teams…', 'tv.lockedHint': 'Enter the PIN to control the class.',
    'tv.bonusHint': 'Tap +/− to give a bonus', 'tv.exits': 'Exit tickets', 'tv.notRevealed': 'Not revealed'
  }
};

const LANGS = [
  { id: 'es', label: 'Español' },
  { id: 'fr', label: 'Français' },
  { id: 'en', label: 'English' }
];

let LANG = (() => { try { return localStorage.getItem('infodemia_lang') || 'es'; } catch (e) { return 'es'; } })();
if (!I18N[LANG]) LANG = 'es';

function t(key, vars) {
  let s = (I18N[LANG] && I18N[LANG][key]) || I18N.es[key] || key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, v) => (vars[v] != null ? vars[v] : m));
  return s;
}
function L(o) { return o == null ? '' : (typeof o === 'string' ? o : (o[LANG] || o.es || '')); }

function applyI18n(root) {
  (root || document).querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  (root || document).querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.documentElement.lang = LANG;
}

function setLang(l) {
  if (!I18N[l]) return;
  LANG = l;
  try { localStorage.setItem('infodemia_lang', l); } catch (e) {}
  applyI18n();
  document.dispatchEvent(new CustomEvent('langchange'));
}

/* Botón 🌐 ES ▾ (arriba a la derecha) */
function mountLangButton(host) {
  const wrap = document.createElement('div');
  wrap.className = 'lang';
  wrap.innerHTML = `<button type="button" class="lang-btn" aria-haspopup="true" aria-expanded="false"></button>
    <div class="lang-menu" role="menu">${LANGS.map(x => `<button type="button" role="menuitem" data-lang="${x.id}">${x.label}</button>`).join('')}</div>`;
  const btn = wrap.querySelector('.lang-btn');
  const paint = () => {
    btn.textContent = `🌐 ${LANG.toUpperCase()} ▾`;
    wrap.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('on', b.dataset.lang === LANG));
  };
  btn.addEventListener('click', e => { e.stopPropagation(); const o = wrap.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
  wrap.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => { setLang(b.dataset.lang); wrap.classList.remove('open'); paint(); }));
  document.addEventListener('click', () => wrap.classList.remove('open'));
  paint();
  host.appendChild(wrap);
}
