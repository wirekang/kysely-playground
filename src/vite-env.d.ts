/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BRANCH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}