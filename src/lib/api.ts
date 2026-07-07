// Supabase data access for moments & projects. Translates between the app's
// domain types (src/types/review.ts, camelCase) and the database rows
// (snake_case). user_id is filled automatically by the column default
// (auth.uid()) and never sent from the client.

import { supabase } from "@/lib/supabase"
import { DEFAULT_PROJECTS } from "@/data/categories"
import type { Moment, Project } from "@/types/review"

// ---- Row shapes as stored in Postgres --------------------------------------

interface ProjectRow {
  id: string
  name: string
  color: string
}

interface MomentRow {
  id: string
  text: string
  url: string | null
  image_path: string | null
  project_id: string | null
  category: Moment["category"]
  date: string
  created_at: string
}

// ---- Row → domain mappers --------------------------------------------------

function toProject(r: ProjectRow): Project {
  return { id: r.id, name: r.name, color: r.color }
}

function toMoment(r: MomentRow): Moment {
  return {
    id: r.id,
    text: r.text,
    url: r.url ?? undefined,
    imageId: r.image_path ?? undefined,
    projectId: r.project_id ?? undefined,
    category: r.category,
    date: r.date,
    createdAt: Date.parse(r.created_at),
  }
}

// ---- Fetch (on login) ------------------------------------------------------

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("id,name,color,created_at")
    .order("created_at", { ascending: true })
  if (error) throw error
  return (data as ProjectRow[]).map(toProject)
}

export async function fetchMoments(): Promise<Moment[]> {
  const { data, error } = await supabase
    .from("moments")
    .select("*")
    .order("created_at", { ascending: true })
  if (error) throw error
  return (data as MomentRow[]).map(toMoment)
}

/** Seed a brand-new user with the default projects, returning them (with real ids). */
export async function seedDefaultProjects(): Promise<Project[]> {
  const seeds = DEFAULT_PROJECTS.map((p) => ({
    id: crypto.randomUUID(),
    name: p.name,
    color: p.color,
  }))
  const { data, error } = await supabase
    .from("projects")
    .insert(seeds)
    .select("id,name,color")
  if (error) throw error
  return (data as ProjectRow[]).map(toProject)
}

// ---- Project writes --------------------------------------------------------

export async function insertProject(p: Project): Promise<void> {
  const { error } = await supabase
    .from("projects")
    .insert({ id: p.id, name: p.name, color: p.color })
  if (error) throw error
}

export async function updateProjectRow(
  id: string,
  changes: Partial<Project>,
): Promise<void> {
  const patch: Record<string, unknown> = {}
  if (changes.name !== undefined) patch.name = changes.name
  if (changes.color !== undefined) patch.color = changes.color
  const { error } = await supabase.from("projects").update(patch).eq("id", id)
  if (error) throw error
}

/** Deleting a project nulls project_id on its moments via the DB foreign key. */
export async function deleteProjectRow(id: string): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id)
  if (error) throw error
}

// ---- Moment writes ---------------------------------------------------------

export async function insertMoment(m: Moment): Promise<void> {
  const { error } = await supabase.from("moments").insert({
    id: m.id,
    text: m.text,
    url: m.url ?? null,
    image_path: m.imageId ?? null,
    project_id: m.projectId ?? null,
    category: m.category,
    date: m.date,
    created_at: new Date(m.createdAt).toISOString(),
  })
  if (error) throw error
}

export async function updateMomentRow(
  id: string,
  changes: Partial<Moment>,
): Promise<void> {
  const patch: Record<string, unknown> = {}
  if ("text" in changes) patch.text = changes.text
  if ("url" in changes) patch.url = changes.url ?? null
  if ("imageId" in changes) patch.image_path = changes.imageId ?? null
  if ("projectId" in changes) patch.project_id = changes.projectId ?? null
  if ("category" in changes) patch.category = changes.category
  if ("date" in changes) patch.date = changes.date
  const { error } = await supabase.from("moments").update(patch).eq("id", id)
  if (error) throw error
}

export async function deleteMomentRow(id: string): Promise<void> {
  const { error } = await supabase.from("moments").delete().eq("id", id)
  if (error) throw error
}
