

import { loadConfig } from 'unconfig'
import { Config, SiteConfig } from '../shared/types'


function resolveSideConfig(config: Config): Config {
  const defaultConfig: Config = {
    title: 'island',
    description: "ssg framework",
    themeConfig: {} as any,
    vite: {}
  }
  return Object.assign(defaultConfig, config)

}

export async function resolveConfig(root: string): Promise<SiteConfig> {
  const { config, sources: [configPath] } = await loadConfig<Config>({
    sources: [{ files: "island.config" }],
    cwd: root
  })
  const siteConfig: SiteConfig = {
    root,
    configPath,
    config: resolveSideConfig(config)
  }
  return siteConfig

}

export function defineConfig(config: Config): Config {
  return config
}