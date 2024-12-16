/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LINKEDIN_API_KEY: string
  readonly VITE_INDEED_API_KEY: string
  readonly VITE_ALTEMPLOI_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}