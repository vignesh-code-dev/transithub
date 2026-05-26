/**
 * ============================================================
 *  TransitHub — Customer Portal
 *  File    : src/pages/customer/SeatSelection.jsx
 *  Route   : /customer/seat-selection
 *  BRS Ref : CP-VB-04  Seat Selector (Bus)
 *            CP-VB-05  Booking Summary (fare panel preview)
 * ============================================================
 *
 *  Sections (all from requirements checklist):
 *  ┌──────────────────────────────────────────────────────┐
 *  │ 1. Bus Summary Card                                  │
 *  │    Route, Bus Name, Departure, Arrival, Duration     │
 *  │ 2. Seat Map Section                                  │
 *  │    Existing SeatSelector · Lower / Upper deck toggle │
 *  │    Available · Selected · Booked states              │
 *  │ 3. Passenger Details Form (one row per seat)         │
 *  │    Name · Age · Gender · Mobile · Email              │
 *  │ 4. Fare Summary                                      │
 *  │    Base Fare · Tax · Discount · Total                │
 *  │ 5. Booking Summary Sidebar (sticky)                  │
 *  │ 6. Proceed To Booking Button → /customer/booking-confirm│
 *  └──────────────────────────────────────────────────────┘
 *
 *  Components used (ALL existing — zero new):
 *    SeatSelector    → ui/SeatSelector.jsx   (primary, CP-VB-04)
 *    Card            → ui/Card.jsx
 *    Badge           → ui/Badge.jsx
 *    Button          → ui/Button.jsx
 *    Input           → ui/Input.jsx  (default)
 *    Select          → ui/Input.jsx  (named)
 *    Breadcrumb      → ui/Breadcrumb.jsx
 *
 *  Responsive (BRS §7.7):
 *    LG+ ≥1024px  → 2-col: seat map + form (left) | sidebar (right, sticky)
 *    MD  768–1023 → same
 *    SM  <768px   → single column, sidebar stacks below
 * ============================================================
 */

import React, { useState, useMemo } from "react";

import SeatSelector from "../../components/ui/SeatSelector";
import Card         from "../../components/ui/Card";
import Badge        from "../../components/ui/Badge";
import Button       from "../../components/ui/Button";
import Input        from "../../components/ui/Input";
import { Select }   from "../../components/ui/Input";
import Breadcrumb   from "../../components/ui/Breadcrumb";

