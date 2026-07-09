// Tracks the Supabase auth session and exposes sign-in/up/out actions to the app.
// Wrap the app in this once (see main.tsx). All persistence/data work in later
// phases depends on there being a signed-in user here.

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { AuthContext, type AuthContextValue } from "@/hooks/auth-context"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  // Flipped on when the user follows a reset link, so /reset-password knows the
  // recovery session is legit (vs. a normal signed-in user visiting the page).
  const [passwordRecovery, setPasswordRecovery] = useState(false)

  useEffect(() => {
    let active = true

    // 1) Load any existing session on first mount (e.g. a returning, still-valid login).
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setLoading(false)
    })

    // 2) Keep in sync with future sign-in / sign-out / token-refresh events.
    const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
      setSession(next)
      if (event === "PASSWORD_RECOVERY") {
        setPasswordRecovery(true)
      }
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return { error: error.message, needsConfirmation: false }
    // With email confirmation ON, Supabase returns a user but no session until
    // the emailed link is clicked. No session => we must ask them to confirm.
    return { error: null, needsConfirmation: !data.session }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    // Supabase emails a link back to this route; the click establishes a
    // short-lived recovery session that /reset-password uses to set the password.
    const redirectTo = `${window.location.origin}/reset-password`
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })
    return { error: error?.message ?? null }
  }, [])

  const updatePassword = useCallback(async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password })
    return { error: error?.message ?? null }
  }, [])

  const resendConfirmation = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resend({ type: "signup", email })
    return { error: error?.message ?? null }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      passwordRecovery,
      signIn,
      signUp,
      signOut,
      resetPassword,
      updatePassword,
      resendConfirmation,
    }),
    [
      session,
      loading,
      passwordRecovery,
      signIn,
      signUp,
      signOut,
      resetPassword,
      updatePassword,
      resendConfirmation,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
