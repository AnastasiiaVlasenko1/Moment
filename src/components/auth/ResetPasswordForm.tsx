// "Set a new password" card, reached from the emailed reset link. If the user
// lands here without a valid recovery session (expired/again link, or a direct
// visit), we show a recovery prompt instead of the form.

import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter"
import { useResetPasswordForm } from "@/components/auth/use-reset-password-form"
import { PASSWORD_MIN_LENGTH } from "@/components/auth/password-strength"
import { useAuth } from "@/hooks/use-auth"

export function ResetPasswordForm() {
  const { session, loading, passwordRecovery } = useAuth()
  const {
    password,
    confirm,
    error,
    submitting,
    setPassword,
    setConfirm,
    onSubmit,
  } = useResetPasswordForm()

  // No recovery session and not already signed in → the link is missing/expired.
  if (!loading && !passwordRecovery && !session) {
    return (
      <Card data-el="reset-password-card" className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <CardTitle
            data-el="reset-password-invalid-title"
            className="font-handwritten text-3xl leading-none"
          >
            Link expired
          </CardTitle>
          <CardDescription data-el="reset-password-invalid-subtitle">
            This password reset link is invalid or has expired. Request a fresh
            one to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild variant="interactive" className="w-full">
            <Link data-el="reset-password-request-again" to="/forgot-password">
              Request a new link
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card data-el="reset-password-card" className="w-full max-w-sm">
      <CardHeader className="items-center text-center">
        <CardTitle
          data-el="reset-password-title"
          className="font-handwritten text-3xl leading-none"
        >
          Set a new password
        </CardTitle>
        <CardDescription data-el="reset-password-subtitle">
          Choose a new password for your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          data-el="reset-password-form"
          onSubmit={onSubmit}
          aria-busy={submitting}
        >
          <FieldGroup>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="reset-password">New password</FieldLabel>
              <PasswordInput
                id="reset-password"
                data-el="reset-password-input"
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!error}
                aria-describedby="reset-password-hint"
                minLength={PASSWORD_MIN_LENGTH}
                autoFocus
                required
              />
              <PasswordStrengthMeter
                password={password}
                data-el="reset-password-strength"
              />
              <FieldDescription id="reset-password-hint">
                Must be at least {PASSWORD_MIN_LENGTH} characters.
              </FieldDescription>
            </Field>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="reset-password-confirm">
                Confirm password
              </FieldLabel>
              <PasswordInput
                id="reset-password-confirm"
                data-el="reset-password-confirm"
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? "reset-password-error" : undefined}
                minLength={PASSWORD_MIN_LENGTH}
                required
              />
              {error && (
                <FieldError id="reset-password-error" data-el="reset-password-error">
                  {error}
                </FieldError>
              )}
            </Field>
            <Button
              data-el="reset-password-submit"
              type="submit"
              variant="interactive"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? "Saving…" : "Update password"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
