import { defineBuildConfig } from 'unbuild'
import { copyFileSync, readdirSync, rename, renameSync } from 'fs'
import { resolve } from 'path'

const obPluginDirectory = 'D:/ob/.obsidian/plugins/obsidian-plugin-proxy'

export default defineBuildConfig({
  entries: [
    {
      input: './src/main',
      format: 'cjs'
    },
    {
      builder: 'mkdist',
      input: './public',
    }
  ],
  declaration: true,
  clean: true,
  externals: [
    'electron',
    'obsidian'
  ],
  rollup: {
    emitCJS: true,
  },
  hooks: {
    "build:done": (ctx) => {
      const files = readdirSync(ctx.options.outDir)
      console.log(files)
      files.forEach(f => {
        const from = resolve(ctx.options.outDir, f)
        renameSync(from, from.replace(/.cjs$/, '.js'))

        return
        const to = resolve(obPluginDirectory, f)
        copyFileSync(from, to)
      })
    }
  }
})

// D:\ob\.obsidian\plugins\obsidian-plugin-proxy