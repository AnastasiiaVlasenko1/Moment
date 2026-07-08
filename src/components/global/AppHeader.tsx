import { Link, useLocation, useNavigate } from "react-router"
import { CalendarDays, FileText, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MomentsLogo } from "@/components/global/MomentsLogo"
import { useAuth } from "@/hooks/use-auth"

const NAV = [
  { to: "/", label: "Capture", icon: CalendarDays },
  { to: "/review", label: "Review", icon: FileText },
]

/** Site-wide header with primary navigation. */
export function AppHeader() {
  const { pathname } = useLocation()
  const { signOut } = useAuth()
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
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          data-el="global-nav-logo"
          aria-label="Moments home"
          className="flex items-center justify-self-start"
        >
          <MomentsLogo markClassName="size-11" wordmarkClassName="text-3xl" />
        </Link>
        <nav
          data-el="global-nav-menu"
          className="flex items-center gap-1 justify-self-center rounded-full bg-secondary p-1"
        >
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
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
                  active
                    ? "bg-interactive text-interactive-foreground shadow-sm"
                    : "text-secondary-foreground hover:text-foreground",
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
          className="flex items-center justify-self-end"
        >
          <Button
            data-el="global-signout"
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            aria-label="Sign out"
            className="h-11 min-w-11"
          >
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
