// Route guard: protects pages that need a signed-in user. Used as a layout route
// in App.tsx wrapping the app's real pages. While the initial session check runs
// we show a spinner; if there's no session we bounce to /login.

import { Navigate, Outlet } from "react-router"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/hooks/use-auth"
import { DataProvider } from "@/components/data/DataProvider"

export function RequireAuth() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div
        data-el="auth-loading"
        className="flex min-h-svh items-center justify-center"
        role="status"
        aria-label="Checking your session"
      >
        <Spinner className="size-6 text-muted-foreground" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  // Signed in: load this user's data from Supabase before rendering the app.
  return (
    <DataProvider>
      <Outlet />
    </DataProvider>
  )
}
