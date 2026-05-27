import { useState } from "react";
import {
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

  const revenueData = [
    { route: "Chennai", revenue: 14000 },
    { route: "Coimbatore", revenue: 18000 },
    { route: "Madurai", revenue: 15000 },
    { route: "Salem", revenue: 12000 },
    { route: "Trichy", revenue: 21000 },
  ];

  // ரூட் வாரியாக பேருந்துகளின் விவரங்கள்
  const fleetDetails = {
    active: [
      { route: "Chennai → Kovai", count: 12 },
      { route: "Trichy → Chennai", count: 10 },
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
  ]);

  const handleReviewAction = (id) => {
    console.log(
      `Executing operational review flow context for task identifier: ${id}`,
    );
    setPendingActions((prev) => prev.filter((action) => action.id !== id));
  };

  const triggerLiveSync = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <>
      {/* 2. DYNAMIC CONTROLS INTERACTION WRAPPER */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[20px] text-sans font-bold text-[#1A1A2E] tracking-tight">
            Bus Travels Owner Dashboard
          </h1>
          <p className="text-[#5D6D7E] text-sm mt-1">
            Monitor real-time fleet operations and Ticket Bookings.
          </p>
        </div>

        {/* State synchronization trigger button */}
        <button
          onClick={triggerLiveSync}
          disabled={isRefreshing}
          className="self-start sm:self-center h-10 px-4 bg-gray-50 border border-[#E0E0E0] hover:bg-gray-100 rounded-xl text-xs font-bold text-[#1A1A2E] transition-all flex items-center gap-2"
        >
          <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
          {isRefreshing ? "Syncing Modules..." : "Sync Fleet Logs"}
        </button>
      </div>

      {/* 3. METRICS AND PERFORMANCE CARDS SPLIT MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fleet Configuration Matrix Card Component */}
        <div className="bg-white border border-[#E0E0E0] border-l-4 border-l-[#FFC200] rounded-xl p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-brand w-10 h-10 flex items-center justify-center rounded-full">
              <Bus size={24} className="text-bodyText" />
            </div>
            <div>
              <h2 className="text-[16px] leading-6 font-semibold text-bodyText">
                Fleet Overview
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Active Buses Card */}
            <div className="bg-primaryBg border border-[#E0E0E0] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <p className="text-[12px] md:text-[14px] leading-[22px] text-bodyText uppercase tracking-wider text-center">
                  Active buses
                </p>
                <h3 className="text-2xl font-bold text-[#1A1A2E] mt-1 text-center">
                  42
                </h3>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-[11px] text-[#5D6D7E] space-y-1">
                {fleetDetails.active.map((item, idx) => (
                  <div key={idx} className="flex justify-between font-medium">
                    <span>{item.route}</span>
                    <span className="font-bold text-[#1A1A2E]">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* In Service Card */}
            <div className="bg-primaryBg border border-emerald-100 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <p className="text-[12px] md:text-[14px] leading-[22px] text-bodyText uppercase tracking-wider text-center">
                  In Service
                </p>
                <h3 className="text-2xl font-bold text-bodyText mt-1 text-center">
                  36
                </h3>
              </div>
              <div className="mt-3 pt-3 border-t border-emerald-50 text-[11px] text-[#5D6D7E] space-y-1">
                {fleetDetails.inService.map((item, idx) => (
                  <div key={idx} className="flex justify-between font-medium">
                    <span>{item.route}</span>
                    <span className="font-bold text-emerald-600">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* In Maintenance Card */}
            <div className="bg-primaryBg border border-rose-100 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <p className="text-[12px] md:text-[14px] leading-[22px] text-bodyText uppercase tracking-wider text-center">
                  In Maintenance
                </p>
                <h3 className="text-2xl font-bold text-bodyText mt-1 text-center">
                  6
                </h3>
              </div>
              <div className="mt-3 pt-3 border-t border-rose-50 text-[11px] text-[#5D6D7E] space-y-1">
                {fleetDetails.inMaintenance.map((item, idx) => (
                  <div key={idx} className="flex justify-between font-medium">
                    <span>{item.route}</span>
                    <span className="font-bold text-rose-600">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Bookings Card */}
        <div className="bg-white border border-[#E0E0E0] border-l-4 border-l-[#FFC200] rounded-xl p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-brand w-10 h-10 flex items-center justify-center rounded-full">
              <Ticket size={24} className="text-bodyText" />
            </div>
            <div>
              <h2 className="text-[16px] leading-6 font-semibold text-bodyText">
                Today's Bookings
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-primaryBg border border-[#E0E0E0] rounded-xl p-4 text-center">
              <p className="text-[14px] leading-[22px] text-bodyText uppercase tracking-wider">
                Today's Bookings
              </p>
              <h3 className="text-2xl font-bold text-[#1A1A2E] mt-1">128</h3>
            </div>
            <div className="bg-primaryBg border border-[#E0E0E0] rounded-xl p-4 text-center">
              <p className="text-[14px] leading-[22px] text-bodyText uppercase tracking-wider">
                Seats Filled
              </p>
              <h3 className="text-2xl font-bold text-[#1A1A2E] mt-1">432</h3>
            </div>
            <div className="bg-primaryBg border border-amber-100 rounded-xl p-4 text-center">
              <p className="text-[14px] leading-[22px] text-bodyText uppercase tracking-wider">
                Revenue Today
              </p>
              <h3 className="text-2xl font-bold text-bodyText mt-1">₹24,500</h3>
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
                Revenue Breakdown by Hub Corridor
              </h2>
              <p className="text-xs text-[#5D6D7E] mt-0.5">
                Financial optimization matrix across target corridors
              </p>
            </div>

            <select
              value={revenueInterval}
              onChange={(e) => setRevenueInterval(e.target.value)}
              className="border border-[#E0E0E0] rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1A1A2E] bg-white outline-none focus:border-[#FFC200] transition"
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
                <Tooltip cursor={{ fill: "#FFFDE7" }} />
                <Bar
                  dataKey="revenue"
                  fill="#FFC200"
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
              <div className="bg-[#FFC200]/10 rounded-xl w-10 h-10 flex items-center justify-center">
                <AlertTriangle className="text-[#1A1A2E]" size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1A1A2E]">
                  Pending Actions
                </h2>
                <p className="text-xs text-[#5D6D7E]">
                  Awaiting operational confirmation
                </p>
              </div>
            </div>
            {pendingActions.length > 0 && (
              <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md text-[10px] tracking-wide uppercase">
                {pendingActions.length} Pending
              </span>
            )}
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {pendingActions.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-100 rounded-xl">
                <p className="text-xs font-bold text-[#1A1A2E]">
                  Queue Cleared Completely
                </p>
                <p className="text-[11px] text-[#5D6D7E] mt-0.5">
                  No critical interventions pending log system metrics.
                </p>
              </div>
            ) : (
              pendingActions.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border border-[#E0E0E0] rounded-xl p-3.5 bg-gray-50 hover:bg-[#FFFDE7]/30 hover:border-[#FFC200]/50 transition-all duration-200"
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
                    className="bg-primaryBus hover:bg-[#E6AD00] text-[#1A1A2E] border border-[#E6AD00] px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 shrink-0"
                  >
                    Review <ArrowRight size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
