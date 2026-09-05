import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const catalogPath = query.path as string

  if (!catalogPath) return []

  const fullPath = path.join(process.cwd(), 'public', catalogPath)

  try {
    const files = fs.readdirSync(fullPath)
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']
    return files
      .filter(file => validExtensions.includes(path.extname(file).toLowerCase()))
      .map(file => `/${catalogPath}/${file}`)
  } catch {
    return []
  }
})
