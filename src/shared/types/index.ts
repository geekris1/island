import type { UserConfig } from 'vite'

export interface NavWithLink {
  text: string,
  link: string
}

export interface SiteBarGroup {
  text: string,
  items: SiteBarItem[]
}
export interface SiteBarItem {
  text: string,
  link: string
}
export interface SiteBar {
  [path: string]: SiteBarGroup
}
export interface ThemeConfig {
  link: NavWithLink[],
  siteBar: SiteBar
}

export interface SiteConfig {
  root: string,
  configPath: string,
  config: Config
}

export interface Config {
  title?: string,
  description?: string,
  themeConfig?: ThemeConfig,
  vite?: UserConfig
}