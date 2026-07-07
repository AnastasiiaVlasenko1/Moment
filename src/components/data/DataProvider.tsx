// Loads the signed-in user's moments & projects from Supabase into Redux, then
// renders the app. A brand-new user (no projects yet) is seeded with defaults.
// Mounted behind the auth guard (see RequireAuth), so a session always exists.
//
// The inner loader is remounted (via `key`) whenever the user changes or the
// user retries, so it always starts fresh in the "loading" state — no
// synchronous setState-in-effect needed.

import { useEffect, useState, type ReactNode } from "react"
import { AlertCircle } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useAppDispatch } from "@/store/hooks"
import { setMoments } from "@/store/momentsSlice"
import { setProjects } from "@/store/projectsSlice"
import { fetchMoments, fetchProjects, seedDefaultProjects } from "@/lib/api"

type Status = "loading" | "ready" | "error"

export function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [attempt, setAttempt] = useState(0)

  return (
    <DataLoader
      key={`${user?.id ?? "anon"}:${attempt}`}
      onRetry={() => setAttempt((a) => a + 1)}
    >
      {children}
    </DataLoader>
  )
}

function DataLoader({
  children,
  onRetry,
}: {
  children: ReactNode
  onRetry: () => void
}) {
  const dispatch = useAppDispatch()
  const [status, setStatus] = useState<Status>("loading")

  useEffect(() => {
    let active = true

    async function load() {
      try {
        let projects = await fetchProjects()
        if (projects.length === 0) {
          projects = await seedDefaultProjects()
        }
        const moments = await fetchMoments()
        if (!active) return
        dispatch(setProjects(projects))
        dispatch(setMoments(moments))
        setStatus("ready")
      } catch (err) {
        console.error("Failed to load your data:", err)
        if (active) setStatus("error")
      }
    }

    load()
    return () => {
      active = false
    }
  }, [dispatch])

  if (status === "loading") {
    return (
      <div
        data-el="data-loading"
        className="flex min-h-svh items-center justify-center"
      >
        <Spinner className="size-6 text-muted-foreground" />
      </div>
    )
  }

  if (status === "error") {
    return (
      <div
        data-el="data-error"
        className="flex min-h-svh flex-col items-center justify-center gap-4 p-4 text-center"
      >
        <AlertCircle className="size-8 text-destructive" />
        <div>
          <p className="font-medium">We couldn't load your data.</p>
          <p className="text-sm text-muted-foreground">
            Check your connection and try again.
          </p>
        </div>
        <Button data-el="data-error-retry" onClick={onRetry}>
          Retry
        </Button>
      </div>
    )
  }

  return <>{children}</>
}
