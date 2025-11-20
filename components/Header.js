// components/Header.js
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">TinyLink</Link>
        <nav className="space-x-4">
          <Link href="/" className="text-sm text-gray-600">Dashboard</Link>
        </nav>
      </div>
    </header>
  )
}
