import type { Plugin } from 'vite';
import { readFile } from 'fs/promises'
import { DEFAULT_TEMPLATE_HTML } from '../constants';
export function VitePluginIslandHtml(): Plugin {
  return {
    name: "vite-plugin-island-html",
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          const content = await readFile(DEFAULT_TEMPLATE_HTML)
          res.setHeader("Content-Type", "text/html")
          res.end(content)
        })
      }
    }
  }
}