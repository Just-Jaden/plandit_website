import {createReadStream} from 'node:fs'
import {readFile} from 'node:fs/promises'
import {join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {createClient} from '@sanity/client'

const root = fileURLToPath(new URL('..', import.meta.url))
const projectId =
  process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID
const dataset =
  process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || !token) {
  throw new Error('SANITY_PROJECT_ID and SANITY_WRITE_TOKEN are required.')
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-10-25',
  useCdn: false,
})
const sample = JSON.parse(
  await readFile(join(root, 'content', 'sample-post.json'), 'utf8'),
)
const image = await client.assets.upload(
  'image',
  createReadStream(join(root, 'website', 'images', 'photo-picnic.jpg')),
  {
    filename: 'plandit-downtown-saturday.jpg',
    contentType: 'image/jpeg',
  },
)

delete sample.coverUrl
delete sample.coverAlt
sample.slug = {current: sample.slug}
sample.coverImage = {
  _type: 'image',
  asset: {_type: 'reference', _ref: image._id},
  alt: 'Friends relaxing together in a sunny waterfront park.',
}

await client.createOrReplace(sample)
console.log(`Seeded “${sample.title}” into the ${dataset} dataset.`)
