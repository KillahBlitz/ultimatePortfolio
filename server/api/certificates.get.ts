export default defineEventHandler(async () => {
  const db = await connectToDatabase()
  const certificates = await db.collection('certificates').findOne({})
  return certificates || { licenses: [], certificatesGallery: [], externalLinks: {} }
})
