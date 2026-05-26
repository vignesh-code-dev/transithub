/**
 * TransitHub — Customer Dashboard
 * Clean, self-contained UI page for customer portal landing.
 */

import React, { useState, useEffect, useCallback } from "react";
import Card, { StatCard } from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Input, { Select } from "../../../components/ui/Input";
import Table from "../../../components/ui/Table";
import Breadcrumb from "../../../components/ui/Breadcrumb";

const Icon = ({ d, size = 20, color = "currentColor", strokeWidth = 1.75, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d={d} />
  </svg>
);

const ICONS = {
  bus: "M8 6v6M15 6v6M2 12h19.6M18 18h2a1 1 0 0 0 1-1v-5a8 8 0 0 0-8-8H7a8 8 0 0 0-8 8v5a1 1 0 0 0 1 1h2M7 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0M15 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0",
  car: "M19 17H5v-7l3-7h8l3 7v7zM3 17h2M19 17h2M10 17v-3h4v3",
  bolt: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  mapPin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  headset: "M3 18v-6a9 9 0 0 1 18 0v6M3 18a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0-3 0v3zM21 18a1.5 1.5 0 0 1 3 0v-3a1.5 1.5 0 0 1-3 0v3z",
  ticket: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2zM9 12h6M12 9v6",
  wallet: "M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12v5H5a2 2 0 0 1 0-4h16M21 12H5",
  clock: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  award: "M12 15l-2 5L7 18l-2 4M12 15l2 5 3-2 2 4M8.5 9A3.5 3.5 0 1 0 15.5 9a3.5 3.5 0 0 0-7 0zM21 15l-4.35-4.35",
};

const USER = {
  name: "Arun Kumar",
  initials: "AK",
  phone: "+91 98765 43210",
  email: "arun.k@gmail.com",
  memberSince: "Jan 2024",
};

const STATS = [
  {
    icon: <Icon d={ICONS.ticket} size={22} />,
    label: "Total Bookings",
    value: "24",
    trend: "3 more this month",
    trendType: "positive",
  },
  {
    icon: <Icon d={ICONS.mapPin} size={22} />,
    label: "Active Trips",
    value: "1",
    trend: "Ongoing now",
    trendType: "positive",
  },
  {
    icon: <Icon d={ICONS.wallet} size={22} />,
    label: "Wallet Balance",
    value: "₹1,240",
    trend: "Top up to unlock rewards",
    trendType: "neutral",
  },
  {
    icon: <Icon d={ICONS.award} size={22} />,
    label: "Reward Points",
    value: "840 pts",
    trend: "60 points earned",
    trendType: "positive",
  },
];

const QUICK_ACTIONS = [
  { label: "Book Bus", icon: ICONS.bus, route: "/customer/booking" },
  { label: "Rent Vehicle", icon: ICONS.car, route: "/customer/booking" },
  { label: "Quick Ride", icon: ICONS.bolt, route: "/customer/quickride" },
  { label: "Track Ride", icon: ICONS.mapPin, route: "/customer/tracking" },
  { label: "My Reviews", icon: ICONS.star, route: "/customer/reviews" },
  { label: "Support", icon: ICONS.headset, route: "/customer/support" },
];

const UPCOMING_TRIPS = [
  {
    id: "TXH-00847",
    route: "Coimbatore → Chennai",
    operator: "Sri Murugan Travels",
    date: "27 May 2025",
    time: "10:30 PM",
    class: "Sleeper",
    seat: "14A",
    status: "active",
    departsAt: Date.now() + (6 * 3600 + 24 * 60 + 10) * 1000,
  },
  {
    id: "TXH-00852",
    route: "Madurai → Bangalore",
    operator: "VRL Travels",
    date: "12 Jun 2025",
    time: "9:00 PM",
    class: "Semi-Sleeper",
    seat: "22B",
    status: "pending",
    departsAt: Date.now() + 16 * 24 * 3600 * 1000,
  },
];

const RECENT_BOOKINGS = [
  { id: "TXH-00841", type: "Bus", route: "CBE → MAS", date: "20 May 2025", fare: "₹580", status: "completed" },
  { id: "QR-00182", type: "Auto", route: "Quick Ride – Auto", date: "18 May 2025", fare: "₹165", status: "completed" },
  { id: "TXH-00835", type: "Car", route: "Rental – Innova", date: "14 May 2025", fare: "₹2,400", status: "completed" },
  { id: "TXH-00821", type: "Bus", route: "CBE → MDU", date: "8 May 2025", fare: "₹340", status: "cancelled" },
  { id: "QR-00165", type: "Auto", route: "Quick Ride – Cab", date: "3 May 2025", fare: "₹95", status: "completed" },
];

const CITIES = ["Coimbatore", "Chennai", "Madurai", "Salem", "Trichy", "Bangalore", "Erode", "Vellore"];

function useCountdown(targetEpoch) {
  const calc = useCallback(() => {
    const diff = Math.max(0, targetEpoch - Date.now());
    return {
      h: Math.floor(diff / 3_600_000),
      m: Math.floor((diff % 3_600_000) / 60_000),
      s: Math.floor((diff % 60_000) / 1_000),
    };
  }, [targetEpoch]);

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const interval = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(interval);
  }, [calc]);

  return time;
}

