// Shared layout for the auth pages: a centered card slot inside a <main>
// landmark. Optionally bounces already-signed-in users away (used by
// login / sign-up / forgot-password, but NOT reset-password — a password
// recovery link counts as a session and must be allowed to render).

import { Navigate } from "react-router"
import { useAuth } from "@/hooks/use-auth"

interface AuthScreenProps {
  /** data-el for the page's <main> wrapper (must be unique per page). */
  dataEl: string
  /** Redirect to the app when a session already exists. */
  redirectIfAuthed?: boolean
  children: React.ReactNode
}

export function AuthScreen({
  dataEl,
  redirectIfAuthed = false,
  children,
}: AuthScreenProps) {
  const { session, loading } = useAuth()

  if (redirectIfAuthed && !loading && session) {
    return <Navigate to="/" replace />
  }

  return (
    <main
      data-el={dataEl}
      className="flex min-h-svh items-center justify-center p-4"
    >
      {children}
    </main>
  )
}
