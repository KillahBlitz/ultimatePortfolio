export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event).catch(() => ({}))
    const headers = getHeaders(event)
    const ip = getRequestIP(event, { xForwardedFor: true }) || headers['x-forwarded-for'] || headers['x-real-ip'] || 'unknown'
    const userAgent = headers['user-agent'] || body?.userAgent || 'unknown'
    const referrer = headers['referer'] || headers['referrer'] || body?.referrer || 'direct'
    const language = headers['accept-language'] || body?.language || 'unknown'

    const db = await connectToDatabase()

    const visitDoc = {
      ip,
      userAgent,
      referrer,
      language,
      screen: body?.screen || null,
      path: body?.path || '/',
      visitedAt: new Date(),
      createdAt: new Date().toISOString()
    }

    const [insertResult] = await Promise.all([
      db.collection('visits').insertOne(visitDoc),
      db.collection('analytics_stats').updateOne(
        { _id: 'global_metrics' as any },
        {
          $inc: { totalVisits: 1 },
          $set: { lastVisitAt: new Date() }
        },
        { upsert: true }
      )
    ])

    return {
      success: true,
      visitId: insertResult.insertedId
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
})
