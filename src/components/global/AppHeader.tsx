import { Link, useLocation, useNavigate } from "react-router"
import { CalendarDays, FileText, LogOut, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

const NAV = [
  { to: "/", label: "Capture", icon: CalendarDays },
  { to: "/review", label: "Review", icon: FileText },
]

/** Site-wide header with primary navigation. */
export function AppHeader() {
  const { pathname } = useLocation()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate("/login")
  }

  return (
    <header
      data-el="global-header"
      className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur"
    >
      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          data-el="global-nav-logo"
          className="flex items-center gap-2 font-handwritten text-2xl leading-none text-foreground"
        >
          <Sparkles className="size-5 text-primary" />
          Monthly Review Builder
        </Link>
        <div className="flex items-center gap-3">
          <nav data-el="global-nav-menu" className="flex items-center gap-1">
            {NAV.map((item) => {
              const Icon = item.icon
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.to)
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div
            data-el="global-nav-user"
            className="flex items-center gap-2 border-l pl-3"
          >
            {user?.email && (
              <span className="hidden max-w-[14rem] truncate text-sm text-muted-foreground sm:inline">
                {user.email}
              </span>
            )}
            <Button
              data-el="global-signout"
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              aria-label="Sign out"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
