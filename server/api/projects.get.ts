export default defineEventHandler(async () => {
  const db = await connectToDatabase()
  const [projects, techCatalogDoc] = await Promise.all([
    db.collection('projects').find({}).sort({ order: 1 }).toArray(),
    db.collection('tech_catalog').findOne({})
  ])

  return {
    projects: (projects || []).map(p => ({
      ...p,
      agents: p.agents ?? false,
      images: Array.isArray(p.images) ? p.images : (p.image ? [p.image] : [])
    })),
    catalog: techCatalogDoc?.catalog || {}
  }
})
