// components/LinkForm.js
import { useState } from 'react'
import axios from 'axios'

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
      setSuccess('Link created')
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
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Target URL</label>
        <input className="mt-1 px-3 py-2 border rounded w-full" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/long/path" />
      </div>

      <div>
        <label className="block text-sm font-medium">Custom Code (optional)</label>
        <input className="mt-1 px-3 py-2 border rounded w-full" value={code} onChange={(e) => setCode(e.target.value)} placeholder="6-8 chars [A-Za-z0-9]" />
      </div>

      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}

      <div>
        <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
          {loading ? 'Creating...' : 'Create Short Link'}
        </button>
      </div>
    </form>
  )
}
