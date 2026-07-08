// The email + password sign-in / sign-up card. Logic lives in use-login-form.ts.

import { MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MomentsMark } from "@/components/global/MomentsLogo"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLoginForm } from "@/components/auth/use-login-form"

export function LoginForm() {
  const {
    mode,
    email,
    password,
    error,
    submitting,
    confirmationSent,
    setEmail,
    setPassword,
    toggleMode,
    onSubmit,
  } = useLoginForm()

  const isSignup = mode === "signup"

  if (confirmationSent) {
    return (
      <Card data-el="login-card" className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <MailCheck className="size-8 text-primary" />
          <CardTitle data-el="login-confirmation-title" className="font-handwritten text-3xl leading-none">Check your email</CardTitle>
          <CardDescription data-el="login-confirmation-subtitle">
            We sent a confirmation link to <strong>{email}</strong>. Click it to
            activate your account, then come back and sign in.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card data-el="login-card" className="w-full max-w-sm">
      <CardHeader className="items-center text-center">
        <MomentsMark className="size-12" />
        <CardTitle data-el="login-title" className="font-handwritten text-3xl leading-none">
          {isSignup ? "Create your account" : "Welcome back"}
        </CardTitle>
        <CardDescription data-el="login-subtitle">
          {isSignup
            ? "Sign up to start capturing your monthly moments."
            : "Sign in to Moments."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form data-el="login-form" onSubmit={onSubmit}>
          <FieldGroup>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="login-email">Email</FieldLabel>
              <Input
                id="login-email"
                data-el="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="login-password">Password</FieldLabel>
              <Input
                id="login-password"
                data-el="login-password"
                type="password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              {error && <FieldError data-el="login-error">{error}</FieldError>}
            </Field>
            <Button
              data-el="login-submit"
              type="submit"
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
      <CardContent className="pt-0 text-center text-sm text-muted-foreground">
        {isSignup ? "Already have an account?" : "New here?"}{" "}
        <Button
          data-el="login-toggle"
          type="button"
          variant="link"
          className="h-auto p-0 font-medium text-foreground underline"
          onClick={toggleMode}
        >
          {isSignup ? "Sign in" : "Create one"}
        </Button>
      </CardContent>
    </Card>
  )
}
