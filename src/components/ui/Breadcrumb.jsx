// TransitHub — Breadcrumb.jsx
// Navigation trail shown below the top navbar for pages deeper than level 1.
// BRS Spec: Section 7.3 Navigation & Layout.
//
// Usage:
//   <Breadcrumb items={["Home", "Bookings", "TXH-00841"]} />
//   <Breadcrumb
//     items={[
//       { label: "Home",     href: "/" },
//       { label: "Bookings", href: "/bookings" },
//       { label: "TXH-00841" },   // last item = current, no href
//     ]}
//   />

import React from "react";

export default function Breadcrumb({ items = [], className = "" }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-1.5 text-xs text-ink-muted ${className}`}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        const label = typeof item === "string" ? item : item.label;
        const href = typeof item === "object" ? item.href : undefined;

        return (
          <React.Fragment key={idx}>
            {isLast ? (
              <span className="font-semibold text-ink" aria-current="page">
                {label}
              </span>
            ) : href ? (
              <a href={href} className="hover:text-ink transition-colors">
                {label}
              </a>
            ) : (
              <span>{label}</span>
            )}
            {!isLast && (
              <span className="text-border select-none" aria-hidden="true">›</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
