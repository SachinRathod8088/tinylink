// pages/code/[code].js
import Layout from '../../components/Layout'

export async function getServerSideProps({ params }) {
  const code = params.code
  // Using BASE_URL ensures server-side fetch uses the deployed URL or localhost from env.
  const base = process.env.BASE_URL || 'http://localhost:3000'
  const res = await fetch(`${base}/api/links/${encodeURIComponent(code)}`)

  if (res.status === 404) {
    return { notFound: true }
  }
  const link = await res.json()
  return { props: { link } }
}

export default function StatsPage({ link }) {
  if (!link) return <Layout><div className="p-6">Not found</div></Layout>

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Stats for: {link.code}</h1>
        <div className="bg-white shadow rounded p-4 space-y-2">
          <p><strong>Short code:</strong> {link.code}</p>
          <p><strong>Target URL:</strong> <a className="text-blue-600" href={link.url} target="_blank" rel="noreferrer">{link.url}</a></p>
          <p><strong>Total clicks:</strong> {link.clicks}</p>
          <p><strong>Created:</strong> {new Date(link.createdAt).toLocaleString()}</p>
          <p><strong>Last clicked:</strong> {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : 'Never'}</p>
        </div>
      </div>
    </Layout>
  )
}
