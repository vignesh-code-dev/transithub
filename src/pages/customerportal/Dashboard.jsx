import React, { useState, useCallback } from "react";
import Card, { StatCard }              from "../../components/ui/Card";
import Badge                           from "../../components/ui/Badge";
import Button                          from "../../components/ui/Button";
import Table                           from "../../components/ui/Table";
import Breadcrumb                      from "../../components/ui/Breadcrumb";

// ─── SVG icon helpers (Lucide-style outline, no extra dep) ───────────────────
// BRS §7.6: outline style, 20px navbar, 24px card header, 16px button inline
const Icon = ({ d, size = 20, color = "currentColor", strokeWidth = 1.75, className = "" }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke={color} strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" className={className}
  >
    <path d={d} />
  </svg>
);

const ICONS = {
  bus:       "M8 6v6M15 6v6M2 12h19.6M18 18h2a1 1 0 0 0 1-1v-5a8 8 0 0 0-8-8H7a8 8 0 0 0-8 8v5a1 1 0 0 0 1 1h2M7 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0M15 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0",
  car:       "M19 17H5v-7l3-7h8l3 7v7zM3 17h2M19 17h2M10 17v-3h4v3",
  bolt:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  mapPin:    "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  star:      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  headset:   "M3 18v-6a9 9 0 0 1 18 0v6M3 18a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0-3 0v3zM21 18a1.5 1.5 0 0 1-3 0v-3a1.5 1.5 0 0 1 3 0v3z",
  ticket:    "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2zM9 12h6M12 9v6",
  wallet:    "M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12v5H5a2 2 0 0 1 0-4h16M21 12H5",
  trending:  "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  clock:     "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  arrowRight:"M5 12h14M12 5l7 7-7 7",
  user:      "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  award:     "M12 15l-2 5L7 18l-2 4M12 15l2 5 3-2 2 4M8.5 9A3.5 3.5 0 1 0 15.5 9a3.5 3.5 0 0 0-7 0zM21 15l-4.35-4.35",
};

// ─── Realistic dummy data ────────────────────────────────────────────────────

const USER = {
  name:        "Arun Kumar",
  initials:    "AK",
  phone:       "+91 98765 43210",
  email:       "arun.k@gmail.com",
  memberSince: "Jan 2024",
  status:      "active",
};

const STATS = [
  {
    icon:      <Icon d={ICONS.ticket} size={22} />,
    label:     "Total Bookings",
    value:     "24",
    trend:     "↑ 3 this month",
    trendType: "positive",
  },
  {
    icon:      <Icon d={ICONS.mapPin} size={22} />,
    label:     "Active Trip",
    value:     "1",
    trend:     "Ongoing now",
    trendType: "positive",
  },
  {
    icon:      <Icon d={ICONS.wallet} size={22} />,
    label:     "Wallet Balance",
    value:     "₹1,240",
    trend:     "Low balance alert",
    trendType: "warning",
  },
  {
    icon:      <Icon d={ICONS.award} size={22} />,
    label:     "Reward Points",
    value:     "840 pts",
    trend:     "↑ 60 earned",
    trendType: "positive",
  },
];

const QUICK_ACTIONS = [
  { label: "Book Bus",     icon: ICONS.bus,      route: "/customer/booking",   bg: "#FFFDE7" },
  { label: "Rent Vehicle", icon: ICONS.car,      route: "/customer/booking",   bg: "#FFFDE7" },
  { label: "Quick Ride",   icon: ICONS.bolt,     route: "/customer/quickride", bg: "#FFFDE7" },
  { label: "Track Ride",   icon: ICONS.mapPin,   route: "/customer/tracking",  bg: "#FFFDE7" },
  { label: "My Reviews",   icon: ICONS.star,     route: "/customer/reviews",   bg: "#FFFDE7" },
  { label: "Support",      icon: ICONS.headset,  route: "/customer/support",   bg: "#FFFDE7" },
];

const UPCOMING_TRIPS = [
  {
    id:        "TXH-00847",
    route:     "Coimbatore → Chennai",
    operator:  "Sri Murugan Travels",
    date:      "27 May 2025",
    time:      "10:30 PM",
    class:     "Sleeper",
    seat:      "14A",
    status:    "active",
    departsAt: Date.now() + (6 * 3600 + 24 * 60 + 10) * 1000,
  },
  {
    id:        "TXH-00852",
    route:     "Madurai → Bangalore",
    operator:  "VRL Travels",
    date:      "12 Jun 2025",
    time:      "9:00 PM",
    class:     "Semi-Sleeper",
    seat:      "22B",
    status:    "pending",
    departsAt: Date.now() + (16 * 24 * 3600) * 1000,
  },
];

