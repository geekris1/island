import sirv from 'sirv'
import polka from 'polka'
import { join } from 'path'
import { ROOT } from '../constants'


export function server(root: string) {
  const staticPath = join(ROOT, root, 'build')
  const assets = sirv(staticPath)
  polka().use(assets)
    .listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://127.0.0.1:1010 ~!');
    });
}
