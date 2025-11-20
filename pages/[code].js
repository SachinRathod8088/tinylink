// pages/[code].js
import prisma from '../lib/prisma'

export async function getServerSideProps({ params, res }) {
  const code = params.code
  const link = await prisma.link.findUnique({ where: { code } })

  if (!link) {
    // Show 404
    res.statusCode = 404
    return { props: { notFound: true } }
  }

  // Increment clicks and update lastClicked atomically
  await prisma.link.update({
    where: { code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date()
    }
  })

  res.setHeader('Location', link.url)
  res.statusCode = 302
  res.end()
  return { props: {} } // Never used because of redirect
}

export default function RedirectPage() {
  return <div>Redirecting…</div>
}
