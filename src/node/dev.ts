import { createServer } from 'vite'
import { CLIENT_ENTRY_PATH, ROOT } from '../constants'
import { VitePluginIslandHtml, VitePluginIslandConfig, VitePluginIslandRoutes } from '../plugin'
import react from '@vitejs/plugin-react'
import { resolveConfig } from './config'

export async function createDevServer(root: string, restart: () => Promise<void>) {
  const config = await resolveConfig(root)
  const server = await createServer({
    root: ROOT,
    plugins: [
      VitePluginIslandHtml(),
      VitePluginIslandRoutes(config.root),
      react(),
      VitePluginIslandConfig(config, restart)]
  })
  return server
}