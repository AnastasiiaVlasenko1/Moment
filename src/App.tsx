import { BrowserRouter, Routes, Route } from "react-router"
import { Toaster } from "@/components/ui/sonner"
import Capture from "@/pages/Capture"
import Review from "@/pages/Review"
import NotFound from "@/pages/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Capture />} />
        <Route path="/review" element={<Review />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
