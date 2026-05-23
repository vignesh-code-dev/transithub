import Layout from "../layouts/Layout";
import { busTravelsOwnerMenu } from "../config/busTravelsOwnerMenu";

import { Bus, Wrench, Ticket, AlertTriangle } from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function BusTravelsOwner() {
  // Revenue Chart Data
  const revenueData = [
    { route: "Chennai", revenue: 14000 },
    { route: "Coimbatore", revenue: 18000 },
    { route: "Madurai", revenue: 15000 },
    { route: "Salem", revenue: 12000 },
    { route: "Trichy", revenue: 21000 },
  ];

  // Pending Actions
  const pendingActions = [
    {
      id: 1,
      title: "5 bookings pending confirmation",
      subtitle: "Chennai → Coimbatore",
    },
    {
      id: 2,
      title: "Bus TN 45 AB 2233 needs maintenance",
      subtitle: "Engine service overdue",
    },
  ];

  return (
    <Layout menus={busTravelsOwnerMenu}>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[28px] font-bold text-bodyText">
          Bus Travels Owner Dashboard
        </h1>

        <p className="text-secondaryText mt-1">
          Monitor fleet operations, bookings, and revenue.
        </p>
      </div>

      {/* Fleet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Buses */}
        <div className="bg-primaryBg border border-border border-l-4 border-l-brand rounded-xl p-6 shadow-[0 2px 8px rgba(0,0,0,0.08)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-bodyText text-[16px] leading-6 font-semibold text-sans">
                Active Buses
              </p>

              <h2 className="text-3xl font-bold mt-2 text-bodyText">42</h2>
            </div>

            <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center">
              <Bus className="text-bodyText" size={24} />
            </div>
          </div>
        </div>

        {/* In Service */}
        <div className="bg-primaryBg border border-border border-l-4 border-l-brand rounded-xl p-6 shadow-[0 2px 8px rgba(0,0,0,0.08)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-bodyText text-[16px] leading-6 font-semibold text-sans">
                In Service
              </p>

              <h2 className="text-3xl font-bold mt-2 text-bodyText">36</h2>
            </div>

             <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center">
              <Ticket className="text-bodyText" size={24} />
            </div>
          </div>
        </div>

        {/* Under Maintenance */}
        <div className="bg-primaryBg border border-border border-l-4 border-l-brand rounded-xl p-6 shadow-[0 2px 8px rgba(0,0,0,0.08)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-bodyText text-[16px] leading-6 font-semibold text-sans">
                Under Maintenance
              </p>

              <h2 className="text-3xl font-bold mt-2 text-bodyText">6</h2>
            </div>

            <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center">
              <Wrench className="text-bodyText" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Bookings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Total Bookings */}
        <div className="bg-primaryBg border border-border border-l-4 border-l-brand rounded-xl p-6 shadow-[0 2px 8px rgba(0,0,0,0.08)] p-6">
          <p className="text-bodyText text-[16px] leading-6 font-semibold text-sans">
            Today's Bookings
          </p>

          <h2 className="text-3xl font-bold mt-2 text-bodyText">128</h2>
        </div>

        {/* Seats Filled */}
        <div className="bg-primaryBg border border-border border-l-4 border-l-brand rounded-xl p-6 shadow-[0 2px 8px rgba(0,0,0,0.08)] p-6">
          <p className="text-bodyText text-[16px] leading-6 font-semibold text-sans">
            Seats Filled
          </p>

          <h2 className="text-3xl font-bold mt-2 text-bodyText">432</h2>
        </div>

        {/* Revenue */}
        <div className="bg-primaryBg border border-border border-l-4 border-l-brand rounded-xl p-6 shadow-[0 2px 8px rgba(0,0,0,0.08)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-bodyText text-[16px] leading-6 font-semibold text-sans">
                Revenue Today
              </p>

              <h2 className="text-3xl font-bold mt-2 text-bodyText">₹24,500</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white border border-border rounded-xl p-6 shadow-sm mt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-bodyText">
              Revenue Overview
            </h2>

            <p className="text-sm text-secondaryText mt-1">
              Revenue generated per route
            </p>
          </div>

          <select className="border border-border rounded-lg px-3 py-2 outline-none">
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>

        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="route" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="revenue" fill="#FFC200" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending Actions */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm mt-6">
        <div className="flex items-center gap-2 mb-5">
          <AlertTriangle className="text-[#E6AD00]" size={22} />

          <h2 className="text-lg font-semibold text-bodyText">
            Pending Actions
          </h2>
        </div>

        <div className="space-y-4">
          {pendingActions.map((item) => (
            <div
              key={item.id}
              className="
                flex items-center justify-between
                bg-[#FFF8E1]
                border border-[#FFE082]
                rounded-xl
                p-4
              "
            >
              <div>
                <p className="font-medium text-bodyText">{item.title}</p>

                <p className="text-sm text-secondaryText mt-1">
                  {item.subtitle}
                </p>
              </div>

              <button
                className="
                  bg-primaryBg
                  border border-brand
                  rounded-lg
                  hover:bg-primaryBg/90
                  px-4 py-2
                  rounded-lg
                  text-sm font-semibold
                  transition
                "
              >
                Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
