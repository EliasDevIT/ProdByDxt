/**
 * ---------------------------------------------------------------------------
 * MENTIONS LÉGALES — EN SOMMEIL
 * ---------------------------------------------------------------------------
 * Pas de structure déclarée pour l'instant : la page n'est PAS publiée.
 * Le fichier `src/pages/_mentions-legales.astro` commence par un underscore,
 * donc Astro l'ignore complètement (ni build, ni sitemap, ni lien).
 *
 * POUR LA RÉACTIVER, le jour où tu as ton statut :
 *   1. renomme `_mentions-legales.astro` en `mentions-legales.astro`
 *   2. remplis les valeurs ci-dessous (elles apparaissent en doré tant
 *      qu'elles ne sont pas renseignées)
 *   3. remets le lien dans `src/components/Footer.astro`
 *
 * Pour une micro-entreprise en France, les mentions obligatoires sont : nom,
 * adresse, email, SIRET, et l'identité de l'hébergeur.
 * ---------------------------------------------------------------------------
 */

export const TODO_PREFIX = '[À COMPLÉTER';

export const legal = {
  /** Identité de l'éditeur */
  editorName: '[À COMPLÉTER : prénom et nom]',
  status: '[À COMPLÉTER : ex. Entrepreneur individuel — micro-entreprise]',
  address: '[À COMPLÉTER : adresse du siège]',
  siret: '[À COMPLÉTER : numéro SIRET à 14 chiffres]',
  vat: '[À COMPLÉTER : TVA non applicable, art. 293 B du CGI — ou numéro de TVA]',
  apeCode: '[À COMPLÉTER : code APE/NAF, ex. 6201Z]',
  publicationDirector: '[À COMPLÉTER : prénom et nom du directeur de la publication]',

  /** Hébergeur du site */
  host: {
    name: '[À COMPLÉTER : ex. Vercel Inc. ou Cloudflare, Inc.]',
    address:
      '[À COMPLÉTER : ex. 340 S Lemon Ave #4133, Walnut, CA 91789, USA — ou 101 Townsend St, San Francisco, CA 94107, USA]',
    url: '[À COMPLÉTER : https://vercel.com ou https://www.cloudflare.com]',
  },

  /** Dernière mise à jour affichée en bas de page */
  updatedAt: '[À COMPLÉTER : ex. janvier 2026]',
};

/** True si la valeur est encore un champ à remplir. */
export const isTodo = (value: string): boolean => value.startsWith(TODO_PREFIX);
