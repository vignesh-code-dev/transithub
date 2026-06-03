import {
  Wallet,
  Star,
  CarFront,
  Clock3,
  Activity,
  TrendingUp,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

import OnlineToggleCard from "../../components/driver/OnlineToggleCard";
import KpiCard from "../../components/utils/KpiCard";
import NotificationsPanel from "../../components/driver/NotificationsPanel";
import RideRequestCard from "../../components/driver/RideRequestCard";
import RecentTripsTable from "../../components/driver/RecentTripsTable";
import EarningsChart from "../../components/driver/EarningsChart";
import { useNavigate } from 'react-router-dom';


import { earningsChartData }
from "../../data/earningsChartData";

import { recentTripsData }
from "../../data/recentTripsData";

import { rideRequestsData }
from "../../data/rideRequestsData";

import { driverDashboardData }
from "../../data/driverDashboardData";

function Overview() {
  const navigate = useNavigate();

  return (

    <div
      className="
      space-y-6
      lg:space-y-8
      "
    >

      {/* HERO SECTION */}

      <div
        className="
        relative
        overflow-hidden

        rounded-[28px]

        border
        border-[#E8EDF3]
        shadow-[0_10px_30px_rgba(15,23,42,0.20)]
  bg-white
bg-gradient-to-br from-white to-green-50
      

        px-5
        py-6

        sm:px-6
        sm:py-7

        lg:px-8
        lg:py-8
        "
      >

        {/* BACKGROUND GLOW */}

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
          opacity-50

          -translate-y-24
          translate-x-20
          "
        />

        {/* CONTENT */}

        <div
          className="
          relative
          z-10

          flex
          flex-col
          xl:flex-row

          xl:items-center
          xl:justify-between

          gap-8
          "
        >

          {/* LEFT */}

          <div className="max-w-3xl">

            {/* STATUS */}

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
                Driver Online
              </span>

            </div>

            {/* TITLE */}

            <h1
              className="
              text-[26px]
              sm:text-[30px]

              leading-[34px]
              sm:leading-[40px]

              font-bold
              text-[#1A1A2E]
              "
            >
              Driver Dashboard
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
              text-sm
              sm:text-[15px]

              leading-7

              text-[#5D6D7E]

              mt-4
              max-w-2xl
              "
            >
              Monitor live ride activity,
              manage incoming requests,
              track earnings and analyze
              operational performance from
              a unified driver workspace.
            </p>

          </div>

          {/* RIGHT STATS */}

          <div
            className="
            grid
            grid-cols-2

            gap-4

            w-full
            xl:w-auto
            "
          >

            {/* SHIFT STATUS */}

            <div
              className="
              min-w-[150px]
              sm:min-w-[180px]

              rounded-2xl

              bg-white/80
              backdrop-blur-sm

              border
              border-[#E8EDF3]

              p-4
              sm:p-5
              "
            >

              <div
                className="
                flex
                items-center
                gap-2
                "
              >

                <div
                  className="
                  w-2.5
                  h-2.5

                  rounded-full
                  bg-[#43A047]

                  animate-pulse
                  "
                />

                <p
                  className="
                  text-xs
                  font-medium
                  text-[#5D6D7E]
                  "
                >
                  Shift Status
                </p>

              </div>

              <h3
                className="
                text-lg
                sm:text-xl

                font-bold
                text-[#1A1A2E]

                mt-4
                "
              >
                Active Now
              </h3>

            </div>

            {/* TODAY */}

            <div
              className="
              min-w-[150px]
              sm:min-w-[180px]

              rounded-2xl

              bg-white/80
              backdrop-blur-sm

              border
              border-[#E8EDF3]

              p-4
              sm:p-5
              "
            >

              <div
                className="
                flex
                items-center
                gap-2
                "
              >

                <CalendarDays
                  size={15}
                  className="
                  text-[#1B5E20]
                  "
                />

                <p
                  className="
                  text-xs
                  font-medium
                  text-[#5D6D7E]
                  "
                >
                  Today's Trips
                </p>

              </div>

              <div
                className="
                flex
                items-end
                justify-between

                mt-4
                "
              >

                <h3
                  className="
                  text-lg
                  sm:text-xl

                  font-bold
                  text-[#1A1A2E]
                  "
                >
                  14 Trips
                </h3>

                <div
                  className="
                  flex
                  items-center
                  gap-1

                  text-[#1B5E20]
                  "
                >

                  <ArrowUpRight size={16} />

                  <span
                    className="
                    text-xs
                    font-semibold
                    "
                  >
                    +8%
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ONLINE TOGGLE */}

      <OnlineToggleCard />

      {/* KPI SECTION */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        2xl:grid-cols-4

        gap-5
        lg:gap-6
        "
      >

        <KpiCard
          title="Today's Earnings"
          value={driverDashboardData.earningsToday}
          subtitle="Revenue generated today"
          color="#E8F5E9"

          icon={
            <Wallet
              size={22}
              className="
              text-[#1B5E20]
              "
            />
          }
        />

        <KpiCard
          title="Driver Rating"
          value={driverDashboardData.rating}
          subtitle="Excellent customer feedback"
          color="#FFF8E1"
          onClick={() => navigate('/driver/reviews')}

          icon={
            <Star
              size={22}
              className="
              text-[#F9A825]
              "
            />
          }
        />

        <KpiCard
          title="Completed Trips"
          value={driverDashboardData.completedTrips}
          subtitle="Successfully completed rides"
          color="#E3F2FD"

          icon={
            <CarFront
              size={22}
              className="
              text-[#1565C0]
              "
            />
          }
        />

        <KpiCard
          title="Online Hours"
          value={driverDashboardData.onlineHours}
          subtitle="Today's active availability"
          color="#F3E5F5"

          icon={
            <Clock3
              size={22}
              className="
              text-[#6A1B9A]
              "
            />
          }
        />

      </div>

      {/* ANALYTICS SECTION */}

      <div
        className="
        grid
        grid-cols-1
        2xl:grid-cols-3

        gap-6
        "
      >

        {/* NOTIFICATIONS */}

        <div
          className="
          2xl:col-span-1
          "

                    onClick={() => navigate('/driver/dashboard/notifications')}

        >

          <NotificationsPanel />

        </div>

        {/* EARNINGS */}

        <div
          className="
          2xl:col-span-2
          "
        >

          <EarningsChart
            data={earningsChartData}
          />

        </div>

      </div>

      {/* RIDE REQUESTS */}

      <section
        className="
        relative
        overflow-hidden

        rounded-[28px]
        shadow-[0_10px_30px_rgba(15,23,42,0.20)]

        border
        border-[#E8EDF3]

        bg-white

        p-4
        sm:p-5
        lg:p-6
        "
      >

        {/* BG */}

        <div
          className="
          absolute
          bottom-0
          right-0

          w-64
          h-64

          bg-[#E8F4FD]

          rounded-full

          blur-3xl
          opacity-40

          translate-x-24
          translate-y-24
          "
        />

        <div className="relative z-10">

          {/* HEADER */}

          <div
            className="
            flex
            flex-col
            lg:flex-row

            lg:items-center
            lg:justify-between

            gap-5

            mb-7
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

                bg-[#E8F4FD]

                text-[#1565C0]

                mb-4
                "
              >

                <TrendingUp size={14} />

                <span
                  className="
                  text-xs
                  font-semibold
                  "
                >
                  Ride Activity
                </span>

              </div>

              <h2
                className="
                text-xl
                sm:text-2xl

                font-bold
                text-[#1A1A2E]
                "
              >
                Incoming Ride Requests
              </h2>

              <p
                className="
                text-sm
                sm:text-[15px]

                leading-6

                text-[#5D6D7E]

                mt-2
                "
              >
                Nearby customer requests
                waiting for driver confirmation.
              </p>

            </div>

            {/* LIVE */}

            <div
              className="
              inline-flex
              items-center
              gap-2

              px-4
              py-2.5

              rounded-full

              bg-[#E8F5E9]

              text-[#1B5E20]
              "
            >

              <div
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
                font-semibold
                "
              >
                {rideRequestsData.length} Live Requests
              </span>

            </div>

          </div>

          {/* GRID */}

          <div
            className="
            grid
            grid-cols-1
            xl:grid-cols-2

            gap-5
            lg:gap-6
            "
          >

            {rideRequestsData.map((ride) => (

              <RideRequestCard
                key={ride.id}
                ride={ride}
              />

            ))}

          </div>

        </div>

      </section>

      {/* RECENT TRIPS */}

      <RecentTripsTable
        trips={recentTripsData}
      />

    </div>
  );
}

export default Overview;