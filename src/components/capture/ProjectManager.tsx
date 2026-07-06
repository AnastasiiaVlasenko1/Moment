import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addProject, removeProject, updateProject } from "@/store/projectsSlice"
import { unassignProject } from "@/store/momentsSlice"
import { ProjectManagerRow } from "./ProjectManagerRow"

interface ProjectManagerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Full project CRUD: rename, recolor, delete existing projects, and add new ones. */
export function ProjectManager({ open, onOpenChange }: ProjectManagerProps) {
  const dispatch = useAppDispatch()
  const projects = useAppSelector((s) => s.projects.items)
  const [newName, setNewName] = useState("")

  const handleAdd = () => {
    const name = newName.trim()
    if (!name) return
    dispatch(addProject(name))
    setNewName("")
  }

  const handleDelete = (id: string) => {
    dispatch(unassignProject(id))
    dispatch(removeProject(id))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-el="project-manager" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage projects</DialogTitle>
          <DialogDescription>
            Rename, recolor, or remove projects. Deleting one leaves its moments
            unassigned.
          </DialogDescription>
        </DialogHeader>

        <div data-el="project-manager-list" className="grid gap-2">
          {projects.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No projects yet. Add your first one below.
            </p>
          ) : (
            projects.map((project) => (
              <ProjectManagerRow
                key={project.id}
                project={project}
                onRename={(name) =>
                  dispatch(updateProject({ id: project.id, changes: { name } }))
                }
                onRecolor={(color) =>
                  dispatch(updateProject({ id: project.id, changes: { color } }))
                }
                onDelete={() => handleDelete(project.id)}
              />
            ))
          )}
        </div>

        <form
          data-el="project-manager-add"
          className="flex items-center gap-2 border-t pt-4"
          onSubmit={(e) => {
            e.preventDefault()
            handleAdd()
          }}
        >
          <Input
            data-el="project-manager-add-input"
            placeholder="New project name…"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button type="submit" disabled={!newName.trim()}>
            <Plus className="size-4" /> Add
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
