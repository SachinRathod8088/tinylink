// lib/prisma.js
import { PrismaClient } from '@prisma/client'

/**
 * In serverless environments (Vercel) creating a new PrismaClient on every request
 * can exhaust database connections. This pattern reuses the client in development
 * and avoids multiple connections across hot reloads.
 */
let prisma

if (!global.prisma) {
  global.prisma = new PrismaClient()
}

prisma = global.prisma

export default prisma
