import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * CatStrip — state-driven persistent operational band.
 * Dark ink surface, mono type, signal-amber pulse on active state.
 */
type CatStripProps = {
  state: "active" | "standby";
  code: string;
  eventName: string;
  region: string;
  mobilizedAgo: string;
  propertyCount: number | string;
  lotCount: number | string;
  carrierLineLabel: string;
  carrierLineTel: string;
  className?: string;
};

export function CatStrip({
  state,
  code,
  eventName,
  region,
  mobilizedAgo,
  propertyCount,
  lotCount,
  carrierLineLabel,
  carrierLineTel,
  className,
}: CatStripProps) {
  const isActive = state === "active";
  return (
    <div
      role="status"
      aria-label={
        isActive
          ? `${code} active. ${eventName}. ${region}. Mobilized ${mobilizedAgo} ago. ${propertyCount} properties, ${lotCount} lots in custody.`
          : `${code} on standby.`
      }
      className={cn(
        "flex items-stretch bg-ink-900 text-paper mono text-[11px] tracking-[0.14em] uppercase",
        className
      )}
    >
      <Cell className={cn(isActive ? "text-signal-hi" : "text-ink-300")}>
        <span
          aria-hidden
          className={cn(
            "block h-[7px] w-[7px] rounded-full",
            isActive ? "bg-signal-hi motion-pulse-hi" : "bg-ink-400"
          )}
        />
        <span>
          {code} · {isActive ? "Active" : "Standby"}
        </span>
      </Cell>
      <Cell className="hidden md:flex">
        <span>{eventName}</span>
        <Sep />
        <span className="text-ink-300">{region}</span>
      </Cell>
      <Cell className="hidden lg:flex">
        <span>Mobilized</span>
        <span className="text-paper">{mobilizedAgo}</span>
        <span className="text-ink-300">ago</span>
      </Cell>
      <Cell className="hidden xl:flex">
        <span>{propertyCount} properties</span>
        <Sep />
        <span>{lotCount.toLocaleString?.() ?? lotCount} lots in custody</span>
      </Cell>
      <Cell className="ml-auto !border-r-0">
        <span>Carrier line ▸</span>
        <a
          href={`tel:${carrierLineTel}`}
          className="text-paper hover:text-signal-hi transition-colors"
        >
          {carrierLineLabel}
        </a>
      </Cell>
    </div>
  );
}

function Cell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-4 py-[10px] whitespace-nowrap border-r border-[rgb(255_251_242/0.10)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Sep() {
  return <span className="text-ink-400">·</span>;
}
