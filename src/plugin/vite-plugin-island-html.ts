import type { Plugin } from 'vite';
import { readFile } from 'fs/promises'
import { CLIENT_ENTRY_PATH, DEFAULT_TEMPLATE_HTML, __filename, __dirname } from '../constants';
export function VitePluginIslandHtml(): Plugin {
  return {
    name: "vite-plugin-island-html",
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: "module",
              src: `/@fs/${CLIENT_ENTRY_PATH}`
            },
            injectTo: "body"
          }
        ]
      }
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let content = await readFile(DEFAULT_TEMPLATE_HTML, 'utf-8')
          content = await server.transformIndexHtml(req.url, content, req.originalUrl)
          res.setHeader("Content-Type", "text/html")
          res.end(content)
        })
      }
    }
  }
}