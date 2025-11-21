// components/LinkForm.js
import { useState } from 'react'
import axios from 'axios'
import { PlusIcon } from '@heroicons/react/24/outline'

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/

function validateUrl(u) {
  try {
    new URL(u)
    return true
  } catch {
    return false
  }
}

export default function LinkForm({ onCreated }) {
  const [url, setUrl] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!url || !validateUrl(url)) {
      setError('Enter a valid URL (include https:// or http://)')
      return
    }
    if (code && !CODE_REGEX.test(code)) {
      setError('Code must match [A-Za-z0-9]{6,8}')
      return
    }

    setLoading(true)
    try {
      const resp = await axios.post('/api/links', { url: url.trim(), code: code ? code.trim() : undefined })
      setSuccess('Link created successfully.')
      setUrl('')
      setCode('')
      onCreated && onCreated(resp.data)
    } catch (err) {
      if (err.response) setError(err.response.data?.error || 'Server error')
      else setError('Network error')
    } finally {
      setLoading(false)
      setTimeout(() => setSuccess(null), 3000)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Target URL</label>
        <input
          className="w-full px-4 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-200"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/long/path"
          aria-label="Target URL"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Custom Code (optional)</label>
        <input
          className="w-1/2 md:w-1/3 px-4 py-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-200"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="6-8 chars (abc123)"
          aria-label="Custom code"
        />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
      {success && <div className="text-sm text-green-600">{success}</div>}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded shadow-sm disabled:opacity-60"
          aria-label="Create short link"
        >
          <PlusIcon className="h-5 w-5" />
          <span className="hidden sm:inline">{loading ? 'Creating…' : 'Create Short Link'}</span>
          <span className="sm:hidden">{loading ? '...' : 'Create'}</span>
        </button>
      </div>
    </form>
  )
}