const pad2 = (value) => String(value).padStart(2, "0");

function WelcomeSection({ user, onEditProfile }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div
          className="flex items-center justify-center rounded-full text-ink font-bold select-none"
          style={{ width: 56, height: 56, background: "#FFC200", fontSize: 20 }}
          aria-label={`Profile avatar for ${user.name}`}
        >
          {user.initials}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-ink leading-tight">
            {greeting}, {user.name.split(" ")[0]} 👋
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-ink-muted">
            <Badge variant="active">Active Account</Badge>
            <span>{user.phone}</span>
            <span>·</span>
            <span>{user.email}</span>
            <span>·</span>
            <span>Member since {user.memberSince}</span>
          </div>
        </div>
      </div>

      <Button
        variant="secondary"
        size="sm"
        icon={<Icon d={ICONS.user} size={16} />}
        onClick={onEditProfile}
        aria-label="Edit profile"
      >
        Edit Profile
      </Button>
    </div>
  );
}

function QuickSearchCard({ onSearch }) {
  const [from, setFrom] = useState("Coimbatore");
  const [to, setTo] = useState("Chennai");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Bus");

  const handleSearch = () => onSearch?.({ from, to, date, type });

  return (
    <Card accent padding="compact" className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center rounded-full bg-yellow w-10 h-10">
          <Icon d={ICONS.bus} size={18} />
        </span>
        <h2 className="text-base font-semibold text-ink">Quick Booking</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <Select label="Vehicle Type" options={["Bus", "Car", "Van", "Commercial"]} value={type} onChange={(e) => setType(e.target.value)} />
        <Select label="From" options={CITIES} value={from} onChange={(e) => setFrom(e.target.value)} />
        <Select label="To" options={CITIES.filter((city) => city !== from)} value={to} onChange={(e) => setTo(e.target.value)} />
        <Input label="Travel Date" type="date" value={date} min={new Date().toISOString().split("T")[0]} onChange={(e) => setDate(e.target.value)} />
      </div>

      <Button
        style={{ minWidth: 160 }}
        icon={<Icon d={ICONS.arrowRight} size={16} />}
        iconPosition="right"
        onClick={handleSearch}
        disabled={!date}
      >
        Search {type}
      </Button>
    </Card>
  );
}

