import { useState } from "react";

import {
  Activity,
  CarFront,
  TrendingUp,
  Wallet,
} from "lucide-react";

import KpiCard
from "../../components/utils/KpiCard";

import RideHistoryTable
from "../../components/driver/RideHistoryTable";

import {
  rideHistoryData,
}
from "../../data/rideHistoryData";

function RideHistory() {

  const [selectedRange, setSelectedRange] =
    useState("month");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const filters = [
    "week",
    "month",
    "year",
    "custom",
  ];

  const filteredRides = (() => {

    if (
      selectedRange === "week"
    ) {

      return rideHistoryData.slice(-7);

    }

    if (
      selectedRange === "month"
    ) {

      return rideHistoryData.slice(-30);

    }

    if (
      selectedRange === "year"
    ) {

      return rideHistoryData;

    }

    if (
      selectedRange === "custom"
    ) {

      if (
        !startDate ||
        !endDate
      ) {
        return [];
      }

      return rideHistoryData.filter(
        (ride) => {

          const current =
            new Date(ride.date);

          return (
            current >=
              new Date(startDate) &&
            current <=
              new Date(endDate)
          );

        }
      );

    }

    return rideHistoryData;

  })();

  return (

    <div
      className="
      space-y-8
      "
    >

      {/* HERO */}

      <div
        className="
        relative
        overflow-hidden

        bg-white

        border
        border-[#E8EDF3]

        rounded-[32px]

        shadow-[0_10px_30px_rgba(15,23,42,0.05)]

        p-5
        sm:p-7
        lg:p-8
        "
      >

        <div
          className="
          absolute
          top-0
          right-0

          w-72
          h-72

          bg-[#E8F5E9]

          rounded-full

          blur-3xl
          opacity-60

          -translate-y-28
          translate-x-24
          "
        />

        <div className="relative z-10">

          <div
            className="
            flex
            flex-col
            xl:flex-row

            xl:items-center
            xl:justify-between

            gap-6
            "
          >

            <div>

              <div
                className="
                inline-flex
                items-center
                gap-2

                px-3
                py-1.5

                rounded-full

                bg-[#E8F5E9]

                text-[#1B5E20]

                mb-5
                "
              >

                <Activity size={14} />

                <span
                  className="
                  text-xs
                  font-semibold
                  "
                >
                  Ride Analytics
                </span>

              </div>

              <h1
                className="
                text-3xl
                font-bold

                text-[#1A1A2E]
                "
              >
                Ride History Center
              </h1>

              <p
                className="
                text-sm
                sm:text-base

                text-[#5D6D7E]

                mt-3
                max-w-2xl
                "
              >
                Track completed rides,
                cancellations, revenue
                and trip performance history.
              </p>

            </div>

            <div
              className="
              grid
              grid-cols-2
              gap-4
              "
            >

              <div
                className="
                bg-[#F8FAFC]

                border
                border-[#E8EDF3]

                rounded-3xl

                p-4
                min-w-[160px]
                "
              >

                <p
                  className="
                  text-xs
                  text-[#5D6D7E]
                  "
                >
                  Total Trips
                </p>

                <h3
                  className="
                  text-2xl
                  font-bold

                  text-[#1A1A2E]

                  mt-3
                  "
                >
                  {rideHistoryData.length}
                </h3>

              </div>

              <div
                className="
                bg-[#F8FAFC]

                border
                border-[#E8EDF3]

                rounded-3xl

                p-4
                min-w-[160px]
                "
              >

                <p
                  className="
                  text-xs
                  text-[#5D6D7E]
                  "
                >
                  Revenue
                </p>

                <h3
                  className="
                  text-2xl
                  font-bold

                  text-[#1A1A2E]

                  mt-3
                  "
                >
                  ₹58.4K
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

      

      {/* CUSTOM RANGE */}

      {
        selectedRange === "custom" && (

          <div
            className="
            flex
            flex-col
            sm:flex-row

            gap-3
            "
          >

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(
                  e.target.value
                )
              }
              className="
              h-11
              px-4

              rounded-2xl

              border
              border-[#E8EDF3]
              "
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(
                  e.target.value
                )
              }
              className="
              h-11
              px-4

              rounded-2xl

              border
              border-[#E8EDF3]
              "
            />

          </div>

        )
      }

      {/* KPI GRID */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4

        gap-6
        "
      >

        <KpiCard
          title="Total Trips"
          value="248"
          subtitle="All ride requests"
          color="#E8F5E9"
          icon={
            <CarFront
              size={22}
              className="text-[#1B5E20]"
            />
          }
        />

        <KpiCard
          title="Completed"
          value="221"
          subtitle="Successful rides"
          color="#E8F4FD"
          icon={
            <TrendingUp
              size={22}
              className="text-[#1565C0]"
            />
          }
        />

        <KpiCard
          title="Cancelled"
          value="19"
          subtitle="Cancelled rides"
          color="#FFF8E1"
          icon={
            <Activity
              size={22}
              className="text-[#E65100]"
            />
          }
        />

        <KpiCard
          title="Revenue"
          value="₹58.4K"
          subtitle="Total earnings"
          color="#F3E5F5"
          icon={
            <Wallet
              size={22}
              className="text-[#6A1B9A]"
            />
          }
        />

      </div>

{/* FILTERS */}

      <div
        className="
        flex
        gap-3

        overflow-x-auto
        pb-1
        "
      >

        {filters.map((filter) => (

          <button
            key={filter}

            onClick={() =>
              setSelectedRange(filter)
            }

            className={`
            px-5
            py-2.5

            rounded-full

            text-sm
            font-semibold

            whitespace-nowrap

            transition-all

            ${
              selectedRange === filter
                ? "bg-[#1B5E20] text-white"
                : "bg-white border border-[#E8EDF3] text-[#5D6D7E]"
            }
            `}
          >

            {filter.charAt(0).toUpperCase() +
              filter.slice(1)}

          </button>

        ))}

      </div>
      {/* CONTENT */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3

        gap-6
        "
      >

        <div
          className="
          xl:col-span-3
          "
        >

          <RideHistoryTable
            rides={filteredRides}
          />

        </div>

        <div
          className="
          bg-white

          border
          border-[#E8EDF3]

          rounded-[28px]

          shadow-[0_10px_30px_rgba(15,23,42,0.05)]

          p-6
          "
        >

          <h2
            className="
            text-xl
            font-bold

            text-[#1A1A2E]
            "
          >
            Ride Insights
          </h2>

          <div
            className="
            mt-6
            space-y-5
            "
          >

            <div>
              <p className="text-sm text-[#5D6D7E]">
                Total Revenue
              </p>
              <h3 className="text-xl font-bold text-[#1A1A2E]">
                ₹58,400
              </h3>
            </div>

            <div>
              <p className="text-sm text-[#5D6D7E]">
                Average Fare
              </p>
              <h3 className="text-xl font-bold text-[#1A1A2E]">
                ₹235
              </h3>
            </div>

            <div>
              <p className="text-sm text-[#5D6D7E]">
                Completion Rate
              </p>
              <h3 className="text-xl font-bold text-[#1B5E20]">
                89%
              </h3>
            </div>

            <div>
              <p className="text-sm text-[#5D6D7E]">
                Best Day
              </p>
              <h3 className="text-xl font-bold text-[#1A1A2E]">
                Saturday
              </h3>
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default RideHistory;