const RECENT_BOOKINGS = [
  { id: "TXH-00841", type: "Bus",  route: "CBE → MAS",          date: "20 May 2025", fare: "₹580",   status: "completed" },
  { id: "QR-00182",  type: "Auto", route: "Quick Ride – Auto",  date: "18 May 2025", fare: "₹165",   status: "completed" },
  { id: "TXH-00835", type: "Car",  route: "Rental – Innova",    date: "14 May 2025", fare: "₹2,400", status: "completed" },
  { id: "TXH-00821", type: "Bus",  route: "CBE → MDU",          date: "8 May 2025",  fare: "₹340",   status: "cancelled" },
  { id: "QR-00165",  type: "Auto", route: "Quick Ride – Cab",   date: "3 May 2025",  fare: "₹95",    status: "completed" },
];

// ─── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(targetEpoch) {
  const calc = useCallback(() => {
    const diff = Math.max(0, targetEpoch - Date.now());
    return {
      h: Math.floor(diff / 3_600_000),
      m: Math.floor((diff % 3_600_000) / 60_000),
      s: Math.floor((diff % 60_000) / 1_000),
    };
  }, [targetEpoch]);

  const [time, setTime] = React.useState(calc);

  React.useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1_000);
    return () => clearInterval(t);
  }, [calc]);

  return time;
}

const pad2 = n => String(n).padStart(2, "0");

// ─── Sub-components ───────────────────────────────────────────────────────────

function WelcomeSection({ user, onEditProfile }) {
  const hour   = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-full text-ink font-bold text-lg select-none"
          style={{ width: 56, height: 56, background: "#FFC200", fontSize: 20, fontWeight: 800 }}
          aria-label={`Profile avatar for ${user.name}`}
        >
          {user.initials}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-ink leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
            {greeting}, {user.name.split(" ")[0]} 👋
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <Badge variant="active">Active Account</Badge>
            <span className="text-xs text-ink-muted hidden sm:inline">{user.phone}</span>
            <span className="text-xs text-ink-muted hidden sm:inline">·</span>
            <span className="text-xs text-ink-muted hidden sm:inline">{user.email}</span>
            <span className="text-xs text-ink-muted">Member since {user.memberSince}</span>
          </div>
        </div>
      </div>

      <Button
        variant="secondary"
        size="sm"
        icon={<Icon d={ICONS.user} size={15} />}
        onClick={onEditProfile}
        aria-label="Edit your profile"
      >
        Edit Profile
      </Button>
    </div>
  );
}

function StatsRow({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {stats.map(s => <StatCard key={s.label} {...s} />)}
    </div>
  );
}