// ─── Inline SVG icon (no extra dep) ──────────────────────────────────────────
const Ico = ({ d, size = 18, color = "currentColor", sw = 1.75 }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke={color} strokeWidth={sw}
    strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const P = {
  bus:      "M8 6v6M15 6v6M2 12h19.6M18 18h2a1 1 0 0 0 1-1v-5a8 8 0 0 0-8-8H7a8 8 0 0 0-8 8v5a1 1 0 0 0 1 1h2M7 18a2 2 0 1 0 4 0M15 18a2 2 0 1 0 4 0",
  clock:    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  seat:     "M4 17v2a2 2 0 0 0 4 0v-2M16 17v2a2 2 0 0 0 4 0v-2M5 9h14M5 9a2 2 0 0 0-2 2v6h18v-6a2 2 0 0 0-2-2M5 9V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4",
  tag:      "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  check:    "M20 6L9 17l-5-5",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  arrowL:   "M19 12H5M12 19l-7-7 7-7",
  warn:     "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  info:     "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01",
  layers:   "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
};

// ─── Dummy bus data (fallback when no props passed) ───────────────────────────
const DEFAULT_BUS = {
  id:          "V-001",
  operator:    "Sri Murugan Travels",
  busType:     "Volvo Multi-Axle",
  class:       "Sleeper",
  layout:      "2+1",          // drives SeatSelector layout prop
  from:        "Coimbatore",
  to:          "Chennai",
  route:       "Coimbatore → Chennai",
  date:        "27 May 2025",
  dep:         "10:30 PM",
  arr:         "05:00 AM (+1)",
  duration:    "6h 30m",
  // Lower deck — seats 1-36
  lowerTotal:  36,
  lowerBooked: [3, 8, 15, 22, 28, 31],
  // Upper deck — seats 1-20 (Ladies-preferred seats: 1-4)
  upperTotal:  20,
  upperBooked: [2, 7, 12, 18],
  ladiesSeats: [1, 2, 3, 4],   // upper deck only
  // Pricing
  pricePerSeat: 488,
  gstRate:      0.05,
  discount:     82,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const HR = ({ my = 4 }) => (
  <hr style={{ border: "none", borderTop: "1px solid #E0E0E0", margin: `${my * 4}px 0` }} />
);

function SectionHead({ iconPath, title, sub, action }) {
  return (
    <div className="flex items-center justify-between gap-2 mb-4">
      <div className="flex items-center gap-2">
        <span
          className="flex-shrink-0 flex items-center justify-center rounded-full"
          style={{ width: 32, height: 32, background: "#FFC200" }}
          aria-hidden="true"
        >
          <Ico d={iconPath} size={16} color="#1A1A2E" />
        </span>
        <div>
          <h2 className="text-base font-semibold text-ink leading-tight">{title}</h2>
          {sub && <p className="text-xs text-ink-muted">{sub}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

// ─── 1. Bus Summary Card ──────────────────────────────────────────────────────
// BRS requirement: Route, Bus Name, Departure, Arrival, Duration
function BusSummaryCard({ bus }) {
  return (
    <Card padding="compact" className="mb-5">
      <SectionHead
        iconPath={P.bus}
        title={bus.operator}
        sub={`${bus.busType} · ${bus.class}`}
        action={<Badge variant="active">{bus.date}</Badge>}
      />

      {/* Dark route strip — consistent with BusDetails.jsx pattern */}
      <div
        className="rounded-lg p-3"
        style={{ background: "#1A1A2E" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          {/* Route — From → To */}
          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="text-xs font-semibold mb-0.5" style={{ color: "#AED6F1" }}>FROM</p>
              <p className="text-lg font-extrabold" style={{ color: "#FFC200" }}>{bus.from}</p>
            </div>
            <div className="flex flex-col items-center gap-1 px-2">
              <div style={{ width: 40, height: 1, background: "#5D6D7E" }} />
              <p className="text-xs font-semibold" style={{ color: "#5D6D7E" }}>
                {bus.duration}
              </p>
              <div style={{ width: 40, height: 1, background: "#5D6D7E" }} />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold mb-0.5" style={{ color: "#AED6F1" }}>TO</p>
              <p className="text-lg font-extrabold" style={{ color: "#FFC200" }}>{bus.to}</p>
            </div>
          </div>

          {/* Departure + Arrival + Duration */}
          <div className="flex gap-5">
            {[
              { label: "DEPARTURE", value: bus.dep,      sub: bus.date       },
              { label: "ARRIVAL",   value: bus.arr,      sub: "Next day"     },
              { label: "DURATION",  value: bus.duration, sub: bus.class      },
            ].map(col => (
              <div key={col.label} className="text-center">
                <p className="text-xs font-semibold mb-0.5" style={{ color: "#AED6F1" }}>
                  {col.label}
                </p>
                <p className="text-sm font-bold" style={{ color: "#fff" }}>{col.value}</p>
                <p className="text-xs" style={{ color: "#5D6D7E" }}>{col.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── 2. Seat Map Section ──────────────────────────────────────────────────────
// BRS CP-VB-04: Interactive seat map; locked/available/booked states.
// Lower / Upper deck toggle.  Ladies-preferred seats highlighted on upper.
function SeatMapSection({
  bus,
  deck,          // "lower" | "upper"
  onDeckChange,
  lowerSelected,
  upperSelected,
  onLowerSelect,
  onUpperSelect,
}) {
  const isLower   = deck === "lower";
  const totalSeats = isLower ? bus.lowerTotal  : bus.upperTotal;
  const booked     = isLower ? bus.lowerBooked : bus.upperBooked;
  const selected   = isLower ? lowerSelected   : upperSelected;
  const onSelect   = isLower ? onLowerSelect   : onUpperSelect;

  const totalSelected = lowerSelected.length + upperSelected.length;
  const maxTotal      = 5; // max seats per booking

  return (
    <Card padding="compact" className="mb-5">
      <SectionHead
        iconPath={P.seat}
        title="Select Your Seats"
        sub={`${bus.layout} layout · ${totalSelected} seat${totalSelected !== 1 ? "s" : ""} selected`}
      />

      {/* Deck toggle — only show if bus has upper deck */}
      <div
        className="flex rounded-lg p-1 mb-5"
        style={{ background: "#F5F6FA", border: "1px solid #E0E0E0" }}
        role="group"
        aria-label="Deck selector"
      >
        {[
          { id: "lower", label: "🚌 Lower Deck", count: bus.lowerTotal - bus.lowerBooked.length },
          { id: "upper", label: "🏠 Upper Deck", count: bus.upperTotal - bus.upperBooked.length },
        ].map(d => (
          <button
            key={d.id}
            onClick={() => onDeckChange(d.id)}
            aria-pressed={deck === d.id}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md
                       text-sm font-semibold transition-all duration-150
                       focus-visible:ring-2 focus-visible:ring-yellow"
            style={{
              background:  deck === d.id ? "#FFC200" : "transparent",
              color:       "#1A1A2E",
              border:      "none",
              fontFamily:  "inherit",
              cursor:      "pointer",
            }}
          >
            {d.label}
            <span
              className="text-xs font-bold px-1.5 py-0.5 rounded-full"
              style={{
                background: deck === d.id ? "#1A1A2E" : "#E0E0E0",
                color:      deck === d.id ? "#FFC200"  : "#5D6D7E",
              }}
            >
              {d.count}
            </span>
          </button>
        ))}
      </div>

      {/* Ladies-preferred notice — upper deck only */}
      {!isLower && (
        <Card info padding="compact" className="mb-4">
          <p className="text-xs font-semibold" style={{ color: "#1A5276" }}>
            🌸 Seats 1–4 on Upper Deck are Ladies-Preferred.
            They can be booked by female passengers only.
          </p>
        </Card>
      )}

      {/* Bus front indicator */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="flex-1 rounded text-center text-xs font-bold py-1"
          style={{ background: "#1A1A2E", color: "#FFC200" }}
        >
          🚌 FRONT
        </div>
      </div>

      {/* Ladies-preferred seat highlights for upper deck */}
      {!isLower && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {bus.ladiesSeats.map(n => (
            <span
              key={n}
              className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{
                background: "#FFF0F0",
                border: "1px solid #F48FB1",
                color: "#C2185B",
              }}
            >
              💗 {n}
            </span>
          ))}
          <span className="text-xs text-ink-muted self-center">Ladies preferred</span>
        </div>
      )}

      {/* ── SeatSelector — existing component ── */}
      <SeatSelector
        layout={bus.layout}
        totalSeats={totalSeats}
        bookedSeats={booked}
        selectedSeats={selected}
        maxSelect={maxTotal - (isLower ? upperSelected.length : lowerSelected.length)}
        onSelect={onSelect}
      />

      {/* Max seats warning */}
      {totalSelected >= maxTotal && (
        <Card info padding="compact" className="mt-4">
          <p className="text-xs font-semibold flex items-center gap-1.5" style={{ color: "#7D6608" }}>
            <Ico d={P.warn} size={13} color="#D35400" />
            Maximum {maxTotal} seats per booking reached.
          </p>
        </Card>
      )}
    </Card>
  );
}

// ─── 3. Passenger Details Form ────────────────────────────────────────────────
// BRS requirement: Name · Age · Gender · Mobile Number · Email
// One form row per selected seat.
function PassengerForm({ seats, passengers, onChange }) {
  if (seats.length === 0) {
    return (
      <Card padding="compact" className="mb-5">
        <SectionHead iconPath={P.user} title="Passenger Details" />
        <div
          className="flex flex-col items-center justify-center py-8 rounded-lg"
          style={{ background: "#F5F6FA", border: "1px dashed #E0E0E0" }}
        >
          <Ico d={P.seat} size={32} color="#E0E0E0" />
          <p className="text-sm text-ink-muted mt-3 font-medium">
            Select seats from the map above to fill passenger details.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="compact" className="mb-5">
      <SectionHead
        iconPath={P.user}
        title="Passenger Details"
        sub={`${seats.length} passenger${seats.length > 1 ? "s" : ""}`}
      />

      <div className="flex flex-col gap-6">
        {seats.map((seatNo, idx) => {
          const p      = passengers[idx] ?? {};
          const update = (field, val) => onChange(idx, field, val);

          return (
            <div key={seatNo}>
              {/* Seat header */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="flex items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    width: 28, height: 28,
                    background: "#FFC200",
                    color: "#1A1A2E",
                    flexShrink: 0,
                  }}
                  aria-label={`Passenger ${idx + 1}`}
                >
                  {idx + 1}
                </div>
                <p className="text-sm font-semibold text-ink">
                  Passenger {idx + 1}
                </p>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{
                    background: "#FFFDE7",
                    border: "1px solid #FFC200",
                    color: "#1A1A2E",
                    fontFamily: "'JetBrains Mono','Roboto Mono',monospace",
                  }}
                >
                  Seat {seatNo}
                </span>
              </div>

              {/* Form fields — 2-col grid on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* Name */}
                <Input
                  label="Full Name"
                  placeholder="As on government ID"
                  value={p.name ?? ""}
                  onChange={e => update("name", e.target.value)}
                  error={p._errors?.name}
                  className="sm:col-span-2"
                />

                {/* Age */}
                <Input
                  label="Age"
                  type="number"
                  placeholder="e.g. 28"
                  min={1}
                  max={120}
                  value={p.age ?? ""}
                  onChange={e => update("age", e.target.value)}
                  error={p._errors?.age}
                />

                {/* Gender */}
                <Select
                  label="Gender"
                  options={["Select", "Male", "Female", "Other", "Prefer not to say"]}
                  value={p.gender ?? "Select"}
                  onChange={e => update("gender", e.target.value)}
                />

                {/* Mobile */}
                <Input
                  label="Mobile Number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={p.mobile ?? ""}
                  onChange={e => update("mobile", e.target.value)}
                  helperText="OTP may be sent for verification"
                  error={p._errors?.mobile}
                />

                {/* Email */}
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="arun.k@gmail.com"
                  value={p.email ?? ""}
                  onChange={e => update("email", e.target.value)}
                  helperText="E-ticket will be sent here"
                  error={p._errors?.email}
                />
              </div>

              {/* Divider between passengers */}
              {idx < seats.length - 1 && <HR my={4} />}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ─── 4. Fare Summary ─────────────────────────────────────────────────────────
// BRS requirement: Base Fare · Tax · Discount · Total Amount
function FareSummary({ bus, seatCount }) {
  const base       = bus.pricePerSeat * seatCount;
  const gstAmt     = Math.round(base * bus.gstRate);
  const discAmt    = seatCount > 0 ? bus.discount * seatCount : 0;
  const total      = base + gstAmt - discAmt;
  const perSeatOrig = bus.pricePerSeat + Math.round(bus.pricePerSeat * bus.gstRate);

  return (
    <Card padding="compact" className="mb-5">
      <SectionHead iconPath={P.tag} title="Fare Summary" sub="Per booking, all charges inclusive" />

      {seatCount === 0 ? (
        <p className="text-sm text-ink-muted text-center py-4">
          Select seats to see fare breakdown.
        </p>
      ) : (
        <>
          {/* Itemised rows */}
          {[
            {
              label:   `Base Fare (${seatCount} × ₹${bus.pricePerSeat})`,
              amount:  base,
              color:   "text-ink",
              prefix:  "₹",
            },
            {
              label:   `GST (${bus.gstRate * 100}%)`,
              amount:  gstAmt,
              color:   "text-ink-muted",
              prefix:  "₹",
            },
            {
              label:   `Early Bird Discount (${seatCount} seat${seatCount > 1 ? "s" : ""})`,
              amount:  discAmt,
              color:   "text-success font-semibold",
              prefix:  "−₹",
              isDeduct: true,
            },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className="flex items-center justify-between py-2 text-sm"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid #E0E0E0" : "none" }}
            >
              <span className={`text-ink-muted ${row.isDeduct ? "text-success" : ""}`}
                style={row.isDeduct ? { color: "#1E8449" } : {}}>
                {row.isDeduct ? "✓ " : ""}{row.label}
              </span>
              <span
                className="font-semibold"
                style={{ color: row.isDeduct ? "#1E8449" : "#1A1A2E" }}
              >
                {row.prefix}{row.amount.toLocaleString("en-IN")}
              </span>
            </div>
          ))}

          {/* Total bar */}
          <div
            className="flex items-center justify-between rounded-lg px-4 py-3 mt-4"
            style={{ background: "#1A1A2E" }}
          >
            <div>
              <p className="text-xs font-semibold" style={{ color: "#AED6F1" }}>
                TOTAL PAYABLE
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#1E8449" }}>
                ₹{Math.round(total / seatCount)} per seat after discount
              </p>
            </div>
            <p className="text-2xl font-extrabold" style={{ color: "#FFC200" }}>
              ₹{total.toLocaleString("en-IN")}
            </p>
          </div>
        </>
      )}
    </Card>
  );
}

// ─── 5. Booking Summary Sidebar (sticky) ─────────────────────────────────────
// Shows selected seats list + fare total + CTA
function BookingSidebar({
  bus,
  lowerSelected,
  upperSelected,
  seatCount,
  passengers,
  formValid,
  onProceed,
}) {
  const base   = bus.pricePerSeat * seatCount;
  const gst    = Math.round(base * bus.gstRate);
  const disc   = bus.discount * seatCount;
  const total  = base + gst - disc;

  const allSeats = [
    ...lowerSelected.map(s => ({ deck: "L", no: s })),
    ...upperSelected.map(s => ({ deck: "U", no: s })),
  ];

  return (
    <div className="sticky top-20 flex flex-col gap-4">

      {/* Summary card — accent (left yellow border) */}
      <Card accent padding="compact">
        <p className="text-xs font-bold text-ink-muted uppercase tracking-widest mb-3">
          Booking Summary
        </p>

        {/* Bus quick info */}
        <div className="mb-3">
          <p className="text-sm font-bold text-ink">{bus.operator}</p>
          <p className="text-xs text-ink-muted mt-0.5">
            {bus.route} · {bus.dep} → {bus.arr}
          </p>
          <p className="text-xs text-ink-muted">{bus.date} · {bus.class}</p>
        </div>

        <HR my={2} />

        {/* Selected seats list */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
            Selected Seats ({seatCount})
          </p>

          {seatCount === 0 ? (
            <p className="text-xs text-ink-muted">No seats selected yet.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {allSeats.map(s => (
                <span
                  key={`${s.deck}${s.no}`}
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{
                    background: "#FFC200",
                    color: "#1A1A2E",
                    fontFamily: "'JetBrains Mono','Roboto Mono',monospace",
                  }}
                  aria-label={`${s.deck === "L" ? "Lower" : "Upper"} deck seat ${s.no}`}
                >
                  {s.deck}-{s.no}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Per-passenger names */}
        {passengers.some(p => p?.name) && (
          <>
            <HR my={2} />
            <div className="mb-3">
              <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
                Passengers
              </p>
              {passengers.map((p, i) => (
                p?.name ? (
                  <div key={i} className="flex items-center justify-between mb-1">
                    <p className="text-xs text-ink">{p.name || `Passenger ${i + 1}`}</p>
                    <span className="text-xs text-ink-muted">
                      {allSeats[i] ? `Seat ${allSeats[i].deck}-${allSeats[i].no}` : ""}
                    </span>
                  </div>
                ) : null
              ))}
            </div>
          </>
        )}

        <HR my={2} />

        {/* Fare snapshot */}
        {seatCount > 0 && (
          <div className="mb-4">
            {[
              { k: "Base Fare",   v: `₹${base.toLocaleString("en-IN")}`  },
              { k: `GST (${bus.gstRate * 100}%)`, v: `₹${gst}`           },
              { k: "Discount",    v: `−₹${disc}`, green: true            },
            ].map(row => (
              <div
                key={row.k}
                className="flex justify-between text-xs mb-1"
              >
                <span className="text-ink-muted">{row.k}</span>
                <span
                  className="font-semibold"
                  style={{ color: row.green ? "#1E8449" : "#1A1A2E" }}
                >
                  {row.v}
                </span>
              </div>
            ))}
            <div
              className="flex justify-between text-sm font-bold mt-2 pt-2"
              style={{ borderTop: "1px solid #E0E0E0" }}
            >
              <span className="text-ink">Total</span>
              <span className="text-ink">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        )}

        {/* ── 6. PROCEED TO BOOKING BUTTON (explicit requirement) ── */}
        <Button
          style={{ width: "100%", justifyContent: "center", padding: "12px" }}
          icon={<Ico d={P.arrow} size={17} />}
          iconPosition="right"
          disabled={seatCount === 0 || !formValid}
          onClick={onProceed}
          aria-label={
            seatCount === 0
              ? "Select at least one seat to proceed"
              : !formValid
              ? "Complete passenger details to proceed"
              : "Proceed to booking confirmation"
          }
        >
          Proceed to Booking
        </Button>

        {/* Helper text below button */}
        {seatCount === 0 && (
          <p className="text-xs text-ink-muted text-center mt-2">
            Select at least 1 seat to continue.
          </p>
        )}
        {seatCount > 0 && !formValid && (
          <p className="text-xs text-ink-muted text-center mt-2">
            Fill in all passenger details to continue.
          </p>
        )}
      </Card>

      {/* Trust badges — Card info */}
      <Card info padding="compact">
        <div className="flex flex-col gap-1.5">
          {[
            "🔒 Secure payment gateway",
            "✅ Instant e-ticket after payment",
            "💰 Free cancellation up to 24 hrs",
          ].map(line => (
            <p key={line} className="text-xs font-medium text-ink">{line}</p>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Validation helper ────────────────────────────────────────────────────────
function validatePassengers(passengers, seatCount) {
  if (seatCount === 0) return { valid: false, passengers };

  let allValid = true;
  const validated = passengers.slice(0, seatCount).map(p => {
    const errors = {};
    if (!p?.name?.trim())               errors.name   = "Name is required";
    if (!p?.age || p.age < 1 || p.age > 120) errors.age = "Valid age required";
    if (!p?.gender || p.gender === "Select")  errors.gender = "Select gender";
    if (!p?.mobile?.trim())             errors.mobile = "Mobile is required";
    if (!p?.email?.trim())              errors.email  = "Email is required";
    if (Object.keys(errors).length > 0) allValid = false;
    return { ...(p ?? {}), _errors: errors };
  });

  return { valid: allValid, passengers: validated };
}

// ════════════════════════════════════════════════════════════
//  SeatSelection — Main Page Export
// ════════════════════════════════════════════════════════════
/**
 * Props:
 *   bus        — bus object from BusDetails (falls back to DEFAULT_BUS)
 *   date       — selected travel date string
 *   onNavigate — (route, state?) => void
 */
export default function SeatSelection({ bus = DEFAULT_BUS, date, onNavigate }) {
  // ── Deck state ──────────────────────────────────────────
  const [deck, setDeck] = useState("lower");

  // ── Seat selection state ────────────────────────────────
  const [lowerSelected, setLowerSelected] = useState([]);
  const [upperSelected, setUpperSelected] = useState([]);

  // ── Passenger details state ─────────────────────────────
  // Array length = total selected seats; index matches allSeats order
  const [passengers, setPassengers] = useState([]);

  // Total seats selected across both decks
  const seatCount = lowerSelected.length + upperSelected.length;

  // All selected seats in display order (lower first, then upper)
  const allSeats = [
    ...lowerSelected.map(s => ({ deck: "L", no: s })),
    ...upperSelected.map(s => ({ deck: "U", no: s })),
  ];

  // ── Passenger update handler ────────────────────────────
  const handlePassengerChange = (idx, field, value) => {
    setPassengers(prev => {
      const next = [...prev];
      next[idx] = { ...(next[idx] ?? {}), [field]: value, _errors: {} };
      return next;
    });
  };

  // ── Keep passengers array length in sync with seat count ─
  // When seats change, trim/extend passenger array
  const syncedPassengers = useMemo(() => {
    if (passengers.length === seatCount) return passengers;
    if (passengers.length > seatCount)   return passengers.slice(0, seatCount);
    return [
      ...passengers,
      ...Array.from({ length: seatCount - passengers.length }, () => ({})),
    ];
  }, [seatCount, passengers]);

  // ── Derived: is every passenger form complete ───────────
  const isFormValid = useMemo(() => {
    if (seatCount === 0) return false;
    return syncedPassengers.slice(0, seatCount).every(p =>
      p?.name?.trim() &&
      p?.age > 0 &&
      p?.gender && p.gender !== "Select" &&
      p?.mobile?.trim() &&
      p?.email?.trim()
    );
  }, [syncedPassengers, seatCount]);

  // ── Navigation handlers ─────────────────────────────────
  const goBack = () => onNavigate?.("/customer/bus-details");

  const handleProceed = () => {
    const { valid } = validatePassengers(syncedPassengers, seatCount);
    if (!valid) {
      // Surface validation — in production this would set state
      // and re-render error messages via Input's error prop
      return;
    }
    onNavigate?.("/customer/booking-confirm", {
      bus,
      date:           date ?? bus.date,
      lowerSelected,
      upperSelected,
      passengers:     syncedPassengers,
      totalFare:
        bus.pricePerSeat * seatCount +
        Math.round(bus.pricePerSeat * seatCount * bus.gstRate) -
        bus.discount * seatCount,
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#F5F6FA", fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
    >
      <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">

        {/* Breadcrumb — BRS §7.3 */}
        <div className="mb-4">
          <Breadcrumb items={[
            { label: "Home",        href: "/customer/dashboard"     },
            { label: "Booking",     href: "/customer/booking"       },
            { label: "Search",      href: "/customer/search"        },
            { label: "Bus Details", href: "/customer/bus-details"   },
            { label: "Seat Selection"                               },
          ]} />
        </div>

        {/* Back link */}
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-sm font-semibold text-ink-muted
                     hover:text-ink mb-5 bg-transparent border-0 cursor-pointer"
          style={{ fontFamily: "inherit" }}
          aria-label="Back to bus details"
        >
          <Ico d={P.arrowL} size={16} />
          Back to Bus Details
        </button>

        {/* Page heading — BRS §7.2: 700 Bold 24px Near Black */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-ink">Select Seats</h1>
            <p className="text-sm text-ink-muted mt-1">
              {bus.operator} · {bus.route} · {date ?? bus.date}
            </p>
          </div>
          {seatCount > 0 && (
            <Badge variant="active">
              {seatCount} seat{seatCount > 1 ? "s" : ""} selected
            </Badge>
          )}
        </div>

        {/* ── Progress indicator ── */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {[
            { step: 1, label: "Search",        done: true,  active: false },
            { step: 2, label: "Bus Details",   done: true,  active: false },
            { step: 3, label: "Select Seats",  done: false, active: true  },
            { step: 4, label: "Confirm",       done: false, active: false },
            { step: 5, label: "Payment",       done: false, active: false },
          ].map((s, i, arr) => (
            <React.Fragment key={s.step}>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div
                  className="flex items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    width: 26, height: 26, flexShrink: 0,
                    background: s.done ? "#FFC200" : s.active ? "#1A1A2E" : "#E0E0E0",
                    color:      s.done ? "#1A1A2E" : s.active ? "#FFC200"  : "#5D6D7E",
                  }}
                  aria-label={`Step ${s.step}: ${s.label}${s.done ? " (completed)" : s.active ? " (current)" : ""}`}
                >
                  {s.done ? <Ico d={P.check} size={12} color="#1A1A2E" /> : s.step}
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{
                    color: s.active ? "#1A1A2E" : s.done ? "#1E8449" : "#5D6D7E",
                  }}
                >
                  {s.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div
                  className="flex-1 flex-shrink-0"
                  style={{
                    height: 2, minWidth: 16,
                    background: s.done ? "#FFC200" : "#E0E0E0",
                  }}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── 2-col layout on LG+ ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── Left column: all main sections ── */}
          <div className="flex-1 min-w-0">

            {/* 1. Bus Summary Card */}
            <BusSummaryCard bus={bus} />

            {/* 2. Seat Map Section (CP-VB-04) */}
            <SeatMapSection
              bus={bus}
              deck={deck}
              onDeckChange={setDeck}
              lowerSelected={lowerSelected}
              upperSelected={upperSelected}
              onLowerSelect={setLowerSelected}
              onUpperSelect={setUpperSelected}
            />

            {/* 3. Passenger Details Form */}
            <PassengerForm
              seats={allSeats.map(s => `${s.deck}-${s.no}`)}
              passengers={syncedPassengers}
              onChange={handlePassengerChange}
            />

            {/* 4. Fare Summary */}
            <FareSummary bus={bus} seatCount={seatCount} />

          </div>

          {/* ── Right: sticky sidebar (5 + 6) ── */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <BookingSidebar
              bus={bus}
              lowerSelected={lowerSelected}
              upperSelected={upperSelected}
              seatCount={seatCount}
              passengers={syncedPassengers}
              formValid={isFormValid}
              onProceed={handleProceed}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
