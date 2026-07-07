// Screenshot storage backed by Supabase Storage (private "screenshots" bucket).
// Files are stored under "<user_id>/<uuid>.<ext>" so the per-user RLS policy
// (see supabase/schema.sql) keeps each user's images private.
//
// The returned string (the object path) is what gets saved on Moment.imageId
// and, in the database, on moments.image_path. Function signatures match the
// old IndexedDB version so callers (MomentComposer, useMomentImage, download)
// are unchanged.

import { supabase } from "@/lib/supabase"

const BUCKET = "screenshots"

async function currentUserId(): Promise<string> {
  const { data } = await supabase.auth.getUser()
  const id = data.user?.id
  if (!id) throw new Error("Not signed in — cannot store image")
  return id
}

function extFromType(type: string): string {
  if (type.includes("png")) return "png"
  if (type.includes("jpeg") || type.includes("jpg")) return "jpg"
  if (type.includes("webp")) return "webp"
  if (type.includes("gif")) return "gif"
  return "png"
}

/** Upload an image blob and return its storage path (saved as the moment's imageId). */
export async function putImage(blob: Blob): Promise<string> {
  const userId = await currentUserId()
  const path = `${userId}/${crypto.randomUUID()}.${extFromType(blob.type)}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: blob.type || undefined,
    upsert: false,
  })
  if (error) throw error
  return path
}

/** Download an image blob by its storage path, or null if missing. */
export async function getImage(path: string): Promise<Blob | null> {
  const { data, error } = await supabase.storage.from(BUCKET).download(path)
  if (error) return null
  return data
}

/**
 * Get a temporary signed URL for an image (the bucket is private).
 * Callers may pass this to <img src>; revoking it later is a harmless no-op.
 */
export async function getImageUrl(path: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, 60 * 60) // valid for 1 hour
  if (error) return null
  return data.signedUrl
}

/** Delete an image by its storage path. */
export async function deleteImage(path: string): Promise<void> {
  await supabase.storage.from(BUCKET).remove([path])
}
