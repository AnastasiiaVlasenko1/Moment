import { formatMomentsText, type ReviewModel } from "@/lib/assembly"
import { CopyableSection } from "./CopyableSection"
import { MomentList } from "./MomentList"

export function LearningSection({ model }: { model: ReviewModel }) {
  if (model.learning.length === 0) return null

  return (
    <CopyableSection
      title="What I learned"
      dataEl="review-learning"
      copyValue={formatMomentsText("What I learned", model.learning)}
    >
      <MomentList moments={model.learning} />
    </CopyableSection>
  )
}
