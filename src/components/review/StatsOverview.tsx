import type { ReactNode } from "react"
import {
  NotebookPen,
  FolderKanban,
  Trophy,
  GraduationCap,
  HeartPulse,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { dominantMood, type ReviewModel } from "@/lib/assembly"
import { moodEmoji } from "@/data/categories"

/** Rough valence per feeling (0 low → 1 high) for the mood sparkline shape. */
const VALENCE: Record<string, number> = {
  Energized: 0.92,
  Focused: 0.8,
  Calm: 0.62,
  Overloaded: 0.32,
  Frustrated: 0.22,
  Stuck: 0.12,
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: ReactNode
  value: ReactNode
  label: string
}) {
  return (
    <Card className="gap-1 py-4">
      <CardContent className="flex h-full flex-col gap-1 px-4">
        <div className="text-2xl leading-none font-semibold tabular-nums">
          {value}
        </div>
        <div className="text-muted-foreground mt-auto flex items-center gap-1.5 text-xs">
          {icon}
          {label}
        </div>
      </CardContent>
    </Card>
  )
}

function MoodCard({ model }: { model: ReviewModel }) {
  const moods = model.moods.filter((m) => m.mood)
  const dominant = dominantMood(moods)
  const ordered = [...moods].sort((a, b) =>
    a.date < b.date ? -1 : a.date > b.date ? 1 : a.createdAt - b.createdAt,
  )
  const points = ordered
    .map((m, i) => {
      const x = ordered.length > 1 ? (i / (ordered.length - 1)) * 100 : 50
      const y = 22 - (VALENCE[m.mood!] ?? 0.5) * 18
      return `${x},${y}`
    })
    .join(" ")

  return (
    <Card className="gap-1 py-4">
      <CardContent className="flex h-full flex-col gap-1.5 px-4">
        <div className="flex items-center gap-1.5 text-lg leading-none font-semibold">
          {dominant ? (
            <>
              <span aria-hidden="true">{moodEmoji(dominant)}</span>
              {dominant}
            </>
          ) : (
            "—"
          )}
        </div>
        {ordered.length > 1 ? (
          <svg
            viewBox="0 0 100 24"
            preserveAspectRatio="none"
            className="h-5 w-full"
            aria-hidden="true"
          >
            <polyline
              points={points}
              fill="none"
              stroke="var(--chart-1)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        ) : (
          <div className="h-5" />
        )}
        <div className="text-muted-foreground mt-auto flex items-center gap-1.5 text-xs">
          <HeartPulse className="size-3.5" />
          Mood
        </div>
      </CardContent>
    </Card>
  )
}

/** At-a-glance cards summarizing the selected range (replaces the category bar chart). */
export function StatsOverview({ model }: { model: ReviewModel }) {
  return (
    <div
      data-el="review-stats"
      className="grid grid-cols-2 gap-3 sm:grid-cols-5"
    >
      <StatCard
        icon={<NotebookPen className="size-3.5" />}
        value={model.totalMoments}
        label="Moments"
      />
      <StatCard
        icon={<FolderKanban className="size-3.5" />}
        value={model.activeProjects}
        label="Projects"
      />
      <StatCard
        icon={<Trophy className="size-3.5" />}
        value={model.achievements.length}
        label="Achievements"
      />
      <StatCard
        icon={<GraduationCap className="size-3.5" />}
        value={model.learning.length}
        label="Learnings"
      />
      <MoodCard model={model} />
    </div>
  )
}
