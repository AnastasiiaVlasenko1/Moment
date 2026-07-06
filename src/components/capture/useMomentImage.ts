import { useEffect, useState } from "react"
import { getImageUrl } from "@/lib/image-store"

/** Load a screenshot object URL from IndexedDB by id, revoking it on cleanup. */
export function useMomentImage(imageId: string | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    let created: string | null = null

    const load = async () => {
      const u = imageId ? await getImageUrl(imageId) : null
      if (!active) {
        if (u) URL.revokeObjectURL(u)
        return
      }
      created = u
      setUrl(u)
    }
    load()

    return () => {
      active = false
      if (created) URL.revokeObjectURL(created)
    }
  }, [imageId])

  return url
}
