

declare module "virtual:island-config" {
  import type { Config } from 'shared/types'
  const config: Config
  export default config
}

declare module "virtual:island-routes" {
  import type { RouteObject } from 'react-router-dom'
  const routes: RouteObject[]
  export { routes }
}