import { useId, useState } from "react"
import { Check, ChevronsUpDown, Plus, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addProject } from "@/store/projectsSlice"
import { ProjectManager } from "./ProjectManager"

interface ProjectPickerProps {
  value: string | undefined
  onChange: (projectId: string | undefined) => void
  /** When true, a "No project" option is offered (used for mood moments). */
  allowNone?: boolean
  /** id of a visible label to name the combobox trigger. */
  labelledBy?: string
}

/** Colored, searchable project selector with create-on-the-fly (Dovetail pattern). */
export function ProjectPicker({
  value,
  onChange,
  allowNone,
  labelledBy,
}: ProjectPickerProps) {
  const triggerId = useId()
  const [open, setOpen] = useState(false)
  const [manageOpen, setManageOpen] = useState(false)
  const [query, setQuery] = useState("")
  const dispatch = useAppDispatch()
  const projects = useAppSelector((s) => s.projects.items)
  const selected = projects.find((p) => p.id === value)

  const handleCreate = () => {
    const name = query.trim()
    if (!name) return
    const action = dispatch(addProject(name))
    onChange(action.payload.id)
    setQuery("")
    setOpen(false)
  }

  return (
    <>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          id={triggerId}
          aria-labelledby={labelledBy ? `${labelledBy} ${triggerId}` : undefined}
          data-el="capture-composer-project-trigger"
          className="justify-between font-normal"
        >
          <span className="flex items-center gap-2 truncate">
            {selected ? (
              <>
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full"
                  style={{ backgroundColor: selected.color }}
                />
                {selected.name}
              </>
            ) : (
              <span className="text-muted-foreground">Select project…</span>
            )}
          </span>
          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Find or create a project…"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              {query.trim() ? (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent focus-visible:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <Plus className="size-4" /> Create “{query.trim()}”
                </button>
              ) : (
                "No projects yet."
              )}
            </CommandEmpty>
            <CommandGroup>
              {allowNone && (
                <CommandItem
                  value="__none__"
                  onSelect={() => {
                    onChange(undefined)
                    setOpen(false)
                  }}
                >
                  <span className="text-muted-foreground">No project</span>
                  <Check
                    className={cn(
                      "ml-auto size-4",
                      value === undefined ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              )}
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={project.name}
                  onSelect={() => {
                    onChange(project.id)
                    setOpen(false)
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  {project.name}
                  <Check
                    className={cn(
                      "ml-auto size-4",
                      value === project.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                value="__manage__"
                onSelect={() => {
                  setOpen(false)
                  setManageOpen(true)
                }}
              >
                <Settings2 className="size-4" />
                Manage projects
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    <ProjectManager open={manageOpen} onOpenChange={setManageOpen} />
    </>
  )
}
