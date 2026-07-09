// State + submit logic for the "set a new password" screen reached from a reset
// email. Validates the two entries match and meet the minimum length, then calls
// updatePassword. On success the user is already authenticated, so we send them
// into the app.

import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "@/hooks/use-auth"
import { friendlyAuthError } from "@/components/auth/auth-errors"
import { PASSWORD_MIN_LENGTH } from "@/components/auth/password-strength"

export function useResetPasswordForm() {
  const { updatePassword } = useAuth()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < PASSWORD_MIN_LENGTH) {
      setError(`Your password must be at least ${PASSWORD_MIN_LENGTH} characters.`)
      return
    }
    if (password !== confirm) {
      setError("Those passwords don't match.")
      return
    }

    setSubmitting(true)
    const result = await updatePassword(password)
    setSubmitting(false)
    if (result.error) {
      setError(friendlyAuthError(result.error))
      return
    }
    setDone(true)
    // Recovery session is now a normal session — drop into the app shortly.
    navigate("/", { replace: true })
  }

  return {
    password,
    confirm,
    error,
    submitting,
    done,
    setPassword,
    setConfirm,
    onSubmit,
  }
}
