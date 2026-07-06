import { getImage } from "@/lib/image-store"

function triggerDownload(url: string, filename: string): void {
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

function extFromType(type: string): string {
  if (type.includes("png")) return "png"
  if (type.includes("jpeg") || type.includes("jpg")) return "jpg"
  if (type.includes("webp")) return "webp"
  if (type.includes("gif")) return "gif"
  return "png"
}

/** Download a single screenshot (stored in IndexedDB) as a file. */
export async function downloadImage(
  imageId: string,
  baseName: string,
): Promise<void> {
  const blob = await getImage(imageId)
  if (!blob) return
  const url = URL.createObjectURL(blob)
  triggerDownload(url, `${baseName}.${extFromType(blob.type)}`)
  URL.revokeObjectURL(url)
}

/** Download several screenshots sequentially (no zip dependency). */
export async function downloadImages(
  items: { imageId: string; baseName: string }[],
): Promise<void> {
  for (const item of items) {
    await downloadImage(item.imageId, item.baseName)
  }
}
