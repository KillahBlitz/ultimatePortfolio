export default defineEventHandler(async () => {
  const db = await connectToDatabase()
  const vinculation = await db.collection('vinculation').find({}).sort({ id: 1 }).toArray()
  return vinculation || []
})
