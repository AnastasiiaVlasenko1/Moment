import { Link, useLocation } from "react-router"
import { CalendarDays, FileText, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
  { to: "/", label: "Capture", icon: CalendarDays },
  { to: "/review", label: "Review", icon: FileText },
]

/** Site-wide header with primary navigation. */
export function AppHeader() {
  const { pathname } = useLocation()

  return (
    <header
      data-el="global-header"
      className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          to="/"
          data-el="global-nav-logo"
          className="flex items-center gap-2 font-semibold"
        >
          <Sparkles className="size-5 text-primary" />
          Monthly Review Builder
        </Link>
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
      </div>
    </header>
  )
}
