/**
 * Textes globaux + identité. Tout ce qui se lit sur le site part d'ici ou des
 * autres fichiers de `src/data`. Modifie, enregistre, c'est en ligne.
 */

export const site = {
  /** Nom commercial */
  name: 'Prod by Dxt',

  /** Logo texte : "PROD BY" en mono doré au-dessus de "DXT." */
  logo: {
    kicker: 'Prod by',
    word: 'DXT',
    dot: '.',
  },

  tagline: 'Le Dev de vos rappeurs préférés.',
  subTagline: '& je gère tout.',

  /** Une phrase sous le hero */
  intro:
    "Développeur freelance. Je conçois et je code les sites, les apps et les outils des artistes et de leurs équipes. Tu fais la musique, je m'occupe du reste.",

  /** Label mono au-dessus du logo dans le hero */
  heroLabel: 'DevOps freelance · Rap & musique',

  cta: {
    primary: { label: 'Parlons de ton projet', href: '/#contact' },
    secondary: { label: 'Voir ce que je fais', href: '/#services' },
  },

  contact: {
    email: 'prodbydxt@gmail.com',
    instagramHandle: '@prodbydxt',
    instagramUrl: 'https://www.instagram.com/prodbydxt/',
  },

  /**
   * Navigation du header et du footer. Les ancres sont préfixées par `/` pour
   * rester cliquables depuis /mentions-legales ou la page 404.
   */
  nav: [
    { label: 'Services', href: '/#services' },
    { label: 'Process', href: '/#process' },
    { label: 'Projets', href: '/#projets' },
    { label: 'Contact', href: '/#contact' },
  ],

  seo: {
    title: 'Prod by Dxt — Le Dev de vos rappeurs préférés',
    titleTemplate: '%s — Prod by Dxt',
    description:
      "Développeur freelance pour artistes et rappeurs : site vitrine, app communauté, boutique merch, landing de sortie, automatisation et maintenance. Tu fais la musique, je gère la technique.",
    ogAlt: 'Prod by Dxt — Le Dev de vos rappeurs préférés',
    locale: 'fr_FR',
    keywords: [
      'développeur freelance artiste',
      'site web rappeur',
      'landing page sortie album',
      'boutique merch artiste',
      'app communauté fans',
    ],
  },
} as const;

export type Site = typeof site;
