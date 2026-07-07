import { Navigate } from "react-router"
import { LoginForm } from "@/components/auth/LoginForm"
import { useAuth } from "@/hooks/use-auth"

/** Route "/login" — auth screen. Redirects to the app if already signed in. */
function Login() {
  const { session, loading } = useAuth()

  // Already signed in? Skip the login screen.
  if (!loading && session) {
    return <Navigate to="/" replace />
  }

  return (
    <main
      data-el="login"
      className="flex min-h-svh items-center justify-center p-4"
    >
      <LoginForm />
    </main>
  )
}

export default Login
