# 🦠 INFODEMIA · Paciente Cero

Juego por equipos para una clase de **80 minutos** sin computadoras: los estudiantes usan el **celular** (con IA e internet) y el docente proyecta el **panel en la Smart TV**.
Contenidos: **EsencIA Unidad 4** (IA generativa, técnicas de prompting, bots éticos con el ABC, dilemas) y **Unidad 5** (desinformación, deepfakes, alucinaciones, bots y sesgos, los 7 criterios para validar información).

Destinatarios: 5.º año, Orientación Ciencias Naturales (16–17 años) · 19 estudiantes → 5 equipos (4 + 4 + 4 + 4 + 3).
Idiomas: botón **🌐 ES ▾** arriba a la derecha (Español por defecto, Français, English).

| Página | Para quién | Enlace |
|---|---|---|
| `index.html` | Estudiantes (celular) | `https://mamanirafa.github.io/ia_infodemia/` |
| `tv.html` | Docente (Smart TV / compu) | `https://mamanirafa.github.io/ia_infodemia/tv.html` |

## Cómo se juega
| # | Fase | Min | Qué pasa |
|---|---|---|---|
| 1 | 🧪 Registro | 5 | Cada equipo carga nombre completo y rol de cada integrante (2 a 4). |
| 2 | 🚨 El brote | 6 | Noticia gancho en la TV: ¿real o falsa? Revelación: la creó el profe con IA. |
| 3 | 🧫 Laboratorio | 22 | Cada equipo trae 1 noticia **verdadera** (internet) + 1 **falsa** (IA, con su cepa y técnica de prompting). |
| 4 | 🦠 Contagio | 25 | La TV muestra A y B de cada equipo; los demás votan cuál es la falsa y justifican con los 7 criterios. Curva de contagio y R0 en vivo. |
| 5 | 💉 La vacuna | 12 | Diseñan “VacunaBot” con el ABC ético, lo prueban en la IA contra la falsa de otro equipo. |
| 6 | ⚖️ Bioética | 6 | 4 dilemas (empleo, privacidad, dependencia, decisiones automatizadas): votan y debaten. |
| 7 | 🏅 Certificado | 4 | Ticket de salida individual → certificado PNG/PDF con insignia **Detector/a de Fake** (sin firma). |

**Puntaje:** engañar a otro equipo +100 · detectar la falsa +100 (+30 si justifica con ≥2 criterios) · brote +20 · vacuna completa +150 (+50 si detectó) · cada dilema +10 · bonus del docente ±10.

## Puesta en marcha (una sola vez, ~5 min)
Todo queda registrado en una **Hoja de cálculo de Google** tuya.

1. Creá una hoja nueva en Google Sheets (ej.: *Infodemia 5.º Naturales*).
2. **Extensiones → Apps Script**. Borrá el contenido y pegá todo `apps-script/Code.gs`.
3. (Opcional) Cambiá `TEACHER_PIN` (por defecto `2026`).
4. Ejecutá la función **`setup`** una vez (autorizá los permisos): se crean las pestañas.
5. **Implementar → Nueva implementación → Aplicación web**. Ejecutar como: *Yo* · Acceso: *Cualquier usuario*. Copiá la URL que termina en `/exec`.
6. Pegala en `js/config.js` → `scriptUrl: 'https://script.google.com/macros/s/…/exec'` y hacé commit.

> Sin `scriptUrl` la página funciona en **modo local (demo)**: sirve para probar en un solo dispositivo, pero no comparte datos entre celulares.
> Para probar otra Web App sin editar archivos: `…/tv.html?api=URL_EXEC` (el QR de la TV la pasa a los celulares).

## Publicar en GitHub Pages
```bash
git remote add origin https://github.com/mamanirafa/ia_infodemia.git
git push -u origin main
```
En el repo: **Settings → Pages → Source: GitHub Actions** (el workflow `.github/workflows/pages.yml` publica en cada push).

## Estructura
```
index.html          app del estudiante
tv.html             panel docente (PIN, fases, temporizador, revelar, ranking, QR, exportar CSV)
css/style.css
js/config.js        ← URL de Apps Script y PIN
js/data.js          ← temas, cepas, roles, criterios, dilemas, puntaje (editable)
js/i18n.js          textos ES / FR / EN y botón de idioma
js/core.js          lógica de datos compartida (navegador + Apps Script)
js/api.js · js/ui.js · js/app.js · js/tv.js · js/cert.js
apps-script/Code.gs backend listo para pegar (generado con build-gs.sh)
GUIA_DOCENTE.md     guion de la clase minuto a minuto
```
Si editás `js/core.js`, regenerá el backend con `sh apps-script/build-gs.sh` y volvé a pegar `Code.gs` (Implementar → Administrar implementaciones → Editar → Nueva versión).
