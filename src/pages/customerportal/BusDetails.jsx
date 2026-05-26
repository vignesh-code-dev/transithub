/**
 * ============================================================
 *  TransitHub — Customer Portal
 *  File    : src/pages/customer/BusDetails.jsx
 *  Route   : /customer/bus-details
 *  BRS Ref : CP-VB-03  Vehicle Detail Page (primary)
 *            CP-VB-08  Cancellation & Refund (policy display)
 *            CP-VB-09  Reschedule (policy note)
 * ============================================================
 *
 *  Sections (all from requirements checklist):
 *  ┌─────────────────────────────────────────────────────┐
 *  │ 1.  Photo Gallery         (CP-VB-03)                │
 *  │ 2.  Bus Information Card  (CP-VB-03)                │
 *  │     — Bus Type, Departure, Arrival, Duration        │
 *  │     — Layout, Model, Reg Number, Total Seats        │
 *  │ 3.  Operator Details      (CP-VB-03)                │
 *  │ 4.  Amenities Section     (CP-VB-03)                │
 *  │ 5.  Boarding Points       (CP-VB-03)                │
 *  │ 6.  Dropping Points       (CP-VB-03)                │
 *  │ 7.  Availability Calendar (CP-VB-03)                │
 *  │ 8.  Available Seats Summary                         │
 *  │ 9.  Fare Information                                │
 *  │ 10. Cancellation Policy   (CP-VB-08)                │
 *  │ 11. Operator Reviews      (CP-VB-03)                │
 *  │ 12. Sticky Booking Sidebar + Select Seats Button    │
 *  └─────────────────────────────────────────────────────┘
 *
 *  Components used (ALL existing — zero new):
 *    Card, StatCard  → ui/Card.jsx
 *    Badge           → ui/Badge.jsx
 *    Button          → ui/Button.jsx
 *    Table           → ui/Table.jsx
 *    Breadcrumb      → ui/Breadcrumb.jsx
 *
 *  Layout — BRS §7.7 responsive breakpoints:
 *    LG+ (≥1024px) → 2-col: detail left | booking sidebar right (sticky)
 *    MD  (768–1023)→ same but sidebar below
 *    SM  (<768px)  → single column, full-width cards
 * ============================================================
 */

import React, { useState } from "react";

import Card, { StatCard } from "../../components/ui/Card";
import Badge              from "../../components/ui/Badge";
import Button             from "../../components/ui/Button";
import Table              from "../../components/ui/Table";
import Breadcrumb         from "../../components/ui/Breadcrumb";

