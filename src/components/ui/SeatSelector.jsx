// TransitHub — SeatSelector.jsx
// Interactive seat map for bus bookings. Supports 2+1 and 2+2 layouts.
// BRS Spec: CP-VB-04 Seat Selector (Bus).
//
// Usage:
//   <SeatSelector
//     layout="2+2"
//     totalSeats={40}
//     bookedSeats={[3, 8, 15, 22]}
//     selectedSeats={selected}
//     maxSelect={3}
//     onSelect={setSelected}
//   />

import React from "react";

const SEAT_STATES = {
  available: {
    bg: "bg-white border-border hover:border-yellow hover:bg-yellow-light cursor-pointer",
    text: "text-ink",
  },
  selected: {
    bg: "bg-yellow border-yellow-dark cursor-pointer",
    text: "text-ink font-semibold",
  },
  booked: {
    bg: "bg-[#F2F2F2] border-border cursor-not-allowed",
    text: "text-[#BDBDBD]",
  },
};

export default function SeatSelector({
  layout = "2+2",       // "2+1" | "2+2"
  totalSeats = 40,
  bookedSeats = [],
  selectedSeats = [],
  maxSelect = 5,
  onSelect,
  className = "",
}) {
  const colsPerRow = layout === "2+1" ? 3 : 4;
  const rows = Math.ceil(totalSeats / colsPerRow);

  const handleClick = (seatNo) => {
    if (bookedSeats.includes(seatNo)) return;
    if (selectedSeats.includes(seatNo)) {
      onSelect?.(selectedSeats.filter((s) => s !== seatNo));
    } else if (selectedSeats.length < maxSelect) {
      onSelect?.([...selectedSeats, seatNo]);
    }
  };

  const getState = (seatNo) => {
    if (bookedSeats.includes(seatNo)) return "booked";
    if (selectedSeats.includes(seatNo)) return "selected";
    return "available";
  };

  return (
    <div className={className}>
      {/* Deck label */}
      <p className="text-xs font-semibold text-ink-muted text-center mb-3 uppercase tracking-wide">
        Select Seat ({selectedSeats.length}/{maxSelect} selected)
      </p>

      {/* Seat grid */}
      <div className="flex flex-col gap-1.5 items-center">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={rowIdx} className="flex gap-1.5 items-center">
            {Array.from({ length: colsPerRow }).map((_, colIdx) => {
              // Insert aisle gap for 2+1 after col 1, for 2+2 after col 1
              const isAisle =
                (layout === "2+1" && colIdx === 1) ||
                (layout === "2+2" && colIdx === 1);

              const seatNo = rowIdx * colsPerRow + colIdx + 1;
              if (seatNo > totalSeats) return <div key={colIdx} className="w-8" />;

              const state = getState(seatNo);
              const { bg, text } = SEAT_STATES[state];

              return (
                <React.Fragment key={colIdx}>
                  <button
                    onClick={() => handleClick(seatNo)}
                    disabled={state === "booked"}
                    aria-label={`Seat ${seatNo} — ${state}`}
                    aria-pressed={state === "selected"}
                    className={[
                      "w-8 h-8 rounded border-[1.5px] flex items-center justify-center text-[10px] transition-all duration-100",
                      bg,
                      text,
                    ].join(" ")}
                  >
                    {seatNo}
                  </button>
                  {isAisle && (
                    <div className="w-4" aria-hidden="true" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4">
        {[
          { label: "Available", bg: "bg-white border border-border" },
          { label: "Selected",  bg: "bg-yellow border border-yellow-dark" },
          { label: "Booked",    bg: "bg-[#F2F2F2] border border-border" },
        ].map(({ label, bg }) => (
          <span key={label} className="flex items-center gap-1.5 text-xs text-ink-muted">
            <span className={`w-3 h-3 rounded ${bg} inline-block`} aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
