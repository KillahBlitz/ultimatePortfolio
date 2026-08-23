export default defineEventHandler(async () => {
  const db = await connectToDatabase()
  const skills = await db.collection('skills').find({}).sort({ order: 1 }).toArray()
  return skills || []
})
