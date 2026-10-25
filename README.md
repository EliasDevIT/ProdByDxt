# Prod by Dxt — site vitrine

> Le tech de vos rappeurs préférés. **&** je gère tout.

Site vitrine statique : une page avec ancres, une 404.
Pas de backend, pas de base de données, pas de cookie.

**Stack** — [Astro 6](https://astro.build) · [Tailwind CSS 4](https://tailwindcss.com) ·
TypeScript strict · polices auto-hébergées · déployable sur Cloudflare Pages, Vercel
ou Azure Static Web Apps.

---

## Démarrer

```bash
npm install
npm run assets   # génère polices, favicon et image OG (à faire une fois)
npm run dev      # http://localhost:4321
```

| Commande              | Ce que ça fait                                                  |
| --------------------- | ----------------------------------------------------------------- |
| `npm run dev`         | Serveur de dev avec rechargement à chaud                            |
| `npm run build`       | Vérification TypeScript puis build statique dans `dist/`            |
| `npm run preview`     | Sert le `dist/` en local, comme en production                       |
| `npm run check`       | Vérification TypeScript / Astro seule                               |
| `npm run assets`      | Régénère `public/fonts`, `favicon.svg`, `og.png`, icônes            |
| `npm run build:nocheck` | Build sans la vérification — dépannage uniquement                 |

`npm run assets` n'est **pas** dans le build : les fichiers générés sont versionnés
dans `public/`. Relance-le seulement quand tu changes le slogan, les couleurs ou
les polices, puis commit le résultat.

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

Le formulaire fonctionne **sans backend**, via [Formspark](https://formspark.io).
Modèle de paiement unique : 250 envois offerts qui n'expirent pas, puis 25 $ une
seule fois pour 50 000 envois. Pas d'abonnement.

1. Crée un formulaire sur Formspark, récupère l'ID et donc l'URL
   (`https://submit-form.com/xxxxxxxx`)
2. Renseigne la variable d'environnement :

```bash
cp .env.example .env
# puis dans .env :
PUBLIC_FORMSPARK_ENDPOINT=https://submit-form.com/xxxxxxxx
```

3. Déclare la même variable chez ton hébergeur (Vercel ou Cloudflare Pages).

**Repli automatique** : si la variable est absente ou vide, le formulaire bascule
tout seul sur un envoi `mailto:` vers `prodbydxt@gmail.com`. Le site ne casse jamais,
mais l'expérience est meilleure avec Formspark (envoi sans quitter la page, puis
retour sur le site avec un message de confirmation).

### Champs réservés utilisés

| Champ             | Rôle                                                              |
| ----------------- | ----------------------------------------------------------------- |
| `_email.subject`  | Objet du mail que tu reçois                                        |
| `_redirect`       | Retour sur le site avec `?envoye=1` → bandeau de confirmation      |
| `_append=false`   | **Important** : empêche Formspark de recopier le contenu du message dans l'URL de retour |
| `_honeypot`       | Champ piège invisible : les robots le remplissent, Formspark jette |

Le champ `email` du formulaire sert automatiquement de `reply-to` : tu réponds
directement depuis ta boîte mail, ça part chez la personne.

> `_append=false` n'est pas un détail. Sans lui, le nom, l'email et le message
> du visiteur se retrouvent en clair dans la barre d'adresse et dans l'historique
> du navigateur.

### Changer de prestataire

L'endpoint est dans une variable d'environnement, mais les champs réservés sont
propres à chaque service. Pour passer à un autre (Formspree, Web3Forms…), il faut
aussi adapter les quatre `<input type="hidden">` de
`src/components/sections/Contact.astro`.

---

## Variables d'environnement

| Variable                    | Obligatoire | Rôle                                                       |
| --------------------------- | ----------- | ---------------------------------------------------------- |
| `PUBLIC_FORMSPARK_ENDPOINT` | non         | Endpoint du formulaire. Vide → repli `mailto:`              |
| `SITE_URL`                  | recommandé  | URL de prod : canonical, Open Graph, sitemap, robots.txt    |

Sans `SITE_URL`, la valeur par défaut est `https://prodbydxt.com`
(modifiable dans `astro.config.mjs`).

---

## Déploiement

### Cloudflare — recommandé

Gratuit, usage commercial autorisé, pas de plafond de bande passante qui coupe le
site.

Cloudflare propose deux tunnels pour un site statique. Celui du dépôt est **Workers
static assets** (le flux par défaut aujourd'hui), configuré par `wrangler.jsonc` :
pas de `main`, donc aucun code serveur n'est exécuté — Cloudflare sert les fichiers
de `dist/` depuis son CDN. Le `public/_headers` est lu dans les deux cas.

1. Pousse le dépôt sur GitHub / GitLab.
2. Dashboard Cloudflare → **Workers & Pages → Create → Connect to Git**.
3. Commandes (déjà bonnes par défaut) :
   - Build command : `npm run build`
   - Deploy command : `npx wrangler deploy`
4. **Advanced settings → Build variables** : `PUBLIC_FORMSPARK_ENDPOINT` et
   `SITE_URL`. Attention, ce sont bien des variables de **build**, pas des
   variables d'exécution : le site est statique, tout est figé au moment du build.
5. Laisse **Protect with Cloudflare Access** désactivé (ça mettrait le site derrière
   une authentification).
6. **Deploy**, puis **Custom domains** pour brancher le domaine.

<details>
<summary>Ancien tunnel Pages (toujours fonctionnel)</summary>

1. Pousse le dépôt sur GitHub / GitLab.
2. Sur le dashboard Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**.
3. Réglages de build — le preset **Astro** remplit déjà tout correctement :
   - Build command : `npm run build`
   - Build output directory : `dist`
   - Version de Node : rien à faire, le fichier `.nvmrc` à la racine impose 22.16.0.
     (Sans lui, un projet sur l'ancien système de build Cloudflare partirait sur
     Node 18 et le build échouerait : Astro 6 exige Node ≥ 22.12.)
4. **Settings → Environment variables** : `PUBLIC_FORMSPARK_ENDPOINT` et `SITE_URL`.
5. **Save and Deploy**, puis **Custom domains** pour le domaine.

</details>

Dans les deux cas, `public/_headers` applique les en-têtes de sécurité et le cache
d'un an sur `/_astro/*` et `/fonts/*`.

### Vercel — attention au plan

Techniquement parfait, mais **le plan Hobby gratuit interdit l'usage commercial**.
Les [fair use guidelines](https://vercel.com/docs/limits/fair-use-guidelines) citent
explicitement « advertising the sale of a product or service » : un site qui vend
des prestations de dev tombe dedans. Il faut donc le plan **Pro à 20 $/mois**.

Si tu y vas quand même :

1. Pousse le dépôt sur GitHub / GitLab.
2. Sur [vercel.com](https://vercel.com) → **Add New… → Project** → importe le dépôt.
3. Vercel détecte Astro tout seul. Vérifie :
   - Framework Preset : **Astro**
   - Build Command : `npm run build`
   - Output Directory : `dist`
4. **Settings → Environment Variables** : ajoute `PUBLIC_FORMSPARK_ENDPOINT` et
   `SITE_URL` (ex. `https://prodbydxt.com`) pour *Production*, *Preview* et *Development*.
5. **Deploy**. Puis **Settings → Domains** pour brancher le nom de domaine.

Le fichier `vercel.json` est déjà là : URL sans `.html`, sans slash final, en-têtes de
sécurité et cache d'un an.

### Azure Static Web Apps — possible

Gratuit, 100 Go/mois, 2 domaines perso, SSL inclus. Ça marche, mais la doc Azure
prévient : au-delà du quota, « we will not be able to serve your site » — le site
coupe au lieu d'être facturé. À 270 Ko la page ça laisse environ 370 000 vues, donc
le risque est faible, mais il existe.

Pertinent surtout si tu es déjà dans l'écosystème Azure ou si un client l'impose.
Il faut alors ajouter un `staticwebapp.config.json` (en-têtes + route 404) et un
workflow GitHub Actions — ni l'un ni l'autre n'est dans le dépôt pour l'instant.

**Le conteneur (Azure Container Apps, App Service) : à éviter.** Le site est 100 %
statique. Un conteneur ajoute un registre d'images à payer et un serveur web à faire
tourner en continu pour servir des fichiers figés. Plus cher et plus lent qu'un CDN,
sans aucun gain.

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
après un clic, et afficher la confirmation au retour de Formspark. Tout le reste est
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