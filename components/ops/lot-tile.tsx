import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type LotStage = "active" | "audit" | "sealed" | "intake";

type LotTileProps = {
  id: string;
  title: string;
  meta: string;
  stage: LotStage;
  stageLabel?: string;
  className?: string;
};

const stageLabelDefaults: Record<LotStage, string> = {
  active: "Decon",
  audit: "Audit",
  sealed: "Sealed",
  intake: "Intake",
};

const badgeToneMap: Record<LotStage, "active" | "audit" | "sealed" | "intake"> = {
  active: "active",
  audit: "audit",
  sealed: "sealed",
  intake: "intake",
};

export function LotTile({
  id,
  title,
  meta,
  stage,
  stageLabel,
  className,
}: LotTileProps) {
  const label = stageLabel ?? stageLabelDefaults[stage];
  const tone = badgeToneMap[stage];
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] items-center gap-3.5 rounded-sm border border-ink-900/10 bg-paper-bright px-3.5 py-3",
        className
      )}
    >
      <span className="mono text-[11px] tracking-[0.08em] text-ink-500">
        {id}
      </span>
      <div>
        <div className="text-[13.5px] font-medium text-ink-900 leading-tight tracking-[-0.005em]">
          {title}
        </div>
        <div className="mono text-[10.5px] tracking-[0.06em] text-ink-500 mt-0.5">
          {meta}
        </div>
      </div>
      <Badge
        tone={tone}
        pulse={stage === "active"}
        aria-label={`Lot ${id}, ${title}, stage: ${label}`}
      >
        {label}
      </Badge>
    </div>
  );
}
