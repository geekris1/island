import { createServer } from 'vite'
import { DEFAULT_TEMPLATE_HTML } from '../constants'
import { VitePluginIslandHtml } from '../plugin/vite-plugin-island-html'

export async function createDevServer(root: string) {
  console.log(DEFAULT_TEMPLATE_HTML)
  const server = await createServer({ root, plugins: [VitePluginIslandHtml()] })
  return server
}