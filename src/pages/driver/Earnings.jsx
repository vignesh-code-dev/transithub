import { useState } from "react";

import {
  Wallet,
  CalendarDays,
  TrendingUp,
  CarFront,
  Activity,
} from "lucide-react";

import KpiCard from "../../components/utils/KpiCard";
import EarningsChart from "../../components/driver/EarningsChart";
import RevenueBreakdownCard from "../../components/driver/RevenueBreakdownCard";
import EarningsTransactionsTable from "../../components/driver/EarningsTransactionsTable";

import { earningsChartData }
from "../../data/earningsChartData";

import { earningsTransactionsData }
from "../../data/earningsTransactionsData";

function Earnings() {


const [selectedRange, setSelectedRange] =
  useState("month");

const [startDate, setStartDate] =
  useState("");

const [endDate, setEndDate] =
  useState("");

  const filters = [
  "today",
  "week",
  "month",
  "year",
  "custom",
];

 const chartData = (() => {

  const today =
    new Date();

  if (
    selectedRange === "today"
  ) {

    return earningsChartData.slice(-1);

  }

  if (
    selectedRange === "week"
  ) {

    return earningsChartData.slice(-7);

  }

  if (
    selectedRange === "month"
  ) {

    return earningsChartData.slice(-30);

  }

  if (
    selectedRange === "year"
  ) {

    return earningsChartData.slice(-365);

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

  return earningsChartData.filter(
    (item) => {

      const current =
        new Date(item.date);

      return (
        current >=
          new Date(startDate) &&
        current <=
          new Date(endDate)
      );

    }
  );

}

  return earningsChartData;

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

        {/* GLOW */}

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

            {/* LEFT */}

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
                  Revenue Analytics
                </span>

              </div>

              <h1
                className="
                text-3xl
                font-bold

                text-[#1A1A2E]
                "
              >
                Earnings Center
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
                Track earnings, completed trips,
                bonuses and revenue performance
                in real time.
              </p>

            </div>

            {/* RIGHT */}

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
                  font-medium
                  text-[#5D6D7E]
                  "
                >
                  Today's Earnings
                </p>

                <h3
                  className="
                  text-2xl
                  font-bold

                  text-[#1A1A2E]

                  mt-3
                  "
                >
                  ₹4,500
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
                  font-medium
                  text-[#5D6D7E]
                  "
                >
                  This Week
                </p>

                <h3
                  className="
                  text-2xl
                  font-bold

                  text-[#1A1A2E]

                  mt-3
                  "
                >
                  ₹31K
                </h3>

              </div>

            </div>

          </div>

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
        "
      >

        <KpiCard
          title="Today's Earnings"
          value="₹4,500"
          subtitle="Current day revenue"
          color="#E8F5E9"
          icon={
            <Wallet
              size={22}
              className="text-[#1B5E20]"
            />
          }
        />

        <KpiCard
          title="Weekly Earnings"
          value="₹31,000"
          subtitle="This week's revenue"
          color="#E8F4FD"
          icon={
            <TrendingUp
              size={22}
              className="text-[#1565C0]"
            />
          }
        />

        <KpiCard
          title="Monthly Earnings"
          value="₹1.24L"
          subtitle="This month's revenue"
          color="#FFF8E1"
          icon={
            <CalendarDays
              size={22}
              className="text-[#E65100]"
            />
          }
        />

        <KpiCard
          title="Trips Completed"
          value="142"
          subtitle="Successful rides"
          color="#F3E5F5"
          icon={
            <CarFront
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

      {
  selectedRange === "custom" && (

    <div
      className="
      flex
      flex-col
      sm:flex-row

      gap-3

      mt-4
      "
    >

      <input
        type="date"
        value={startDate}
        onChange={(e) =>
          setStartDate(e.target.value)
        }
        className="
        h-11
        px-4

        rounded-2xl

        border
        border-[#E8EDF3]

        bg-white
        "
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) =>
          setEndDate(e.target.value)
        }
        className="
        h-11
        px-4

        rounded-2xl

        border
        border-[#E8EDF3]

        bg-white
       
flex
flex-col
sm:flex-row
gap-3

        "
      />

    </div>

  )
}
      {/* CHART */}

     <EarningsChart
  data={chartData}
/>

      {/* BREAKDOWN */}

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
          xl:col-span-2
          "
        >

          <RevenueBreakdownCard />

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
            Monthly Summary
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
                ₹1.24L
              </h3>
            </div>

            <div>
              <p className="text-sm text-[#5D6D7E]">
                Avg Fare
              </p>
              <h3 className="text-xl font-bold text-[#1A1A2E]">
                ₹218
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

            <div>
              <p className="text-sm text-[#5D6D7E]">
                Growth
              </p>
              <h3 className="text-xl font-bold text-[#1B5E20]">
                +12.4%
              </h3>
            </div>

          </div>

        </div>

      </div>

      {/* TRANSACTIONS */}

      <EarningsTransactionsTable
        transactions={
          earningsTransactionsData
        }
      />

    </div>

  );
}

export default Earnings;