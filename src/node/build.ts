import { build as viteBuild } from 'vite'
import { CLIENT_ENTRY_PATH, ROOT, SSR_ENTRY_PATH } from '../constants'
import type { InlineConfig } from 'vite'
import type { RollupOutput } from 'rollup'
import { resolve, join } from 'path'
import fs from 'fs-extra'
import { VitePluginIslandConfig } from 'plugin'
import { resolveConfig } from './config'
import { SiteConfig } from 'shared/types'

function resolveViteBuildConfig(root: string, config: SiteConfig, isServer: boolean): InlineConfig {
  return {
    mode: "production",
    root,
    plugins: [VitePluginIslandConfig(config)],
    build: {
      ssr: isServer,
      outDir: isServer ? "ssr" : "build",
      rollupOptions: {
        input: isServer ? SSR_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm"
        }
      }
    }
  }
}
async function generatePages(
  render: () => string,
  root: string,
  clientBundle: RollupOutput
) {
  const componentHtml = render()
  const clientEntryChunk = clientBundle.output.find(chunk => chunk.type === 'chunk' && chunk.isEntry)
  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <div id="root">${componentHtml}</div>
      <script type="module" src="${clientEntryChunk.fileName}"></script>
    </body>
  </html>`
  const buildBasePath = join(root, 'build')
  const buildHTMLPath = join(buildBasePath, 'index.html')
  const ssrFilePath = join(root, 'ssr')
  await fs.ensureDir(buildBasePath)
  await fs.writeFile(buildHTMLPath, html)
  await fs.remove(ssrFilePath)
}
async function bundle(root: string) {
  const config = await resolveConfig(root)
  async function serverBuild() {
    return await viteBuild(resolveViteBuildConfig(root, config, true))
  }
  async function clientBuild() {
    return await viteBuild(resolveViteBuildConfig(root, config, false))
  }
  return Promise.all([clientBuild(), serverBuild()])
}

export async function build(root: string) {
  const [clientBundle, serverBundle] = await bundle(root);
  const SSR_BUNDLE_PATH = resolve(ROOT, root, 'ssr', 'ssr-entry.cjs')
  const { render } = await import(SSR_BUNDLE_PATH)
  await generatePages(render, root, clientBundle as RollupOutput)
  debugger;
  return [clientBundle, serverBundle]
}