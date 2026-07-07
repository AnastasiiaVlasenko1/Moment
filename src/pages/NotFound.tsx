import { Link } from "react-router"

function NotFound() {
  return (
    <main data-el="not-found" className="flex min-h-svh items-center justify-center">
      <div className="text-center">
        <h1 data-el="not-found-title" className="text-4xl font-bold tracking-tight">404</h1>
<p data-el="not-found-subtitle" className="mt-3 text-muted-foreground">Page not found</p>
<Link data-el="not-found-home-link" to="/" className="mt-4 inline-block rounded-sm py-3 px-2 text-sm underline underline-offset-4 hover:text-link focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none">
          Go home
        </Link>
      </div>
    </main>
  )
}

export default NotFound
