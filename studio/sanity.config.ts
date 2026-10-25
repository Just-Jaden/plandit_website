import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

if (!projectId) {
  throw new Error('SANITY_STUDIO_PROJECT_ID is required to build Plandit Studio.')
}

export default defineConfig({
  name: 'plandit',
  title: 'Plandit Blog',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  scheduledDrafts: {
    enabled: true,
  },
  schema: {
    types: schemaTypes,
  },
})
