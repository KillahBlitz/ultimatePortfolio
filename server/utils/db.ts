import { MongoClient, Db } from 'mongodb'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb
  }

  const config = useRuntimeConfig()
  const uri = config.mongoUrl || process.env.VITE_MONGO_URL || process.env.MONGO_URL || ''

  if (!uri) {
    throw new Error('MongoDB URI not configured')
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri)
    await cachedClient.connect()
  }

  cachedDb = cachedClient.db('portfolio_db')
  return cachedDb
}
