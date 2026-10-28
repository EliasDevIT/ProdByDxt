/**
 * ---------------------------------------------------------------------------
 * Génération des assets statiques — `npm run assets`
 * ---------------------------------------------------------------------------
 *  1. copie les polices (.woff2, sous-ensemble latin) de node_modules -> public/fonts
 *  2. génère public/favicon.svg        ("D." doré sur fond noir)
 *  3. génère public/favicon-96.png + public/apple-touch-icon.png
 *  4. génère public/og.png             (1200x630, même direction artistique)
 *
 * Les textes sont vectorisés par Satori : aucune police n'a besoin d'être
 * installée sur la machine, le rendu est identique partout.
 * ---------------------------------------------------------------------------
 */
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import satori from 'satori';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const MODULES = join(ROOT, 'node_modules');

/* -------------------------------------------------------------------------- */
/* Palette — doit rester synchronisée avec src/styles/global.css               */
/* -------------------------------------------------------------------------- */
const COLORS = {
  ink: '#0E0E0F',
  inkRaised: '#121214',
  bone: '#EDEAE4',
  ash: '#9A968F',
  groove: '#26262A',
  label: '#161619',
  spindle: '#1D1D21',
  gold: '#C8A97E',
  goldDeep: '#8A7351',
};

/* -------------------------------------------------------------------------- */
/* 1. Polices                                                                  */
/* -------------------------------------------------------------------------- */
const FONT_COPIES = [
  {
    from: join(
      MODULES,
      '@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2'
    ),
    to: join(PUBLIC, 'fonts/inter-tight-latin-wght.woff2'),
  },
  {
    from: join(MODULES, '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2'),
    to: join(PUBLIC, 'fonts/jetbrains-mono-latin-400.woff2'),
  },
  {
    from: join(MODULES, '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2'),
    to: join(PUBLIC, 'fonts/jetbrains-mono-latin-500.woff2'),
  },
];

async function copyFonts() {
  await mkdir(join(PUBLIC, 'fonts'), { recursive: true });
  for (const { from, to } of FONT_COPIES) {
    await copyFile(from, to);
  }
  console.log(`  polices      ${FONT_COPIES.length} fichiers -> public/fonts/`);
}

/* -------------------------------------------------------------------------- */
/* Polices pour Satori (format .woff requis, pas .woff2)                       */
/* -------------------------------------------------------------------------- */
const fonts = [
  {
    name: 'Inter Tight',
    data: readFileSync(join(MODULES, '@fontsource/inter-tight/files/inter-tight-latin-300-normal.woff')),
    weight: 300,
    style: 'normal',
  },
  {
    name: 'Inter Tight',
    data: readFileSync(join(MODULES, '@fontsource/inter-tight/files/inter-tight-latin-800-normal.woff')),
    weight: 800,
    style: 'normal',
  },
  {
    name: 'JetBrains Mono',
    data: readFileSync(
      join(MODULES, '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff')
    ),
    weight: 500,
    style: 'normal',
  },
];

