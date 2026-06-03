import React, { useState, useEffect, useRef } from "react";
import {
  Bus,
  Search,
  Filter,
  Edit3,
  CheckCircle2,
  DollarSign,
  Milestone,
  Layers,
  Coins,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";

// ஆரம்பக்கட்ட மாதிரி தரவு (Local Storage காலியாக இருந்தால் மட்டும் இது பயன்படும்)
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

export default function PricingRulesBuilder() {
  // 1. Local Storage-லிருந்து பஸ் தரவை லோடு செய்தல் (முந்தைய பக்கத்தின் அதே Key)
  const [registeredBuses, setRegisteredBuses] = useState(() => {
    const savedBuses = localStorage.getItem("registeredBuses");
    return savedBuses ? JSON.parse(savedBuses) : initialBuses;
  });

  // UI Control & Filter States
  const [selectedBus, setSelectedBus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [globalMessage, setGlobalMessage] = useState("");

  // 2. Pricing Rules States
  const [baseFare, setBaseFare] = useState("300");
  const [perKmRate, setPerKmRate] = useState("2.5");
  const [premiumSeatSurge, setPremiumSeatSurge] = useState("150");
  const [weekendSurge, setWeekendSurge] = useState("10");

  // Custom filter layout definitions array
  const filterOptions = [
    { value: "All", label: "All Categories" },
    { value: "Seater", label: "Seater Buses" },
    { value: "Sleeper", label: "Sleeper Buses" },
    { value: "Semi Sleeper", label: "Semi Sleeper" },
  ];

  // Custom Filter Dropdown Open/Close State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Outside Click Configuration to close custom filter menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // registeredBuses மாறும்போதெல்லாம் Local Storage-ஐ அப்டேட் செய்தல்
  useEffect(() => {
    localStorage.setItem("registeredBuses", JSON.stringify(registeredBuses));
  }, [registeredBuses]);

  // பஸ்சை தேர்வு செய்யும் போது எடிட் மோடுக்கு மாற்றுதல் + ஏற்கனவே இருக்கும் விலையை லோடு செய்தல்
  const handleSelectBusToPrice = (bus) => {
    setSelectedBus(bus);
    setGlobalMessage("");

    // அந்த பஸ்சிற்கு ஏற்கனவே விலை நிர்ணயம் செய்யப்பட்டிருந்தால் அதை லோடு செய்யும்
    if (bus.pricingRules) {
      setBaseFare(bus.pricingRules.baseFare || "300");
      setPerKmRate(bus.pricingRules.perKmRate || "2.5");
      setPremiumSeatSurge(bus.pricingRules.premiumSeatSurge || "150");
      setWeekendSurge(bus.pricingRules.weekendSurge || "10");
    } else {
      // இல்லையெனில் பஸ் வகைக்கு ஏற்ப டிஃபால்ட் விலையை மாற்றுதல்
      if (bus.seatLayout === "Sleeper") {
        setBaseFare("500");
        setPerKmRate("3.5");
      } else if (bus.seatLayout === "Semi-Sleeper") {
        setBaseFare("400");
        setPerKmRate("3.0");
      } else {
        setBaseFare("300");
        setPerKmRate("2.2");
      }
      setPremiumSeatSurge("150");
      setWeekendSurge("10");
    }
  };

  // விலைப் பட்டியலை அதே Local Storage பஸ் ஆப்ஜெக்ட்டிற்குள் சேமித்தல்
  const handleSavePricingRules = () => {
    const updatedBuses = registeredBuses.map((bus) => {
      if (bus.id === selectedBus.id) {
        return {
          ...bus,
          pricingRules: {
            baseFare,
            perKmRate,
            premiumSeatSurge,
            weekendSurge,
          },
        };
      }
      return bus;
    });

    setRegisteredBuses(updatedBuses);
    setGlobalMessage(
      `Pricing matrix successfully updated for ${selectedBus.regNumber}!`,
    );
    setSelectedBus(null);
  };

  // Search & Filter Engine
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
      {/* GLOBAL NOTIFICATION */}
      {globalMessage && (
        <div className="mb-3 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-2.5 rounded-lg text-xs font-bold animate-fadeIn shrink-0">
          <CheckCircle2 size={14} /> {globalMessage}
        </div>
      )}

      {/* CONDITION 1: பஸ்களின் பட்டியல் (FLEET LIST) */}
      {!selectedBus ? (
        <div className="w-full flex-1 bg-white border border-border rounded-xl p-4 sm:p-5 shadow-sm flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-border+ pb-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 w-9 h-9 flex items-center justify-center rounded-full shadow-sm shrink-0">
                <Coins size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-gray-900">
                  Pricing Rules
                </h2>
              </div>
            </div>
            <span className="self-start sm:self-auto text-[11px] text-gray-500 font-semibold px-2.5 py-1 rounded-md border border-gray-200 bg-gray-50">
              Active Fleets: {filteredBuses.length}
            </span>
          </div>

          {/* SEARCH & FILTER */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4 bg-gray-50 p-2.5 rounded-md border border-border shrink-0">
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

            {/* 🛠️ FIXED: CUSTOM DROPDOWN ENGINE FOR HOVER EFFECTS */}
            <div className="relative min-w-[170px]" ref={dropdownRef}>
              <div
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-between w-full bg-white border border-gray-200 text-xs font-bold text-bodyText pl-8 pr-3 py-2 rounded-md cursor-pointer hover:border-royalBlue transition-all select-none h-[38px]"
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-royalBlue">
                  <Filter size={12} />
                </div>

                <span>
                  {
                    filterOptions.find((opt) => opt.value === selectedFilter)
                      ?.label
                  }
                </span>

                <ChevronDown
                  size={12}
                  className="text-royalBlue shrink-0 transition-transform duration-200"
                />
              </div>

              {/* Dynamic Popup Portal Menu */}
              {isFilterOpen && (
                <div className="absolute top-[105%] left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden py-1 animate-fadeIn">
                  {filterOptions.map((option) => {
                    const isSelected = selectedFilter === option.value;
                    return (
                      <div
                        key={option.value}
                        onClick={() => {
                          setSelectedFilter(option.value);
                          setIsFilterOpen(false);
                        }}
                        className={`px-4 py-2.5 text-xs font-bold cursor-pointer transition-colors
                          ${
                            isSelected
                              ? "bg-royalBlue text-white"
                              : "text-bodyText hover:bg-royalBlue/10 hover:text-royalBlue"
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

          {/* BUS LIST CONTAINER */}
          <div className="flex-1 overflow-y-auto pr-1 pb-2 scrollbar-thin">
            {filteredBuses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredBuses.map((bus) => (
                  <div
                    key={bus.id}
                    className="border border-gray-200 rounded-md p-3.5 hover:shadow-sm transition-all flex justify-between items-center border-l-4 border-l-blue-600 bg-white group"
                  >
                    <div className="space-y-1 max-w-[65%]">
                      <span className="text-[9px] bg-blue-50 text-blue-600 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {bus.seatLayout}
                      </span>
                      <h3 className="text-[12px] leading-[18px] sm:text-sm font-normal text-gray-800 uppercase tracking-tight pt-0.5">
                        {bus.regNumber}
                      </h3>
                      <p className="text-[12px] text-secondaryText font-semibold truncate">
                        {bus.makeModel}
                      </p>

                      {bus.pricingRules?.baseFare && (
                        <p className="text-[10px] text-emerald-600 font-bold truncate">
                          Base: ₹ {bus.pricingRules.baseFare} | KM: ₹{" "}
                          {bus.pricingRules.perKmRate}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleSelectBusToPrice(bus)}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-gray-200 text-royalBlue font-semibold rounded-md text-xs hover:bg-blue-600 hover:text-white transition-all shadow-3xs cursor-pointer shrink-0"
                    >
                      <Edit3 size={11} /> Pricing
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                <p className="text-xs font-bold text-gray-500">
                  No matching fleets found
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* CONDITION 2: எடிட் மோடு (PRICING CONFIG WORKSPACE) */
        <div className="flex-1 flex flex-col overflow-y-auto pb-4 scrollbar-thin gap-3">
          {/* TOP HUB NAVIGATION */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedBus(null)}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition mr-1 sm:hidden"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <span className="text-[9px] bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-md uppercase tracking-wider inline-block">
                  Class: {selectedBus.seatLayout}
                </span>
                <h1 className="text-sm sm:text-base font-black text-bodyText mt-0.5">
                  Pricing Rules :{" "}
                  <span className="text-royalBlue uppercase">
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

          {/* WORKSPACE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start flex-1">
            {/* LEFT PANEL: CORE FARE RULES */}
            <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-bold text-bodyText uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                Base Fare Rules
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* BASE FARE */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-bodyText uppercase tracking-wider flex items-center gap-1">
                    Base Fare
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="e.g., 300"
                      value={baseFare}
                      onChange={(e) => setBaseFare(e.target.value)}
                      className="w-full bg-white border border-border text-xs font-bold p-2.5 pl-7 rounded-md outline-none focus:border-royalBlue transition focus:ring-1 focus:ring-royalBlue focus:ring-offset-[3px] focus:outline-none focus:border-none outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-secondaryText">
                    Minimum price applied to this service.
                  </p>
                </div>

                {/* PER KM RATE */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-bodyText uppercase tracking-wider flex items-center gap-1">
                    Per-KM Rate
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g., 2.5"
                      value={perKmRate}
                      onChange={(e) => setPerKmRate(e.target.value)}
                      className="w-full bg-white border border-border text-xs font-bold p-2.5 pl-7 rounded-md outline-none focus:border-royalBlue transition focus:ring-1 focus:ring-royalBlue focus:ring-offset-[3px] focus:outline-none focus:border-none outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-secondaryText">
                    Charge computed per kilometer traveled.
                  </p>
                </div>
              </div>

              {/* LIVE ESTIMATION CARD (PREVIEW) */}
              <div className="mt-2 bg-blue-50 border border-blue-100 p-3.5 rounded-xl">
                <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Milestone size={12} /> Dynamic Fare Formula Preview
                </h4>
                <p className="text-xs font-medium text-gray-700 leading-relaxed">
                  Ticket Cost ={" "}
                  <span className="font-bold text-gray-900">
                    ₹{baseFare || "0"}
                  </span>{" "}
                  (Base) + (
                  <span className="font-bold text-gray-900">
                    ₹{perKmRate || "0"}
                  </span>{" "}
                  × Distance in Km)
                </p>
              </div>
            </div>

            {/* RIGHT PANEL: DYNAMIC CLASS SURGES */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {/* LAYOUT CLASS SPECIFIC PRICING */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-bodyText uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                  Premium Configuration
                </h3>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-bodyText uppercase tracking-wider">
                    Premium Seat Add-on (Row 1 / Special Seats)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={premiumSeatSurge}
                      onChange={(e) => setPremiumSeatSurge(e.target.value)}
                      className="w-full bg-white border border-border p-2 pl-7 rounded-md text-xs font-bold text-bodyText outline-none focus:royalBlue transition focus:ring-1 focus:ring-royalBlue focus:ring-offset-[3px] focus:outline-none focus:border-none outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* TIMING & DAY SURGE MODIFIER */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-bodyText uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                  Weekend / Holiday Surge
                </h3>

                <div className="space-y-1.5">
                  <label
                    className="block text-[10px] font-bold text-bodyText
                  
                  uppercase tracking-wider"
                  >
                    Weekend Hike Rate (%)
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                      %
                    </span>
                    <input
                      type="number"
                      value={weekendSurge}
                      onChange={(e) => setWeekendSurge(e.target.value)}
                      className="w-full bg-white border border-border p-2 pr-7 rounded-md text-xs font-bold text-bodyText outline-none focus:royalBlue transition focus:ring-1 focus:ring-royalBlue focus:ring-offset-[3px] focus:outline-none focus:border-none outline-none "
                    />
                  </div>
                </div>
              </div>

              {/* SAVE BUTTON */}
              <div className="flex justify-center">
                <button
                  onClick={handleSavePricingRules}
                  className="w-max h-11 bg-blue-600 px-4 text-white hover:bg-blue-700 font-bold text-xs uppercase tracking-wider rounded-md transition shadow-sm flex items-center justify-center gap-2 cursor-pointer lg:mt-auto"
                >
                  <CheckCircle2 size={13} /> Save Pricing Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
