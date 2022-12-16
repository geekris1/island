
import type { Plugin } from 'vite'
import { SiteConfig } from 'shared/types'
export function VitePluginIslandConfig(config: SiteConfig, restart?: () => Promise<void>): Plugin {
  const virtualModuleId = 'virtual:island-config'
  const resolveVirtualModuleId = '\0' + virtualModuleId
  let times: NodeJS.Timeout;
  return {
    name: "vite-plugin-island-config",
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolveVirtualModuleId
      }
    },
    load(id) {
      if (id === resolveVirtualModuleId) {
        return `export default ${JSON.stringify(config.config)}`
      }
    },
    async handleHotUpdate(ctx) {
      clearTimeout(times)
      times = setTimeout(() => {
        ctx.server.printUrls()
      })
      const watchFiles = [config.configPath]
      function include(id: string) {
        return watchFiles.some(file => file === id)
      }
      if (include(ctx.file)) {
        await restart()
      }
    }
  }
}