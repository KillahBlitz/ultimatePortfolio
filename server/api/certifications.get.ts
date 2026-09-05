export default defineEventHandler(async () => {
  const db = await connectToDatabase()
  const certs = await db.collection('certs').find({}).sort({ id: 1 }).toArray()
  return certs || []
})
