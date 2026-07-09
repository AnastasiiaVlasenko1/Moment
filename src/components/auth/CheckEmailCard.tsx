// Shared "we emailed you a link" confirmation card. Used after sign-up and after
// a password-reset request. Moves focus to the heading on mount and announces
// itself politely so screen-reader users aren't stranded when the form is
// swapped out. Offers an optional "resend" action and a "back to sign in" link.

import { useEffect, useRef } from "react"
import { Link } from "react-router"
import { MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CheckEmailCardProps {
  /** Unique data-el prefix for this instance (e.g. "login-confirmation"). */
  dataEl: string
  title: string
  /** Instruction text — usually references the email address. */
  children: React.ReactNode
  onResend?: () => void
  resending?: boolean
  resent?: boolean
}

export function CheckEmailCard({
  dataEl,
  title,
  children,
  onResend,
  resending,
  resent,
}: CheckEmailCardProps) {
  const titleRef = useRef<HTMLDivElement>(null)

  // Pull focus to the heading so the state change is announced and keyboard
  // focus isn't lost on the now-unmounted submit button.
  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  return (
    <Card
      data-el={`${dataEl}-card`}
      className="w-full max-w-sm"
      role="status"
      aria-live="polite"
    >
      <CardHeader className="items-center text-center">
        <MailCheck className="text-primary size-8" aria-hidden="true" />
        <CardTitle
          ref={titleRef}
          tabIndex={-1}
          data-el={`${dataEl}-title`}
          className="font-handwritten text-3xl leading-none outline-none"
        >
          {title}
        </CardTitle>
        <CardDescription data-el={`${dataEl}-subtitle`}>
          {children}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-center">
        {onResend && (
          <Button
            data-el={`${dataEl}-resend`}
            type="button"
            variant="outline"
            className="w-full"
            onClick={onResend}
            disabled={resending || resent}
          >
            {resending
              ? "Sending…"
              : resent
                ? "Email sent"
                : "Resend email"}
          </Button>
        )}
        <p className="text-muted-foreground text-sm">
          <Link
            data-el={`${dataEl}-back`}
            to="/login"
            className="text-foreground font-medium underline"
          >
            Back to sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
