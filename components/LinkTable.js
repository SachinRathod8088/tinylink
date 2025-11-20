// components/LinkTable.js
import Link from 'next/link'
import axios from 'axios'
import copy from 'copy-to-clipboard'

export default function LinkTable({ links, onDeleted }) {
  const handleDelete = async (code) => {
    if (!confirm('Delete link ' + code + '?')) return
    try {
      await axios.delete(`/api/links/${code}`)
      onDeleted && onDeleted(code)
    } catch (err) {
      alert('Delete failed')
    }
  }

  const handleCopy = (shortUrl) => {
    copy(shortUrl)
    alert('Copied: ' + shortUrl)
  }

  const base = process.env.NEXT_PUBLIC_BASE_URL || ''

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2">Short Code</th>
            <th className="px-4 py-2">Target URL</th>
            <th className="px-4 py-2">Clicks</th>
            <th className="px-4 py-2">Last Clicked</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map(l => (
            <tr key={l.code} className="border-t">
              <td className="px-4 py-2">
                <Link href={`/code/${l.code}`} className="text-blue-600">{l.code}</Link>
              </td>
              <td className="px-4 py-2 truncate-ellipsis max-w-xs" title={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer" className="text-gray-800">{l.url}</a>
              </td>
              <td className="px-4 py-2">{l.clicks}</td>
              <td className="px-4 py-2">{l.lastClicked ? new Date(l.lastClicked).toLocaleString() : 'Never'}</td>
              <td className="px-4 py-2 space-x-2">
                <button onClick={() => handleCopy(`${base}/${l.code}`)} className="text-sm px-2 py-1 border rounded">Copy</button>
                <a href={`${base}/${l.code}`} target="_blank" rel="noreferrer" className="text-sm px-2 py-1 border rounded">Open</a>
                <button onClick={() => handleDelete(l.code)} className="text-sm px-2 py-1 bg-red-600 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
          {links.length === 0 && <tr><td colSpan="5" className="p-6 text-center text-gray-500">No links yet</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
