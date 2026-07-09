// State + submit logic for the "forgot password" request screen. On success we
// flip `sent` so the page can show the check-your-email confirmation.

import { useState, type FormEvent } from "react"
import { useAuth } from "@/hooks/use-auth"
import { friendlyAuthError } from "@/components/auth/auth-errors"

export function useForgotPasswordForm() {
  const { resetPassword } = useAuth()

  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const result = await resetPassword(email)
    setSubmitting(false)
    if (result.error) {
      setError(friendlyAuthError(result.error))
      return
    }
    setSent(true)
  }

  async function onResend() {
    setResending(true)
    await resetPassword(email)
    setResending(false)
    setResent(true)
  }

  return {
    email,
    error,
    submitting,
    sent,
    resending,
    resent,
    setEmail,
    onSubmit,
    onResend,
  }
}
