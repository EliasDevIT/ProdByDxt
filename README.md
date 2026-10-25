# Prod by Dxt — site vitrine

> Le tech de vos rappeurs préférés. **&** je gère tout.

Site vitrine statique : une page avec ancres, une 404.
Pas de backend, pas de base de données, pas de cookie.

**Stack** — [Astro 6](https://astro.build) · [Tailwind CSS 4](https://tailwindcss.com) ·
TypeScript strict · polices auto-hébergées · déployable sur Vercel ou Cloudflare Pages.

---

## Démarrer

```bash
npm install
npm run assets   # génère polices, favicon et image OG (à faire une fois)
npm run dev      # http://localhost:4321
```

| Commande            | Ce que ça fait                                                  |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Serveur de dev avec rechargement à chaud                          |
| `npm run build`     | Assets + vérification TypeScript + build statique dans `dist/`    |
| `npm run preview`   | Sert le `dist/` en local, comme en production                     |
| `npm run check`     | Vérification TypeScript / Astro seule                             |
| `npm run assets`    | Régénère `public/fonts`, `favicon.svg`, `og.png`, icônes          |

---

## Où modifier quoi

Tout le contenu éditable est dans `src/data/`. Aucun besoin de toucher aux composants.

| Fichier                 | Contenu                                                              |
| ----------------------- | -------------------------------------------------------------------- |
| `src/data/site.ts`      | Nom, slogans, intro, email, Instagram, menu, titre + description SEO   |
| `src/data/services.ts`  | Les 6 cartes de services (titre, description, icône)                   |
| `src/data/process.ts`   | Les 4 étapes du process                                                |
| `src/data/projects.ts`  | Les projets (3 emplacements « à venir » prêts à remplacer)             |
| `src/data/contact.ts`   | Textes et champs du formulaire                                         |
| `src/data/legal.ts`     | Mentions légales — **en sommeil**, voir plus bas                       |

Les couleurs, les polices et l'échelle typographique sont des tokens, tous regroupés
dans le bloc `@theme` de `src/styles/global.css` :

```css
@theme {
  --color-ink: #0e0e0f;   /* fond        */
  --color-bone: #edeae4;  /* texte       */
  --color-ash: #9a968f;   /* secondaire  */
  --color-line: #2a2a2c;  /* séparateurs */
  --color-gold: #c8a97e;  /* accent      */
  ...
}
```

> En Tailwind 4, `@theme` remplace l'ancien `theme.extend` du `tailwind.config.js` :
> il étend le thème par défaut et génère les utilitaires (`bg-ink`, `text-gold`,
> `tracking-label`…). Changer une valeur ici la change partout.

### Publier un projet

Dans `src/data/projects.ts`, passe l'entrée en `status: 'live'`, remplis `title`,
`category`, `url`, et dépose l'image dans `public/projets/`. Le champ `alt` de
l'image est obligatoire (accessibilité).

### Icônes

Les icônes sont des tracés SVG dans `src/components/icons.ts` (24×24, trait de 1).
Ajoute une entrée, elle devient utilisable via `icon: 'nom'` dans `services.ts`.

---

## Formulaire de contact

Le formulaire fonctionne **sans backend**, via [Formspree](https://formspree.io).

1. Crée un formulaire sur Formspree, récupère l'URL (`https://formspree.io/f/xxxxxxxx`)
2. Renseigne la variable d'environnement :

```bash
cp .env.example .env
# puis dans .env :
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

3. Déclare la même variable chez ton hébergeur (Vercel ou Cloudflare Pages).

**Repli automatique** : si la variable est absente ou vide, le formulaire bascule
tout seul sur un envoi `mailto:` vers `prodbydxt@gmail.com`. Le site ne casse jamais,
mais l'expérience est meilleure avec Formspree (envoi sans quitter la page, puis
retour sur le site avec un message de confirmation).

Un champ piège (`_gotcha`) filtre les robots côté Formspree.

---

## Variables d'environnement

| Variable                    | Obligatoire | Rôle                                                       |
| --------------------------- | ----------- | ---------------------------------------------------------- |
| `PUBLIC_FORMSPREE_ENDPOINT` | non         | Endpoint du formulaire. Vide → repli `mailto:`              |
| `SITE_URL`                  | recommandé  | URL de prod : canonical, Open Graph, sitemap, robots.txt    |

Sans `SITE_URL`, la valeur par défaut est `https://prodbydxt.com`
(modifiable dans `astro.config.mjs`).

---

## Déploiement

### Vercel

1. Pousse le dépôt sur GitHub / GitLab.
2. Sur [vercel.com](https://vercel.com) → **Add New… → Project** → importe le dépôt.
3. Vercel détecte Astro tout seul. Vérifie :
   - Framework Preset : **Astro**
   - Build Command : `npm run build`
   - Output Directory : `dist`
4. **Settings → Environment Variables** : ajoute `PUBLIC_FORMSPREE_ENDPOINT` et
   `SITE_URL` (ex. `https://prodbydxt.com`) pour *Production*, *Preview* et *Development*.
5. **Deploy**. Puis **Settings → Domains** pour brancher le nom de domaine.

Le fichier `vercel.json` est déjà là : URL sans `.html`, sans slash final, en-têtes de
sécurité et cache d'un an sur `/_astro/*` et `/fonts/*`.

### Cloudflare Pages

1. Pousse le dépôt sur GitHub / GitLab.
2. Sur le dashboard Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**.
3. Réglages de build :
   - Framework preset : **Astro**
   - Build command : `npm run build`
   - Build output directory : `dist`
   - Node version : **22.12 ou plus** (variable `NODE_VERSION = 22`)
4. **Settings → Environment variables** : `PUBLIC_FORMSPREE_ENDPOINT` et `SITE_URL`.
5. **Save and Deploy**, puis **Custom domains** pour le domaine.

Le fichier `public/_headers` applique les mêmes en-têtes de sécurité et de cache.

### Après le premier déploiement

- [ ] Renseigner `SITE_URL` avec le vrai domaine, puis redéployer
      (sinon canonical, OG et sitemap pointent sur l'URL par défaut)
- [ ] Déclarer le site sur [Google Search Console](https://search.google.com/search-console)
      et soumettre `/sitemap-index.xml`
- [ ] Vérifier l'aperçu de partage sur
      [opengraph.xyz](https://www.opengraph.xyz) (Instagram, WhatsApp, X…)

---

## Mentions légales — en sommeil

Pas de structure déclarée pour l'instant : **la page n'est pas publiée**. Ni dans le
build, ni dans le sitemap, ni en lien dans le footer. Aucune adresse, aucun SIRET
n'apparaît nulle part sur le site.

Le gabarit est conservé, prêt à l'emploi, dans `src/pages/_mentions-legales.astro`.
L'underscore en début de nom suffit à ce qu'Astro l'ignore entièrement.

Le jour où tu as ton statut :

1. renomme le fichier en `mentions-legales.astro`
2. remplis `src/data/legal.ts` (les champs vides s'affichent en doré sur la page,
   avec un compteur en haut, tant qu'ils ne sont pas renseignés)
3. remets le lien dans `src/components/Footer.astro`

> À savoir : en France, dès que tu factures une prestation, les mentions légales
> deviennent obligatoires sur ton site pro. Tant que c'est une vitrine de test,
> tu es tranquille.

---

## Choix techniques

**Zéro JS superflu.** Deux scripts inline, 3 lignes chacun : fermer le menu mobile
après un clic, et afficher la confirmation au retour de Formspree. Tout le reste est
du HTML et du CSS. Le menu mobile est un `<details>` natif, donc accessible au clavier
sans une ligne de JavaScript.

**Polices auto-hébergées.** `npm run assets` copie les `.woff2` (sous-ensemble latin)
depuis `@fontsource` vers `public/fonts/`. Inter Tight est une fonte variable : un
seul fichier de 44 ko couvre les graisses 300, 500 et 800. Les deux fichiers critiques
sont préchargés.

**Le vinyle.** SVG inline. Les sillons tournent, mais la nappe de lumière qui les
révèle reste fixe : c'est ce qui donne l'effet de disque laqué sous un spot. La
rotation s'arrête si le visiteur a activé « réduire les animations ».

**Animations au scroll.** Faites en CSS pur avec `animation-timeline: view()`, sous
`@supports`. Si le navigateur ne connaît pas, le contenu est simplement visible — il
n'y a aucun risque de texte invisible.

**OG et favicon générés.** `scripts/generate-assets.mjs` dessine l'image Open Graph
(1200×630) et le favicon avec Satori + Sharp, dans la même direction artistique.
Les textes sont vectorisés : aucune police à installer, rendu identique sur toutes
les machines. Relance `npm run assets` si tu changes le slogan ou les couleurs.

---

## Accessibilité

- Contrastes AA vérifiés : texte principal 16:1, gris secondaire 6,5:1, doré 8,6:1
  sur le fond. Les bordures de champs sont à 3,3:1 (seuil non-textuel).
- Focus visible partout (liseré doré, 2 px), lien d'évitement en début de page.
- Balises sémantiques : `header`, `nav`, `main`, `section` nommées, `ol` pour le
  process, `dl` pour les mentions légales, labels reliés à chaque champ.
- Le vinyle est purement décoratif (`aria-hidden`), les images de projets exigent
  un `alt`.
- `prefers-reduced-motion` respecté sur la rotation, le scroll et les transitions.

---

## Structure

```
src/
├── components/
│   ├── sections/        Hero, Services, Process, Projects, Contact
│   ├── Header · Footer · Logo · Vinyl · Section · Label · Icon
│   └── icons.ts         tracés SVG
├── data/                tous les textes éditables
├── layouts/             BaseLayout (SEO, OG, JSON-LD, polices)
├── pages/               index · 404 · robots.txt
│                        (_mentions-legales.astro = gabarit non publié)
└── styles/global.css    tokens @theme + base
public/                  polices, favicon, og.png, _headers, manifest
scripts/                 generate-assets.mjs
```
#   P r o d B y D x t  
 