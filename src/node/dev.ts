import { createServer } from 'vite'
import { CLIENT_ENTRY_PATH } from '../constants'
import { VitePluginIslandHtml } from '../plugin/vite-plugin-island-html'
import react from '@vitejs/plugin-react'

export async function createDevServer(root: string) {
  console.log(CLIENT_ENTRY_PATH)
  const server = await createServer({ root, plugins: [VitePluginIslandHtml(), react()] })
  return server
}