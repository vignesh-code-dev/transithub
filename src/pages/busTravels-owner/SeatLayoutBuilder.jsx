import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Armchair,
  Columns,
  Edit3,
  CheckCircle,
  Bus,
  Search,
  Filter,
  LifeBuoy,
  ChevronDown,
} from "lucide-react";

export default function LuxurySeatLayoutBuilder() {
  const location = useLocation();

  // 1. LocalStorage Fleet Fetching
  const [registeredBuses, setRegisteredBuses] = useState(() => {
    const savedBuses = localStorage.getItem("registeredBuses");
    if (savedBuses) {
      return JSON.parse(savedBuses);
    }
    return [
      {
        id: "1",
        regNumber: "TN 45 AB 2233",
        makeModel: "Volvo B11R Multi-Axle",
        seatLayout: "Sleeper",
        totalRows: 6,
        config: "2+1",
      },
      {
        id: "2",
        regNumber: "TN 07 CD 5566",
        makeModel: "Scania Metrolink HD",
        seatLayout: "Seater",
        totalRows: 7,
        config: "2+2",
      },
      {
        id: "3",
        regNumber: "TN 21 XY 9900",
        makeModel: "Ashok Leyland Oyster",
        seatLayout: "Semi-Sleeper",
        totalRows: 5,
        config: "2+2",
      },
    ];
  });

  // UI Control States
  const [selectedBus, setSelectedBus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Custom Filter Dropdown Open/Close State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Builder States
  const [activeDeck, setActiveDeck] = useState("Lower");
  const [rows, setRows] = useState(6);
  const [configuration, setConfiguration] = useState("2+2");
  const [seats, setSeats] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [globalMessage, setGlobalMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

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

  // ⚡ 2. Automatic State Selection Logic from Navigation State
  useEffect(() => {
    if (location.state && location.state.busData) {
      const redirectedBus = location.state.busData;

      const findBus = registeredBuses.find(
        (b) =>
          b.regNumber === redirectedBus.regNumber || b.id === redirectedBus.id,
      );

      if (findBus) {
        handleSelectBusToEdit(findBus);
      } else {
        const freshBus = {
          ...redirectedBus,
          id: redirectedBus.id || Date.now().toString(),
          totalRows: redirectedBus.totalRows || 6,
          config:
            redirectedBus.config ||
            (redirectedBus.seatLayout === "Sleeper" ? "2+1" : "2+2"),
        };
        setSelectedBus(freshBus);
        setRows(freshBus.totalRows);
        setConfiguration(freshBus.config);
        setSeats(freshBus.seatsData || []);
      }
    }
  }, [location.state, registeredBuses]);

  const handleSelectBusToEdit = (bus) => {
    setSelectedBus(bus);
    setRows(bus.totalRows || 6);
    setConfiguration(
      bus.config || (bus.seatLayout === "Sleeper" ? "2+1" : "2+2"),
    );
    setSeats(bus.seatsData || []);
    setActiveDeck("Lower"); // Reset to lower deck on new selection
    setGlobalMessage("");
  };

  // Dynamic Layout Generator
  const generateLayout = () => {
    if (!selectedBus) return;

    // If matching seat configuration already exists, do not overwrite it completely
    if (
      selectedBus.seatsData &&
      selectedBus.seatsData.length > 0 &&
      selectedBus.totalRows === rows &&
      selectedBus.config === configuration
    ) {
      setSeats(selectedBus.seatsData);
      return;
    }

    let newSeats = [];
    const decks =
      selectedBus.seatLayout === "Sleeper" ? ["Lower", "Upper"] : ["Lower"];
    const totalCols = configuration === "2+2" ? 4 : 3;

    decks.forEach((deck) => {
      let seatCounter = 1;
      for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= totalCols; c++) {
          newSeats.push({
            id: `${selectedBus.id}-${deck}-R${r}C${c}`,
            deck: deck,
            row: r,
            col: c,
            seatNumber: `${deck === "Upper" ? "U" : "L"}-${seatCounter++}`,
            isActive: true,
            isPremium: r === 1,
          });
        }
      }
    });
    setSeats(newSeats);
  };

  useEffect(() => {
    if (selectedBus) {
      generateLayout();
    }
  }, [rows, configuration, selectedBus?.id]);

  const toggleSeatStatus = (id) => {
    setSeats((prev) =>
      prev.map((seat) =>
        seat.id === id ? { ...seat, isActive: !seat.isActive } : seat,
      ),
    );
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  // 💾 3. Save Layout Handler
  const handleUpdateLayout = () => {
    setIsSaving(true);
    setTimeout(() => {
      const updatedList = registeredBuses.map((b) =>
        b.id === selectedBus.id
          ? { ...b, totalRows: rows, config: configuration, seatsData: seats }
          : b,
      );

      localStorage.setItem("registeredBuses", JSON.stringify(updatedList));
      setRegisteredBuses(updatedList);

      setIsSaving(false);
      setGlobalMessage(
        `Layout updated and saved successfully for ${selectedBus.regNumber}!`,
      );
      setSelectedBus(null);
    }, 1200);
  };

  // SEARCH & FILTER ENGINE
  const filteredBuses = registeredBuses.filter((bus) => {
    const matchesSearch = bus.regNumber
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || bus.seatLayout === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate dynamic tracking layouts based on selected configuration matrix style
  const colsInRow =
    configuration === "2+2" ? [1, 2, "aisle", 3, 4] : [1, 2, "aisle", 3];

  const currentDeckSeats = seats.filter((s) => s.deck === activeDeck);

  // Custom filter layout definitions array
  const filterOptions = [
    { value: "All", label: "All Categories" },
    { value: "Seater", label: "Seater Buses" },
    { value: "Sleeper", label: "Sleeper Buses" },
    { value: "Semi-Sleeper", label: "Semi-Sleeper" },
  ];

  return (
    <div className="w-full h-screen lg:h-[calc(100vh-150px)] font-sans select-none flex flex-col justify-start overflow-hidden p-3 sm:p-4 bg-gray-50/50">
      {/* GLOBAL NOTIFICATION */}
      {globalMessage && (
        <div className="mb-3 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-2.5 rounded-xl text-xs font-bold animate-fadeIn shrink-0">
          <CheckCircle size={14} /> {globalMessage}
        </div>
      )}

      {/* FLEET REGISTRY */}
      {!selectedBus ? (
        <div className="w-full flex-1 bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-gray-100 pb-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 w-9 h-9 flex items-center justify-center rounded-full shadow-xs shrink-0">
                <Bus size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-gray-900">
                  Seat Layout Builder
                </h2>
              </div>
            </div>
            <span className="self-start sm:self-auto text-[11px] text-gray-500 font-semibold px-2.5 py-1 rounded-md border border-gray-200 bg-gray-50">
              Total Fleets: {filteredBuses.length}
            </span>
          </div>

          {/* SEARCH & FILTER */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4 bg-gray-50 p-2.5 rounded-xl border border-gray-150 shrink-0">
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

            {/* CUSTOM DROPDOWN ENGINE FOR HOVER EFFECTS */}
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

                <ChevronDown
                  size={12}
                  className="text-blue-600 shrink-0 transition-transform duration-200"
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

          {/* FLEET CARDS CONTAINER */}
          <div className="flex-1 overflow-y-auto pr-1 pb-2 scrollbar-thin">
            {filteredBuses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredBuses.map((bus) => (
                  <div
                    key={bus.id}
                    className="border border-gray-200 rounded-md p-3.5 hover:shadow-xs transition-all flex justify-between items-center border-l-4 border-l-blue-600 bg-white group"
                  >
                    <div className="space-y-1 max-w-[65%]">
                      <span className="text-[9px] bg-blue-600/10 text-blue-600 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {bus.seatLayout}
                      </span>
                      <h3 className="text-[12px] leading-[18px] sm:text-sm font-normal text-gray-800 uppercase tracking-tight pt-0.5">
                        {bus.regNumber}
                      </h3>
                      <p className="text-[12px] text-secondaryText font-semibold truncate">
                        {bus.makeModel}
                      </p>
                      <div className="text-[10px] text-secondaryText font-semibold">
                        Rows:{" "}
                        <span className="text-bodyText font-bold">
                          {bus.totalRows || 6}
                        </span>{" "}
                        | Seat map:{" "}
                        <span className="text-bodyText font-bold">
                          {bus.config || "2+2"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectBusToEdit(bus)}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-border text-royalBlue font-semibold rounded-md text-xs hover:bg-blue-600 hover:text-white transition-all shadow-3xs cursor-pointer shrink-0"
                    >
                      <Edit3 size={11} /> Config
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
        /* EDIT MODE */
        <div className="flex-1 flex flex-col overflow-y-auto pb-4 scrollbar-thin gap-3">
          {/* TOP HUB NAVIGATION */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-lg border border-gray-200 shadow-xs shrink-0">
            <div>
              <h1 className="text-sm sm:text-base font-black text-[#111827] mt-0.5">
                Modifying:{" "}
                <span className="text-blue-600 uppercase">
                  {selectedBus.regNumber}
                </span>{" "}
                <span className="text-gray-500 font-semibold text-sm">
                  ({selectedBus.seatLayout})
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
              {/* Dynamic Multideck Selector Trigger */}
              {selectedBus.seatLayout === "Sleeper" && (
                <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                  {["Lower", "Upper"].map((deck) => (
                    <button
                      key={deck}
                      type="button"
                      onClick={() => setActiveDeck(deck)}
                      className={`px-4 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                        activeDeck === deck
                          ? "bg-white text-blue-600 shadow-xs font-extrabold"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      {deck} Deck
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => setSelectedBus(null)}
                className="text-[11px] font-semibold text-gray-500 hover:text-white transition-all duration-200 cursor-pointer px-2.5 py-1.5 border border-gray-200 bg-white rounded-md hover:bg-blue-600 hover:border-blue-600 flex items-center gap-1 shadow-3xs"
              >
                Back
              </button>
            </div>
          </div>

          {/* EDITING WORKSPACE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start flex-1">
            {/* LEFT CONTROL PANEL */}
            <div className="lg:col-span-4 space-y-3">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-3.5">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                  <Columns size={12} className="text-blue-600" /> Layout
                  Parameters
                </h3>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">
                    Grid Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["2+2", "2+1"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setConfiguration(type)}
                        className={`py-1.5 px-2.5 border rounded-xl text-xs font-bold transition-all ${
                          configuration === type
                            ? "border-blue-600 bg-blue-600/5 text-blue-600 font-extrabold"
                            : "border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {type} Matrix
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Total Rows
                    </label>
                    <span className="text-[11px] font-black text-blue-600 bg-blue-600/5 px-2 py-0.5 rounded">
                      {rows} Rows
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="12"
                    value={rows}
                    onChange={(e) => setRows(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>

              <button
                onClick={handleUpdateLayout}
                disabled={isSaving}
                className="w-full h-10 bg-blue-600 text-white hover:bg-blue-600/90 font-bold text-sm tracking-wider rounded-md transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-300"
              >
                {isSaving ? "Updating Layout..." : "Update Layout"}
              </button>
            </div>

            {/* RIGHT PANEL: VISUAL BUS CANVAS */}
            <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col justify-center items-center overflow-x-auto min-h-[400px]">
              <div className="mb-2 text-xs font-bold text-blue-600 tracking-wide uppercase bg-blue-600/5 px-3 py-1 rounded-full">
                Viewing:{" "}
                {selectedBus.seatLayout === "Sleeper"
                  ? `${activeDeck} Deck`
                  : "Single Deck Layout"}
              </div>

              <div className="flex flex-col bg-white border-4 border-gray-400 rounded-3xl p-3 sm:p-4 shadow-sm min-w-[280px] max-w-[320px] relative">
                {/* FRONT CABIN */}
                <div className="w-full border-b-2 border-dashed border-gray-300 pb-2.5 mb-3 flex items-center justify-between px-1 shrink-0">
                  <div className="w-9 h-5 bg-emerald-500 rounded text-[8px] font-black text-white flex items-center justify-center shadow-2xs">
                    IN
                  </div>
                  <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                    Front / Cabin ({activeDeck[0]})
                  </div>
                  <div className="w-7 h-7 border border-gray-300 rounded-full flex items-center justify-center text-xs shadow-inner bg-gray-50">
                    <LifeBuoy size={14} className="text-gray-400" />
                  </div>
                </div>

                {/* 💺 VERTICAL SEAT ROWS GRID */}
                <div className="flex flex-col gap-2.5 w-full">
                  {Array.from({ length: rows }).map((_, rIdx) => {
                    const r = rIdx + 1;
                    return (
                      <div
                        key={r}
                        className="flex justify-between items-center gap-1 w-full px-0.5"
                      >
                        {colsInRow.map((colKey, cIdx) => {
                          if (colKey === "aisle") {
                            return (
                              <div
                                key={`aisle-${cIdx}`}
                                className="w-6 text-center text-[8px] font-black text-gray-300 uppercase tracking-tighter"
                              >
                                Aisle
                              </div>
                            );
                          }

                          // Target exact deck space records specifically
                          const seat = currentDeckSeats.find(
                            (s) => s.row === r && s.col === colKey,
                          );

                          if (!seat)
                            return (
                              <div
                                key={`empty-${cIdx}`}
                                className="w-10 h-10"
                              />
                            );

                          let seatStyle =
                            "bg-white border-blue-600 text-blue-600 hover:bg-blue-600/5";
                          if (!seat.isActive)
                            seatStyle =
                              "bg-gray-100 border-gray-200 text-gray-300 opacity-50";
                          else if (seat.isPremium)
                            seatStyle =
                              "bg-amber-500/10 border-amber-500 text-amber-600 font-bold";

                          const isSleeperLayout =
                            selectedBus.seatLayout === "Sleeper";

                          return (
                            <div
                              key={seat.id}
                              onMouseDown={() => {
                                setIsDragging(true);
                                toggleSeatStatus(seat.id);
                              }}
                              onMouseEnter={() =>
                                isDragging && toggleSeatStatus(seat.id)
                              }
                              onTouchStart={() => toggleSeatStatus(seat.id)}
                              className={`w-10 rounded-lg border flex flex-col items-center justify-center gap-0.5 transition-all relative cursor-pointer shadow-3xs select-none ${
                                isSleeperLayout ? "h-14 bg-blue-50/20" : "h-10"
                              } ${seatStyle}`}
                            >
                              <Armchair
                                size={12}
                                className={
                                  isSleeperLayout
                                    ? "rotate-90 transform text-blue-500"
                                    : ""
                                }
                              />
                              <span className="text-[7.5px] block font-mono font-bold uppercase leading-none">
                                {seat.seatNumber}
                              </span>
                              {!seat.isActive && (
                                <span className="absolute inset-0 flex items-center justify-center text-rose-500 font-bold text-xs bg-white/10 rounded-lg">
                                  ✕
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* REAR END */}
                <div className="w-full pt-3 mt-3 border-t border-gray-100 text-center text-[8px] font-bold text-gray-300 uppercase tracking-widest">
                  Rear End
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