function StatsRow({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {stats.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
}

function QuickActionsGrid({ actions, onNavigate }) {
  return (
    <Card padding="compact" className="mb-6">
      <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-widest mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => onNavigate?.(action.route)}
            className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-white p-4 text-center transition hover:border-yellow hover:bg-yellow-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
            aria-label={action.label}
            type="button"
          >
            <span className="flex items-center justify-center rounded-full bg-yellow w-12 h-12">
              <Icon d={action.icon} size={18} />
            </span>
            <span className="text-xs font-semibold text-ink">{action.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

function CountdownTimer({ departsAt }) {
  const { h, m, s } = useCountdown(departsAt);
  const finished = h === 0 && m === 0 && s === 0;

  return (
    <div className="rounded-2xl bg-[#1A1A2E] p-4 mb-4 text-white" aria-live="polite">
      <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-yellow mb-2">
        {finished ? "Departing now" : "Departing in"}
      </div>
      {finished ? (
        <p className="text-sm font-semibold">Your bus is ready for boarding.</p>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {[{ label: "HRS", value: pad2(h) }, { label: "MIN", value: pad2(m) }, { label: "SEC", value: pad2(s) }].map((block) => (
            <div key={block.label} className="rounded-xl bg-[#252536] p-3 text-center">
              <div className="text-2xl font-bold text-yellow">{block.value}</div>
              <div className="text-[10px] text-[#94A2B4] mt-1">{block.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UpcomingTripsSection({ trips, onTrack, onViewTicket, onPayNow }) {
  const statusLabel = (status) => (status === "active" ? "Confirmed" : "Pending Payment");

  return (
    <section aria-labelledby="upcoming-heading">
      <div className="flex items-center gap-2 mb-3">
        <Icon d={ICONS.clock} size={18} color="#FFC200" />
        <h2 id="upcoming-heading" className="text-base font-semibold text-ink">Upcoming Trips</h2>
      </div>

      <div className="flex flex-col gap-4">
        {trips.map((trip, index) => (
          <Card key={trip.id} accent padding="compact">
            {index === 0 && (
              <span className="absolute top-4 right-4 rounded-full bg-yellow px-3 py-1 text-[10px] font-bold uppercase text-[#1A1A2E]">
                Next
              </span>
            )}

            <div className="mb-2">
              <p className="text-base font-bold text-ink">{trip.route}</p>
              <p className="text-xs text-ink-muted">{trip.operator} · {trip.date} · {trip.time}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant={trip.status}>{statusLabel(trip.status)}</Badge>
              <span className="text-xs text-ink-muted">{trip.id}</span>
              <span className="text-xs text-ink-muted">{trip.class} · Seat {trip.seat}</span>
            </div>

            {index === 0 && trip.status === "active" && <CountdownTimer departsAt={trip.departsAt} />}

            <div className="flex flex-wrap gap-2">
              {trip.status === "active" && (
                <Button
                  size="sm"
                  icon={<Icon d={ICONS.mapPin} size={14} />}
                  onClick={() => onTrack(trip.id)}
                  aria-label={`Track trip ${trip.id}`}
                >
                  Track Bus
                </Button>
              )}
              <Button
                variant="secondary"
                size="sm"
                icon={<Icon d={ICONS.ticket} size={14} />}
                onClick={() => onViewTicket(trip.id)}
                aria-label={`View ticket ${trip.id}`}
              >
                View Ticket
              </Button>
              {trip.status === "pending" && (
                <Button
                  size="sm"
                  icon={<Icon d={ICONS.wallet} size={14} />}
                  onClick={() => onPayNow(trip.id)}
                  aria-label={`Pay now for ${trip.id}`}
                >
                  Pay Now
                </Button>
              )}
            </div>
          </Card>
        ))}

        {trips.length === 0 && (
          <Card info padding="compact">
            <p className="text-sm text-center text-ink-muted py-6">No upcoming trips. Book your next journey!</p>
          </Card>
        )}
      </div>
    </section>
  );
}

function RecentBookingsSection({ bookings, onRate, onView }) {
  const [page, setPage] = useState(1);
  const typeMap = { Bus: ICONS.bus, Car: ICONS.car, Auto: ICONS.bolt };

  const columns = [
    { key: "id", header: "Booking ID", mono: true },
    {
      key: "type",
      header: "Type",
      render: (value) => (
        <span className="flex items-center gap-2 text-sm">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow text-[#1A1A2E]">
            <Icon d={typeMap[value] ?? ICONS.bus} size={14} />
          </span>
          <span>{value}</span>
        </span>
      ),
    },
    { key: "route", header: "Route" },
    { key: "date", header: "Date" },
    { key: "fare", header: "Fare", render: (value) => <span className="font-semibold">{value}</span> },
    { key: "status", header: "Status", render: (value) => <Badge variant={value}>{value}</Badge> },
    {
      key: "action",
      header: "Action",
      render: (_, row) =>
        row.status === "completed" ? (
          <Button
            variant="secondary"
            size="sm"
            icon={<Icon d={ICONS.star} size={14} />}
            onClick={() => onRate(row.id)}
            aria-label={`Rate booking ${row.id}`}
          >
            Rate
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onView(row.id)}
            aria-label={`View booking ${row.id}`}
          >
            View
          </Button>
        ),
    },
  ];

  return (
    <section aria-labelledby="recent-heading">
      <div className="flex items-center gap-2 mb-3">
        <Icon d={ICONS.ticket} size={18} color="#FFC200" />
        <h2 id="recent-heading" className="text-base font-semibold text-ink">Recent Bookings</h2>
      </div>

      <Table
        columns={columns}
        data={bookings}
        pagination={{ page, total: bookings.length, perPage: 5, onPageChange: setPage }}
      />
    </section>
  );
}

export default function Dashboard({ onNavigate }) {
  const navigate = (route) => {
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

        <WelcomeSection user={USER} onEditProfile={() => navigate("/customer/profile")} />
        <QuickSearchCard onSearch={(params) => navigate(`/customer/searchbus?from=${params.from}&to=${params.to}&date=${params.date}&type=${params.type}`)} />
        <StatsRow stats={STATS} />
        <QuickActionsGrid actions={QUICK_ACTIONS} onNavigate={navigate} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <UpcomingTripsSection
            trips={UPCOMING_TRIPS}
            onTrack={(id) => navigate(`/customer/tracking?booking=${id}`)}
            onViewTicket={(id) => navigate(`/customer/booking/${id}`)}
            onPayNow={(id) => navigate(`/customer/booking/${id}/pay`)}
          />
          <RecentBookingsSection
            bookings={RECENT_BOOKINGS}
            onRate={(id) => navigate(`/customer/reviews?booking=${id}`)}
            onView={(id) => navigate(`/customer/booking/${id}`)}
          />
        </div>
      </div>
    </div>
  );
}
