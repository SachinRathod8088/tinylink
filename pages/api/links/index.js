// pages/api/links/index.js
import prisma from '../../../lib/prisma'

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/

function validateUrl(u) {
  try {
    new URL(u)
    return true
  } catch {
    return false
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const links = await prisma.link.findMany({ orderBy: { createdAt: 'desc' } })
    return res.status(200).json(links)
  }

  if (req.method === 'POST') {
    const { url, code } = req.body || {}

    if (!url || !validateUrl(url)) {
      return res.status(400).json({ error: 'Invalid or missing url' })
    }

    if (code) {
      if (!CODE_REGEX.test(code)) {
        return res.status(400).json({ error: 'Code must match [A-Za-z0-9]{6,8}' })
      }
      const existing = await prisma.link.findUnique({ where: { code } })
      if (existing) {
        return res.status(409).json({ error: 'Code already exists' })
      }
      const created = await prisma.link.create({ data: { url, code } })
      return res.status(201).json(created)
    }

    // generate 6-char code and ensure uniqueness
    const generateCode = async () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const len = 6
      let attempt = ''
      for (let i = 0; i < len; i++) {
        attempt += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      const exists = await prisma.link.findUnique({ where: { code: attempt } })
      if (exists) return generateCode()
      return attempt
    }

    const newCode = await generateCode()
    const created = await prisma.link.create({ data: { url, code: newCode } })
    return res.status(201).json(created)
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
