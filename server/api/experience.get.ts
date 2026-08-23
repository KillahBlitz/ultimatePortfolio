export default defineEventHandler(async () => {
  const db = await connectToDatabase()
  const [experience, education] = await Promise.all([
    db.collection('experience').find({}).sort({ order: 1 }).toArray(),
    db.collection('education').find({}).sort({ order: 1 }).toArray()
  ])

  return {
    experience: experience || [],
    education: education || []
  }
})
