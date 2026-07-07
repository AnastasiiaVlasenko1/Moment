// Shared Supabase client — the single connection the whole app uses to talk to
// the backend (database, auth, file storage). Config comes from `.env`
// (see `.env.example`). The publishable key is safe in the browser; per-user
// data privacy is enforced server-side by Row Level Security policies.

import { createClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!url || !publishableKey) {
  throw new Error(
    "Missing Supabase config. Copy .env.example to .env and set " +
      "VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.",
  )
}

export const supabase = createClient(url, publishableKey)
