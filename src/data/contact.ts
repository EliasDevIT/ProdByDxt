/** Contenu de la section Contact + champs du formulaire. */

export const contactCopy = {
  label: 'Contact',
  title: 'Parle-moi de ton projet.',
  intro:
    "Deux lignes suffisent pour commencer : qui tu es, ce que tu veux construire, pour quand. Je te réponds par mail avec un premier avis honnête.",
  note: 'Pas de spam, pas de revente de données. Juste une réponse.',
  submit: 'Envoyer',
  successTitle: 'Message envoyé.',
  successBody: "C'est bien parti. Je te réponds par mail.",
  directLabel: 'Ou plus direct',
};

export type SelectOption = { value: string; label: string };

/** Options du champ "type de besoin". */
export const needOptions: SelectOption[] = [
  { value: 'app-communaute', label: 'App / espace communauté' },
  { value: 'site-vitrine', label: 'Site vitrine artiste' },
  { value: 'boutique-merch', label: 'Boutique merch' },
  { value: 'landing-sortie', label: 'Landing de sortie' },
  { value: 'automatisation', label: 'Automatisation & outils' },
  { value: 'maintenance', label: 'Maintenance & suivi mensuel' },
  { value: 'autre', label: 'Autre / je sais pas encore' },
];

export const fields = {
  name: { label: 'Ton nom', placeholder: 'Prénom ou blaze' },
  email: { label: 'Ton email', placeholder: 'pour que je puisse te répondre' },
  project: { label: 'Artiste / projet', placeholder: 'Nom de scène, label, collectif…' },
  need: { label: 'Type de besoin', placeholder: 'Choisis…' },
  message: {
    label: 'Ton message',
    placeholder: 'Ce que tu veux faire, ta deadline, ton budget si tu l’as en tête.',
  },
};
