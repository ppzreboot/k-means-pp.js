// ex. scripts/build_npm.ts
import { build, emptyDir } from '@deno/dnt'
import pkg from './deno.json' with { type: 'json' }

await emptyDir('./npm')

await build({
  entryPoints: ['./lib/mod.ts'],
  outDir: './npm',
  declaration: 'inline',
  test: false, // don't emit test files
  scriptModule: false,
  shims: {
    deno: false, // dont't add deno shim
  },
  package: {
    name: 'k-means-pp',
    version: pkg.version,
    description: 'A JS/TS implementation of the k-means algorithm.',
    keywords: [
      'k-means++',
      'k-means',
      'kmeans',
    ],
    author: 'ppz',
    license: 'Unlicense',
    repository: {
      type: 'git',
      url: 'https://github.com/ppzreboot/k-means-pp.js',
    },
    bugs: {
      url: 'https://github.com/ppzreboot/k-means-pp.js/issues',
    },
  },
  postBuild() {
    Deno.copyFileSync('LICENSE', 'npm/LICENSE')
    Deno.copyFileSync('readme.md', 'npm/readme.md')
  }
})
