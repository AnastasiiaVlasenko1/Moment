import { toast } from "sonner"

/** Copy text to the clipboard and surface a toast. */
export async function copyText(text: string, label = "Copied"): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
    toast.success(label, { description: "Ready to paste into your deck." })
  } catch {
    toast.error("Couldn't copy", {
      description: "Your browser blocked clipboard access.",
    })
  }
}
