import {
  CarFront,
  BellRing,
  Wallet,
  Users,
  ArrowUpRight,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

import StatusBadge
from "../../components/utils/StatusBadge";

import {
  commercialDashboardStats,
} from "../../data/commercialDashboardData";

import {
  assignedDriversData,
} from "../../data/assignedDriversData";

const revenueData = [

  {
    day: "Mon",
    revenue: 12000,
  },

  {
    day: "Tue",
    revenue: 18000,
  },

  {
    day: "Wed",
    revenue: 14500,
  },

  {
    day: "Thu",
    revenue: 22000,
  },

  {
    day: "Fri",
    revenue: 19500,
  },

];

function CommercialOwnerDashboard() {

  return (

    <div>

      {/* PAGE HEADER */}

      <div
        className="
        flex
        flex-col
        xl:flex-row
        xl:items-center
        xl:justify-between

        gap-4
        mb-8
        "
      >

        <div>

          <h1
            className="
            text-2xl
            leading-8
            font-bold
            text-[#1A1A2E]
            "
          >
            Commercial Owner Dashboard
          </h1>

          <p
            className="
            text-[#5D6D7E]
            mt-2
            "
          >
            Monitor vehicles, drivers and fleet operations.
          </p>

        </div>

        {/* QUICK STATUS */}

        <div
          className="
          inline-flex
          items-center
          gap-2

          bg-[#E8F4FD]
          border
          border-[#AED6F1]

          rounded-full

          px-4
          py-2
          "
        >

          <span
            className="
            w-2.5
            h-2.5
            rounded-full
            bg-[#43A047]
            animate-pulse
            "
          />

          <span
            className="
            text-sm
            font-medium
            text-[#1A1A2E]
            "
          >
            Fleet Operations Active
          </span>

        </div>

      </div>

      {/* KPI GRID */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
        mb-8
        "
      >

        {/* CARD 1 */}

        <div
          className="
          bg-white
          border
          border-[#E0E0E0]

          rounded-2xl
          shadow-sm

          p-5

          hover:shadow-md
          transition-all
          "
        >

          <div
            className="
            flex
            items-start
            justify-between
            "
          >

            <div>

              <p
                className="
                text-sm
                text-[#5D6D7E]
                "
              >
                Total Vehicles
              </p>

              <h2
                className="
                text-2xl
                font-bold
                text-[#1A1A2E]

                mt-3
                "
              >
                {commercialDashboardStats[0].value}
              </h2>

            </div>

            <div
              className="
              w-12
              h-12

              rounded-xl

              bg-[#E3F2FD]

              flex
              items-center
              justify-center
              "
            >

              <CarFront
                size={24}
                className="
                text-[#1565C0]
                "
              />

            </div>

          </div>

        </div>

        {/* CARD 2 */}

        <div
          className="
          bg-white
          border
          border-[#E0E0E0]

          rounded-2xl
          shadow-sm

          p-5

          hover:shadow-md
          transition-all
          "
        >

          <div
            className="
            flex
            items-start
            justify-between
            "
          >

            <div>

              <p
                className="
                text-sm
                text-[#5D6D7E]
                "
              >
                Ride Requests Today
              </p>

              <h2
                className="
                text-2xl
                font-bold
                text-[#1A1A2E]

                mt-3
                "
              >
                {commercialDashboardStats[1].value}
              </h2>

            </div>

            <div
              className="
              w-12
              h-12

              rounded-xl

              bg-[#FFF8E1]

              flex
              items-center
              justify-center
              "
            >

              <BellRing
                size={24}
                className="
                text-[#F9A825]
                "
              />

            </div>

          </div>

        </div>

        {/* CARD 3 */}

        <div
          className="
          bg-white
          border
          border-[#E0E0E0]

          rounded-2xl
          shadow-sm

          p-5

          hover:shadow-md
          transition-all
          "
        >

          <div
            className="
            flex
            items-start
            justify-between
            "
          >

            <div>

              <p
                className="
                text-sm
                // text-[#5D6D7E]
                "
              >
                Revenue Today
              </p>

              <h2
                className="
                text-2xl
                font-bold
                text-[#1A1A2E]

                mt-3
                "
              >
                {commercialDashboardStats[2].value}
              </h2>

            </div>

            <div
              className="
              w-12
              h-12

              rounded-xl

              bg-[#E8F5E9]

              flex
              items-center
              justify-center
              "
            >

              <Wallet
                size={24}
                className="
                text-[#1B5E20]
                "
              />

            </div>

          </div>

        </div>

        {/* CARD 4 */}

        <div
          className="
          bg-white
          border
          border-[#E0E0E0]

          rounded-2xl
          shadow-sm

          p-5

          hover:shadow-md
          transition-all
          "
        >

          <div
            className="
            flex
            items-start
            justify-between
            "
          >

            <div>

              <p
                className="
                text-sm
                text-[#5D6D7E]
                "
              >
                Assigned Drivers
              </p>

              <h2
                className="
                text-2xl
                font-bold
                text-[#1A1A2E]

                mt-3
                "
              >
                {commercialDashboardStats[3].value}
              </h2>

            </div>

            <div
              className="
              w-12
              h-12

              rounded-xl

              bg-[#F3E5F5]

              flex
              items-center
              justify-center
              "
            >

              <Users
                size={24}
                className="
                text-[#6A1B9A]
                "
              />

            </div>

          </div>

        </div>

      </div>

      {/* CHART + LIVE REQUESTS */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        mb-8
        "
      >

        {/* REVENUE CHART */}

        <div
          className="
          xl:col-span-2

          bg-white
          border
          border-[#E0E0E0]

          rounded-2xl
          shadow-sm

          p-6
          "
        >

          <div
            className="
            flex
            items-center
            justify-between
            mb-6
            "
          >

            <div>

              <h2
                className="
                text-base
                font-semibold
                text-[#1A1A2E]
                "
              >
                Revenue Overview
              </h2>

              <p
                className="
                text-sm
                text-[#5D6D7E]
                mt-1
                "
              >
                Weekly earnings across all active vehicles.
              </p>

            </div>

            <button
              className="
              flex
              items-center
              gap-2

              text-sm
              font-medium
              text-[#BF360C]
              "
            >

              Details

              <ArrowUpRight size={16} />

            </button>

          </div>

          <div className="h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart data={revenueData}>

                <defs>

                  <linearGradient
                    id="colorRevenue"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#BF360C"
                      stopOpacity={0.3}
                    />

                    <stop
                      offset="95%"
                      stopColor="#BF360C"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#BF360C"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* LIVE REQUESTS */}

        <div
          className="
          bg-white
          border
          border-[#E0E0E0]

          rounded-2xl
          shadow-sm

          p-6
          "
        >

          <div className="mb-5">

            <h2
              className="
              text-base
              font-semibold
              text-[#1A1A2E]
              "
            >
              Live Ride Requests
            </h2>

            <p
              className="
              text-sm
              text-[#5D6D7E]
              mt-1
              "
            >
              Active incoming requests.
            </p>

          </div>

          <div className="space-y-4">

            <div
              className="
              border
              border-[#E0E0E0]

              rounded-xl

              p-4
              "
            >

              <div
                className="
                flex
                items-center
                justify-between
                "
              >

                <h3
                  className="
                  font-semibold
                  text-[#1A1A2E]
                  "
                >
                  Chennai → Salem
                </h3>

                <StatusBadge status="active" />

              </div>

              <p
                className="
                text-sm
                text-[#5D6D7E]
                mt-2
                "
              >
                4 passengers • ₹1,240
              </p>

            </div>

            <div
              className="
              border
              border-[#E0E0E0]

              rounded-xl

              p-4
              "
            >

              <div
                className="
                flex
                items-center
                justify-between
                "
              >

                <h3
                  className="
                  font-semibold
                  text-[#1A1A2E]
                  "
                >
                  Madurai → Trichy
                </h3>

                <StatusBadge status="pending" />

              </div>

              <p
                className="
                text-sm
                text-[#5D6D7E]
                mt-2
                "
              >
                2 passengers • ₹860
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* DRIVER ASSIGNMENTS */}

      <div
        className="
        bg-white
        border
        border-[#E0E0E0]

        rounded-2xl
        shadow-sm

        overflow-hidden
        "
      >

        <div
          className="
          px-6
          py-5

          border-b
          border-[#E0E0E0]
          "
        >

          <h2
            className="
            text-base
            font-semibold
            text-[#1A1A2E]
            "
          >
            Driver Assignments
          </h2>

          <p
            className="
            text-sm
            text-[#5D6D7E]
            mt-1
            "
          >
            Current fleet-driver allocation status.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[720px]">

            <thead className="bg-[#BF360C] text-white">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold">
                  Driver ID
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold">
                  Driver
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold">
                  Vehicle
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {assignedDriversData.map((driver) => (

                <tr
                  key={driver.id}
                  className="
                  border-t
                  border-[#E0E0E0]

                  even:bg-[#F9F9F9]

                  hover:bg-[#FFF3E0]

                  transition-all
                  "
                >

                  <td className="px-6 py-4 font-mono text-sm">
                    {driver.id}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {driver.driver}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {driver.vehicle}
                  </td>

                  <td className="px-6 py-4">

                    <StatusBadge
                      status={driver.status}
                    />

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default CommercialOwnerDashboard;