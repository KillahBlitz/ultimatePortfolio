export default defineEventHandler(async () => {
  try {
    const db = await connectToDatabase()

    const [
      profile,
      services,
      projects,
      experience,
      education,
      skills,
      certificates,
      techCatalogDoc
    ] = await Promise.all([
      db.collection('profile').findOne({}),
      db.collection('services').find({ active: { $ne: false } }).sort({ order: 1 }).toArray(),
      db.collection('projects').find({}).sort({ order: 1 }).toArray(),
      db.collection('experience').find({}).sort({ order: 1 }).toArray(),
      db.collection('education').find({}).sort({ order: 1 }).toArray(),
      db.collection('skills').find({}).sort({ order: 1 }).toArray(),
      db.collection('certificates').findOne({}),
      db.collection('tech_catalog').findOne({})
    ])

    return {
      profile: profile || null,
      services: services || [],
      projects: (projects || []).map(p => ({
        ...p,
        agents: p.agents ?? false,
        images: Array.isArray(p.images) ? p.images : (p.image ? [p.image] : [])
      })),
      experience: experience || [],
      education: education || [],
      skills: skills || [],
      certificates: certificates || null,
      techCatalog: techCatalogDoc?.catalog || {}
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Error fetching data from MongoDB'
    })
  }
})
