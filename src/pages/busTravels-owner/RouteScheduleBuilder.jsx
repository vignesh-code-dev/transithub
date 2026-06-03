import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Clock,
  MapPinPlusInside,
  Trash2,
  Plus,
  CheckCircle2,
  Bus,
  Search,
  Map,
  Calendar,
  Route,
  Filter,
  ChevronDown,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapController({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length > 0) {
      const validCoords = coords.filter((c) => !isNaN(c[0]) && !isNaN(c[1]));
      if (validCoords.length > 0) {
        const bounds = L.latLngBounds(validCoords);
        map.fitBounds(bounds, { padding: [30, 30], maxZoom: 13 });
      }
    }
  }, [coords, map]);
  return null;
}

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
];

const availableDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function RouteScheduleBuilder() {
  const [registeredBuses, setRegisteredBuses] = useState(() => {
    const savedBuses = localStorage.getItem("registeredBuses");
    return savedBuses ? JSON.parse(savedBuses) : initialBuses;
  });

  const [selectedBus, setSelectedBus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [globalMessage, setGlobalMessage] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

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

  const [routeCode, setRouteCode] = useState("");
  const [routeName, setRouteName] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const [originDeparture, setOriginDeparture] = useState("");
  const [destinationArrival, setDestinationArrival] = useState("");
  const [selectedDays, setSelectedDays] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);

  const [stops, setStops] = useState([]);
  const [roadGeometry, setRoadGeometry] = useState([]);
  const [loadingMap, setLoadingMap] = useState(false);

  useEffect(() => {
    localStorage.setItem("registeredBuses", JSON.stringify(registeredBuses));
  }, [registeredBuses]);

  const fetchRealRoadRoute = async (currentStops) => {
    const geocodedStops = currentStops.filter((s) => s.isGeocoded);
    if (geocodedStops.length < 2) {
      setRoadGeometry([]);
      return;
    }

    setLoadingMap(true);
    try {
      const coordString = geocodedStops
        .map((s) => `${s.lng},${s.lat}`)
        .join(";");
      const url = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.code === "Ok" && data.routes.length > 0) {
        const route = data.routes[0];
        const flippedGeometry = route.geometry.coordinates.map((coord) => [
          coord[1],
          coord[0],
        ]);
        setRoadGeometry(flippedGeometry);

        const totalDistanceKm = (route.distance / 1000).toFixed(1);
        setDistance(`${totalDistanceKm} km`);

        const hours = Math.floor(route.duration / 3600);
        const minutes = Math.round((route.duration % 3600) / 60);
        setDuration(`${hours} hrs ${minutes} mins`);
      }
    } catch (err) {
      console.error("Error fetching road route:", err);
    } finally {
      setLoadingMap(false);
    }
  };

  const handleSelectBusToConfig = (bus) => {
    setSelectedBus(bus);
    setGlobalMessage("");

    setRouteCode(bus.routeSchedule?.routeCode || "");
    setRouteName(bus.routeSchedule?.routeName || "");
    setOrigin(bus.routeSchedule?.origin || "");
    setDestination(bus.routeSchedule?.destination || "");
    setDistance(bus.routeSchedule?.distance || "");
    setDuration(bus.routeSchedule?.duration || "");
    setOriginDeparture(bus.routeSchedule?.originDeparture || "");
    setDestinationArrival(bus.routeSchedule?.destinationArrival || "");
    setSelectedDays(
      bus.routeSchedule?.selectedDays || [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ],
    );

    const savedStops = bus.routeSchedule?.stops || [];
    setStops(savedStops);

    if (savedStops.length > 1) {
      fetchRealRoadRoute(savedStops);
    }
  };

  const geocodeAddress = async (addressName) => {
    if (!addressName.trim()) return null;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressName)}&limit=1`,
      );
      const data = await response.json();
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
    return null;
  };

  const handleOriginBlur = async (val) => {
    if (!val.trim()) return;
    setLoadingMap(true);
    const coords = await geocodeAddress(val);

    let updatedStops = [...stops];
    if (updatedStops.length === 0) {
      updatedStops.push({
        id: Date.now(),
        name: val,
        type: "Origin",
        arrival: "-",
        departure: originDeparture,
        lat: coords?.lat || 13.0827,
        lng: coords?.lng || 80.2707,
        isGeocoded: !!coords,
      });
    } else {
      updatedStops[0] = {
        ...updatedStops[0],
        name: val,
        type: "Origin",
        departure: originDeparture,
        lat: coords?.lat || updatedStops[0].lat,
        lng: coords?.lng || updatedStops[0].lng,
        isGeocoded: !!coords,
      };
    }
    realignStopTypes(updatedStops);
  };

  const handleDestinationBlur = async (val) => {
    if (!val.trim()) return;
    setLoadingMap(true);
    const coords = await geocodeAddress(val);

    let updatedStops = [...stops];
    if (updatedStops.length <= 1) {
      updatedStops.push({
        id: Date.now() + 1,
        name: val,
        type: "Destination",
        arrival: destinationArrival,
        departure: "-",
        lat: coords?.lat || 13.0827,
        lng: coords?.lng || 80.2707,
        isGeocoded: !!coords,
      });
    } else {
      const lastIdx = updatedStops.length - 1;
      updatedStops[lastIdx] = {
        ...updatedStops[lastIdx],
        name: val,
        type: "Destination",
        arrival: destinationArrival,
        lat: coords?.lat || updatedStops[lastIdx].lat,
        lng: coords?.lng || updatedStops[lastIdx].lng,
        isGeocoded: !!coords,
      };
    }
    realignStopTypes(updatedStops);
  };

  const handleAddStopAtRow = (index) => {
    const updatedStops = [...stops];
    const newStop = {
      id: Date.now() + Math.random(),
      name: "",
      type: "Intermediate",
      arrival: "",
      departure: "",
      lat: 13.0827,
      lng: 80.2707,
      isGeocoded: false,
    };

    if (index === undefined) {
      updatedStops.push(newStop);
    } else {
      updatedStops.splice(index + 1, 0, newStop);
    }
    realignStopTypes(updatedStops);
  };

  const handleRemoveStop = (id) => {
    const filtered = stops.filter((stop) => stop.id !== id);
    realignStopTypes(filtered);
  };

  const realignStopTypes = (currentStops) => {
    const updated = currentStops.map((stop, idx) => {
      if (idx === 0) {
        return {
          ...stop,
          type: "Origin",
          arrival: "-",
          departure: originDeparture,
        };
      }
      if (idx === currentStops.length - 1) {
        return {
          ...stop,
          type: "Destination",
          arrival: destinationArrival,
          departure: "-",
        };
      }
      return { ...stop, type: "Intermediate" };
    });
    setStops(updated);

    if (updated.length > 0) setOrigin(updated[0].name);
    if (updated.length > 1) setDestination(updated[updated.length - 1].name);

    fetchRealRoadRoute(updated);
  };

  const handleStopBlur = async (id, stopName) => {
    if (!stopName.trim()) return;

    setLoadingMap(true);
    const coords = await geocodeAddress(stopName);
    if (coords) {
      const updatedStops = stops.map((stop) =>
        stop.id === id
          ? {
              ...stop,
              name: stopName,
              lat: coords.lat,
              lng: coords.lng,
              isGeocoded: true,
            }
          : stop,
      );

      setStops(updatedStops);
      if (updatedStops[0]?.id === id) setOrigin(stopName);
      if (updatedStops[updatedStops.length - 1]?.id === id)
        setDestination(stopName);

      fetchRealRoadRoute(updatedStops);
    } else {
      setLoadingMap(false);
    }
  };

  const handleStopChange = (id, field, value) => {
    const updated = stops.map((stop) =>
      stop.id === id ? { ...stop, [field]: value } : stop,
    );
    setStops(updated);

    if (updated[0]?.id === id && field === "departure")
      setOriginDeparture(value);
    if (updated[updated.length - 1]?.id === id && field === "arrival")
      setDestinationArrival(value);
  };

  const handleTopTimingChange = (type, value) => {
    if (type === "origin_dep") {
      setOriginDeparture(value);
      if (stops.length > 0) {
        setStops(
          stops.map((s, idx) => (idx === 0 ? { ...s, departure: value } : s)),
        );
      }
    } else if (type === "dest_arr") {
      setDestinationArrival(value);
      if (stops.length > 1) {
        setStops(
          stops.map((s, idx) =>
            idx === stops.length - 1 ? { ...s, arrival: value } : s,
          ),
        );
      }
    }
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSaveRouteSchedule = () => {
    if (!origin.trim() || !destination.trim()) {
      alert("Please fill both Origin and Destination hubs before saving.");
      return;
    }

    const updatedBuses = registeredBuses.map((bus) => {
      if (bus.id === selectedBus.id) {
        return {
          ...bus,
          routeSchedule: {
            routeCode,
            routeName,
            origin,
            destination,
            distance,
            duration,
            originDeparture,
            destinationArrival,
            selectedDays,
            stops,
          },
        };
      }
      return bus;
    });
    setRegisteredBuses(updatedBuses);
    setGlobalMessage(
      `Route mapped successfully for ${selectedBus.regNumber.toUpperCase()}!`,
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
  const activeMarkers = stops.filter((stop) => stop.isGeocoded);

  return (
    <div className="w-full h-screen lg:h-[calc(100vh-150px)] bg-primaryBg text-gray-800 p-4 sm:p-5 flex flex-col justify-between">
      {globalMessage && (
        <div className="max-w-7xl mx-auto w-full mb-3 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-2xs">
          <CheckCircle2 size={16} /> {globalMessage}
        </div>
      )}

      {!selectedBus ? (
        /* FLEET LIST VIEW */
        <div className="max-w-7xl mx-auto w-full bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex-1">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-5 border-b border-gray-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 w-10 h-10 flex items-center justify-center rounded-full shadow-md">
                <Bus size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-950">
                  GPS Route Fleet Map Builder
                </h2>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mb-5 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search Bus Registration Number..."
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBuses.map((bus) => (
              <div
                key={bus.id}
                className="border border-gray-200 rounded-md p-4 flex justify-between items-center bg-white border-l-4 border-l-blue-600 shadow-3xs"
              >
                <div>
                 <h3 className="text-[12px] leading-[18px] sm:text-sm font-normal text-gray-800 uppercase tracking-tight pt-0.5">
                        {bus.regNumber}
                      </h3>
                   <p className="text-[12px] text-secondaryText font-semibold truncate">{bus.makeModel}</p>
                  {bus.routeSchedule?.origin && (
                    <div className="pt-1 space-y-0.5">
                      <p className="text-[11px] text-emerald-600 font-semibold">
                        Route: {bus.routeSchedule.origin} ➔{" "}
                        {bus.routeSchedule.destination}
                      </p>
                      {bus.routeSchedule.selectedDays && (
                        <p className="text-[10px] text-secondaryText font-medium">
                          Days: {bus.routeSchedule.selectedDays.join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleSelectBusToConfig(bus)}
                 className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-gray-200 text-royalBlue font-semibold rounded-md text-xs hover:bg-blue-600 hover:text-white transition-all shadow-3xs cursor-pointer shrink-0"
                >
                  Setup Route
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* SINGLE PAGE DASHBOARD ROW (EDIT MODE) */
        <div className="max-w-7xl mx-auto w-full text-sans flex-1 flex flex-col justify-between space-y-4">
          {/* Header Title Grid Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-200 pb-2">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 w-10 h-10 flex items-center justify-center rounded-full shadow-md">
                <Route size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-[24px] leading-[32px] text-heading font-bold text-bodyText">
                  Routes & Schedule <span className="text-royalBlue">({selectedBus.regNumber.toUpperCase()})</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
            {/* LEFT COMPONENT COLUMN (FORM INPUTS & TIMELINE) */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              {/* SECTION 1: ROUTE HUB INFORMATION */}
              <div className="bg-white border border-border rounded-lg p-4 shadow-3xs space-y-3">
                <h2 className="text-[16px] leading-[24px] font-semibold text-bodyText  uppercase tracking-wider">
                  Route Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2 p-2.5 bg-gray-50/50 border border-border rounded-md">
                    <div>
                      <label className="text-[12px] leading-[22px] uppercase font-semibold text-bodyText block mb-0.5">
                        Origin
                      </label>
                      <input
                        type="text"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        onBlur={(e) => handleOriginBlur(e.target.value)}
                        placeholder="e.g. Chennai"
                        className="w-full bg-white border border-border text-[12px] px-2 py-1 rounded-md font-semibold text-secondaryText focus:ring-1 focus:ring-royalBlue focus:ring-offset-[3px] focus:outline-none focus:border-none transition duration-200"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] leading-[22px] uppercase font-semibold text-bodyText block mb-0.5 flex items-center gap-1">
                        <Clock size={12} /> Departure Time
                      </label>
                      <input
                        type="text"
                        value={originDeparture}
                        onChange={(e) =>
                          handleTopTimingChange("origin_dep", e.target.value)
                        }
                        placeholder="e.g. 06:00 AM"
                        className="w-full bg-white border border-border text-[12px] px-2 py-1 rounded-md font-semibold text-secondaryText focus:ring-1 focus:ring-royalBlue focus:ring-offset-[3px] focus:outline-none focus:border-none transition duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 p-2.5 bg-gray-50/50 border border-border rounded-md">
                    <div>
                      <label className="text-[12px] leading-[22px] uppercase font-semibold text-bodyText block mb-0.5">
                        Destination
                      </label>
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        onBlur={(e) => handleDestinationBlur(e.target.value)}
                        placeholder="e.g. Bangalore"
                        className="w-full bg-white border border-border text-[12px] px-2 py-1 rounded-md font-semibold text-secondaryText focus:ring-1 focus:ring-royalBlue focus:ring-offset-[3px] focus:outline-none focus:border-none transition duration-200"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] leading-[22px] uppercase font-semibold text-bodyText block mb-0.5 flex items-center gap-1">
                        <Clock size={12} /> Arrival Time
                      </label>
                      <input
                        type="text"
                        value={destinationArrival}
                        onChange={(e) =>
                          handleTopTimingChange("dest_arr", e.target.value)
                        }
                        placeholder="e.g. 11:30 AM"
                        className="w-full bg-white border border-border text-[12px] px-2 py-1 rounded-md font-semibold text-secondaryText focus:ring-1 focus:ring-royalBlue focus:ring-offset-[3px] focus:outline-none focus:border-none transition duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                  <div>
                    <label className="text-[12px] leading-[22px] uppercase font-semibold text-bodyText block mb-0.5">
                      Track Distance
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={distance}
                      placeholder="Calculating track..."
                      className="w-full bg-white border border-border text-[12px] px-2 py-1 rounded-md font-bold text-emerald-700 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] leading-[22px] uppercase font-semibold text-bodyText block mb-0.5">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g. 4 hrs"
                      className="w-full bg-white border border-border text-[12px] px-2 py-1 rounded-md font-semibold text-secondaryText focus:ring-1 focus:ring-royalBlue focus:ring-offset-[3px] focus:outline-none focus:border-none transition duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: TIMELINE STATION TRACKS POINTS */}
              <div className="bg-white max-h-[280px] border border-gray-200 rounded-lg p-4 shadow-3xs flex-1 flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-[16px] leading-[24px] font-semibold text-bodyText  uppercase tracking-wider">
                      Stopping Points
                    </h2>
                  </div>
                  <button
                    onClick={() => handleAddStopAtRow()}
                    className="flex items-center gap-1 text-[12px] font-semibold bg-royalBlue text-white px-2.5 py-1 rounded-md hover:bg-royalBlue/90 transition shadow-2xs cursor-pointer"
                  >
                    <MapPinPlusInside size={18} /> Add Stop
                  </button>
                </div>

                <div className="relative pl-5 space-y-2.5 max-h-[220px] overflow-y-auto pr-1 flex-1">
                  {stops.length > 1 && (
                    <div className="absolute left-[29px] top-3 bottom-3 w-0.5 border-l-2 border-dashed border-gray-200 -z-10" />
                  )}

                  {stops.length === 0 ? (
                    <div className="border border-dashed border-gray-200 text-center py-6 text-xs text-gray-400 rounded-xl -ml-3">
                      No stopping points added. Fill Origin/Destination hubs.
                    </div>
                  ) : (
                    stops.map((stop, index) => {
                      const isOrigin = stop.type === "Origin";
                      const isDest = stop.type === "Destination";

                      return (
                        <div
                          key={stop.id}
                          className="relative flex items-center gap-3 bg-white border border-border hover:border-border p-2 rounded-md transition shadow-3xs group"
                        >
                          <div
                            className={`absolute -left-[21px] top-[23px] w-3 h-3 rounded-full border-2 bg-white flex items-center justify-center z-10 ${
                              isOrigin
                                ? "border-emerald-500"
                                : isDest
                                  ? "border-rose-500"
                                  : "border-blue-500"
                            }`}
                          >
                            <div
                              className={`w-full h-full rounded-full ${isOrigin ? "bg-emerald-500" : isDest ? "bg-rose-500" : "bg-blue-500"}`}
                            />
                          </div>

                          <div className="text-[9px] font-extrabold text-white bg-royalBlue w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                            {index + 1}
                          </div>

                          <div className="flex-1 min-w-0">
                            <input
                              type="text"
                              value={stop.name}
                              placeholder="Station location..."
                              onChange={(e) =>
                                handleStopChange(
                                  stop.id,
                                  "name",
                                  e.target.value,
                                )
                              }
                              onBlur={(e) =>
                                handleStopBlur(stop.id, e.target.value)
                              }
                              className="w-full bg-transparent border-b border-transparent hover:border-border focus:border-royalBlue text-[13px] font-bold text-gray-900 outline-none truncate"
                            />
                          </div>

                          <div className="flex items-center gap-1.5 bg-gray-50/80 border border-gray-100 p-1 rounded-lg shrink-0 scale-95">
                            <div className="text-center">
                              <span className="block text-[9px] font-bold text-bodyText tracking-wide uppercase">
                                Arrival
                              </span>
                              <input
                                type="text"
                                placeholder="--"
                                value={stop.arrival}
                                disabled={isOrigin}
                                onChange={(e) =>
                                  handleStopChange(
                                    stop.id,
                                    "arrival",
                                    e.target.value,
                                  )
                                }
                                className="w-13 text-center bg-white border border-gray-200 text-[12px] font-bold rounded disabled:bg-gray-100 outline-none text-gray-800"
                              />
                            </div>
                            <div className="text-center">
                              <span className="block text-[9px] font-bold text-bodyText tracking-wide uppercase">
                                Departure
                              </span>
                              <input
                                type="text"
                                placeholder="--"
                                value={stop.departure}
                                disabled={isDest}
                                onChange={(e) =>
                                  handleStopChange(
                                    stop.id,
                                    "departure",
                                    e.target.value,
                                  )
                                }
                                className="w-13 text-center bg-white border border-gray-200 text-[12px] font-bold rounded disabled:bg-gray-100 outline-none text-gray-800"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-0.5 opacity-70 group-hover:opacity-100 transition pl-1 shrink-0">
                            <button
                              onClick={() => handleAddStopAtRow(index)}
                              className="p-0.5 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                            >
                              <Plus size={13} />
                            </button>
                            {!isOrigin && !isDest && (
                              <button
                                onClick={() => handleRemoveStop(stop.id)}
                                className="p-0.5 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COMPONENT COLUMN (MAP & BOTTOM MOVED DAYS SECTION) */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              {/* REAL ROAD CONTAINER DIGITAL MAP MAP */}
              <div className="bg-white max-h-[320px] border border-gray-200 rounded-xl p-3 shadow-3xs flex flex-col flex-1">
                <div className="flex justify-between items-center mb-1.5">
                  <h2 className="text-[16px] leading-[24px] font-semibold text-bodyText  uppercase tracking-wider">
                    Route Map
                  </h2>
                  {loadingMap && (
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium animate-pulse">
                      Routing...
                    </span>
                  )}
                </div>

                <div className="w-full h-full max-h-[250px] rounded-xl overflow-hidden border border-gray-200 relative z-0 flex-1">
                  <MapContainer
                    center={[13.0827, 80.2707]}
                    zoom={11}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {activeMarkers.length > 0 && (
                      <MapController
                        coords={activeMarkers.map((s) => [s.lat, s.lng])}
                      />
                    )}
                    {activeMarkers.map((stop, index) => (
                      <Marker key={stop.id} position={[stop.lat, stop.lng]}>
                        <Popup>
                          <div className="text-xs font-semibold">
                            <span className="text-blue-600 block">
                              Stop {index + 1}: {stop.name}
                            </span>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                    {roadGeometry.length > 0 && (
                      <Polyline
                        positions={roadGeometry}
                        color="#2563eb"
                        weight={4}
                        opacity={0.85}
                      />
                    )}
                  </MapContainer>
                </div>
              </div>

              {/* 🕒 DAYS OF OPERATION SECTION - MAP-KU KEELA POSITION SEIYAPATTATHU */}
              <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-3xs space-y-2">
                <h2 className="text-[16px] leading-[24px] font-semibold text-bodyText  uppercase tracking-wider">
                  Days of Operation
                </h2>
                <div className="flex justify-center flex-wrap gap-2">
                  {availableDays.map((day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-md border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 🎯 RIGHT BOTTOM CORNER ACTION PANEL CONTROL BAR BUTTONS */}
              <div className="flex items-center justify-end gap-2.5 mt-8 p-3 rounded-xl shadow-3xs">
                <button
                  onClick={() => setSelectedBus(null)}
                  className="px-4 py-1.5 border border-gray-300 text-gray-700 font-bold bg-white rounded-md text-xs hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRouteSchedule}
                  className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded-md text-xs hover:bg-blue-700 shadow-sm transition cursor-pointer"
                >
                  Save Route
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
