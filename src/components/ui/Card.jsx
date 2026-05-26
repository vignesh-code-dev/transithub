// TransitHub — Card.jsx
// White surface container with optional left-accent border and info tint.
// BRS Spec: Section 7.4.2 Cards & Panels.
//
// Usage:
//   <Card>...</Card>
//   <Card accent>Left yellow border (primary data cards)</Card>
//   <Card info>Sky blue tint (info / status callout)</Card>
//   <Card padding="compact">16px inner padding</Card>

import React from "react";

export default function Card({
  accent = false,
  info = false,
  padding = "standard",
  className = "",
  children,
  ...props
}) {
  const paddingClass = padding === "compact" ? "p-4" : "p-6";

  return (
    <div
      className={[
        "bg-white rounded-lg border border-border shadow-card",
        accent && "border-l-4 border-l-yellow pl-4",
        info && "bg-sky-light border-sky",
        paddingClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

// ── StatCard ────────────────────────────────────────────────
// Dashboard summary card with icon, label, value, and optional trend.
//
// Usage:
//   <StatCard
//     icon={<BusIcon />}
//     label="Active Buses"
//     value="47"
//     trend="↑ 12% this week"
//     trendType="positive"
//   />

export function StatCard({
  icon,
  label,
  value,
  trend,
  trendType = "positive", // "positive" | "neutral" | "negative"
  className = "",
}) {
  const trendColor =
    trendType === "positive"
      ? "text-success"
      : trendType === "negative"
      ? "text-danger"
      : "text-ink-muted";

  return (
    <div
      className={[
        "bg-white rounded-lg border border-border border-l-4 border-l-yellow shadow-card p-5 flex items-start gap-3",
        className,
      ].join(" ")}
    >
      {icon && (
        <div className="w-10 h-10 rounded-[10px] bg-yellow flex items-center justify-center shrink-0 text-ink text-lg">
          {icon}
        </div>
      )}
      <div>
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-bold text-ink mt-0.5">{value}</p>
        {trend && (
          <p className={`text-xs font-semibold mt-0.5 ${trendColor}`}>{trend}</p>
        )}
      </div>
    </div>
  );
}
