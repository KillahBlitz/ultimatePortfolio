export default defineEventHandler(async () => {
  const db = await connectToDatabase()
  const services = await db.collection('services').find({ active: { $ne: false } }).sort({ order: 1 }).toArray()
  return services || []
})
