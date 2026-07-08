import { AuthScreen } from "@/components/auth/AuthScreen"
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"

/** Route "/forgot-password" — request a password-reset email. */
function ForgotPassword() {
  return (
    <AuthScreen dataEl="forgot-password" redirectIfAuthed>
      <ForgotPasswordForm />
    </AuthScreen>
  )
}

export default ForgotPassword
