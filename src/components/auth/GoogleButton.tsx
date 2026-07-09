// "Continue with Google" OAuth button, shared by the sign-in and sign-up cards.
// signInWithGoogle redirects the browser to Google, so on success this component
// unmounts mid-flow; we only handle the rare pre-redirect error (e.g. the
// provider isn't configured) with a toast.

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { GoogleIcon } from "@/components/auth/GoogleIcon"
import { useAuth } from "@/hooks/use-auth"

export function GoogleButton() {
  const { signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)

  async function onClick() {
    setLoading(true)
    const { error } = await signInWithGoogle()
    if (error) {
      setLoading(false)
      toast.error("Couldn't start Google sign-in. Please try again.")
    }
    // On success the browser navigates away to Google — leave loading = true.
  }

  return (
    <Button
      data-el="auth-google-button"
      type="button"
      variant="outline"
      className="w-full"
      onClick={onClick}
      disabled={loading}
    >
      <GoogleIcon className="size-4" />
      {loading ? "Redirecting…" : "Continue with Google"}
    </Button>
  )
}
