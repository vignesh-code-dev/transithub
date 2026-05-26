

import React, { useState, useMemo, useEffect, useRef } from "react";

import Card               from "../../components/ui/Card";
import Badge              from "../../components/ui/Badge";
import Button             from "../../components/ui/Button";
import Input              from "../../components/ui/Input";
import { Select }         from "../../components/ui/Input";
import Breadcrumb         from "../../components/ui/Breadcrumb";

// ─── Inline icon helper (outline, no extra dep) ───────────────────────────────
const Icon = ({ d, size = 18, color = "currentColor", sw = 1.75 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke={color} strokeWidth={sw}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);
const IC = {
  bus:      "M8 6v6M15 6v6M2 12h19.6M18 18h2a1 1 0 0 0 1-1v-5a8 8 0 0 0-8-8H7a8 8 0 0 0-8 8v5a1 1 0 0 0 1 1h2M7 18a2 2 0 1 0 4 0M15 18a2 2 0 1 0 4 0",
  car:      "M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14l3 5v5h-2m-6 0H9m12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0",
  van:      "M5 17H3a2 2 0 0 1-2-2V7h15l4 4v6h-2m-6 0H9M17 17a2 2 0 1 0 4 0M5 17a2 2 0 1 0 4 0",
  truck:    "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  search:   "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  filter:   "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  clock:    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  x:        "M18 6L6 18M6 6l12 12",
  check:    "M20 6L9 17l-5-5",
  sort:     "M3 6h18M7 12h10M11 18h2",
  sliders:  "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
};

// ─── Cities list ─────────────────────────────────────────────────────────────
const CITIES = [
  "Coimbatore", "Chennai", "Madurai", "Salem", "Trichy",
  "Bangalore", "Erode", "Vellore", "Tirunelveli", "Kumbakonam",
];

// ─── Vehicle-type config ─────────────────────────────────────────────────────
const VEHICLE_TYPES = [
  { id: "Bus",        label: "Bus",         icon: IC.bus,   unit: "seat"  },
  { id: "Car",        label: "Car",         icon: IC.car,   unit: "day"   },
  { id: "Van",        label: "Van",         icon: IC.van,   unit: "day"   },
  { id: "Commercial", label: "Commercial",  icon: IC.truck, unit: "trip"  },
];

// ─── Amenity options (CP-VB-01 filter) ───────────────────────────────────────
const AMENITY_OPTIONS = ["AC", "WiFi", "Charging", "Sleeper", "Water", "Blanket", "GPS"];

// ─── Sort options ─────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating",     label: "Highest Rated"     },
  { value: "departure",  label: "Earliest Departure" },
];

