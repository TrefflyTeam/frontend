/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_PROD: string;
  readonly VITE_API_URL_DEV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
