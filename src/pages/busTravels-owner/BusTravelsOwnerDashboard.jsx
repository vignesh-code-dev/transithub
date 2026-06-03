import { useState } from "react";
import {
  X,
  Bus,
  Ticket,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function BusTravelsOwnerDashboard() {
  const [revenueInterval, setRevenueInterval] = useState("Weekly");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 🟢 Typo சரிசெய்யப்பட்டது: 'activemodal' என்பது 'activeModal' என்று மாற்றப்பட்டுள்ளது
  const [activeModal, setActiveModal] = useState(null);

  const revenueData = [
    { route: "Chennai", revenue: 14000 },
    { route: "Coimbatore", revenue: 18000 },
    { route: "Madurai", revenue: 15000 },
    { route: "Salem", revenue: 12000 },
    { route: "Trichy", revenue: 21000 },
  ];

  const fleetDetails = {
    active: [
      { route: "Chennai → Kovai", count: 12 },
      { route: "Trichy → Chennai", count: 10 },
      { route: "Madurai → Salem", count: 10 },
      { route: "Kovai → Bengaluru", count: 10 },
      { route: "Madurai → Salem", count: 10 },
      { route: "Kovai → Bengaluru", count: 10 },
      { route: "Madurai → Salem", count: 10 },
      { route: "Kovai → Bengaluru", count: 10 },
      { route: "Madurai → Salem", count: 10 },
      { route: "Kovai → Bengaluru", count: 10 },
      { route: "Madurai → Salem", count: 10 },
      { route: "Kovai → Bengaluru", count: 10 },
    ],
    inService: [
      { route: "Chennai → Kovai", count: 10 },
      { route: "Trichy → Chennai", count: 9 },
      { route: "Madurai → Salem", count: 9 },
      { route: "Kovai → Bengaluru", count: 8 },
    ],
    inMaintenance: [
      { route: "Chennai → Kovai", count: 2 },
      { route: "Trichy → Chennai", count: 1 },
      { route: "Madurai → Salem", count: 1 },
      { route: "Kovai → Bengaluru", count: 2 },
    ],
  };

  const [pendingActions, setPendingActions] = useState([
    {
      id: 1,
      title: "5 bookings pending confirmation",
      subtitle: "Chennai → Coimbatore corridor",
      severity: "warning",
    },
    {
      id: 2,
      title: "Bus TN 45 AB 2233 needs maintenance",
      subtitle: "Engine service interval overdue",
      severity: "critical",
    },
    {
      id: 3,
      title: "Driver allocation missing alert",
      subtitle: "Madurai → Salem night route dispatch",
      severity: "info",
    },
    {
      id: 4,
      title: "Driver allocation missing alert",
      subtitle: "Madurai → Salem night route dispatch",
      severity: "info",
    },
    {
      id: 5,
      title: "Driver allocation missing alert",
      subtitle: "Madurai → Salem night route dispatch",
      severity: "info",
    },
    {
      id: 6,
      title: "Driver allocation missing alert",
      subtitle: "Madurai → Salem night route dispatch",
      severity: "info",
    },
    {
      id: 7,
      title: "Driver allocation missing alert",
      subtitle: "Madurai → Salem night route dispatch",
      severity: "info",
    },
  ]);

  const handleReviewAction = (id) => {
    console.log(
      `Executing operational review flow context for task identifier: ${id}`,
    );

    // 🟢 பங்க்ஷன் உள்ளே இப்படி மாத்துங்க நண்பா (Functional State Update + New Array Reference)
    setPendingActions((prevActions) => {
      const updatedList = prevActions.filter((action) => action.id !== id);
      return updatedList;
    });
  };

  const triggerLiveSync = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div>
      {/* 2. DYNAMIC CONTROLS INTERACTION WRAPPER */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[20px] text-sans font-bold text-[#1A1A2E] tracking-tight">
            Bus Travels Owner Dashboard
          </h1>
          
        </div>

        {/* State synchronization trigger button */}
        <button
          onClick={triggerLiveSync}
          disabled={isRefreshing}
          className="self-start sm:self-center h-10 px-4 bg-royalBlue border border-[#E0E0E0] hover:bg-royalBlue/90 rounded-md text-xs font-semibold text-white transition-all flex items-center gap-2"
        >
          <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
          {isRefreshing ? "Syncing..." : "Sync Fleet Logs"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-border border-l-4 border-l-royalBlue rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-royalBlue w-10 h-10 flex items-center justify-center rounded-full">
              <Bus size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-[16px] leading-6 font-semibold text-bodyText">
                Fleet Overview
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Active Buses Card */}
            <div className="bg-primaryBg border border-[#E0E0E0] rounded-xl p-4 flex flex-col justify-between shadow-sm">
              <div>
                <p className="text-[12px] md:text-[14px] leading-[22px] font-semibold text-bodyText tracking-wider text-center">
                  Active buses
                </p>
                <h3 className="text-xl font-bold text-[#1A1A2E] mt-1 text-center">
                  42
                </h3>
              </div>

              <button
                onClick={() =>
                  setActiveModal({
                    title: "Active Buses",
                    data: fleetDetails.active,
                  })
                }
                className=" text-[12px] text-white mt-2 text-center bg-royalBlue hover:bg-royalBlue/90 px-3 py-1 rounded-md transition"
              >
                View Details
              </button>
            </div>

            {/* 2. In Service Card */}
            <div className="bg-primaryBg border border-emerald-100 rounded-xl p-4 flex flex-col justify-between shadow-sm">
              <div>
                <p className="text-[12px] md:text-[14px] leading-[22px] text-bodyText font-semibold tracking-wider text-center">
                  In Service
                </p>
                <h3 className="text-xl font-bold text-bodyText mt-1 text-center">
                  36
                </h3>
              </div>
              <button
                onClick={() =>
                  setActiveModal({
                    title: "In Service Buses",
                    data: fleetDetails.inService,
                  })
                }
                className=" text-[12px] text-white mt-2 text-center bg-royalBlue hover:bg-royalBlue/90 px-3 py-1 rounded-md transition"
              >
                View Details
              </button>
            </div>

            {/* 3. In Maintenance Card */}
            <div className="bg-primaryBg border border-rose-100 rounded-xl p-4 flex flex-col justify-between shadow-sm">
              <div>
                <p className="text-[12px] md:text-[14px] leading-[22px] text-bodyText font-semibold tracking-wider text-center">
                  In Maintenance
                </p>
                <h3 className="text-xl font-bold text-bodyText mt-1 text-center">
                  6
                </h3>
              </div>
              <button
                onClick={() =>
                  setActiveModal({
                    title: "In Maintenance Detail",
                    data: fleetDetails.inMaintenance,
                    color: "border-l-[#FFC200]",
                  })
                }
                className=" text-[12px] text-white mt-2 text-center bg-royalBlue hover:bg-royalBlue/90 px-3 py-1 rounded-md transition"
              >
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Today's Bookings Card */}
        <div className="bg-white border border-border border-l-4 border-l-royalBlue rounded-xl p-6 shadow-sm">
          {/* Card Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-royalBlue w-10 h-10 flex items-center justify-center rounded-full">
              <Ticket size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-[16px] leading-6 font-semibold text-bodyText">
                Today's Bookings
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-primaryBg border border-border rounded-xl p-4 flex flex-col justify-between hover:shadow-sm transition-all">
              <p className="text-[12px] md:text-[14px] leading-[22px] text-bodyText font-semibold tracking-wider text-center">
                Total Bookings
              </p>

              <h3 className="text-xl font-bold text-bodyText mt-1 text-center">
                128
              </h3>
            </div>

            {/* Sub-Card 2: Seats Filled */}
            <div className="bg-primaryBg border border-border rounded-xl p-4 flex flex-col justify-between hover:shadow-sm transition-all">
              <p className="text-[12px] md:text-[14px] leading-[22px] text-bodyText font-semibold tracking-wider text-center">
                Seats Filled
              </p>

              <h3 className="text-xl font-bold text-bodyText mt-1 text-center">
                432
              </h3>
            </div>

            {/* Sub-Card 3: Revenue Today */}
            <div className="bg-primaryBg border border-border rounded-xl p-4 flex flex-col justify-between hover:shadow-sm transition-all">
              <p className="text-[12px] md:text-[14px] leading-[22px] text-bodyText font-semibold tracking-wider text-center">
                Revenue Today
              </p>

              <h3 className="text-xl font-bold text-bodyText mt-1 text-center">
                ₹24,500
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* 4. RECHART ROUTE DIAGRAM & PENDING ACTIONS CONTROL BLOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Revenue Hub Analytics Panel */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 shadow-sm lg:col-span-7 flex flex-col justify-between min-h-[350px]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[#1A1A2E]">
                Revenue Chart
              </h2>
              <p className="text-xs text-secondaryText mt-0.5">
                Financial optimization matrix across target corridors
              </p>
            </div>

            <select
              value={revenueInterval}
              onChange={(e) => setRevenueInterval(e.target.value)}
              className="border border-[#E0E0E0] rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1A1A2E] bg-white outline-none focus:border-royalBlue transition"
            >
              <option value="Weekly">Weekly Cycle</option>
              <option value="Monthly">Monthly Cycle</option>
            </select>
          </div>

          <div className="w-full h-[250px] text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F5" />
                <XAxis
                  dataKey="route"
                  stroke="#5D6D7E"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis stroke="#5D6D7E" fontSize={11} tickLine={false} />
                <Tooltip cursor={{ fill: "#E8F4FD" }} />
                <Bar
                  dataKey="revenue"
                  fill="royalBlue"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operational Flow Pending Queue */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 shadow-sm lg:col-span-5 flex flex-col min-h-[350px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-royalBlue rounded-full w-10 h-10 flex items-center justify-center">
                <AlertTriangle className="text-white" size={22} />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1A1A2E]">
                  Pending Actions
                </h2>
                <p className="text-xs text-secondaryText">
                  Awaiting operational confirmation
                </p>
              </div>
            </div>
            {pendingActions.length > 0 && (
              <span className="bg-pendingBg text-pending font-bold px-2 py-1 rounded-md text-[10px] tracking-wide uppercase">
                {pendingActions.length} Pending
              </span>
            )}
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {pendingActions.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-100 rounded-xl animate-fadeIn">
                <p className="text-xs font-bold text-[#1A1A2E]">
                  Queue Cleared Completely
                </p>
                <p className="text-[11px] text-[#5D6D7E] mt-0.5">
                  No critical interventions pending log system metrics.
                </p>
              </div>
            ) : (
              pendingActions.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border border-[#E0E0E0] rounded-xl p-3.5 bg-primaryBg hover:bg-infoBusCard hover:border-royalBlue transition-all duration-200 animate-fadeIn"
                >
                  <div className="space-y-0.5 max-w-[65%]">
                    <p className="font-bold text-xs text-[#1A1A2E] leading-snug tracking-tight">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-[#5D6D7E] font-medium">
                      {item.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => handleReviewAction(item.id)}
                    className="bg-primaryBg hover:bg-royalBlue hover:text-white text-bodyText border border-royalBlue px-3.5 py-2 rounded-lg text-xs font-Regular transition-all shadow-sm flex items-center gap-1.5 shrink-0"
                  >
                    Review <ArrowRight size={12} />
                  </button>
                </div>
              ))
            )}

            {pendingActions.length > 3 && (
              <p className="text-center text-[10px] text-secondaryText font-bold mt-2 tracking-wider bg-gray-50 py-1 rounded-md border border-dashed border-gray-200">
                + {pendingActions.length - 3} MORE ACTIONS IN QUEUE
              </p>
            )}
          </div>
        </div>
      </div>

      {/* --- POPUP MODAL --- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div
            className="absolute inset-0"
            onClick={() => setActiveModal(null)}
          ></div>

          <div className="relative bg-white w-full max-w-md rounded-xl p-6 shadow-xl z-10 transition-all transform scale-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Bus size={18} className="text-[#1A1A2E]" />
                <h3 className="text-base font-bold text-[#1A1A2E]">
                  {activeModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-error hover:text-white hover:bg-error p-1 rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {activeModal.data.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100/50 hover:border-royalBlue/30 transition duration-150"
                >
                  <span className="text-sm font-bold text-[#5D6D7E]">
                    {item.route}
                  </span>
                  <span className="text-xs font-extrabold text-[#1A1A2E] bg-white border border-gray-200 px-3 py-1 rounded-lg shadow-sm">
                    {item.count} Buses
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