// ─── Realistic dummy vehicle data (CP-VB-02) ─────────────────────────────────
const ALL_VEHICLES = [
  {
    id:        "V-001",
    type:      "Bus",
    operator:  "Sri Murugan Travels",
    route:     "Coimbatore → Chennai",
    class:     "Sleeper",
    layout:    "2+1",
    dep:       "10:30 PM",
    arr:       "05:00 AM",
    duration:  "6h 30m",
    seats:     42,
    available: 18,
    price:     580,
    rating:    4.6,
    reviews:   124,
    amenities: ["AC", "Charging", "WiFi", "Water", "Blanket"],
    thumbnail: "🚌",
    promoted:  true,
  },
  {
    id:        "V-002",
    type:      "Bus",
    operator:  "VRL Travels",
    route:     "Coimbatore → Chennai",
    class:     "Semi-Sleeper",
    layout:    "2+2",
    dep:       "11:00 PM",
    arr:       "06:00 AM",
    duration:  "7h 00m",
    seats:     40,
    available: 5,
    price:     520,
    rating:    4.4,
    reviews:   98,
    amenities: ["AC", "Charging"],
    thumbnail: "🚌",
    promoted:  false,
  },
  {
    id:        "V-003",
    type:      "Bus",
    operator:  "KPN Travels",
    route:     "Coimbatore → Chennai",
    class:     "Seater",
    layout:    "2+2",
    dep:       "08:00 PM",
    arr:       "03:30 AM",
    duration:  "7h 30m",
    seats:     50,
    available: 32,
    price:     420,
    rating:    4.2,
    reviews:   201,
    amenities: ["AC", "Water"],
    thumbnail: "🚌",
    promoted:  false,
  },
  {
    id:        "V-004",
    type:      "Bus",
    operator:  "Parveen Travels",
    route:     "Coimbatore → Chennai",
    class:     "Sleeper",
    layout:    "2+1",
    dep:       "09:15 PM",
    arr:       "04:45 AM",
    duration:  "7h 30m",
    seats:     36,
    available: 3,
    price:     620,
    rating:    4.7,
    reviews:   87,
    amenities: ["AC", "WiFi", "Charging", "Blanket", "Water"],
    thumbnail: "🚌",
    promoted:  false,
  },
  {
    id:        "V-005",
    type:      "Car",
    operator:  "Karthik Cabs",
    route:     "Local / Outstation",
    class:     "SUV",
    layout:    null,
    dep:       "Flexible",
    arr:       "Flexible",
    duration:  "—",
    seats:     6,
    available: 1,
    price:     2400,
    rating:    4.8,
    reviews:   201,
    amenities: ["AC", "GPS", "Charging"],
    thumbnail: "🚗",
    promoted:  false,
  },
  {
    id:        "V-006",
    type:      "Van",
    operator:  "Ravi Tours & Travels",
    route:     "Outstation / Groups",
    class:     "Premium Van",
    layout:    null,
    dep:       "Flexible",
    arr:       "Flexible",
    duration:  "—",
    seats:     9,
    available: 1,
    price:     3200,
    rating:    4.5,
    reviews:   67,
    amenities: ["AC", "Charging", "GPS"],
    thumbnail: "🚐",
    promoted:  false,
  },
  {
    id:        "V-007",
    type:      "Commercial",
    operator:  "Shankar Lorry Service",
    route:     "Goods / Commercial",
    class:     "Mini Truck",
    layout:    null,
    dep:       "Flexible",
    arr:       "Flexible",
    duration:  "—",
    seats:     2,
    available: 1,
    price:     4500,
    rating:    4.3,
    reviews:   34,
    amenities: ["GPS"],
    thumbnail: "🚚",
    promoted:  false,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().split("T")[0];

// Star renderer — BRS §7.6 filled for status indicators
function Stars({ rating, max = 5, size = 13 }) {
  return (
    <span aria-label={`${rating} out of ${max} stars`} className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={`stars-${i}`} width={size} height={size} viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "#FFC200" : "none"}
          stroke={i < Math.round(rating) ? "#FFC200" : "#E0E0E0"}
          strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="text-xs text-ink-muted ml-1">{rating} ({(Array.isArray([]) ? 0 : 0)})</span>
    </span>
  );
}

// ─── Skeleton loader (CP-VB-02 loading state) ────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white border border-border rounded-lg p-5 shadow-card animate-pulse">
      <div className="flex gap-4">
        <div className="w-24 h-20 rounded-lg bg-[#F2F2F2] flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-[#F2F2F2] rounded w-2/3" />
          <div className="h-3 bg-[#F2F2F2] rounded w-1/3" />
          <div className="h-3 bg-[#F2F2F2] rounded w-1/2" />
          <div className="flex gap-2">
            <div className="h-5 w-12 bg-[#F2F2F2] rounded-full" />
            <div className="h-5 w-16 bg-[#F2F2F2] rounded-full" />
            <div className="h-5 w-14 bg-[#F2F2F2] rounded-full" />
          </div>
        </div>
        <div className="flex-shrink-0 text-right space-y-2">
          <div className="h-6 bg-[#F2F2F2] rounded w-20 ml-auto" />
          <div className="h-8 bg-[#F2F2F2] rounded w-24 ml-auto" />
        </div>
      </div>
    </div>
  );
}

