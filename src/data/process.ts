export type ProcessStep = {
  /** Numéro affiché en mono */
  step: string;
  title: string;
  description: string;
};

/** Section "Process" — 4 étapes. */
export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Échange',
    description:
      "On se cale un appel. Tu me racontes ton projet, ton univers, ta deadline. Je te dis ce qui est faisable, comment, et combien. Sans blabla.",
  },
  {
    step: '02',
    title: 'Maquette',
    description:
      "Je te montre le design avant d'écrire la moindre ligne. Tu valides, tu demandes des changements. On passe au dev quand c'est exactement ça.",
  },
  {
    step: '03',
    title: 'Dev',
    description:
      'Je construis. Tu suis en direct sur un lien de preview, mis à jour au fur et à mesure. Pas de boîte noire, pas de surprise à la livraison.',
  },
  {
    step: '04',
    title: 'Lancement & suivi',
    description:
      "Mise en ligne, nom de domaine, référencement, et je reste joignable derrière. Un truc à changer dans six mois ? Tu m'écris, c'est tout.",
  },
];
