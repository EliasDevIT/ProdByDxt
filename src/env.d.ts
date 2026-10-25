/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /**
   * Endpoint Formspree complet, ex. https://formspree.io/f/xxxxxxxx
   * Laisser vide -> le formulaire bascule automatiquement sur un fallback mailto.
   */
  readonly PUBLIC_FORMSPREE_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
