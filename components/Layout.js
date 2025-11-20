// components/Layout.js
import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">{children}</main>
      <footer className="text-center text-sm py-4 text-gray-500">
        TinyLink — take-home
      </footer>
    </div>
  )
}
