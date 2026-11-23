import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found | Ultrafield Logistics Limited'
  })

  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-white px-5 py-20">
      <div className="text-center">
        <p className="font-archivo text-7xl font-bold text-ultrablue-600 sm:text-8xl">404</p>
        <h1 className="mt-4 font-archivo text-2xl font-bold text-ink-950 sm:text-3xl">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-700/70">
          The page you are looking for doesn't exist or has been moved. Let's get you back on
          route.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn-outline"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      </div>
    </section>
  )
}
