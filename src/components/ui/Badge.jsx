// TransitHub — Badge.jsx
// Status chip / pill for real-time state display across all portals.
// Variants map directly to BRS Section 7.5 Status Indicators.
//
// Usage:
//   <Badge variant="active">Online</Badge>
//   <Badge variant="pending">Pending</Badge>
//   <Badge variant="completed" dot={false}>Trip Done</Badge>

import React from "react";

const VARIANTS = {
  active:    "bg-sky text-[#1A5276]",
  pending:   "bg-yellow-pale text-[#7D6608]",
  completed: "bg-success-light text-success",
  cancelled: "bg-danger-light text-danger",
  warning:   "bg-warning-light text-warning",
  inactive:  "bg-[#F2F2F2] text-ink-muted",
};

export default function Badge({
  variant = "active",
  dot = true,
  className = "",
  children,
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2.5 py-[3px] rounded-full text-xs font-semibold",
        VARIANTS[variant] ?? VARIANTS.active,
        className,
      ].join(" ")}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
