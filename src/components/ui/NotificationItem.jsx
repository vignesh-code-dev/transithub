// TransitHub — NotificationItem.jsx
// Single notification row used in the bell-icon dropdown and
// the Notifications Panel on the customer dashboard. (BRS CP-D-06)
//
// Usage:
//   <NotificationItem
//     message="Your bus TXH-00841 to Chennai has been confirmed."
//     time="2 min ago"
//     read={false}
//   />

import React from "react";

export default function NotificationItem({
  message,
  time,
  read = false,
  onClick,
  className = "",
}) {
  return (
    <div
      onClick={onClick}
      className={[
        "flex items-start gap-3 px-3 py-3 border-b border-border last:border-b-0",
        onClick ? "cursor-pointer hover:bg-yellow-light transition-colors" : "",
        className,
      ].join(" ")}
    >
      {/* Unread dot */}
      <span
        className={[
          "w-2 h-2 rounded-full mt-1.5 shrink-0",
          read ? "bg-border" : "bg-yellow",
        ].join(" ")}
        aria-label={read ? "Read" : "Unread"}
      />
      <div>
        <p
          className={`text-sm leading-snug ${read ? "text-ink-muted" : "text-ink"}`}
        >
          {message}
        </p>
        {time && (
          <p className="text-xs text-ink-muted mt-0.5">{time}</p>
        )}
      </div>
    </div>
  );
}

// ── NotificationList ─────────────────────────────────────────
// Container for a list of NotificationItems.
//
// Usage:
//   <NotificationList notifications={[{ message, time, read }]} />

export function NotificationList({ notifications = [], className = "" }) {
  return (
    <div
      className={[
        "bg-white border border-border rounded-lg shadow-card overflow-hidden",
        className,
      ].join(" ")}
    >
      <div className="px-3 py-2 border-b border-border flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">Notifications</span>
        <button className="text-xs text-ink-muted hover:text-ink">
          Mark all read
        </button>
      </div>
      {notifications.length === 0 ? (
        <p className="text-sm text-ink-muted text-center py-6">
          No new notifications.
        </p>
      ) : (
        notifications.map((n, i) => (
          <NotificationItem key={i} {...n} />
        ))
      )}
    </div>
  );
}
