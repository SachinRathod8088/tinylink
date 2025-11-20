// pages/index.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import LinkForm from '../components/LinkForm'
import LinkTable from '../components/LinkTable'

export default function Dashboard() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  const fetchLinks = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/links')
      setLinks(res.data)
    } catch (err) {
      console.error('Failed to fetch links', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const handleCreated = (newLink) => setLinks(prev => [newLink, ...prev])
  const handleDeleted = (code) => setLinks(prev => prev.filter(l => l.code !== code))

  const filtered = links.filter(l => l.code.includes(filter) || l.url.includes(filter))

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">TinyLink Dashboard</h1>

        {/* Top row: form (left) and search (right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 items-start">
          {/* Left: Form (occupies 2/3 on md+) */}
          <div className="md:col-span-2 bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium mb-3">Create a Short Link</h2>
            <p className="text-sm text-gray-600 mb-4">Enter target URL and optionally set a custom short code (6–8 alphanumeric chars).</p>
            <LinkForm onCreated={handleCreated} />
          </div>

          {/* Right: Search card (occupies 1/3 on md+) */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium mb-3">Search / Filters</h2>
            <p className="text-sm text-gray-600 mb-4">Quickly find links by code or URL.</p>

            <div className="space-y-3">
              <input
                className="w-full px-4 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Search by code or URL"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />

              {/* Optional future filters (kept simple now) */}
              <div className="text-sm text-gray-500">Results: {filtered.length} / {links.length}</div>
            </div>
          </div>
        </div>

        {/* Bottom row: full-width table */}
        <div className="bg-white border border-slate-100 rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-medium mb-3">Your Links</h2>
          <div className="text-sm text-gray-600 mb-4">Manage your short links below — click code to view stats, use actions to copy/open/delete.</div>

          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading links…</div>
          ) : (
            <LinkTable links={filtered} onDeleted={handleDeleted} />
          )}
        </div>
      </div>
    </Layout>
  )
}
