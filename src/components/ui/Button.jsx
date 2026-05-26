// TransitHub — Button.jsx
// Covers all 5 variants: primary | secondary | destructive | disabled | icon
//
// Usage:
//   <Button>Book Now</Button>
//   <Button variant="secondary" size="sm">View Details</Button>
//   <Button variant="destructive">Cancel</Button>
//   <Button variant="icon" aria-label="Search"><SearchIcon /></Button>
//   <Button disabled>Unavailable</Button>

import React from "react";

const VARIANTS = {
  primary:
    "bg-yellow text-ink font-semibold border-0 hover:bg-yellow-dark active:scale-[0.98]",
  secondary:
    "bg-white text-ink font-semibold border border-yellow hover:bg-yellow-light active:scale-[0.98]",
  destructive:
    "bg-white text-danger font-semibold border border-danger hover:bg-danger-light active:scale-[0.98]",
  icon:
    "bg-yellow text-ink rounded-full hover:bg-yellow-dark active:scale-[0.98] flex items-center justify-center p-2",
};

const SIZES = {
  sm:  "px-3 py-[5px] text-xs",
  md:  "px-[18px] py-2 text-base",
  lg:  "px-6 py-2.5 text-[15px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon = null,
  iconPosition = "left",
  disabled = false,
  className = "",
  children,
  ...props
}) {
  const isIcon = variant === "icon";
  const variantClass = disabled
    ? "bg-[#F2F2F2] text-[#BDBDBD] cursor-not-allowed font-semibold border-0"
    : VARIANTS[variant] ?? VARIANTS.primary;

  return (
    <button
      disabled={disabled}
      className={[
        "inline-flex items-center gap-1.5 rounded-md transition-all duration-150 font-sans cursor-pointer",
        isIcon ? VARIANTS.icon : `${variantClass} ${SIZES[size]}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="shrink-0" aria-hidden="true">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="shrink-0" aria-hidden="true">{icon}</span>
      )}
    </button>
  );
}
