import type { ReactNode } from "react"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { copyText } from "@/lib/clipboard"

interface CopyableSectionProps {
  title: string
  /** Plain text placed on the clipboard when Copy is clicked. */
  copyValue: string
  dataEl: string
  action?: ReactNode
  children: ReactNode
}

/** A review section card with a Copy button that puts deck-ready text on the clipboard. */
export function CopyableSection({
  title,
  copyValue,
  dataEl,
  action,
  children,
}: CopyableSectionProps) {
  return (
    <Card data-el={dataEl}>
      <CardHeader>
        <h2
          data-slot="card-title"
          className="font-handwritten text-2xl leading-none font-semibold"
        >
          {title}
        </h2>
        <CardAction className="flex items-center gap-2">
          {action}
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyText(copyValue, `${title} copied`)}
          >
            <Copy className="size-3.5" /> Copy
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
