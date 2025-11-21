// components/LinkTable.js
import Link from 'next/link'
import axios from 'axios'
import copy from 'copy-to-clipboard'
import { ClipboardDocumentIcon, ArrowTopRightOnSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

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
    // small non-blocking feedback
    const el = document.createElement('div')
    el.textContent = `Copied: ${shortUrl}`
    el.className = 'fixed bottom-6 right-6 bg-black text-white text-sm px-3 py-2 rounded shadow'
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 1500)
  }

  const base = process.env.NEXT_PUBLIC_BASE_URL || ''

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[1300px] table-auto bg-white rounded overflow-hidden shadow">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Short</th>
            <th className="px-2 py-2 text-left text-sm font-medium text-slate-700 w-[12rem]">Target URL</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-slate-700">Clicks</th>
            <th className="px-2 py-2 text-left text-sm font-medium text-slate-700 w-[4rem]">Last Clicked</th>
            <th className="px-3 py-2 text-center text-sm font-medium text-slate-700 ">Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((l) => (
            <tr key={l.code} className="border-t last:border-b">
              <td className="px-4 py-3 align-middle w-28">
                <Link href={`/code/${l.code}`} className="text-sky-600 font-medium text-sm">
                  {l.code}
                </Link>
              </td>

              <td className="px-4 py-3 align-middle max-w-[36rem]">
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-slate-800 truncate"
                  title={l.url}
                >
                  {l.url}
                </a>
              </td>

              <td className="px-4 py-3 text-center align-middle">
                <span className="inline-block text-sm font-medium text-slate-700">{l.clicks}</span>
              </td>

              <td className="px-4 py-3 align-middle text-sm text-slate-600">
                {l.lastClicked ? new Date(l.lastClicked).toLocaleString() : 'Never'}
              </td>

              <td className="px-4 py-3 text-center align-middle space-x-2">
                {/* Copy */}
                <button
                  onClick={() => handleCopy(`${base}/${l.code}`)}
                  className="inline-flex items-center px-3 py-1.5 border border-sky-200 bg-white text-sky-600 text-sm rounded hover:bg-sky-50"
                  aria-label={`Copy short link ${l.code}`}
                >
                  <ClipboardDocumentIcon className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline"></span>
                </button>

                {/* Open */}
                <a
                  href={`${base}/${l.code}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-3 py-1.5 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700"
                  aria-label={`Open short link ${l.code}`}
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Open</span>
                </a>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(l.code)}
                  className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  aria-label={`Delete short link ${l.code}`}
                >
                  <TrashIcon className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline"></span>
                </button>
              </td>
            </tr>
          ))}

          {links.length === 0 && (
            <tr>
              <td colSpan="5" className="p-6 text-center text-sm text-slate-500">
                No links yet — create one on the left.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
