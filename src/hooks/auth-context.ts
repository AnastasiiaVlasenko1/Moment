// The auth context shape, shared between the provider (AuthProvider.tsx) and the
// consumer hook (use-auth.ts). Kept in its own file so neither imports the other.

import { createContext } from "react"
import type { Session, User } from "@supabase/supabase-js"

export interface AuthContextValue {
  /** The current Supabase session, or null when signed out. */
  session: Session | null
  /** Convenience accessor for the signed-in user. */
  user: User | null
  /** True while the initial session check is in flight (avoids a login flash). */
  loading: boolean
  /** True once the user has arrived via a password-recovery link (PASSWORD_RECOVERY). */
  passwordRecovery: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null; needsConfirmation: boolean }>
  signOut: () => Promise<void>
  /** Start the Google OAuth flow (redirects the browser to Google). */
  signInWithGoogle: () => Promise<{ error: string | null }>
  /** Email a password-reset link (lands the user on /reset-password). */
  resetPassword: (email: string) => Promise<{ error: string | null }>
  /** Set a new password for the currently-authenticated (or recovering) user. */
  updatePassword: (password: string) => Promise<{ error: string | null }>
  /** Re-send the sign-up confirmation email. */
  resendConfirmation: (email: string) => Promise<{ error: string | null }>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
