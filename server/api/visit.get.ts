export default defineEventHandler(async () => {
  try {
    const db = await connectToDatabase()
    const [stats, count, recent] = await Promise.all([
      db.collection('analytics_stats').findOne({ _id: 'global_metrics' as any }),
      db.collection('visits').countDocuments(),
      db.collection('visits').find({}).sort({ visitedAt: -1 }).limit(15).toArray()
    ])

    return {
      totalVisits: stats?.totalVisits || count,
      recentVisits: recent
    }
  } catch (error: any) {
    return {
      totalVisits: 0,
      recentVisits: [],
      error: error.message
    }
  }
})
