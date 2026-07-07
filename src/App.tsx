import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router"
import { Toaster } from "@/components/ui/sonner"
import { Spinner } from "@/components/ui/spinner"
import { RequireAuth } from "@/components/auth/RequireAuth"

const Capture = lazy(() => import("@/pages/Capture"))
const Review = lazy(() => import("@/pages/Review"))
const Login = lazy(() => import("@/pages/Login"))
const NotFound = lazy(() => import("@/pages/NotFound"))

function RouteFallback() {
  return (
    <div
      data-el="app-route-fallback"
      className="flex min-h-svh items-center justify-center"
    >
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Capture />} />
            <Route path="/review" element={<Review />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
