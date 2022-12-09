
import { resolve, join, dirname } from 'path'
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

export const ROOT = join(__dirname, '..')

export const DEFAULT_TEMPLATE_HTML = join(ROOT, 'template.html')