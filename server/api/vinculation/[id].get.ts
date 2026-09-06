export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (isNaN(id)) return null
  const db = await connectToDatabase()
  const item = await db.collection('vinculation').findOne({ id })
  return item ?? null
})
