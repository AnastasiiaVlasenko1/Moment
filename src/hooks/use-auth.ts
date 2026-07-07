// Read the current auth state + actions from anywhere in the app.
// Must be called inside <AuthProvider>.

import { useContext } from "react"
import { AuthContext } from "@/hooks/auth-context"

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>")
  }
  return ctx
}
