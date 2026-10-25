/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /**
   * Endpoint Formspark complet, ex. https://submit-form.com/xxxxxxxx
   * Laisser vide -> le formulaire bascule automatiquement sur un fallback mailto.
   */
  readonly PUBLIC_FORMSPARK_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
