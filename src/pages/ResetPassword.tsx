import { AuthScreen } from "@/components/auth/AuthScreen"
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm"

/**
 * Route "/reset-password" — set a new password, reached from the emailed reset
 * link. No redirect-if-authed: the recovery link creates a session, and we must
 * let that user through to change their password.
 */
function ResetPassword() {
  return (
    <AuthScreen dataEl="reset-password">
      <ResetPasswordForm />
    </AuthScreen>
  )
}

export default ResetPassword