/* -------------------------------------------------------------------------- */
/* Motif vinyle (même construction que src/components/Vinyl.astro)             */
/* -------------------------------------------------------------------------- */
function vinylSvg() {
  const C = 300;
  const R = 296;
  const LABEL_R = 101;

  let grooves = '';
  let i = 0;
  for (let r = LABEL_R + 8; r <= R - 9; r += 2.9, i++) {
    const major = i % 9 === 0;
    grooves += `<circle cx="${C}" cy="${C}" r="${r.toFixed(2)}" fill="none" stroke="#b4b0a8" stroke-width="${major ? 1.15 : 0.6}" stroke-opacity="${major ? 0.95 : 0.55}"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
<defs>
  <clipPath id="clip"><circle cx="${C}" cy="${C}" r="${R}"/></clipPath>
  <radialGradient id="base" cx="40%" cy="30%" r="76%">
    <stop offset="0%" stop-color="#232329"/><stop offset="42%" stop-color="#17171c"/><stop offset="100%" stop-color="#0a0a0b"/>
  </radialGradient>
  <radialGradient id="beam" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#fff" stop-opacity="1"/><stop offset="48%" stop-color="#fff" stop-opacity="0.5"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="beamSoft" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#fff" stop-opacity="0.75"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/>
  </radialGradient>
  <mask id="light" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
    <circle cx="${C}" cy="${C}" r="${R}" fill="#262626"/>
    <ellipse cx="${C}" cy="${C}" rx="350" ry="118" fill="url(#beam)" transform="rotate(-34 300 300)"/>
    <ellipse cx="${C}" cy="${C}" rx="320" ry="44" fill="url(#beamSoft)" transform="rotate(46 300 300)"/>
    <ellipse cx="208" cy="168" rx="150" ry="62" fill="url(#beam)" transform="rotate(-38 208 168)"/>
  </mask>
  <radialGradient id="sheen" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${COLORS.bone}" stop-opacity="0.12"/><stop offset="45%" stop-color="${COLORS.bone}" stop-opacity="0.045"/><stop offset="100%" stop-color="${COLORS.bone}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="sheenGold" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${COLORS.gold}" stop-opacity="0.14"/><stop offset="100%" stop-color="${COLORS.gold}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="specular" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#fff" stop-opacity="0.16"/><stop offset="60%" stop-color="#fff" stop-opacity="0.03"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="rim" x1="16%" y1="0%" x2="84%" y2="100%">
    <stop offset="0%" stop-color="${COLORS.bone}" stop-opacity="0.45"/><stop offset="34%" stop-color="${COLORS.bone}" stop-opacity="0.06"/><stop offset="66%" stop-color="${COLORS.gold}" stop-opacity="0.26"/><stop offset="100%" stop-color="${COLORS.bone}" stop-opacity="0.03"/>
  </linearGradient>
  <radialGradient id="labelG" cx="36%" cy="28%" r="86%">
    <stop offset="0%" stop-color="#2a2a32"/><stop offset="62%" stop-color="#17171c"/><stop offset="100%" stop-color="#0f0f12"/>
  </radialGradient>
  <radialGradient id="spindleG" cx="34%" cy="28%" r="86%">
    <stop offset="0%" stop-color="#34343d"/><stop offset="100%" stop-color="#131317"/>
  </radialGradient>
  <radialGradient id="labelShadow" cx="50%" cy="50%" r="50%">
    <stop offset="78%" stop-color="#000" stop-opacity="0"/><stop offset="92%" stop-color="#000" stop-opacity="0.42"/><stop offset="100%" stop-color="#000" stop-opacity="0"/>
  </radialGradient>
</defs>
<circle cx="${C}" cy="${C}" r="${R}" fill="url(#base)"/>
<g mask="url(#light)"><g clip-path="url(#clip)">
${grooves}
<path d="M300 2v298M300 300v298M2 300h298M300 300h298" fill="none" stroke="#0a0a0b" stroke-width="4.5"/>
</g></g>
<g clip-path="url(#clip)">
  <ellipse cx="${C}" cy="${C}" rx="340" ry="100" fill="url(#sheen)" transform="rotate(-34 300 300)"/>
  <ellipse cx="${C}" cy="${C}" rx="312" ry="34" fill="url(#sheenGold)" transform="rotate(46 300 300)"/>
  <ellipse cx="206" cy="166" rx="118" ry="46" fill="url(#specular)" transform="rotate(-38 206 166)"/>
</g>
<circle cx="${C}" cy="${C}" r="${LABEL_R + 14}" fill="url(#labelShadow)"/>
<circle cx="${C}" cy="${C}" r="${LABEL_R}" fill="url(#labelG)"/>
<circle cx="${C}" cy="${C}" r="${LABEL_R}" fill="none" stroke="${COLORS.gold}" stroke-opacity="0.35" stroke-width="1.1"/>
<circle cx="${C}" cy="${C}" r="${LABEL_R - 8}" fill="none" stroke="${COLORS.gold}" stroke-opacity="0.12" stroke-width="0.6"/>
<circle cx="${C}" cy="${C}" r="37" fill="url(#spindleG)"/>
<circle cx="${C}" cy="${C}" r="5" fill="#08080a"/>
<circle cx="${C}" cy="${C}" r="${R}" fill="none" stroke="url(#rim)" stroke-width="1.6"/>
</svg>`;
}

const vinylDataUri = () =>
  `data:image/svg+xml;base64,${Buffer.from(vinylSvg()).toString('base64')}`;

/* -------------------------------------------------------------------------- */
/* Helpers Satori (arbre d'éléments en objets, pas de JSX)                     */
/* -------------------------------------------------------------------------- */
const h = (type, style, children) => ({ type, props: { style, children } });
const text = (style, value) => ({ type: 'div', props: { style, children: value } });

/* -------------------------------------------------------------------------- */
/* 2. Open Graph 1200x630                                                      */
/* -------------------------------------------------------------------------- */
function ogTree() {
  return h(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      position: 'relative',
      backgroundColor: COLORS.ink,
      fontFamily: 'Inter Tight',
    },
    [
      // Vinyle, coupé en deux par le bord droit
      {
        type: 'img',
        props: {
          src: vinylDataUri(),
          width: 620,
          height: 620,
          style: { position: 'absolute', top: 5, left: 890 },
        },
      },
      // Bloc de texte
      h(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          padding: '0 92px',
        },
        [
          text(
            {
              fontFamily: 'JetBrains Mono',
              fontWeight: 500,
              fontSize: 22,
              letterSpacing: 7,
              color: COLORS.gold,
            },
            'PROD BY'
          ),
          h('div', { display: 'flex', marginTop: 6 }, [
            text(
              { fontWeight: 800, fontSize: 164, letterSpacing: -7, color: COLORS.bone },
              'DXT'
            ),
            text({ fontWeight: 800, fontSize: 164, letterSpacing: -7, color: COLORS.gold }, '.'),
          ]),
          h('div', {
            display: 'flex',
            width: 72,
            height: 1,
            backgroundColor: COLORS.goldDeep,
            marginTop: 38,
            marginBottom: 38,
          }),
          text(
            { fontWeight: 300, fontSize: 40, letterSpacing: -1, color: COLORS.bone },
            'Le Dev de vos rappeurs préférés.'
          ),
          h('div', { display: 'flex', marginTop: 10 }, [
            text({ fontWeight: 300, fontSize: 40, letterSpacing: -1, color: COLORS.gold }, '&'),
            text(
              {
                fontWeight: 300,
                fontSize: 40,
                letterSpacing: -1,
                color: COLORS.ash,
                marginLeft: 14,
              },
              'je gère tout.'
            ),
          ]),
        ]
      ),
    ]
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Favicon "D." doré sur fond noir                                          */
/* -------------------------------------------------------------------------- */
function faviconTree(size = 64) {
  return h(
    'div',
    {
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.ink,
      fontFamily: 'Inter Tight',
    },
    [
      h('div', { display: 'flex', alignItems: 'baseline' }, [
        text(
          {
            fontWeight: 800,
            fontSize: Math.round(size * 0.72),
            letterSpacing: -2,
            color: COLORS.gold,
          },
          'D'
        ),
        text(
          { fontWeight: 800, fontSize: Math.round(size * 0.72), color: COLORS.gold },
          '.'
        ),
      ]),
    ]
  );
}

/* -------------------------------------------------------------------------- */
/* Exécution                                                                   */
/* -------------------------------------------------------------------------- */
async function main() {
  console.log('\nProd by Dxt — génération des assets');
  await mkdir(PUBLIC, { recursive: true });
  await copyFonts();

  // Favicon SVG (texte déjà vectorisé -> aucun besoin de police côté client)
  let faviconSvg = await satori(faviconTree(64), { width: 64, height: 64, fonts });
  if (!faviconSvg.includes('viewBox')) {
    faviconSvg = faviconSvg.replace('<svg', '<svg viewBox="0 0 64 64"');
  }
  await writeFile(join(PUBLIC, 'favicon.svg'), faviconSvg, 'utf8');
  console.log('  favicon      public/favicon.svg');

  const faviconBuffer = Buffer.from(faviconSvg);
  await sharp(faviconBuffer, { density: 384 })
    .resize(96, 96)
    .png({ compressionLevel: 9 })
    .toFile(join(PUBLIC, 'favicon-96.png'));
  await sharp(faviconBuffer, { density: 720 })
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(join(PUBLIC, 'apple-touch-icon.png'));
  console.log('  icônes       public/favicon-96.png, public/apple-touch-icon.png');

  // Open Graph
  const ogSvg = await satori(ogTree(), { width: 1200, height: 630, fonts });
  await sharp(Buffer.from(ogSvg))
    .png({ compressionLevel: 9, palette: true })
    .toFile(join(PUBLIC, 'og.png'));
  console.log('  open graph   public/og.png (1200x630)');

  console.log('Terminé.\n');
}

main().catch((error) => {
  console.error('\nÉchec de la génération des assets :\n', error);
  process.exit(1);
});
