
import { resolve, join, dirname } from 'path'
import { fileURLToPath } from "url"

export const __filename = fileURLToPath(import.meta.url)

export const __dirname = dirname(__filename)

export const ROOT = join(__dirname, '..')

export const CLIENT_ENTRY_PATH = resolve(ROOT, 'src/runtime/client-entry.tsx')

export const SSR_ENTRY_PATH = resolve(ROOT, 'src/runtime/ssr-entry.tsx')

export const DEFAULT_TEMPLATE_HTML = join(ROOT, 'template.html')