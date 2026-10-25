import {mkdir, rm, writeFile} from 'node:fs/promises'
import {join} from 'node:path'
import {spawnSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const studioOutput = join(root, 'website', 'studio')
const projectId = process.env.SANITY_STUDIO_PROJECT_ID

await rm(studioOutput, {recursive: true, force: true})

if (!projectId) {
  await mkdir(studioOutput, {recursive: true})
  await writeFile(
    join(studioOutput, 'index.html'),
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Plandit Studio setup</title><style>body{margin:0;background:#f4f1e9;color:#0b0d0c;font:16px/1.6 system-ui,sans-serif}main{max-width:680px;margin:10vh auto;padding:40px;background:#fff;border:1px solid #0b0d0c;border-radius:20px;box-shadow:9px 9px 0 #0b0d0c}h1{font-size:40px;line-height:1.05}code{background:#eee;padding:3px 6px;border-radius:5px}a{color:#087a4b}</style></head><body><main><h1>Plandit Studio is ready to connect.</h1><p>Create the Sanity project, then add <code>SANITY_STUDIO_PROJECT_ID</code>, <code>SANITY_PROJECT_ID</code>, <code>SANITY_STUDIO_DATASET</code>, and <code>SANITY_DATASET</code> in Vercel.</p><p>After the next deployment, invited editors can sign in here and publish blog posts.</p><p><a href="/">Return to Plandit</a></p></main></body></html>`,
  )
  console.warn(
    'SANITY_STUDIO_PROJECT_ID is not set; built the Studio setup screen.',
  )
  process.exit(0)
}

const executable = process.platform === 'win32' ? 'npx.cmd' : 'npx'
const result = spawnSync(
  executable,
  [
    'sanity',
    'build',
    join(root, 'website', 'studio'),
    '--yes',
  ],
  {
    cwd: join(root, 'studio'),
    env: process.env,
    stdio: 'inherit',
  },
)

if (result.status !== 0) {
  process.exit(result.status || 1)
}
