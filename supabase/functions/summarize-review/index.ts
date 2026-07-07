// Supabase Edge Function: summarize-review
//
// Receives the deterministic month text (built on the client from the review
// formatters) and returns AI-written prose via the Claude API. The Anthropic
// API key stays server-side — set it once with:
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
//
// JWT verification is left ON (the default), so only signed-in users of the app
// can invoke this — the app calls it via supabase.functions.invoke(), which
// attaches the user's session token automatically.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

const SYSTEM_PROMPT = [
  "You write a designer's monthly self-review summary from their raw notes.",
  "Write in first person, past tense, as flowing prose — 2 to 4 short paragraphs.",
  "No bullet lists, no markdown headings. Cover the throughline across projects,",
  "what was learned, and the overall mood. Be warm, specific, and genuine.",
  "Only use what the notes contain — never invent achievements or details.",
].join(" ")

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY")
  if (!apiKey) {
    return json({ error: "Server not configured: ANTHROPIC_API_KEY is missing." }, 500)
  }

  let content = ""
  let monthLabel = "this month"
  try {
    const body = await req.json()
    content = typeof body.content === "string" ? body.content : ""
    if (typeof body.monthLabel === "string") monthLabel = body.monthLabel
  } catch {
    return json({ error: "Invalid request body." }, 400)
  }
  if (!content.trim()) {
    return json({ error: "Nothing to summarize." }, 400)
  }

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1500,
        thinking: { type: "disabled" }, // simple summarization — keep it fast & cheap
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content:
              `Here are my raw monthly review notes for ${monthLabel}. ` +
              `Rewrite them as a polished summary I can paste into a review deck.\n\n${content}`,
          },
        ],
      }),
    })

    if (!resp.ok) {
      const detail = await resp.text()
      console.error("Claude API error", resp.status, detail)
      return json({ error: `The AI service returned an error (${resp.status}).` }, 502)
    }

    const data = await resp.json()
    const summary: string = (data.content ?? [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("\n")
      .trim()

    if (!summary) return json({ error: "The AI returned an empty summary." }, 502)
    return json({ summary }, 200)
  } catch (err) {
    console.error("summarize-review failed", err)
    return json({ error: "Failed to reach the AI service." }, 500)
  }
})
