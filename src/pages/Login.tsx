import { AuthScreen } from "@/components/auth/AuthScreen"
import { LoginForm } from "@/components/auth/LoginForm"

/** Route "/login" — sign-in screen. Redirects to the app if already signed in. */
function Login() {
  return (
    <AuthScreen dataEl="login" redirectIfAuthed>
      <LoginForm mode="signin" />
    </AuthScreen>
  )
}

export default Login
