/**
 * ---------------------------------------------------------------------------
 * PROJETS
 * ---------------------------------------------------------------------------
 * Les 3 entrées ci-dessous sont des emplacements vides, prêts à être remplacés.
 *
 * Pour publier un vrai projet :
 *   1. passe `status` à 'live'
 *   2. remplis `title` (nom du projet ou de l'artiste) et `category`
 *   3. ajoute `url` si le site est en ligne
 *   4. ajoute `image` : dépose le visuel dans `public/projets/` puis renseigne
 *      { src: '/projets/mon-image.jpg', alt: 'description de l’image', width, height }
 *      -> le `alt` est obligatoire (accessibilité).
 *
 * Exemple :
 *   {
 *     id: 'nom-du-projet',
 *     status: 'live',
 *     title: 'Nom du projet',
 *     category: 'Site vitrine',
 *     year: '2026',
 *     url: 'https://exemple.com',
 *     image: { src: '/projets/exemple.jpg', alt: 'Page d’accueil du site', width: 1200, height: 900 },
 *   }
 * ---------------------------------------------------------------------------
 */

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  id: string;
  /** 'soon' = emplacement réservé, 'live' = projet publié */
  status: 'soon' | 'live';
  title: string;
  category: string;
  year?: string;
  url?: string;
  image?: ProjectImage;
};

export const projects: Project[] = [
  {
    id: 'mazzagence',
    status: 'live',
    title: 'Mazzagence',
    category: "Site d'agence · pour JAMSO",
    url: 'https://mazzagence.com/',
    image: {
      src: '/projets/mazzagence.jpg',
      alt: "Page d'accueil du site Mazzagence : logo doré sur fond noir et les six pôles de l'agence",
      width: 1200,
      height: 900,
    },
  },
  {
    id: 'slot-2',
    status: 'soon',
    title: 'Projet à venir',
    category: 'Landing de sortie',
  },
  {
    id: 'slot-3',
    status: 'soon',
    title: 'Projet à venir',
    category: 'Boutique merch',
  },
];

/** Texte d'introduction de la section. */
export const projectsIntro =
  "Une première mise en ligne, d'autres suivent. Le plus rapide pour savoir ce que je peux faire pour toi, c'est encore de m'envoyer ton projet.";