function QuickActionsGrid({ actions, onNavigate }) {
  return (
    <Card padding="compact" className="mb-6">
      <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-widest mb-4">Quick Actions</h2>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {actions.map(a => (
          <button
            key={a.label}
            onClick={() => onNavigate?.(a.route)}
            className="flex flex-col items-center gap-2 py-4 px-2 rounded-lg border border-border bg-white cursor-pointer transition-all duration-150 focus-visible:outline-none hover:border-yellow hover:bg-yellow-light hover:shadow-card focus-visible:ring-2 focus-visible:ring-yellow"
            style={{ fontFamily: "inherit" }}
            aria-label={a.label}
          >
            <span className="flex items-center justify-center rounded-full" style={{ width: 42, height: 42, background: "#FFC200" }} aria-hidden="true">
              <Icon d={a.icon} size={20} />
            </span>
            <span className="text-xs font-semibold text-ink text-center leading-tight">{a.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

function CountdownTimer({ departsAt, label = "Departing in" }) {
  const { h, m, s } = useCountdown(departsAt);
  const done = h === 0 && m === 0 && s === 0;

  return (
    <div className="rounded-lg px-4 py-3 mb-4" style={{ background: "#1A1A2E" }} aria-live="polite" aria-label={`${label}: ${h} hours, ${m} minutes, ${s} seconds`}>
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#E6AD00", letterSpacing: 1.2 }}>
        {done ? "Departing now!" : label}
      </p>

      {!done ? (
        <div className="flex gap-5">
          {[{ v: pad2(h), l: "HRS" }, { v: pad2(m), l: "MIN" }, { v: pad2(s), l: "SEC" }].map(({ v, l }) => (
            <div key={l} className="text-center">
              <div className="text-3xl font-extrabold leading-none" style={{ color: "#FFC200", fontFamily: "'JetBrains Mono', 'Roboto Mono', monospace" }}>{v}</div>
              <div className="text-xs mt-1" style={{ color: "#5D6D7E", letterSpacing: 1 }}>{l}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm font-semibold" style={{ color: "#FFC200" }}>Your bus is departing now — please board!</p>
      )}
    </div>
  );
}

function UpcomingTripsSection({ trips, onTrack, onViewTicket, onPayNow }) {
  return (
    <section aria-labelledby="upcoming-heading">
      <h2 id="upcoming-heading" className="text-base font-semibold text-ink mb-3 flex items-center gap-2">
        <Icon d={ICONS.clock} size={18} color="#FFC200" />
        Upcoming Trips
      </h2>

      <div className="flex flex-col gap-4">
        {trips.map((trip, idx) => (
          <Card key={trip.id} accent padding="compact" className="relative overflow-hidden">
            {idx === 0 && (
              <span className="absolute top-0 right-0 text-xs font-bold px-3 py-1" style={{ background: "#FFC200", color: "#1A1A2E", borderBottomLeftRadius: 8, fontSize: 10, letterSpacing: .5 }} aria-label="Next upcoming trip">
                NEXT
              </span>
            )}

            <p className="text-base font-bold text-ink mb-1 pr-10">{trip.route}</p>
            <p className="text-xs text-ink-muted mb-1">{trip.operator} · {trip.date} · {trip.time}</p>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant={trip.status}>{trip.status === "active" ? "Confirmed" : "Pending Payment"}</Badge>
              <span className="text-xs text-ink-muted" style={{ fontFamily: "'JetBrains Mono','Roboto Mono',monospace" }}>{trip.id}</span>
              <span className="text-xs text-ink-muted">{trip.class} · Seat {trip.seat}</span>
            </div>

            {idx === 0 && trip.status === "active" && <CountdownTimer departsAt={trip.departsAt} />}

            <div className="flex flex-wrap gap-2">
              {trip.status === "active" && (
                <Button size="sm" icon={<Icon d={ICONS.mapPin} size={15} />} onClick={() => onTrack?.(trip.id)} aria-label={`Track bus for booking ${trip.id}`}>
                  Track Bus
                </Button>
              )}
              <Button variant="secondary" size="sm" icon={<Icon d={ICONS.ticket} size={15} />} onClick={() => onViewTicket?.(trip.id)} aria-label={`View e-ticket for booking ${trip.id}`}>
                View Ticket
              </Button>
              {trip.status === "pending" && (
                <Button size="sm" icon={<Icon d={ICONS.wallet} size={15} />} onClick={() => onPayNow?.(trip.id)} aria-label={`Pay now for booking ${trip.id}`}>
                  Pay Now
                </Button>
              )}
            </div>
          </Card>
        ))}

        {trips.length === 0 && (
          <Card info padding="compact">
            <p className="text-sm text-ink-muted text-center py-4">No upcoming trips. Book your next journey! 🚌</p>
          </Card>
        )}
      </div>
    </section>
  );
}

function RecentBookingsSection({ bookings, onRate, onView }) {
  const [page, setPage] = React.useState(1);

  const columns = [
    { key: "id", header: "Booking ID", mono: true },
    {
      key: "type",
      header: "Type",
      render: val => {
        const iconPath = val === "Bus" ? ICONS.bus : val === "Car" ? ICONS.car : ICONS.bolt;
        return (
          <span className="flex items-center gap-2 text-sm">
            <Icon d={iconPath} size={16} className="text-ink-muted" />
            <span>{val}</span>
          </span>
        );
      },
    },
    { key: "route",  header: "Route" },
    { key: "date",   header: "Date" },
    { key: "fare",   header: "Fare", render: v => <span className="font-semibold">{v}</span> },
    { key: "status", header: "Status", render: val => <Badge variant={val}>{val}</Badge> },
    {
      key: "action",
      header: "Action",
      render: (val, row) =>
        row.status === "completed" ? (
          <Button variant="secondary" size="sm" icon={<Icon d={ICONS.star} size={14} />} onClick={() => onRate?.(row.id)} aria-label={`Rate booking ${row.id}`}>
            Rate
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={() => onView?.(row.id)} aria-label={`View booking ${row.id}`}>
            View
          </Button>
        ),
    },
  ];

  return (
    <section aria-labelledby="recent-heading">
      <h2 id="recent-heading" className="text-base font-semibold text-ink mb-3 flex items-center gap-2">
        <Icon d={ICONS.ticket} size={18} color="#FFC200" />
        Recent Bookings
      </h2>
      <Table columns={columns} data={bookings} pagination={{ page, total: bookings.length, perPage: 5, onPageChange: setPage }} />
    </section>
  );
}

export default function Dashboard({ onNavigate }) {
  const navigate = route => {
    if (onNavigate) {
      onNavigate(route);
    } else if (typeof window !== "undefined") {
      window.location.href = route;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#F5F6FA", fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
      <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">
        <div className="mb-4">
          <Breadcrumb items={[{ label: "Home", href: "/customer/dashboard" }, { label: "Dashboard" }]} />
        </div>

        {/* Welcome Profile Header */}
        <WelcomeSection user={USER} onEditProfile={() => navigate("/customer/profile")} />
        
        {/* Wallet / Points Stats */}
        <StatsRow stats={STATS} />
        
        {/* One-click Grid Actions */}
        <QuickActionsGrid actions={QUICK_ACTIONS} onNavigate={navigate} />

        {/* 2-Column Split for Main Dashboard Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingTripsSection trips={UPCOMING_TRIPS} onTrack={id => navigate(`/customer/tracking?booking=${id}`)} onViewTicket={id => navigate(`/customer/booking/${id}`)} onPayNow={id => navigate(`/customer/booking/${id}/pay`)} />
          <RecentBookingsSection bookings={RECENT_BOOKINGS} onRate={id => navigate(`/customer/reviews?booking=${id}`)} onView={id => navigate(`/customer/booking/${id}`)} />
        </div>
      </div>
    </div>
  );
}