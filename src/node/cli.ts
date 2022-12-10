import cac from "cac"
import { build } from './build'
import { createDevServer } from "./dev"
import { server } from "./server"

const cli = cac('island').version('0.0.1').help()

cli.command("dev [root]", 'start dev server ~~').action(async (root: string) => {
  const server = await createDevServer(root)
  await server.listen()
  server.printUrls()
})

cli.command("build [root]", 'start build project ~~').action(async (root: string) => {
  await build(root)
})

cli.command("server [root]", 'start server ~~').action(async (root: string) => {
  await build(root)
  server(root)
})


cli.parse()