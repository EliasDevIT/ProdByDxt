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
    id: 'slot-1',
    status: 'soon',
    title: 'Projet à venir',
    category: 'Site vitrine',
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

/** Texte affiché dans la section quand aucun projet n'est encore publié. */
export const projectsIntro =
  "Les premières réalisations arrivent. En attendant, le meilleur moyen de voir ce que je sais faire, c'est de m'envoyer ton projet.";
