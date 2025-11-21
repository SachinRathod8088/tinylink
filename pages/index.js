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

  // Fetch links
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

  const handleCreated = (newLink) => setLinks((prev) => [newLink, ...prev])
  const handleDeleted = (code) =>
    setLinks((prev) => prev.filter((l) => l.code !== code))

  const filtered = links.filter(
    (l) => l.code.includes(filter) || l.url.includes(filter)
  )

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">TinyLink Dashboard</h1>

        {/* Top Row: Form (left) + Search (right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 items-start">

          {/* LEFT — Create Link Form */}
          <div className="md:col-span-2 bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium mb-3">Create a Short Link</h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter a long URL and optionally a custom short code.
            </p>
            <LinkForm onCreated={handleCreated} />
          </div>

          {/* RIGHT — Search Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium mb-3">Search / Filters</h2>
            <p className="text-sm text-gray-600 mb-4">
              Search by code or URL to quickly find a link.
            </p>

            {/* Search Input with Icon */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Search Icon */}
                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </div>

              <input
                className="w-full pl-10 px-4 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Search by code or URL"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                aria-label="Search links"
              />
            </div>

            {/* Optional Search Results Count */}
            <div className="text-sm text-gray-500 mt-3">
              Showing {filtered.length} of {links.length} links
            </div>
          </div>
        </div>

        {/* Table FULL-WIDTH below both cards */}
        <div className="bg-white border border-slate-100 rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-medium mb-3">Your Links</h2>
          <p className="text-sm text-gray-600 mb-4">
            Manage your short links below — copy, open, delete, or view stats.
          </p>

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
