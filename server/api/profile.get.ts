export default defineEventHandler(async () => {
  const db = await connectToDatabase()
  const profile = await db.collection('profile').findOne({})
  return profile || null
})
