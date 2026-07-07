import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { CATEGORY_CONFIG } from "@/data/categories"
import { copyText } from "@/lib/clipboard"
import { formatOverviewText, type ReviewModel } from "@/lib/assembly"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

const chartConfig = { count: { label: "Moments" } } satisfies ChartConfig

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <Card className="gap-1 py-4">
      <CardContent className="px-4">
        <div className="text-2xl font-semibold tabular-nums">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  )
}

export function WorkloadOverview({ model }: { model: ReviewModel }) {
  const chartData = model.byCategory
    .filter((c) => c.count > 0)
    .map((c) => ({
      label: c.label,
      count: c.count,
      fill: CATEGORY_CONFIG[c.category].chartToken,
    }))

  return (
    <section data-el="review-overview" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-handwritten text-2xl leading-none">Activity overview</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyText(formatOverviewText(model), "Overview copied")}
        >
          <Copy className="size-3.5" /> Copy
        </Button>
      </div>

      <div
        data-el="review-overview-stats"
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        <StatTile label="Moments logged" value={model.totalMoments} />
        <StatTile label="Active projects" value={model.activeProjects} />
        <StatTile label="Screenshots" value={model.screenshots.length} />
        <StatTile label="Mood check-ins" value={model.moods.length} />
      </div>

      {chartData.length > 0 && (
        <Card data-el="review-overview-chart">
          <CardContent className="pt-6">
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="count" radius={6}>
                  {chartData.map((entry) => (
                    <Cell key={entry.label} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </section>
  )
}
