import { createServer } from 'vite'
import { CLIENT_ENTRY_PATH } from '../constants'
import { VitePluginIslandHtml, VitePluginIslandConfig } from '../plugin'
import react from '@vitejs/plugin-react'
import { resolveConfig } from './config'

export async function createDevServer(root: string, restart: () => Promise<void>) {
  const config = await resolveConfig(root)
  const server = await createServer({
    root,
    plugins: [
      VitePluginIslandHtml(),
      react(),
      VitePluginIslandConfig(config, restart)]
  })
  return server
}