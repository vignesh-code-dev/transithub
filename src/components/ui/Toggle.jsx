// TransitHub — Toggle.jsx
// On/off switch used for Driver Online/Offline, feature flags, settings.
//
// Usage:
//   <Toggle checked={isOnline} onChange={setIsOnline} label="Driver Online" />
//   <Toggle checked={surge} onChange={setSurge} label="Surge Pricing" size="sm" />

import React from "react";

export default function Toggle({
  checked = false,
  onChange,
  label,
  labelPosition = "right",
  size = "md",
  disabled = false,
  className = "",
}) {
  const trackSize = size === "sm"
    ? "w-8 h-5"
    : "w-11 h-6";
  const thumbSize = size === "sm"
    ? "w-3.5 h-3.5 top-[3px] left-[3px]"
    : "w-[18px] h-[18px] top-[3px] left-[3px]";
  const thumbTranslate = size === "sm"
    ? "translate-x-3"
    : "translate-x-5";

  const track = (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={[
        "relative rounded-full transition-colors duration-200 border-0 p-0 cursor-pointer shrink-0",
        trackSize,
        checked ? "bg-yellow" : "bg-border",
        disabled ? "opacity-50 cursor-not-allowed" : "",
      ].join(" ")}
    >
      <span
        className={[
          "absolute bg-white rounded-full shadow transition-transform duration-200",
          thumbSize,
          checked ? thumbTranslate : "translate-x-0",
        ].join(" ")}
      />
    </button>
  );

  if (!label) return track;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {labelPosition === "left" && (
        <span className="text-sm font-medium text-ink">{label}</span>
      )}
      {track}
      {labelPosition === "right" && (
        <span className="text-sm font-medium text-ink">{label}</span>
      )}
    </div>
  );
}
