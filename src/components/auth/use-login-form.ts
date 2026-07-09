// Form state + submit logic for the sign-in / sign-up screen. The mode is driven
// by the route (/login vs /signup) and passed in, so it survives refresh and is
// linkable. The UI (LoginForm.tsx) just renders these values and calls onSubmit.

import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "@/hooks/use-auth"
import { friendlyAuthError } from "@/components/auth/auth-errors"

export type AuthMode = "signin" | "signup"

export function useLoginForm(mode: AuthMode) {
  const { signIn, signUp, resendConfirmation } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  // Set when a sign-up succeeds but needs email confirmation before first login.
  const [confirmationSent, setConfirmationSent] = useState(false)
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    if (mode === "signin") {
      const result = await signIn(email, password)
      setSubmitting(false)
      if (result.error) {
        setError(friendlyAuthError(result.error))
        return
      }
      navigate("/")
      return
    }

    const result = await signUp(email, password)
    setSubmitting(false)
    if (result.error) {
      setError(friendlyAuthError(result.error))
      return
    }
    if (result.needsConfirmation) {
      setConfirmationSent(true)
      return
    }
    navigate("/")
  }

  async function onResendConfirmation() {
    setResending(true)
    await resendConfirmation(email)
    setResending(false)
    setResent(true)
  }

  return {
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
  }
}
