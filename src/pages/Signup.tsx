import { AuthScreen } from "@/components/auth/AuthScreen"
import { LoginForm } from "@/components/auth/LoginForm"

/** Route "/signup" — account creation. Redirects to the app if already signed in. */
function Signup() {
  return (
    <AuthScreen dataEl="signup" redirectIfAuthed>
      <LoginForm mode="signup" />
    </AuthScreen>
  )
}

export default Signup