// ─── Vehicle card (CP-VB-02) ─────────────────────────────────────────────────
function VehicleCard({ vehicle, onSelect, priceUnit }) {
  const lowStock     = vehicle.available <= 5;
  const isBus        = vehicle.type === "Bus";

  return (
    <article
      className="bg-white border border-border rounded-lg shadow-card
                 hover:shadow-focus transition-all duration-150 cursor-pointer
                 focus-within:ring-2 focus-within:ring-yellow"
      onClick={() => onSelect(vehicle)}
      aria-label={`${vehicle.operator} — ${vehicle.route}, ₹${vehicle.price} per ${priceUnit}`}
    >
      <div className="p-5">
        {/* ── Top row: thumbnail + main info + price ── */}
        <div className="flex gap-4 items-start">

          {/* Thumbnail — BRS CP-VB-02: "photo, operator name, capacity, price/day, rating" */}
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-lg
                       bg-yellow-light border border-border"
            style={{ width: 96, height: 80, fontSize: 40 }}
            aria-hidden="true"
          >
            {vehicle.thumbnail}
          </div>

          {/* Centre info block */}
          <div className="flex-1 min-w-0">
            {/* Operator name — BRS §7.2 Card/Widget Heading: 600 SemiBold 16px */}
            <div className="flex items-start gap-2 flex-wrap">
              <h3 className="text-base font-semibold text-ink leading-tight">
                {vehicle.operator}
              </h3>
              {vehicle.promoted && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: "#FFC200", color: "#1A1A2E", fontSize: 10 }}
                >
                  PROMOTED
                </span>
              )}
            </div>

            {/* Class & capacity — BRS CP-VB-02: "capacity" */}
            <p className="text-sm text-ink-muted mt-0.5">
              {vehicle.class}
              {vehicle.layout && ` · ${vehicle.layout} layout`}
              {" · "}
              <Icon d={IC.users} size={13} color="#5D6D7E" /> {vehicle.seats} seats
            </p>

            {/* Departure / Arrival — bus only */}
            {isBus && vehicle.dep !== "Flexible" && (
              <p className="text-sm text-ink font-semibold mt-1">
                <span>{vehicle.dep}</span>
                <span className="text-ink-muted font-normal mx-1">→</span>
                <span>{vehicle.arr}</span>
                <span className="text-ink-muted font-normal ml-2 text-xs">
                  ({vehicle.duration})
                </span>
              </p>
            )}

            {/* Rating row — BRS CP-VB-02: "rating" */}
            <div className="flex items-center gap-1 mt-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={`rating-${i}`} width={13} height={13} viewBox="0 0 24 24"
                  fill={i < Math.round(vehicle.rating) ? "#FFC200" : "none"}
                  stroke={i < Math.round(vehicle.rating) ? "#FFC200" : "#E0E0E0"}
                  strokeWidth="1.5" aria-hidden="true">
                  <path d={IC.star} />
                </svg>
              ))}
              <span className="text-xs text-ink-muted">
                {vehicle.rating} ({vehicle.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Price + CTA — BRS CP-VB-02: "price/day" */}
          <div className="flex-shrink-0 text-right flex flex-col items-end gap-2">
            <div>
              <p className="text-xl font-extrabold text-ink">
                ₹{vehicle.price.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-ink-muted">per {priceUnit}</p>
            </div>

            {/* Availability badge — low stock warning */}
            <Badge variant={lowStock ? "warning" : "active"}>
              {vehicle.available} {isBus ? "seats" : "unit"} left
            </Badge>

            {/* Select button */}
            <Button
              size="sm"
              icon={<Icon d={IC.arrow} size={14} />}
              iconPosition="right"
              onClick={e => { e.stopPropagation(); onSelect(vehicle); }}
              aria-label={`Select ${vehicle.operator}`}
            >
              Select
            </Button>
          </div>
        </div>

        {/* ── Amenity tags — BRS CP-VB-02 ── */}
        {vehicle.amenities.length > 0 && (
          <div
            className="flex flex-wrap gap-1.5 mt-3 pt-3"
            style={{ borderTop: "1px solid #E0E0E0" }}
          >
            {vehicle.amenities.map(a => (
              <span
                key={a}
                className="text-xs font-semibold px-2 py-0.5 rounded"
                style={{
                  background: "#FFFDE7",
                  border: "1px solid #FFC200",
                  color: "#1A1A2E",
                  fontSize: 11,
                }}
              >
                ✓ {a}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

// ─── Filter sidebar (CP-VB-01) ────────────────────────────────────────────────
function FilterPanel({
  priceRange, onPriceRange,
  selectedAmenities, onToggleAmenity,
  selectedClass, onClass,
  onReset,
}) {
  const CLASS_OPTIONS = ["All", "Sleeper", "Semi-Sleeper", "Seater", "SUV", "Premium Van"];

  return (
    <aside
      aria-label="Filter results"
      className="bg-white border border-border rounded-lg shadow-card p-5 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-ink uppercase tracking-widest flex items-center gap-2">
          <Icon d={IC.sliders} size={15} />
          Filters
        </h2>
        <button
          onClick={onReset}
          className="text-xs text-ink-muted underline hover:text-ink bg-transparent border-0 cursor-pointer"
          style={{ fontFamily: "inherit" }}
          aria-label="Reset all filters"
        >
          Reset all
        </button>
      </div>

      {/* ── Price Range — CP-VB-01 ── */}
      <div>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
          Price Range
        </h3>
        <div className="flex items-center justify-between text-sm font-semibold text-ink mb-2">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
        {/* Min slider */}
        <input
          type="range" min={0} max={10000} step={100}
          value={priceRange[0]}
          onChange={e => onPriceRange([+e.target.value, priceRange[1]])}
          className="w-full accent-yellow mb-1"
          aria-label="Minimum price"
        />
        {/* Max slider */}
        <input
          type="range" min={0} max={10000} step={100}
          value={priceRange[1]}
          onChange={e => onPriceRange([priceRange[0], +e.target.value])}
          className="w-full accent-yellow"
          aria-label="Maximum price"
        />
      </div>

      {/* ── Bus Class — CP-VB-01 ── */}
      <div>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
          Bus Class
        </h3>
        <div className="flex flex-col gap-2">
          {CLASS_OPTIONS.map(cls => (
            <label
              key={cls}
              className="flex items-center gap-2 cursor-pointer text-sm text-ink"
            >
              <input
                type="radio"
                name="bus-class"
                value={cls}
                checked={selectedClass === cls}
                onChange={() => onClass(cls)}
                className="accent-yellow"
              />
              {cls}
            </label>
          ))}
        </div>
      </div>

      {/* ── Amenities — CP-VB-01 ── */}
      <div>
        <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">
          Amenities
        </h3>
        <div className="flex flex-col gap-2">
          {AMENITY_OPTIONS.map(a => {
            const checked = selectedAmenities.includes(a);
            return (
              <label
                key={a}
                className="flex items-center gap-2 cursor-pointer text-sm text-ink"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleAmenity(a)}
                  className="accent-yellow"
                  aria-label={`Filter by ${a}`}
                />
                {a}
                {checked && (
                  <Icon d={IC.check} size={12} color="#1E8449" />
                )}
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div
        className="flex items-center justify-center rounded-full mb-4"
        style={{ width: 72, height: 72, background: "#FFFDE7" }}
        aria-hidden="true"
      >
        <svg width={36} height={36} viewBox="0 0 24 24" fill="none"
          stroke="#FFC200" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d={IC.bus} />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-ink mb-2">
        No vehicles found
      </h3>
      <p className="text-sm text-ink-muted mb-5 max-w-xs">
        No results match your current filters. Try changing the date,
        route, or removing some filters.
      </p>
      <Button variant="secondary" onClick={onReset}>
        Reset Filters
      </Button>
    </div>
  );
}

// ─── Results count + sort bar ─────────────────────────────────────────────────
function ResultsBar({ count, sort, onSort, onToggleFilter, filterOpen }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
      <p className="text-sm text-ink-muted">
        <span className="font-semibold text-ink">{count}</span> vehicle{count !== 1 ? "s" : ""} found
      </p>
      <div className="flex items-center gap-3">
        {/* Mobile filter toggle */}
        <button
          onClick={onToggleFilter}
          className="flex items-center gap-1.5 text-sm font-semibold text-ink
                     px-3 py-1.5 rounded-lg border border-border bg-white
                     hover:bg-yellow-light hover:border-yellow transition-colors
                     lg:hidden"
          style={{ fontFamily: "inherit" }}
          aria-expanded={filterOpen}
          aria-label={filterOpen ? "Hide filters" : "Show filters"}
        >
          <Icon d={IC.filter} size={15} />
          Filters
        </button>

        {/* Sort dropdown — BRS CP-VB-01 */}
        <Select
          options={SORT_OPTIONS.map(s => s.label)}
          value={SORT_OPTIONS.find(s => s.value === sort)?.label}
          onChange={e => {
            const opt = SORT_OPTIONS.find(s => s.label === e.target.value);
            onSort(opt?.value ?? "price-asc");
          }}
          aria-label="Sort results"
        />
      </div>
    </div>
  );
}

// ─── Search form (CP-VB-01) ───────────────────────────────────────────────────
function SearchForm({ params, onChange, onSubmit }) {
  const { from, to, date, returnDate, passengers, type } = params;

  const isRental = type !== "Bus";

  return (
    <Card accent padding="compact" className="mb-6">
      {/* Vehicle type tabs */}
      <div className="flex gap-2 mb-4 flex-wrap" role="tablist" aria-label="Vehicle type">
        {VEHICLE_TYPES.map(vt => {
          const active = type === vt.id;
          return (
            <button
              key={vt.id}
              role="tab"
              aria-selected={active}
              onClick={() => onChange({ type: vt.id })}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
                         border transition-all duration-150 focus-visible:ring-2 focus-visible:ring-yellow"
              style={{
                background:   active ? "#FFC200" : "#fff",
                borderColor:  active ? "#FFC200" : "#E0E0E0",
                color:        "#1A1A2E",
                fontFamily:   "inherit",
              }}
              aria-label={`Search ${vt.label}s`}
            >
              <Icon d={vt.icon} size={16} />
              {vt.label}
            </button>
          );
        })}
      </div>

      {/* Fields grid — BRS CP-VB-01: type, date, location, price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        <Select
          label="From"
          options={CITIES}
          value={from}
          onChange={e => onChange({ from: e.target.value })}
        />
        <Select
          label="To"
          options={CITIES.filter(c => c !== from)}
          value={to}
          onChange={e => onChange({ to: e.target.value })}
        />
        <Input
          label={isRental ? "Pickup Date" : "Travel Date"}
          type="date"
          value={date}
          min={today()}
          onChange={e => onChange({ date: e.target.value })}
        />
        {isRental && (
          <Input
            label="Return Date"
            type="date"
            value={returnDate}
            min={date || today()}
            onChange={e => onChange({ returnDate: e.target.value })}
            helperText="For rentals"
          />
        )}
        <Input
          label="Passengers"
          type="number"
          value={passengers}
          min={1}
          max={50}
          onChange={e => onChange({ passengers: +e.target.value })}
        />
        <Button
          style={{ height: 42, justifyContent: "center" }}
          icon={<Icon d={IC.search} size={16} />}
          onClick={onSubmit}
          aria-label="Search for available vehicles"
          className={isRental ? "" : ""}
        >
          Search
        </Button>
      </div>
    </Card>
  );
}

// ════════════════════════════════════════════════════════════
//  SearchBus — Main Page Component
// ════════════════════════════════════════════════════════════
export default function SearchBus({ onNavigate }) {
  // ── Search params state (CP-VB-01) ──────────────────────
  const [params, setParams] = useState({
    from:       "Coimbatore",
    to:         "Chennai",
    date:       today(),
    returnDate: "",
    passengers: 1,
    type:       "Bus",
  });

  // ── Filter state (CP-VB-01) ──────────────────────────────
  const [priceRange,         setPriceRange]         = useState([0, 10000]);
  const [selectedAmenities,  setSelectedAmenities]  = useState([]);
  const [selectedClass,      setSelectedClass]       = useState("All");
  const [sort,               setSort]               = useState("price-asc");
  const [filterOpen,         setFilterOpen]          = useState(false);

  // ── Loading simulation ───────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(true); // show results on mount

  // Simulate search fetch
  const handleSearch = () => {
    setLoading(true);
    setSearched(false);
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
    }, 900);
  };

  // Param change helper
  const handleParamChange = patch => setParams(p => ({ ...p, ...patch }));

  // Toggle amenity filter
  const toggleAmenity = a =>
    setSelectedAmenities(prev =>
      prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
    );

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedAmenities([]);
    setSelectedClass("All");
    setSort("price-asc");
  };

  // Navigate to BusDetails — next page in the flow
  const handleSelect = vehicle => {
    if (onNavigate) {
      onNavigate("/customer/bus-details", { vehicle, searchParams: params });
    }
  };

  // ── Derived: filtered + sorted vehicles (CP-VB-01) ───────
  const results = useMemo(() => {
    let list = ALL_VEHICLES.filter(v => {
      // Type filter
      if (v.type !== params.type) return false;
      // Price range
      if (v.price < priceRange[0] || v.price > priceRange[1]) return false;
      // Class
      if (selectedClass !== "All" && v.class !== selectedClass) return false;
      // Amenities — vehicle must have ALL selected amenities
      if (selectedAmenities.length > 0 &&
          !selectedAmenities.every(a => v.amenities.includes(a))) return false;
      return true;
    });

    // Sort
    switch (sort) {
      case "price-asc":  list = [...list].sort((a, b) => a.price - b.price);              break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price);              break;
      case "rating":     list = [...list].sort((a, b) => b.rating - a.rating);            break;
      case "departure":  list = [...list].sort((a, b) => a.dep.localeCompare(b.dep));     break;
      default: break;
    }
    return list;
  }, [params.type, priceRange, selectedClass, selectedAmenities, sort]);

  // Price unit per vehicle type
  const priceUnit = VEHICLE_TYPES.find(v => v.id === params.type)?.unit ?? "trip";

  return (
    <div
      className="min-h-screen"
      style={{ background: "#F5F6FA", fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
    >
      <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">

        {/* Breadcrumb — BRS §7.3 */}
        <div className="mb-4">
          <Breadcrumb items={[
            { label: "Home",      href: "/customer/dashboard" },
            { label: "Booking",   href: "/customer/booking"   },
            { label: "Search Bus" },
          ]} />
        </div>

        {/* Page title — BRS §7.2: 700 Bold 24px Near Black */}
        <h1 className="text-2xl font-bold text-ink mb-1">
          Find & Book a Vehicle
        </h1>
        <p className="text-sm text-ink-muted mb-6">
          Search buses, cars, vans and commercial vehicles across Tamil Nadu
        </p>

        {/* ── CP-VB-01: Search form ── */}
        <SearchForm
          params={params}
          onChange={handleParamChange}
          onSubmit={handleSearch}
        />

        {/* ── Main layout: filter sidebar + results ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Filter sidebar — desktop always visible, mobile toggleable */}
          <div
            className={[
              "w-full lg:w-64 lg:flex-shrink-0",
              filterOpen ? "block" : "hidden lg:block",
            ].join(" ")}
          >
            <FilterPanel
              priceRange={priceRange}
              onPriceRange={setPriceRange}
              selectedAmenities={selectedAmenities}
              onToggleAmenity={toggleAmenity}
              selectedClass={selectedClass}
              onClass={setSelectedClass}
              onReset={resetFilters}
            />
          </div>

          {/* Results column */}
          <div className="flex-1 min-w-0">

            {/* Results bar with count + sort */}
            {searched && !loading && (
              <ResultsBar
                count={results.length}
                sort={sort}
                onSort={setSort}
                onToggleFilter={() => setFilterOpen(o => !o)}
                filterOpen={filterOpen}
              />
            )}

            {/* ── CP-VB-02: Vehicle listing ── */}
            <div className="flex flex-col gap-4">
              {loading ? (
                // Skeleton loader during fetch
                Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              ) : !searched ? null
              : results.length === 0 ? (
                // Empty state
                <Card padding="compact">
                  <EmptyState onReset={resetFilters} />
                </Card>
              ) : (
                results.map(vehicle => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    priceUnit={priceUnit}
                    onSelect={handleSelect}
                  />
                ))
              )}
            </div>

            {/* Info banner — BRS §7.4.2 Highlighted Card (Sky Blue tint) */}
            {searched && !loading && results.length > 0 && (
              <Card info padding="compact" className="mt-4">
                <p className="text-xs font-medium text-ink">
                  🔒 All bookings are secured via TransitHub. Prices include GST.
                  Free cancellation up to 4 hours before departure on eligible tickets.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
