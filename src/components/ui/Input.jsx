// TransitHub — Input.jsx
// Form input covering all 5 states: default | focus | filled | error | disabled.
// BRS Spec: Section 7.4.4 Form Fields & Inputs.
//
// Usage:
//   <Input label="From" placeholder="City name" />
//   <Input label="Email" type="email" error="Invalid email address" />
//   <Input label="Passengers" type="number" helperText="Max 10 seats" />
//   <Input label="Booking ID" disabled value="TXH-00841" />

import React from "react";

export default function Input({
  label,
  helperText,
  error,
  id,
  className = "",
  ...props
}) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const hasError = Boolean(error);
  const isFilled = Boolean(props.value || props.defaultValue);

  const inputClass = [
    "w-full px-3 py-2 rounded-md font-sans text-base text-ink",
    "placeholder:text-[#BDBDBD] outline-none transition-all duration-150",
    hasError
      ? "border-2 border-danger focus:shadow-focus-red"
      : isFilled
      ? "border border-yellow bg-yellow-light focus:border-2 focus:border-yellow focus:shadow-focus"
      : "border border-border bg-white focus:border-2 focus:border-yellow focus:shadow-focus",
    props.disabled
      ? "bg-[#F2F2F2] text-[#BDBDBD] border-border cursor-not-allowed"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-ink"
        >
          {label}
        </label>
      )}
      <input id={inputId} className={inputClass} {...props} />
      {helperText && !hasError && (
        <p className="text-xs text-ink-muted">{helperText}</p>
      )}
      {hasError && (
        <p className="text-xs text-danger">{error}</p>
      )}
    </div>
  );
}

// ── Select ───────────────────────────────────────────────────
// Styled <select> matching the Input design language.
//
// Usage:
//   <Select label="Vehicle Type" options={["Car", "Van", "Bus"]} />

export function Select({ label, options = [], id, className = "", ...props }) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className="w-full px-3 py-2 rounded-md border border-border bg-white font-sans text-base text-ink
                   outline-none cursor-pointer transition-all duration-150
                   focus:border-2 focus:border-yellow focus:shadow-focus"
        {...props}
      >
        {options.map((opt) =>
          typeof opt === "string" ? (
            <option key={opt} value={opt}>{opt}</option>
          ) : (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          )
        )}
      </select>
    </div>
  );
}
