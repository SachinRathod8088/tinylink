// components/Header.js
import Link from 'next/link'
import { LinkIcon } from '@heroicons/react/24/outline'   // ICON IMPORT

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        
        {/* Logo + Icon */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-sky-600 hover:text-sky-700 transition">
          <LinkIcon className="h-6 w-6 text-sky-600" />
          <span>TinyLink</span>
        </Link>

        <nav className="space-x-4">
          <Link href="/" className="text-sm text-gray-600 hover:text-sky-600 transition">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  )
}
