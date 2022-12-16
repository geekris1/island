import type { Plugin } from 'vite'
import { normalizePath } from "vite"
import { relative } from 'path'
import fg from 'fast-glob'
export function VitePluginIslandRoutes(root: string): Plugin {
  const virtualModuleId = 'virtual:island-routes'
  const resolveVirtualModuleId = '\0' + virtualModuleId
  const router = new CreateRouter(root)
  return {
    name: 'vite-plugin-island-routes',
    async configResolved() {
      await router.init()
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolveVirtualModuleId
      }
    },
    load(id) {
      if (id === resolveVirtualModuleId) {
        return router.generateRoutes()
      }
    }
  }
}


interface Routes {
  path: string,
  absolute: string
}
export class CreateRouter {
  private _root: string
  private _routes: Routes[] = [];
  constructor(root: string) {
    this._root = root;
  }
  async init() {
    const files = (await fg('**/*.{tsx,jsx,md,mdx}', { cwd: this._root, absolute: true, ignore: ["**/node_modules/**", "**/build/*"] })).sort()
    files.forEach(file => {
      const fileRelativePath = normalizePath(relative(this._root, file))
      const normalizeFilePath = this.normalizeRoutePath(fileRelativePath)
      this._routes.push({ path: normalizeFilePath, absolute: file })
    })
  }
  getRoutes(): Routes[] {
    return this._routes
  }
  normalizeRoutePath(path: string) {
    let normalizePath = path.replace(/\.(.*)?$/, "").replace(/index/, "")
    return normalizePath.startsWith('/') ? normalizePath : `/${normalizePath}`

  }
  generateRoutes() {
    return `import React from 'react';
${this._routes.map((route, index) => {
      return `import __IslandRoutesComponent${index} from '${route.absolute}'`
    }).join("\n")}
export const routes = [
      ${this._routes.map((route, index) => {
      return `{
          path:'${route.path}',
          element: React.createElement(__IslandRoutesComponent${index}) 
        }`
    })}
    ]`

  }

}