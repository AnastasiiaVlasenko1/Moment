// The email + password sign-in / sign-up card. Mode comes from the route
// (/login or /signup). Logic lives in use-login-form.ts.

import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { MomentsMark } from "@/components/global/MomentsLogo"
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
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter"
import { CheckEmailCard } from "@/components/auth/CheckEmailCard"
import { useLoginForm, type AuthMode } from "@/components/auth/use-login-form"
import { PASSWORD_MIN_LENGTH } from "@/components/auth/password-strength"

export function LoginForm({ mode }: { mode: AuthMode }) {
  const {
    email,
    password,
    error,
    submitting,
    confirmationSent,
    resending,
    resent,
    setEmail,
    setPassword,
    onSubmit,
    onResendConfirmation,
  } = useLoginForm(mode)

  const isSignup = mode === "signup"
  // data-el / id prefix keeps element names unique across the two routes.
  const el = isSignup ? "signup" : "login"

  if (confirmationSent) {
    return (
      <CheckEmailCard
        dataEl={`${el}-confirmation`}
        title="Check your email"
        onResend={onResendConfirmation}
        resending={resending}
        resent={resent}
      >
        We sent a confirmation link to <strong>{email}</strong>. Click it to
        activate your account, then come back and sign in.
      </CheckEmailCard>
    )
  }

  const errorId = `${el}-error`

  return (
    <Card data-el={`${el}-card`} className="w-full max-w-sm">
      <CardHeader className="items-center text-center">
        <MomentsMark className="mx-auto size-20" />
        <CardTitle
          data-el={`${el}-title`}
          className="font-handwritten text-3xl leading-none"
        >
          {isSignup ? "Create your account" : "Welcome back"}
        </CardTitle>
        <CardDescription data-el={`${el}-subtitle`}>
          {isSignup
            ? "Sign up to start capturing your monthly moments."
            : "Sign in to Moments."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form data-el={`${el}-form`} onSubmit={onSubmit} aria-busy={submitting}>
          <FieldGroup>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor={`${el}-email`}>Email</FieldLabel>
              <Input
                id={`${el}-email`}
                data-el={`${el}-email`}
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                autoFocus
                required
              />
            </Field>
            <Field data-invalid={!!error}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor={`${el}-password`}>Password</FieldLabel>
                {!isSignup && (
                  <Link
                    data-el="login-forgot-link"
                    to="/forgot-password"
                    className="text-muted-foreground hover:text-foreground text-sm underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <PasswordInput
                id={`${el}-password`}
                data-el={`${el}-password`}
                autoComplete={isSignup ? "new-password" : "current-password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={
                  isSignup ? `${el}-password-hint` : error ? errorId : undefined
                }
                minLength={PASSWORD_MIN_LENGTH}
                required
              />
              {isSignup && (
                <>
                  <PasswordStrengthMeter
                    password={password}
                    data-el="signup-password-strength"
                  />
                  <FieldDescription id={`${el}-password-hint`}>
                    Must be at least {PASSWORD_MIN_LENGTH} characters.
                  </FieldDescription>
                </>
              )}
            </Field>
            {error && (
              <FieldError id={errorId} data-el={errorId}>
                {error}
              </FieldError>
            )}
            <Button
              data-el={`${el}-submit`}
              type="submit"
              variant="interactive"
              className="w-full"
              disabled={submitting}
            >
              {submitting
                ? "Please wait…"
                : isSignup
                  ? "Create account"
                  : "Sign in"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
      <CardContent className="text-muted-foreground pt-0 text-center text-sm">
        {isSignup ? "Already have an account?" : "New here?"}{" "}
        <Link
          data-el={`${el}-toggle`}
          to={isSignup ? "/login" : "/signup"}
          className="text-foreground font-medium underline"
        >
          {isSignup ? "Sign in" : "Create one"}
        </Link>
      </CardContent>
    </Card>
  )
}
