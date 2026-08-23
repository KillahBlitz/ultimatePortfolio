import { defineNitroPlugin } from 'nitropack/runtime'
import { closeDatabase } from '../utils/db'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('close', async () => {
    await closeDatabase()
  })
})