// ─── Icon helper — outline SVG, no extra dependency ──────────────────────────
const Ico = ({ d, size = 18, color = "currentColor", sw = 1.75 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke={color} strokeWidth={sw}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

// Path library — only what this file uses
const P = {
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  clock:    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  mapPin:   "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  info:     "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01",
  check:    "M20 6L9 17l-5-5",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  arrowL:   "M19 12H5M12 19l-7-7 7-7",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  phone:    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.33a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  seat:     "M4 17v2a2 2 0 0 0 4 0v-2M16 17v2a2 2 0 0 0 4 0v-2M5 9h14M5 9a2 2 0 0 0-2 2v6h18v-6a2 2 0 0 0-2-2M5 9V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4",
  tag:      "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  heart:    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  share:    "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
  warn:     "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  refresh:  "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
};

// ─── Colour constants (match tailwind.config.js tokens) ───────────────────────
const C = {
  yellow:       "#FFC200",
  yellowDark:   "#E6AD00",
  yellowLight:  "#FFFDE7",
  yellowPale:   "#FFF9C4",
  sky:          "#AED6F1",
  skyLight:     "#E8F4FD",
  ink:          "#1A1A2E",
  muted:        "#5D6D7E",
  border:       "#E0E0E0",
  bg:           "#F5F6FA",
  success:      "#1E8449",
  successLight: "#D5F5E3",
  danger:       "#C0392B",
  dangerLight:  "#FADBD8",
  warning:      "#D35400",
  warningLight: "#FDEBD0",
  white:        "#FFFFFF",
};

// ─── Realistic single-bus dummy data ─────────────────────────────────────────
const BUS_DATA = {
  id:             "V-001",
  // Bus Information
  busType:        "Volvo Multi-Axle",
  class:          "Sleeper",
  layout:         "2+1",
  model:          "Volvo B11R",
  regNo:          "TN 38 R 9042",
  totalSeats:     36,
  bookedSeats:    18,
  // Route
  operator:       "Sri Murugan Travels",
  operatorId:     "OP-1024",
  operatorPhone:  "+91 98421 00001",
  operatorEmail:  "bookings@srimurugan.com",
  operatorYears:  12,
  operatorRating: 4.6,
  operatorReviewCount: 124,
  route:          "Coimbatore → Chennai",
  from:           "Coimbatore",
  to:             "Chennai",
  // Schedule
  date:           "27 May 2025",
  dep:            "10:30 PM",
  arr:            "05:00 AM (+1)",
  duration:       "6h 30m",
  // Pricing
  baseFare:       510,
  gst:            26,
  convenienceFee: 20,
  insurance:      14,
  discount:       82,           // deducted
  finalFare:      488,
  originalFare:   580,
  // Amenities
  amenities: [
    { emoji: "❄️",  label: "Air Conditioning"  },
    { emoji: "🔌",  label: "USB Charging"       },
    { emoji: "📶",  label: "Free WiFi"           },
    { emoji: "💧",  label: "Water Bottle"        },
    { emoji: "🛏️", label: "Sleeping Blanket"    },
    { emoji: "🎥",  label: "Entertainment"       },
    { emoji: "🛡️", label: "GPS Tracked"         },
    { emoji: "🚻",  label: "Onboard Lavatory"   },
  ],
  // Boarding points
  boardingPoints: [
    { code: "BP1", name: "Gandhipuram Bus Stand",  time: "10:00 PM", landmark: "Near Nilgiris Supermarket"      },
    { code: "BP2", name: "Singanallur Bus Stop",    time: "10:20 PM", landmark: "Opp. TNEB Sub-station"          },
    { code: "BP3", name: "Avinashi Road Stop",      time: "10:35 PM", landmark: "Near Brookefields Mall Signal"  },
  ],
  // Dropping points
  droppingPoints: [
    { code: "DP1", name: "Koyambedu Bus Terminus",  time: "04:50 AM", landmark: "Koyambedu Metro Station"        },
    { code: "DP2", name: "Vadapalani Bus Stop",      time: "05:05 AM", landmark: "Opp. Vadapalani Signal"         },
    { code: "DP3", name: "Anna Nagar Tower Stop",    time: "05:20 AM", landmark: "Anna Nagar East Metro"          },
  ],
  // Cancellation policy (CP-VB-08)
  cancellationPolicy: [
    { window: "More than 24 hrs before departure",  refund: "100% refund",  severity: "completed" },
    { window: "12 hrs – 24 hrs before departure",   refund: "75% refund",   severity: "completed" },
    { window: "4 hrs – 12 hrs before departure",    refund: "50% refund",   severity: "warning"   },
    { window: "Less than 4 hrs before departure",   refund: "No refund",    severity: "cancelled" },
  ],
  // Availability calendar (seats per date)
  availability: {
    "2025-05-27": 18,
    "2025-05-28": 4,
    "2025-05-29": 0,
    "2025-05-30": 24,
    "2025-05-31": 11,
    "2025-06-01": 36,
    "2025-06-02": 30,
  },
  // Photo gallery — emoji thumbnails standing in for real images
  photos: [
    { label: "Exterior",      thumb: "🚌" },
    { label: "Sleeping Berth",thumb: "🛌" },
    { label: "Seating",       thumb: "💺" },
    { label: "Entertainment", thumb: "🎥" },
    { label: "Lavatory",      thumb: "🚻" },
  ],
  // Rating breakdown
  ratingByCategory: [
    { cat: "Driver Behaviour", score: 4.8 },
    { cat: "Punctuality",      score: 4.5 },
    { cat: "Cleanliness",      score: 4.7 },
    { cat: "Comfort",          score: 4.4 },
  ],
  ratingDist: [
    { stars: 5, count: 72 },
    { stars: 4, count: 30 },
    { stars: 3, count: 14 },
    { stars: 2, count: 5  },
    { stars: 1, count: 3  },
  ],
  // Reviews (CP-VB-03)
  reviews: [
    {
      id: "R1", user: "Priya S.", initials: "PS", rating: 5,
      date: "18 May 2025",
      body: "Excellent service! Bus was very clean, AC worked perfectly, and the driver was professional throughout.",
      helpfulCount: 12,
      operatorReply: "Thank you Priya! We are glad you enjoyed the journey. See you again!",
    },
    {
      id: "R2", user: "Karthik R.", initials: "KR", rating: 4,
      date: "12 May 2025",
      body: "Good overall experience. Seats were comfortable and blankets were fresh. Minor delay at start but reached on time.",
      helpfulCount: 8,
      operatorReply: null,
    },
    {
      id: "R3", user: "Meena T.", initials: "MT", rating: 5,
      date: "5 May 2025",
      body: "Best overnight bus I have taken. WiFi worked great, and the entertainment system was a nice touch.",
      helpfulCount: 20,
      operatorReply: "Thank you Meena! Safety and comfort are our top priorities.",
    },
    {
      id: "R4", user: "Suresh V.", initials: "SV", rating: 4,
      date: "28 Apr 2025",
      body: "Comfortable ride. AC was quite cold — carry a light jacket. Arrived 10 minutes ahead of schedule.",
      helpfulCount: 6,
      operatorReply: null,
    },
  ],
};

// ─── Shared tiny components ───────────────────────────────────────────────────

/** Horizontal rule using design-system border colour */
const HR = ({ my = 5 }) => (
  <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: `${my * 4}px 0` }} />
);

