// "Forgot your password?" request card: collect an email, send a reset link.
// On success it swaps to the shared CheckEmailCard confirmation.

import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { KeyRound } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { CheckEmailCard } from "@/components/auth/CheckEmailCard"
import { useForgotPasswordForm } from "@/components/auth/use-forgot-password-form"

export function ForgotPasswordForm() {
  const {
    email,
    error,
    submitting,
    sent,
    resending,
    resent,
    setEmail,
    onSubmit,
    onResend,
  } = useForgotPasswordForm()

  if (sent) {
    return (
      <CheckEmailCard
        dataEl="forgot-confirmation"
        title="Check your email"
        onResend={onResend}
        resending={resending}
        resent={resent}
      >
        If an account exists for <strong>{email}</strong>, we've sent a link to
        reset your password. The link expires in an hour.
      </CheckEmailCard>
    )
  }

  return (
    <Card data-el="forgot-password-card" className="w-full max-w-sm">
      <CardHeader className="items-center text-center">
        <KeyRound className="text-primary size-8" aria-hidden="true" />
        <CardTitle
          data-el="forgot-password-title"
          className="font-handwritten text-3xl leading-none"
        >
          Reset your password
        </CardTitle>
        <CardDescription data-el="forgot-password-subtitle">
          Enter your email and we'll send you a link to set a new password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          data-el="forgot-password-form"
          onSubmit={onSubmit}
          aria-busy={submitting}
        >
          <FieldGroup>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="forgot-email">Email</FieldLabel>
              <Input
                id="forgot-email"
                data-el="forgot-password-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? "forgot-password-error" : undefined}
                autoFocus
                required
              />
              {error && (
                <FieldError id="forgot-password-error" data-el="forgot-password-error">
                  {error}
                </FieldError>
              )}
            </Field>
            <Button
              data-el="forgot-password-submit"
              type="submit"
              variant="interactive"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? "Sending…" : "Send reset link"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
      <CardContent className="text-muted-foreground pt-0 text-center text-sm">
        Remembered it?{" "}
        <Link
          data-el="forgot-password-back"
          to="/login"
          className="text-foreground font-medium underline"
        >
          Back to sign in
        </Link>
      </CardContent>
    </Card>
  )
}
