/**
 * ---------------------------------------------------------------------------
 * EXTRAITS AUDIO — le vinyle du hero
 * ---------------------------------------------------------------------------
 * Chaque entrée = un artiste avec qui tu as bossé. Au clic sur le disque,
 * l'extrait se lance et la pochette vient remplacer le label doré.
 *
 * POUR AJOUTER UN ARTISTE :
 *   1. découpe l'extrait :
 *        npm run audio -- "chemin/vers/morceau.mp3" nom-de-sortie 20 25
 *      (source, nom du fichier, seconde de début, durée — 25 s par défaut)
 *   2. dépose la pochette dans public/artistes/ (carrée, 400x400 suffit)
 *   3. ajoute l'entrée ci-dessous
 *
 * La pochette est FACULTATIVE : sans elle, le label doré du vinyle reste tel
 * quel et seuls le nom et le titre s'affichent. Rien ne casse.
 *
 * IMPORTANT — droits : ne mets ici que des morceaux pour lesquels tu as
 * l'accord écrit de l'artiste ou de son label. Une fois en ligne, c'est public.
 * ---------------------------------------------------------------------------
 */

export type Track = {
  id: string;
  /** Nom de scène, affiché tel quel */
  artist: string;
  /** Titre du morceau */
  title: string;
  /** Chemin du fichier généré par `npm run audio` */
  src: string;
  /** Pochette carrée, facultative. L'alt est obligatoire si présente. */
  cover?: { src: string; alt: string };
};

export const tracks: Track[] = [
  {
    id: 'jamso-crack-map',
    artist: 'JAMSO',
    title: 'CRACK MAP',
    src: '/audio/jamso-crack-map.mp3',
    // cover: { src: '/artistes/jamso.jpg', alt: 'Pochette de CRACK MAP par JAMSO' },
  },
];

/** Textes de l'interface du lecteur. */
export const playerCopy = {
  /** Invite affichée tant que rien n'est lancé */
  idle: 'Écouter',
  loading: 'Chargement',
  playing: 'En écoute',
  next: 'Artiste suivant',
  /** Si le fichier ne se charge pas */
  error: 'Extrait indisponible',
  /** Libellé lu par les lecteurs d'écran sur le bouton principal */
  ariaPlay: 'Lancer un extrait',
  ariaPause: "Arrêter l'extrait",
};
