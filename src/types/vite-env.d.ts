/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOURCE_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