/** Section heading — yellow circle icon + title + optional subtitle */
function SectionHead({ iconPath, title, sub }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{ width: 32, height: 32, background: C.yellow }}
        aria-hidden="true"
      >
        <Ico d={iconPath} size={16} color={C.ink} />
      </span>
      <div>
        <h2 className="text-base font-semibold text-ink leading-tight">{title}</h2>
        {sub && <p className="text-xs text-ink-muted">{sub}</p>}
      </div>
    </div>
  );
}

/** Star row — filled / unfilled yellow stars */
function Stars({ rating, size = 14 }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map(n => (
        <svg key={n} width={size} height={size} viewBox="0 0 24 24"
          fill={n <= Math.round(rating) ? C.yellow : "none"}
          stroke={n <= Math.round(rating) ? C.yellow : C.border}
          strokeWidth="1.5" aria-hidden="true">
          <path d={P.star} />
        </svg>
      ))}
    </span>
  );
}

/** Small spec cell used in Bus Information grid */
function SpecCell({ label, value, mono = false }) {
  return (
    <div
      className="p-3 rounded-lg"
      style={{ background: C.bg, border: `1px solid ${C.border}` }}
    >
      <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">
        {label}
      </p>
      <p
        className="text-sm font-semibold text-ink"
        style={mono ? { fontFamily: "'JetBrains Mono','Roboto Mono',monospace" } : {}}
      >
        {value}
      </p>
    </div>
  );
}

