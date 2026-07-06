// Tiny IndexedDB helper for screenshot blobs. Image data is kept out of
// localStorage (which has a ~5MB quota); only the returned id is persisted
// on the Moment via Redux.

const DB_NAME = "mrb-images"
const STORE = "screenshots"
const VERSION = 1

let dbPromise: Promise<IDBDatabase> | null = null

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE)
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  return dbPromise
}

function tx(
  db: IDBDatabase,
  mode: IDBTransactionMode,
): IDBObjectStore {
  return db.transaction(STORE, mode).objectStore(STORE)
}

/** Store an image blob and return a generated id. */
export async function putImage(blob: Blob): Promise<string> {
  const db = await openDB()
  const id = crypto.randomUUID()
  await new Promise<void>((resolve, reject) => {
    const req = tx(db, "readwrite").put(blob, id)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
  return id
}

/** Retrieve an image blob by id, or null if missing. */
export async function getImage(id: string): Promise<Blob | null> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = tx(db, "readonly").get(id)
    req.onsuccess = () => resolve((req.result as Blob) ?? null)
    req.onerror = () => reject(req.error)
  })
}

/** Retrieve an image as an object URL (caller must revoke it), or null. */
export async function getImageUrl(id: string): Promise<string | null> {
  const blob = await getImage(id)
  return blob ? URL.createObjectURL(blob) : null
}

export async function deleteImage(id: string): Promise<void> {
  const db = await openDB()
  await new Promise<void>((resolve, reject) => {
    const req = tx(db, "readwrite").delete(id)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}
