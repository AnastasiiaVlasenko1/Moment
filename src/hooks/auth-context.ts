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
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null; needsConfirmation: boolean }>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