// ─── 1. Photo Gallery (CP-VB-03) ─────────────────────────────────────────────
function PhotoGallery({ photos }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mb-6">
      {/* Main preview */}
      <div
        className="w-full rounded-lg border border-border flex items-center justify-center mb-3"
        style={{
          height: 220,
          background: `linear-gradient(135deg, ${C.yellowLight} 0%, ${C.skyLight} 100%)`,
          fontSize: 88,
        }}
        role="img"
        aria-label={`${photos[active].label} — photo ${active + 1} of ${photos.length}`}
      >
        {photos[active].thumb}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2" role="list" aria-label="Photo thumbnails">
        {photos.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setActive(i)}
            role="listitem"
            aria-label={`View ${p.label}`}
            aria-pressed={i === active}
            className="flex-shrink-0 flex items-center justify-center rounded-lg
                       transition-all duration-150"
            style={{
              width: 58, height: 46, fontSize: 24,
              background: i === active ? C.yellowLight : C.white,
              border: `2px solid ${i === active ? C.yellow : C.border}`,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {p.thumb}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── 2. Bus Information Card (CP-VB-03) ──────────────────────────────────────
//    Covers: Bus Type, Departure Time, Arrival Time, Duration + full specs
function BusInfoCard({ bus }) {
  return (
    <Card padding="compact" className="mb-5">
      <SectionHead iconPath={P.info} title="Bus Information" sub="Full vehicle specifications" />

      {/* Route banner — dark background per BRS §7.4 primary data cards */}
      <div
        className="rounded-lg p-4 mb-4"
        style={{ background: C.ink }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* From → To */}
          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="text-xs font-semibold mb-0.5" style={{ color: C.sky }}>FROM</p>
              <p className="text-xl font-extrabold" style={{ color: C.yellow }}>{bus.from}</p>
            </div>
            <div className="flex flex-col items-center gap-1 px-3">
              <div style={{ width: 48, height: 1, background: C.muted }} />
              <p className="text-xs font-semibold" style={{ color: C.muted }}>{bus.duration}</p>
              <div style={{ width: 48, height: 1, background: C.muted }} />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold mb-0.5" style={{ color: C.sky }}>TO</p>
              <p className="text-xl font-extrabold" style={{ color: C.yellow }}>{bus.to}</p>
            </div>
          </div>

          {/* Departure + Arrival */}
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-xs font-semibold mb-0.5" style={{ color: C.sky }}>DEPARTURE</p>
              <p className="text-base font-bold text-white">{bus.dep}</p>
              <p className="text-xs" style={{ color: C.muted }}>{bus.date}</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold mb-0.5" style={{ color: C.sky }}>ARRIVAL</p>
              <p className="text-base font-bold text-white">{bus.arr}</p>
              <p className="text-xs" style={{ color: C.muted }}>Next day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Spec grid — 2 cols mobile, 3 cols sm+ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <SpecCell label="Bus Type"    value={bus.busType}              />
        <SpecCell label="Class"       value={bus.class}                />
        <SpecCell label="Layout"      value={`${bus.layout} layout`}   />
        <SpecCell label="Bus Model"   value={bus.model}                />
        <SpecCell label="Reg. Number" value={bus.regNo}    mono        />
        <SpecCell label="Total Seats" value={`${bus.totalSeats} seats`}/>
      </div>
    </Card>
  );
}

// ─── 3. Operator Details (CP-VB-03) ──────────────────────────────────────────
function OperatorCard({ bus }) {
  return (
    <Card padding="compact" className="mb-5">
      <SectionHead iconPath={P.users} title="Operator Details" />

      <div className="flex items-start gap-4 mb-4">
        {/* Logo placeholder */}
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-xl"
          style={{ width: 60, height: 60, background: C.yellow, fontSize: 28 }}
          aria-hidden="true"
        >
          🚌
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-ink">{bus.operator}</p>
          <p className="text-xs text-ink-muted mt-0.5">
            {bus.operatorYears}+ years · Operator ID: {bus.operatorId}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <Stars rating={bus.operatorRating} size={13} />
            <span className="text-sm font-semibold text-ink">{bus.operatorRating}</span>
            <span className="text-xs text-ink-muted">({bus.operatorReviewCount} reviews)</span>
          </div>
        </div>
        <Badge variant="active">Verified</Badge>
      </div>

      {/* Contact buttons */}
      <div className="flex flex-wrap gap-2">
        <a
          href={`tel:${bus.operatorPhone}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink
                     px-3 py-1.5 rounded-lg border border-border bg-white
                     hover:border-yellow hover:bg-yellow-light transition-colors"
          style={{ textDecoration: "none" }}
          aria-label={`Call ${bus.operatorPhone}`}
        >
          <Ico d={P.phone} size={13} />
          {bus.operatorPhone}
        </a>
        <a
          href={`mailto:${bus.operatorEmail}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink
                     px-3 py-1.5 rounded-lg border border-border bg-white
                     hover:border-yellow hover:bg-yellow-light transition-colors"
          style={{ textDecoration: "none" }}
          aria-label={`Email ${bus.operatorEmail}`}
        >
          ✉ {bus.operatorEmail}
        </a>
      </div>
    </Card>
  );
}

// ─── 4. Amenities Section (explicit requirement) ──────────────────────────────
function AmenitiesSection({ amenities }) {
  return (
    <Card padding="compact" className="mb-5">
      <SectionHead iconPath={P.check} title="Amenities" sub="Features available on this bus" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {amenities.map(a => (
          <div
            key={a.label}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
            style={{
              background: C.yellowLight,
              border: `1px solid ${C.yellow}`,
            }}
          >
            <span className="text-lg flex-shrink-0" aria-hidden="true">{a.emoji}</span>
            <span className="text-xs font-semibold text-ink leading-tight">{a.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── 5 + 6. Boarding & Dropping Points (explicit requirements) ────────────────
function StopsSection({ boardingPoints, droppingPoints }) {
  const [tab, setTab] = useState("boarding");
  const points = tab === "boarding" ? boardingPoints : droppingPoints;

  return (
    <Card padding="compact" className="mb-5">
      <SectionHead
        iconPath={P.mapPin}
        title="Boarding & Dropping Points"
        sub="Select your preferred stop at checkout"
      />

      {/* Tab switcher — BRS §7.4 navigation pattern */}
      <div
        className="flex rounded-lg p-1 mb-4"
        style={{ background: C.bg, border: `1px solid ${C.border}` }}
        role="tablist"
        aria-label="Stop type"
      >
        {[
          { id: "boarding", label: "📍 Boarding Points" },
          { id: "dropping", label: "🏁 Dropping Points" },
        ].map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 py-2 rounded-md text-sm font-semibold
                       transition-all duration-150"
            style={{
              background: tab === t.id ? C.yellow : "transparent",
              color: C.ink,
              border: "none",
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Stop rows */}
      <div className="flex flex-col gap-2" role="tabpanel">
        {points.map(pt => (
          <div
            key={pt.code}
            className="flex items-start gap-3 p-3 rounded-lg"
            style={{ background: C.bg, border: `1px solid ${C.border}` }}
          >
            {/* Time badge */}
            <div
              className="flex-shrink-0 rounded-lg px-2 py-1 text-center"
              style={{ background: C.ink, minWidth: 68 }}
            >
              <p
                className="text-xs font-bold"
                style={{
                  color: C.yellow,
                  fontFamily: "'JetBrains Mono','Roboto Mono',monospace",
                }}
              >
                {pt.time}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{pt.name}</p>
              <p className="text-xs text-ink-muted mt-0.5">{pt.landmark}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── 7. Availability Calendar (CP-VB-03) ────────────────────────────────────
function AvailabilityCalendar({ availability, selectedDate, onSelect }) {
  const BASE = new Date("2025-05-27");
  const days = Array.from({ length: 7 }, (_, i) => {
    const d   = new Date(BASE);
    d.setDate(BASE.getDate() + i);
    const key = d.toISOString().split("T")[0];
    return {
      key,
      dayShort:  d.toLocaleDateString("en-IN", { weekday: "short" }),
      dateNum:   d.getDate(),
      seats:     availability[key] ?? 20,
    };
  });

  return (
    <Card padding="compact" className="mb-5">
      <SectionHead
        iconPath={P.calendar}
        title="Availability"
        sub="Seats available per departure date"
      />
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        role="group"
        aria-label="Select travel date"
      >
        {days.map(day => {
          const soldOut  = day.seats === 0;
          const lowStock = day.seats > 0 && day.seats <= 5;
          const selected = selectedDate === day.key;

          return (
            <button
              key={day.key}
              onClick={() => !soldOut && onSelect(day.key)}
              disabled={soldOut}
              aria-pressed={selected}
              aria-label={`${day.dayShort} ${day.dateNum} — ${soldOut ? "sold out" : `${day.seats} seats`}`}
              className="flex-shrink-0 flex flex-col items-center gap-1 px-3 py-3
                         rounded-lg border-2 transition-all duration-150"
              style={{
                minWidth:    62,
                background:  selected ? C.yellow : soldOut ? "#F2F2F2" : C.white,
                borderColor: selected ? C.yellowDark : soldOut ? C.border : C.border,
                cursor:      soldOut ? "not-allowed" : "pointer",
                fontFamily:  "inherit",
              }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-wide"
                style={{
                  color: selected ? C.ink : soldOut ? "#BDBDBD" : C.muted,
                }}
              >
                {day.dayShort}
              </span>
              <span
                className="text-base font-extrabold"
                style={{ color: selected ? C.ink : soldOut ? "#BDBDBD" : C.ink }}
              >
                {day.dateNum}
              </span>
              <span
                className="text-xs font-semibold"
                style={{
                  color: soldOut  ? "#BDBDBD"
                       : lowStock ? C.warning
                       : selected ? C.ink
                       : C.success,
                }}
              >
                {soldOut ? "Full" : lowStock ? `${day.seats} left!` : `${day.seats}`}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

// ─── 8. Available Seats Summary (explicit requirement) ────────────────────────
function SeatsSummary({ bus }) {
  const available = bus.totalSeats - bus.bookedSeats;
  const pct       = Math.round((bus.bookedSeats / bus.totalSeats) * 100);
  const barColor  = pct >= 80 ? C.danger : pct >= 55 ? C.warning : C.yellow;

  return (
    <Card padding="compact" className="mb-5">
      <SectionHead iconPath={P.seat} title="Seat Availability" />

      {/* Counter row */}
      <div className="flex items-center gap-8 mb-4">
        {[
          { label: "Total",     val: bus.totalSeats, color: C.muted    },
          { label: "Booked",    val: bus.bookedSeats,color: C.danger   },
          { label: "Available", val: available,       color: C.success  },
        ].map(s => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-extrabold" style={{ color: s.color }}>{s.val}</p>
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mb-1 flex justify-between text-xs text-ink-muted">
        <span>0</span>
        <span>{pct}% booked</span>
        <span>{bus.totalSeats}</span>
      </div>
      <div
        className="h-3 rounded-full overflow-hidden"
        style={{ background: C.border }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: barColor }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${pct}% of seats booked`}
        />
      </div>

      {available <= 10 && available > 0 && (
        <p className="text-xs font-semibold mt-2" style={{ color: C.warning }}>
          ⚠ Only {available} seats remaining — book soon!
        </p>
      )}
    </Card>
  );
}

// ─── 9. Fare Information (explicit requirement) ───────────────────────────────
function FareSection({ bus }) {
  const fareRows = [
    { label: "Base Fare (1 seat)",    amount:  bus.baseFare,       isDiscount: false },
    { label: "GST (5%)",              amount:  bus.gst,            isDiscount: false },
    { label: "Convenience Fee",       amount:  bus.convenienceFee, isDiscount: false },
    { label: "Travel Insurance",      amount:  bus.insurance,      isDiscount: false },
    { label: "Promo Discount",        amount: -bus.discount,       isDiscount: true  },
  ];
  const saving = bus.originalFare - bus.finalFare;

  return (
    <Card accent padding="compact" className="mb-5">
      <SectionHead iconPath={P.tag} title="Fare Information" sub="Per seat · all charges inclusive" />

      {/* Itemised rows */}
      <div className="flex flex-col gap-0">
        {fareRows.map((row, i) => (
          <div
            key={row.label}
            className="flex items-center justify-between text-sm py-2"
            style={{
              borderBottom: i < fareRows.length - 1 ? `1px solid ${C.border}` : "none",
            }}
          >
            <span
              className={row.isDiscount ? "font-semibold" : "text-ink-muted"}
              style={row.isDiscount ? { color: C.success } : {}}
            >
              {row.isDiscount && "✓ "}
              {row.label}
            </span>
            <span
              className="font-semibold"
              style={{ color: row.isDiscount ? C.success : C.ink }}
            >
              {row.isDiscount
                ? `− ₹${Math.abs(row.amount)}`
                : `₹${row.amount}`}
            </span>
          </div>
        ))}
      </div>

      {/* Total panel */}
      <div
        className="flex items-center justify-between rounded-lg px-4 py-3 mt-4 mb-4"
        style={{ background: C.ink }}
      >
        <div>
          <p className="text-xs font-semibold" style={{ color: C.sky }}>
            TOTAL PER SEAT
          </p>
          {saving > 0 && (
            <p className="text-xs mt-0.5" style={{ color: C.success }}>
              You save ₹{saving} vs rack fare
            </p>
          )}
        </div>
        <div className="text-right">
          {saving > 0 && (
            <p
              className="text-xs line-through"
              style={{ color: C.muted }}
            >
              ₹{bus.originalFare}
            </p>
          )}
          <p className="text-2xl font-extrabold" style={{ color: C.yellow }}>
            ₹{bus.finalFare}
          </p>
        </div>
      </div>

      {/* Promo info banner — uses Card info */}
      <Card info padding="compact">
        <p className="text-xs font-semibold" style={{ color: "#1A5276" }}>
          🎉 Early Bird Discount applied — save ₹{saving} on this booking. Limited seats!
        </p>
      </Card>
    </Card>
  );
}

// ─── 10. Cancellation Policy (CP-VB-08) ─────────────────────────────────────
function CancellationPolicy({ policy }) {
  return (
    <Card padding="compact" className="mb-5">
      <SectionHead
        iconPath={P.shield}
        title="Cancellation Policy"
        sub="CP-VB-08 — Refund rules for this booking"
      />

      <div className="flex flex-col gap-2 mb-4">
        {policy.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 p-3 rounded-lg"
            style={{ background: C.bg, border: `1px solid ${C.border}` }}
          >
            <div className="flex items-center gap-2">
              <Ico
                d={row.severity === "completed" ? P.check : P.warn}
                size={15}
                color={
                  row.severity === "completed" ? C.success
                    : row.severity === "warning"  ? C.warning
                    : C.danger
                }
              />
              <span className="text-sm text-ink">{row.window}</span>
            </div>
            <Badge variant={row.severity}>{row.refund}</Badge>
          </div>
        ))}
      </div>

      {/* CP-VB-09 reschedule note */}
      <Card info padding="compact">
        <p className="text-xs font-semibold" style={{ color: "#1A5276" }}>
          🔄 Reschedule (CP-VB-09): Date/time change is allowed up to 2 hours before
          departure, subject to availability. Fare difference applies.
        </p>
      </Card>
    </Card>
  );
}

// ─── 11. Operator Reviews (CP-VB-03) ─────────────────────────────────────────
function ReviewsSection({ bus }) {
  const [showAll, setShowAll] = useState(false);
  const total     = bus.reviews.length;
  const displayed = showAll ? bus.reviews : bus.reviews.slice(0, 2);

  return (
    <Card padding="compact" className="mb-5">
      <SectionHead
        iconPath={P.star}
        title={`Reviews  ⭐ ${bus.operatorRating}`}
        sub={`${total} verified traveller reviews`}
      />

      {/* Rating breakdown — distribution bars + category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        {/* Distribution */}
        <div>
          <div className="flex items-end gap-2 mb-3">
            <p className="text-5xl font-extrabold text-ink leading-none">
              {bus.operatorRating}
            </p>
            <div className="pb-1">
              <Stars rating={bus.operatorRating} size={16} />
              <p className="text-xs text-ink-muted mt-1">out of 5</p>
            </div>
          </div>
          {bus.ratingDist.map(d => {
            const pct = Math.round((d.count / total) * 100);
            return (
              <div key={d.stars} className="flex items-center gap-2 mb-1.5">
                <span className="text-xs text-ink-muted w-8 flex-shrink-0">
                  {d.stars} ★
                </span>
                <div
                  className="flex-1 rounded-full overflow-hidden"
                  style={{ height: 6, background: C.border }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: C.yellow }}
                    aria-hidden="true"
                  />
                </div>
                <span className="text-xs text-ink-muted w-5 text-right flex-shrink-0">
                  {d.count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Category breakdown */}
        <div className="flex flex-col gap-2">
          {bus.ratingByCategory.map(r => (
            <div
              key={r.cat}
              className="flex items-center justify-between px-3 py-2 rounded-lg"
              style={{ background: C.bg, border: `1px solid ${C.border}` }}
            >
              <span className="text-xs text-ink-muted font-medium">{r.cat}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-ink">{r.score}</span>
                <svg width={12} height={12} viewBox="0 0 24 24"
                  fill={C.yellow} stroke={C.yellow} strokeWidth="1.5" aria-hidden="true">
                  <path d={P.star} />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <HR my={1} />

      {/* Individual review cards */}
      <div className="flex flex-col gap-5">
        {displayed.map((r, idx) => (
          <article key={r.id}>
            {/* Reviewer header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="flex-shrink-0 flex items-center justify-center
                             rounded-full text-xs font-bold text-ink"
                  style={{ width: 36, height: 36, background: C.yellow }}
                  aria-label={r.user}
                >
                  {r.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{r.user}</p>
                  <div className="flex items-center gap-1.5">
                    <Stars rating={r.rating} size={12} />
                    <span className="text-xs text-ink-muted">{r.date}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-ink-muted">👍 {r.helpfulCount}</span>
            </div>

            {/* Review body */}
            <p
              className="text-sm text-ink rounded-lg p-3 mb-2"
              style={{ background: C.bg }}
            >
              "{r.body}"
            </p>

            {/* Operator reply — CP-VB-03 + CP-RV-04 */}
            {r.operatorReply && (
              <div
                className="text-xs text-ink rounded-r-lg p-3"
                style={{
                  borderLeft: `3px solid ${C.sky}`,
                  background: C.skyLight,
                }}
              >
                <p className="font-bold mb-0.5" style={{ color: "#1A5276" }}>
                  Operator Reply
                </p>
                {r.operatorReply}
              </div>
            )}

            {idx < displayed.length - 1 && <HR my={3} />}
          </article>
        ))}
      </div>

      {/* Show more / less toggle */}
      {total > 2 && (
        <button
          onClick={() => setShowAll(v => !v)}
          className="mt-5 w-full py-2.5 rounded-lg border border-border
                     text-sm font-semibold text-ink bg-white
                     hover:bg-yellow-light hover:border-yellow
                     transition-colors duration-150"
          style={{ fontFamily: "inherit", cursor: "pointer" }}
        >
          {showAll
            ? "Show fewer reviews"
            : `Show all ${total} reviews`}
        </button>
      )}
    </Card>
  );
}

// ─── 12. Sticky Booking Sidebar ───────────────────────────────────────────────
//    — Price, date, passenger counter, Select Seats CTA (explicit requirement)
function BookingSidebar({ bus, selectedDate, passengers, onChangePassengers, onSelectSeats }) {
  const available = bus.totalSeats - bus.bookedSeats;
  const subtotal  = bus.finalFare * passengers;
  const saving    = bus.originalFare - bus.finalFare;

  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      })
    : bus.date;

  return (
    <div className="sticky top-20 flex flex-col gap-4">

      {/* Price + booking controls — Card accent (left yellow border) */}
      <Card accent padding="compact">

        {/* Price header */}
        <div className="flex items-baseline justify-between mb-1">
          <div>
            <p className="text-2xl font-extrabold text-ink">₹{bus.finalFare}</p>
            <p className="text-xs text-ink-muted">per seat · all inclusive</p>
          </div>
          {saving > 0 && (
            <div className="text-right">
              <p className="text-xs line-through text-ink-muted">₹{bus.originalFare}</p>
              <Badge variant="completed">
                {Math.round((saving / bus.originalFare) * 100)}% OFF
              </Badge>
            </div>
          )}
        </div>

        <HR my={3} />

        {/* Date row */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            Travel Date
          </p>
          <p className="text-sm font-bold text-ink">{formattedDate}</p>
        </div>

        {/* Departure row */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            Departure
          </p>
          <p className="text-sm font-bold text-ink">{bus.dep}</p>
        </div>

        {/* Passenger counter */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            Passengers
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onChangePassengers(Math.max(1, passengers - 1))}
              disabled={passengers <= 1}
              className="w-7 h-7 rounded-full border border-border flex items-center
                         justify-center text-sm font-bold bg-white
                         hover:bg-yellow-light hover:border-yellow
                         disabled:opacity-40 disabled:cursor-not-allowed
                         transition-colors"
              style={{ fontFamily: "inherit", cursor: passengers > 1 ? "pointer" : "not-allowed" }}
              aria-label="Decrease passengers"
            >
              −
            </button>
            <span
              className="text-sm font-bold text-ink w-5 text-center"
              aria-live="polite"
              aria-label={`${passengers} passenger${passengers > 1 ? "s" : ""}`}
            >
              {passengers}
            </span>
            <button
              onClick={() => onChangePassengers(Math.min(available, passengers + 1))}
              disabled={passengers >= available}
              className="w-7 h-7 rounded-full border border-border flex items-center
                         justify-center text-sm font-bold bg-white
                         hover:bg-yellow-light hover:border-yellow
                         disabled:opacity-40 disabled:cursor-not-allowed
                         transition-colors"
              style={{ fontFamily: "inherit", cursor: passengers < available ? "pointer" : "not-allowed" }}
              aria-label="Increase passengers"
            >
              +
            </button>
          </div>
        </div>

        {/* Subtotal (shown when passengers > 1) */}
        {passengers > 1 && (
          <div
            className="flex justify-between text-sm font-semibold mb-4 px-3 py-2 rounded-lg"
            style={{
              background: C.yellowLight,
              border: `1px solid ${C.yellow}`,
            }}
          >
            <span className="text-ink-muted">
              {passengers} × ₹{bus.finalFare}
            </span>
            <span className="text-ink font-bold">₹{subtotal}</span>
          </div>
        )}

        {/* ── SELECT SEATS BUTTON (explicit requirement) ── */}
        <Button
          style={{ width: "100%", justifyContent: "center", padding: "12px" }}
          icon={<Ico d={P.seat} size={17} />}
          disabled={available === 0}
          onClick={onSelectSeats}
          aria-label={available === 0 ? "This bus is sold out" : "Proceed to seat selection"}
        >
          {available === 0 ? "Sold Out" : "Select Seats"}
        </Button>

        {/* Wishlist + Share */}
        <div className="flex gap-2 mt-2">
          {[
            { icon: P.heart, label: "Wishlist", aria: "Add to wishlist" },
            { icon: P.share, label: "Share",    aria: "Share this bus"  },
          ].map(btn => (
            <button
              key={btn.label}
              className="flex-1 py-2 rounded-lg border border-border text-xs font-semibold
                         text-ink bg-white hover:bg-yellow-light hover:border-yellow
                         transition-colors flex items-center justify-center gap-1.5"
              style={{ fontFamily: "inherit", cursor: "pointer" }}
              aria-label={btn.aria}
            >
              <Ico d={btn.icon} size={13} />
              {btn.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Trust badges — Card info (sky-light tint, BRS §7.4.2) */}
      <Card info padding="compact">
        <div className="flex flex-col gap-2">
          {[
            "🔒 Secure payment gateway",
            "✅ Instant e-ticket after booking",
            "💰 Free cancellation (24 hrs)",
            "🛡️ TransitHub Booking Guarantee",
          ].map(line => (
            <p key={line} className="text-xs font-medium text-ink">{line}</p>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  BusDetails — Main Page Export
// ════════════════════════════════════════════════════════════
/**
 * Props:
 *   vehicle    — bus object from SearchBus (falls back to BUS_DATA dummy)
 *   onNavigate — (route, state?) => void   routing callback
 */
export default function BusDetails({ vehicle = BUS_DATA, onNavigate }) {
  const bus = vehicle;

  const [selectedDate, setSelectedDate] = useState("2025-05-27");
  const [passengers,   setPassengers]   = useState(1);

  const goBack = () => onNavigate?.("/customer/booking");

  const handleSelectSeats = () => {
    onNavigate?.("/customer/seat-selection", { bus, date: selectedDate, passengers });
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: C.bg, fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
    >
      <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">

        {/* Breadcrumb — BRS §7.3 */}
        <div className="mb-4">
          <Breadcrumb items={[
            { label: "Home",      href: "/customer/dashboard" },
            { label: "Booking",   href: "/customer/booking"   },
            { label: "Search",    href: "/customer/search"    },
            { label: "Bus Details"                            },
          ]} />
        </div>

        {/* Back link */}
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-sm font-semibold text-ink-muted
                     hover:text-ink mb-5 bg-transparent border-0 cursor-pointer"
          style={{ fontFamily: "inherit" }}
          aria-label="Back to search results"
        >
          <Ico d={P.arrowL} size={16} />
          Back to Results
        </button>

        {/* Page heading — BRS §7.2 Page/Module Title: 700 24px Near Black */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-ink">{bus.operator}</h1>
            <p className="text-sm text-ink-muted mt-1">
              {bus.route} · {bus.class} · {bus.dep} → {bus.arr}
            </p>
          </div>
          <Badge variant={bus.totalSeats - bus.bookedSeats > 0 ? "active" : "cancelled"}>
            {bus.totalSeats - bus.bookedSeats > 0
              ? `${bus.totalSeats - bus.bookedSeats} seats available`
              : "Sold Out"}
          </Badge>
        </div>

        {/* ── 2-column layout: detail (left) + sidebar (right) ── */}
        {/* BRS §7.7: LG+ → flex-row  |  MD/SM → flex-col       */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── Left: all detail sections ── */}
          <div className="flex-1 min-w-0">

            {/* 1. Photo Gallery */}
            <PhotoGallery photos={bus.photos} />

            {/* 2. Bus Information — type, dep, arr, duration, specs */}
            <BusInfoCard bus={bus} />

            {/* 3. Operator Details */}
            <OperatorCard bus={bus} />

            {/* 4. Amenities */}
            <AmenitiesSection amenities={bus.amenities} />

            {/* 5 + 6. Boarding & Dropping Points */}
            <StopsSection
              boardingPoints={bus.boardingPoints}
              droppingPoints={bus.droppingPoints}
            />

            {/* 7. Availability Calendar */}
            <AvailabilityCalendar
              availability={bus.availability}
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
            />

            {/* 8. Available Seats Summary */}
            <SeatsSummary bus={bus} />

            {/* 9. Fare Information */}
            <FareSection bus={bus} />

            {/* 10. Cancellation Policy (CP-VB-08) */}
            <CancellationPolicy policy={bus.cancellationPolicy} />

            {/* 11. Operator Reviews (CP-VB-03) */}
            <ReviewsSection bus={bus} />
          </div>

          {/* ── Right: sticky booking sidebar (12) ── */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <BookingSidebar
              bus={bus}
              selectedDate={selectedDate}
              passengers={passengers}
              onChangePassengers={setPassengers}
              onSelectSeats={handleSelectSeats}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
