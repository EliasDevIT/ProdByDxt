import type { IconName } from '../components/icons';

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
};

/** Section "Services" — ajoute, retire ou réordonne librement. */
export const services: Service[] = [
  {
    id: 'app-communaute',
    title: 'App / espace communauté',
    description:
      "Un espace rien qu'à toi où ta fanbase se retrouve : annonces, contenus exclus, accès anticipé aux drops. Tu parles à tes fans sans passer par l'algo.",
    icon: 'community',
  },
  {
    id: 'site-vitrine',
    title: 'Site vitrine artiste',
    description:
      'Ta vitrine officielle : bio, clips, dates, presskit, liens streaming. Le lien que tu mets en bio et qui te fait passer pour ce que tu es.',
    icon: 'window',
  },
  {
    id: 'boutique-merch',
    title: 'Boutique merch',
    description:
      'Ta boutique en ligne : paiement sécurisé, tailles, stocks, suivi des commandes. Tu drop, ça tourne, tu encaisses sans intermédiaire.',
    icon: 'bag',
  },
  {
    id: 'landing-sortie',
    title: 'Landing de sortie',
    description:
      'Une page dédiée par projet : pré-save, compte à rebours, tous les liens plateformes au même endroit. Prête avant la date, pas après.',
    icon: 'launch',
  },
  {
    id: 'automatisation',
    title: 'Automatisation & outils',
    description:
      'Bots, scripts et IA sur mesure : publication programmée, tri des DM, veille, génération de visuels. Tu récupères des heures chaque semaine.',
    icon: 'terminal',
  },
  {
    id: 'maintenance',
    title: 'Maintenance & suivi mensuel',
    description:
      "Mises à jour, sauvegardes, corrections, petites évolutions. Ton site reste rapide et en ligne toute l'année, sans que t'aies à y penser.",
    icon: 'pulse',
  },
];
