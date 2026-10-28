/**
 * ---------------------------------------------------------------------------
 * Préparation des extraits audio — `npm run audio -- <fichier source>`
 * ---------------------------------------------------------------------------
 * Découpe un MP3 en extrait court, léger et prêt pour le web :
 *   - mono, 96 kbps  (un morceau de rap sur un site, personne n'entend la perte)
 *   - fondu à l'entrée et à la sortie, pour que ça ne coupe pas net
 *   - sortie dans public/audio/
 *
 * Exemple :
 *   npm run audio -- "C:/Users/elias/Downloads/JAMSO - CRACK MAP.mp3" jamso-crack-map 20 25
 *                     ^ source                                        ^ nom     ^début ^durée
 *
 * ffmpeg est fourni par le paquet `ffmpeg-static` : rien à installer sur la
 * machine, le binaire vit dans node_modules.
 * ---------------------------------------------------------------------------
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpeg from 'ffmpeg-static';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'audio');

const [source, name = 'extrait', start = '20', duration = '25'] = process.argv.slice(2);

if (!source) {
  console.error(
    '\nIl manque le fichier source.\n' +
      '  npm run audio -- "chemin/vers/morceau.mp3" nom-de-sortie [debut] [duree]\n'
  );
  process.exit(1);
}

if (!existsSync(source)) {
  console.error(`\nFichier introuvable : ${source}\n`);
  process.exit(1);
}

if (!ffmpeg) {
  console.error('\nffmpeg-static n\'a pas fourni de binaire pour cette plateforme.\n');
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
const output = join(OUT_DIR, `${name}.mp3`);

const seconds = Number(duration);
const fadeOutStart = Math.max(0, seconds - 2).toFixed(2);

console.log(`\nExtrait : ${start}s → ${Number(start) + seconds}s`);

execFileSync(
  ffmpeg,
  [
    '-y',
    '-ss', String(start),
    '-t', String(duration),
    '-i', source,
    '-ac', '1', // mono
    '-b:a', '96k',
    '-af', `afade=t=in:st=0:d=0.8,afade=t=out:st=${fadeOutStart}:d=2`,
    '-map_metadata', '-1', // pas de tags : on n'embarque pas de métadonnées inutiles
    output,
  ],
  { stdio: ['ignore', 'ignore', 'pipe'] }
);

const kb = (statSync(output).size / 1024).toFixed(0);
const sourceKb = (statSync(source).size / 1024).toFixed(0);
console.log(`Écrit   : public/audio/${name}.mp3`);
console.log(`Poids   : ${kb} Ko (source : ${sourceKb} Ko)\n`);
