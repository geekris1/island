import { ROOT, DEFAULT_TEMPLATE_HTML } from '../../constants'
import { describe, expect, test } from 'vitest'
import { CreateRouter } from '../vite-plugin-island-routes'
import { resolve } from 'path'
describe("create router result", async () => {
  const router = new CreateRouter(resolve(__dirname, '../../../docs'))
  await router.init()
  const routes = router.getRoutes()
  test("files", () => {
    expect(routes).toMatchInlineSnapshot(`
      [
        {
          "absolute": "/Users/geek/Documents/island/docs/guide/A/index.tsx",
          "path": "/guide/A/",
        },
        {
          "absolute": "/Users/geek/Documents/island/docs/guide/index.tsx",
          "path": "/guide/",
        },
      ]
    `)
  })
  test("generateRoutes", () => {
    expect(router.generateRoutes()).toMatchInlineSnapshot(`
      "import React from 'react';
      import __IslandRoutesComponent0 from '/Users/geek/Documents/island/docs/guide/A/index.tsx'
      import __IslandRoutesComponent1 from '/Users/geek/Documents/island/docs/guide/index.tsx'
      export const routes = [
            {
                path:'/guide/A/',
                element: React.createElement(__IslandRoutesComponent0) 
              },{
                path:'/guide/',
                element: React.createElement(__IslandRoutesComponent1) 
              }
          ]"
    `)
  })
})