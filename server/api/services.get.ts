export default defineEventHandler(async () => {
  const db = await connectToDatabase()
  const services = await db.collection('services').find({}).sort({ id: 1 }).toArray()
  return services || []
})
