import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  CheckCircle2,
  Calendar,
  Grid,
  Lock,
  Unlock,
  EyeOff,
  ArrowLeft,
  Filter,
  ChevronDown,
} from "lucide-react";

const initialBuses = [
  {
    id: "1",
    regNumber: "TN 45 AB 2233",
    makeModel: "Volvo B11R Multi-Axle",
    seatLayout: "Sleeper",
  },
  {
    id: "2",
    regNumber: "TN 07 CD 5566",
    makeModel: "Scania Metrolink HD",
    seatLayout: "Seater",
  },
  {
    id: "3",
    regNumber: "TN 21 XY 9900",
    makeModel: "Ashok Leyland Oyster",
    seatLayout: "Semi-Sleeper",
  },
  {
    id: "4",
    regNumber: "KA 01 MG 4411",
    makeModel: "Mercedes-Benz Super",
    seatLayout: "Sleeper",
  },
  {
    id: "5",
    regNumber: "MH 12 QQ 8822",
    makeModel: "Eicher Intercity 13.5m",
    seatLayout: "Seater",
  },
];

export default function AvailabilityControl() {
  const [registeredBuses, setRegisteredBuses] = useState(() => {
    const savedBuses = localStorage.getItem("registeredBuses");
    return savedBuses ? JSON.parse(savedBuses) : initialBuses;
  });

  // UI Control States
  const [selectedBus, setSelectedBus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [globalMessage, setGlobalMessage] = useState("");

  const filterOptions = [
    { value: "All", label: "All Categories" },
    { value: "Seater", label: "Seater Buses" },
    { value: "Sleeper", label: "Sleeper Buses" },
    { value: "Semi-Sleeper", label: "Semi Sleeper" },
  ];

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Availability Details
  const [tripStatus, setTripStatus] = useState("Open");
  const [blackoutStartDate, setBlackoutStartDate] = useState("");
  const [blackoutEndDate, setBlackoutEndDate] = useState("");
  const [currentBusSeats, setCurrentBusSeats] = useState([]);

  useEffect(() => {
    localStorage.setItem("registeredBuses", JSON.stringify(registeredBuses));
  }, [registeredBuses]);

  // பஸ்சை தேர்வு செய்யும் போது பஸ் வகைக்கு ஏற்ப சீட்களை உருவாக்குதல்
  const handleSelectBusToControl = (bus) => {
    setSelectedBus(bus);
    setGlobalMessage("");

    if (bus.availabilityRules) {
      setTripStatus(bus.availabilityRules.tripStatus || "Open");
      setBlackoutStartDate(bus.availabilityRules.blackoutStartDate || "");
      setBlackoutEndDate(bus.availabilityRules.blackoutEndDate || "");
      setCurrentBusSeats(bus.availabilityRules.seats || []);
    } else {
      setTripStatus("Open");
      setBlackoutStartDate("");
      setBlackoutEndDate("");

      let generatedSeats = [];
      if (bus.seatLayout === "Sleeper") {
        // Sleeper பஸ்க்கு 12 லோயர் + 12 அப்பர் சீட்டுகள் (2+1 Layout-ல்)
        const decks = ["Lower", "Upper"];
        decks.forEach((deck) => {
          for (let i = 1; i <= 12; i++) {
            const row = Math.ceil(i / 3);
            const col = ((i - 1) % 3) + 1;
            generatedSeats.push({
              id: `${deck[0]}-${i}`,
              label: `${deck[0]}${i}`,
              deck: deck,
              row: row,
              col: col,
              isBlocked: i === 2 && deck === "Lower",
            });
          }
        });
      } else if (bus.seatLayout === "Semi-Sleeper") {
        // Semi-Sleeper-க்கு 2+1 Layout (15 சீட்டுகள்)
        for (let i = 1; i <= 15; i++) {
          const row = Math.ceil(i / 3);
          const col = ((i - 1) % 3) + 1;
          generatedSeats.push({
            id: `S-${i}`,
            label: `S${i}`,
            row: row,
            col: col,
            isBlocked: i % 5 === 0,
          });
        }
      } else {
        // Regular Seater-க்கு 2+2 Layout (20 சீட்டுகள்)
        for (let i = 1; i <= 20; i++) {
          const row = Math.ceil(i / 4);
          const col = ((i - 1) % 4) + 1;
          generatedSeats.push({
            id: `R-${i}`,
            label: `R${i}`,
            row: row,
            col: col,
            isBlocked: i % 6 === 0,
          });
        }
      }
      setCurrentBusSeats(generatedSeats);
    }
  };

  const toggleSeatBlock = (seatId) => {
    if (tripStatus === "Closed") return; // முழு ட்ரிப் பிளாக் செய்யப்பட்டிருந்தால் சீட்களை மாற்ற முடியாது
    setCurrentBusSeats(
      currentBusSeats.map((seat) =>
        seat.id === seatId ? { ...seat, isBlocked: !seat.isBlocked } : seat,
      ),
    );
  };

  const handleSaveAvailability = () => {
    const updatedBuses = registeredBuses.map((bus) => {
      if (bus.id === selectedBus.id) {
        return {
          ...bus,
          availabilityRules: {
            tripStatus,
            blackoutStartDate,
            blackoutEndDate,
            seats: currentBusSeats,
          },
        };
      }
      return bus;
    });

    setRegisteredBuses(updatedBuses);
    setGlobalMessage(
      `Availability & Seat configurations successfully locked for ${selectedBus.regNumber}!`,
    );
    setSelectedBus(null);
  };

  const filteredBuses = registeredBuses.filter((bus) => {
    const matchesSearch = bus.regNumber
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || bus.seatLayout === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full h-screen lg:h-[calc(100vh-150px)] font-sans select-none flex flex-col justify-start overflow-hidden p-3 sm:p-4 bg-gray-50/50">
      {globalMessage && (
        <div className="mb-3 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-2.5 rounded-xl text-xs font-bold animate-fadeIn shrink-0">
          <CheckCircle2 size={14} /> {globalMessage}
        </div>
      )}

      {/* CONDITION 1: FLEET LIST */}
      {!selectedBus ? (
        <div className="w-full flex-1 bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-gray-100 pb-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 w-9 h-9 flex items-center justify-center rounded-full shadow-sm shrink-0">
                <Lock size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-gray-900">
                  Availability Control
                </h2>
              </div>
            </div>
          </div>

          {/* SEARCH & FILTER */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4 bg-gray-50 p-2.5 rounded-lg border border-gray-150 shrink-0">
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search Bus Reg Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-border text-[12px] font-semibold text-bodyText pl-8 pr-3 py-2 rounded-md outline-none focus:border-royalBlue transition uppercase placeholder:normal-case focus:ring-1 focus:ring-royalBlue focus:ring-offset-[3px] focus:outline-none focus:border-none"
              />
            </div>

            <div className="relative min-w-[170px]" ref={dropdownRef}>
              <div
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-between w-full bg-white border border-gray-200 text-xs font-bold text-gray-700 pl-8 pr-3 py-2 rounded-md cursor-pointer hover:border-blue-600 transition-all select-none h-[38px]"
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600">
                  <Filter size={12} />
                </div>
                <span>
                  {
                    filterOptions.find((opt) => opt.value === selectedFilter)
                      ?.label
                  }
                </span>
                <ChevronDown size={12} className="text-blue-600 shrink-0" />
              </div>

              {isFilterOpen && (
                <div className="absolute top-[105%] left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden py-1">
                  {filterOptions.map((option) => {
                    const isSelected = selectedFilter === option.value;
                    return (
                      <div
                        key={option.value}
                        onClick={() => {
                          setSelectedFilter(option.value);
                          setIsFilterOpen(false);
                        }}
                        className={`px-4 py-2.5 text-xs font-bold cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-blue-600/10 hover:text-blue-600"
                        }`}
                      >
                        {option.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* LIST CONTAINER */}
          <div className="flex-1 overflow-y-auto pr-1 pb-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredBuses.map((bus) => (
                <div
                  key={bus.id}
                  className="border border-gray-200 rounded-md p-3.5 flex justify-between items-center border-l-4 border-l-blue-600 bg-white shadow-sm"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] bg-blue-50 text-blue-600 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                      {bus.seatLayout}
                    </span>
                    <h3 className="text-[12px] leading-[18px] sm:text-sm font-bold text-gray-800 uppercase tracking-tight pt-0.5">
                      {bus.regNumber}
                    </h3>
                    <p className="text-[12px] text-gray-500 font-semibold truncate">
                      {bus.makeModel}
                    </p>
                    {bus.availabilityRules?.tripStatus === "Closed" && (
                      <span className="inline-block text-[9px] bg-rose-50 text-rose-600 font-extrabold px-1.5 py-0.5 rounded mt-1">
                        TRIP BLOCKED
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleSelectBusToControl(bus)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 text-blue-600 font-bold rounded-lg text-xs hover:bg-blue-600 hover:text-white transition-all shadow-sm cursor-pointer shrink-0"
                  >
                    Control
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* CONDITION 2: DYNAMIC EDIT MODE */
        <div className="flex-1 flex flex-col overflow-y-auto pb-4 gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedBus(null)}
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition mr-1"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <span className="text-[9px] bg-rose-50 text-rose-600 font-black px-2 py-0.5 rounded-md uppercase tracking-wider inline-block">
                  Type: {selectedBus.seatLayout}
                </span>
                <h1 className="text-sm sm:text-base font-black text-[#111827] mt-0.5">
                  Live Control:{" "}
                  <span className="text-blue-600 uppercase">
                    {selectedBus.regNumber}
                  </span>
                </h1>
              </div>
            </div>
            <button
              onClick={() => setSelectedBus(null)}
              className="text-[11px] font-semibold text-gray-500 hover:text-white transition-all duration-200 cursor-pointer px-2.5 py-1.5 border border-gray-200 bg-white rounded-md hover:bg-blue-600 hover:border-blue-600 flex items-center gap-1 shadow-3xs"
            >
              Back
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start flex-1">
            {/* LEFT PANEL: OPERATION TIMINGS & DATES */}
            <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                <Calendar size={13} className="text-blue-600" /> Service Status
              </h3>

              <div className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-150">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTripStatus("Open")}
                    className={`p-2.5 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                      tripStatus === "Open"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-white text-gray-600 border-gray-200"
                    }`}
                  >
                    <Unlock size={13} /> Active
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripStatus("Closed")}
                    className={`p-2.5 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                      tripStatus === "Closed"
                        ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                        : "bg-white text-gray-600 border-gray-200"
                    }`}
                  >
                    <EyeOff size={13} /> Block Trip
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-500">
                    From Date
                  </span>
                  <input
                    type="date"
                    value={blackoutStartDate}
                    onChange={(e) => setBlackoutStartDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-xs font-bold p-2 rounded-lg outline-none focus:border-blue-600"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-500">
                    To Date
                  </span>
                  <input
                    type="date"
                    value={blackoutEndDate}
                    onChange={(e) => setBlackoutEndDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-xs font-bold p-2 rounded-lg outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: TRUE BUS SEAT LAYOUT MATRIX */}
            <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                <Grid size={13} className="text-blue-600" /> Bus Seat Layout
                Engine
              </h3>

              <div className="flex justify-between items-center bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 text-[11px]">
                <p className="text-gray-600 font-medium">
                  Layout:{" "}
                  <span className="font-bold text-blue-600">
                    {selectedBus.seatLayout}
                  </span>
                </p>
                <div className="flex gap-3 font-bold text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-white border border-gray-300 rounded"></span>{" "}
                    Live
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-rose-100 border border-rose-500 rounded"></span>{" "}
                    Blocked
                  </span>
                </div>
              </div>

              {/* முடக்கப்பட்ட ட்ரிப் என்றால் சீட் மேப் டிஸேபிள் ஆகும் */}
              <div
                className={`w-full transition-all duration-300 ${tripStatus === "Closed" ? "opacity-30 pointer-events-none" : ""}`}
              >
                {/* 1. SLEEPER BUS LAYOUT (Lower & Upper Decks side-by-side) */}
                {selectedBus.seatLayout === "Sleeper" && (
                  <div className="flex flex-col md:flex-row gap-6 justify-center items-start my-3 bg-gray-100 p-4 rounded-2xl border border-gray-200 max-w-2xl mx-auto">
                    {/* Lower Deck */}
                    <div className="w-full">
                      <h4 className="text-[11px] font-black text-center text-gray-500 mb-2 uppercase tracking-wider">
                        Lower Deck (2+1)
                      </h4>
                      <div className="grid grid-cols-3 gap-2 border-r-2 border-dashed border-gray-300 pr-2">
                        {currentBusSeats
                          .filter((s) => s.deck === "Lower")
                          .map((seat) => (
                            <button
                              key={seat.id}
                              type="button"
                              onClick={() => toggleSeatBlock(seat.id)}
                              className={`p-2.5 border-2 font-bold text-xs rounded-lg transition-all flex flex-col items-center justify-center min-h-[55px] ${
                                seat.isBlocked
                                  ? "bg-rose-50 border-rose-500 text-rose-600 shadow-sm"
                                  : "bg-white border-gray-200 text-gray-700 hover:border-blue-600"
                              } ${seat.col === 2 ? "mr-4" : ""}`} // Aisle Space after 2nd column
                            >
                              <span>{seat.label}</span>
                              <span className="text-[8px] opacity-60 font-medium">
                                {seat.isBlocked ? "Locked" : "Sleeper"}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>

                    {/* Upper Deck */}
                    <div className="w-full">
                      <h4 className="text-[11px] font-black text-center text-gray-500 mb-2 uppercase tracking-wider">
                        Upper Deck (2+1)
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {currentBusSeats
                          .filter((s) => s.deck === "Upper")
                          .map((seat) => (
                            <button
                              key={seat.id}
                              type="button"
                              onClick={() => toggleSeatBlock(seat.id)}
                              className={`p-2.5 border-2 font-bold text-xs rounded-lg transition-all flex flex-col items-center justify-center min-h-[55px] ${
                                seat.isBlocked
                                  ? "bg-rose-50 border-rose-500 text-rose-600 shadow-sm"
                                  : "bg-white border-gray-200 text-gray-700 hover:border-blue-600"
                              } ${seat.col === 2 ? "mr-4" : ""}`}
                            >
                              <span>{seat.label}</span>
                              <span className="text-[8px] opacity-60 font-medium">
                                {seat.isBlocked ? "Locked" : "Sleeper"}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. SEMI-SLEEPER LAYOUT (2+1 Seating Configuration) */}
                {selectedBus.seatLayout === "Semi-Sleeper" && (
                  <div className="bg-gray-100 border border-gray-200 rounded-2xl p-4 grid grid-cols-3 gap-2 max-w-xs mx-auto my-3">
                    <div className="col-span-3 text-center text-[10px] text-gray-400 font-bold border-b pb-1 mb-2 uppercase">
                      Front / Driver ➔
                    </div>
                    {currentBusSeats.map((seat) => (
                      <button
                        key={seat.id}
                        type="button"
                        onClick={() => toggleSeatBlock(seat.id)}
                        className={`p-3 border-2 font-bold text-xs rounded-xl transition-all ${
                          seat.isBlocked
                            ? "bg-rose-50 border-rose-500 text-rose-600 shadow-sm"
                            : "bg-white border-gray-200 text-gray-700 hover:border-blue-600"
                        } ${seat.col === 2 ? "mr-5" : ""}`} // Creates 2+1 walkway space
                      >
                        {seat.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* 3. SEATER LAYOUT (2+2 Seating Configuration) */}
                {selectedBus.seatLayout === "Seater" && (
                  <div className="bg-gray-100 border border-gray-200 rounded-2xl p-4 grid grid-cols-4 gap-2 max-w-sm mx-auto my-3">
                    <div className="col-span-4 text-center text-[10px] text-gray-400 font-bold border-b pb-1 mb-2 uppercase">
                      Front / Driver ➔
                    </div>
                    {currentBusSeats.map((seat) => (
                      <button
                        key={seat.id}
                        type="button"
                        onClick={() => toggleSeatBlock(seat.id)}
                        className={`p-3 border-2 font-bold text-xs rounded-xl transition-all ${
                          seat.isBlocked
                            ? "bg-rose-50 border-rose-500 text-rose-600 shadow-sm"
                            : "bg-white border-gray-200 text-gray-700 hover:border-blue-600"
                        } ${seat.col === 2 ? "mr-6" : ""}`} // Creates 2+2 middle walkway space
                      >
                        {seat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {tripStatus === "Closed" && (
                <p className="text-center text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 py-2 rounded-xl max-w-xs mx-auto">
                  ⚠️ Entire trip blocked. Individual seats locked!
                </p>
              )}

              <div className="flex justify-center border-t pt-3 mt-2">
                <button
                  type="button"
                  onClick={handleSaveAvailability}
                  className="w-full sm:w-auto px-6 h-11 bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  Apply & Save Block Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
