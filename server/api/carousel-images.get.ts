import { readdirSync } from 'node:fs'
import { join } from 'node:path'

const validExtensions = ['.jpg', '.jpeg', '.png', '.webp']

export default defineEventHandler(() => {
  const dir = join(process.cwd(), 'public', 'images', 'carousels')
  const files = readdirSync(dir)
    .filter(f => validExtensions.some(ext => f.toLowerCase().endsWith(ext)))
    .sort()
    .map(f => `/images/carousels/${f}`)
  return files
})
