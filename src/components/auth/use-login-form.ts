// Form state + submit logic for the login/sign-up screen. The UI (LoginForm.tsx)
// just renders these values and calls onSubmit.

import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "@/hooks/use-auth"

export type AuthMode = "signin" | "signup"

export function useLoginForm() {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState<AuthMode>("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  // Set when a sign-up succeeds but needs email confirmation before first login.
  const [confirmationSent, setConfirmationSent] = useState(false)

  function toggleMode() {
    setMode((m) => (m === "signin" ? "signup" : "signin"))
    setError(null)
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    if (mode === "signin") {
      const result = await signIn(email, password)
      setSubmitting(false)
      if (result.error) {
        setError(result.error)
        return
      }
      navigate("/")
      return
    }

    const result = await signUp(email, password)
    setSubmitting(false)
    if (result.error) {
      setError(result.error)
      return
    }
    if (result.needsConfirmation) {
      setConfirmationSent(true)
      return
    }
    navigate("/")
  }

  return {
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
  }
}
