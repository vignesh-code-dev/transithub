import {
  Search,
  Activity,
  CheckCircle2,
  TimerReset,
  TrendingUp,
  CalendarClock,
} from "lucide-react";

import RideRequestCard
from "../../components/driver/RideRequestCard";

import ScheduledRideCard
from "../../components/driver/ScheduledRideCard";

import RideHistoryTable
from "../../components/driver/RideHistoryTable";

import {
  allRideRequestsData,
} from "../../data/allRideRequestsData";

import {
  scheduledRidesData,
} from "../../data/scheduledRidesData";

import {
  rideHistoryData,
} from "../../data/rideHistoryData";

function RideRequests() {

  return (

    <div
      className="
      space-y-8
      "
    >

      {/* HERO SECTION */}

      <div
        className="
        relative
        overflow-hidden

        bg-white
bg-gradient-to-br from-white to-green-50

        border
        border-[#E8EDF3]

        rounded-[32px]

        shadow-[0_10px_30px_rgba(15,23,42,0.20)]

        p-5
        sm:p-7
        xl:p-8
        "
      >

        {/* BACKGROUND DECOR */}

        <div
          className="
          absolute
          -top-24
          -right-16

          w-72
          h-72

          rounded-full

          bg-[#E8F5E9]

          blur-3xl
          opacity-70
          "
        />

        <div
          className="
          relative
          z-10

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
                Live Ride Operations
              </span>

            </div>

            <h1
              className="
              text-2xl
              sm:text-3xl

              leading-tight

              font-bold
              text-[#1A1A2E]
              "
            >
              Ride Requests
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
              Manage incoming passenger requests,
              scheduled rides and ride history
              from one operational workspace.
            </p>

          </div>

          {/* RIGHT */}

          <div
            className="
            flex
            flex-col
            sm:flex-row

            gap-3

            w-full
            xl:w-auto
            "
          >

            {/* SEARCH */}
{/* 
            <div className="relative">

              <Search
                size={18}
                className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2

                text-[#5D6D7E]
                "
              />

              <input
                type="text"
                placeholder="Search requests..."

                className="
                h-12
                w-full
                sm:w-[260px]

                pl-11
                pr-4

                rounded-2xl

                bg-[#F8FAFC]

                border
                border-[#E8EDF3]

                text-sm
                text-[#1A1A2E]

                shadow-sm

                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-[#1B5E20]
                "
              />

            </div> */}

            {/* FILTER */}

            <select
              className="
              h-12
              w-full
              sm:w-[190px]

              px-4

              rounded-2xl

              bg-[#F8FAFC]

              border
              border-[#E8EDF3]

              text-sm
              text-[#1A1A2E]

              shadow-sm

              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-[#1B5E20]
              "
            >

              <option>
                All Requests
              </option>

              <option>
                Pending
              </option>

              <option>
                Active
              </option>

              <option>
                Completed
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* STATS */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        2xl:grid-cols-4

        gap-5
        "
      >

        {/* CARD */}

        <div
          className="
          relative
          overflow-hidden

          bg-white

          border
          border-[#E8EDF3]

          rounded-[28px]

          p-5

          shadow-[0_10px_30px_rgba(15,23,42,0.20)]
          "
        >

          <div
            className="
            flex
            items-center
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
                Total Requests
              </p>

              <h2
                className="
                text-3xl
                font-bold
                text-[#1A1A2E]

                mt-3
                "
              >
                24
              </h2>

            </div>

            <div
              className="
              w-14
              h-14

              rounded-2xl

              bg-[#E8F5E9]
          
 border
            border-white/80

            shadow-[0_10px_25px_rgba(15,23,42,0.20)]

            backdrop-blur-md

            


              flex
              items-center
              justify-center
              "
              
            >

              <Activity
                size={24}
                className="
                text-[#1B5E20]
                "
              />

            </div>

          </div>

        </div>

        {/* ACTIVE */}

        <div
          className="
          relative
          overflow-hidden

          bg-[#E8F4FD]

          border
          border-[#D6ECFA]

          rounded-[28px]

          p-5
          shadow-[0_10px_30px_rgba(15,23,42,0.20)]
          "
        >

          <div
            className="
            flex
            items-center
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
                Active Requests
              </p>

              <h2
                className="
                text-3xl
                font-bold
                text-[#1A1A2E]

                mt-3
                "
              >
                8
              </h2>

            </div>

            <div
              className="
              w-14
              h-14

              rounded-2xl

              bg-white
 
 border
            border-white/80

            shadow-[0_10px_25px_rgba(15,23,42,0.20)]

            backdrop-blur-md
              flex
              items-center
              justify-center
              "
            >

              <TimerReset
                size={24}
                className="
                text-[#1565C0]
                "
              />

            </div>

          </div>

        </div>

        {/* COMPLETED */}

        <div
          className="
          relative
          overflow-hidden

          bg-white

          border
          border-[#E8EDF3]

          rounded-[28px]

          p-5

          shadow-[0_10px_30px_rgba(15,23,42,0.20)]
          "
        >

          <div
            className="
            flex
            items-center
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
                Completed Today
              </p>

              <h2
                className="
                text-3xl
                font-bold
                text-[#1A1A2E]

                mt-3
                "
              >
                16
              </h2>

            </div>

            <div
              className="
              w-14
              h-14

              rounded-2xl

              bg-[#E8F5E9]
 
 border
            border-white/80

            shadow-[0_10px_25px_rgba(15,23,42,0.20)]

            backdrop-blur-md
              flex
              items-center
              justify-center
              "
            >

              <CheckCircle2
                size={24}
                className="
                text-[#1B5E20]
                "
              />

            </div>

          </div>

        </div>

        {/* RATE */}

        <div
          className="
          relative
          overflow-hidden

          bg-white

          border
          border-[#E8EDF3]

          rounded-[28px]

          p-5

          shadow-[0_10px_30px_rgba(15,23,42,0.20)]
          "
        >

          <div
            className="
            flex
            items-center
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
                Acceptance Rate
              </p>

              <h2
                className="
                text-3xl
                font-bold
                text-[#1A1A2E]

                mt-3
                "
              >
                92%
              </h2>

            </div>

            <div
              className="
              w-14
              h-14

              rounded-2xl

              bg-[#F3E8FF]
 
 border
            border-white/80

            shadow-[0_10px_25px_rgba(15,23,42,0.20)]

            backdrop-blur-md
              flex
              items-center
              justify-center
              "
            >

              <TrendingUp
                size={24}
                className="
                text-[#6A1B9A]
                "
              />

            </div>

          </div>

        </div>

      </div>

      {/* LIVE REQUESTS */}

      <section
        className="
        bg-white

        border
        border-[#E8EDF3]

        rounded-[32px]

        p-5
        sm:p-6

        shadow-[0_10px_30px_rgba(15,23,42,0.05)]
        "
      >

        {/* SECTION HEADER */}

        <div
          className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between

          gap-4

          mb-7
          "
        >

          <div>

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
              text-[#5D6D7E]

              mt-2
              "
            >
              Nearby passenger requests
              waiting for response.
            </p>

          </div>

          <div
            className="
            inline-flex
            items-center
            gap-2

            self-start

            px-4
            py-2.5

            rounded-2xl

            bg-[#E8F4FD]

            border
            border-[#D6ECFA]
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
              text-[#1A1A2E]
              "
            >
              {allRideRequestsData.length} Live Requests
            </span>

          </div>

        </div>

        {/* GRID */}

        <div
          className="
          grid
          grid-cols-1
          2xl:grid-cols-2

          gap-6
          "
        >

          {allRideRequestsData.map((ride) => (

            <div
              key={ride.id}

              className="
              transition-all
              duration-300

              hover:-translate-y-1

              rounded-[28px]
              "
            >

              <RideRequestCard
                ride={ride}
              />

            </div>

          ))}

        </div>

      </section>

      {/* SCHEDULED RIDES */}

      <section
        className="
        bg-white

        border
        border-[#E8EDF3]

        rounded-[32px]

        p-5
        sm:p-6

        shadow-[0_10px_30px_rgba(15,23,42,0.05)]
        "
      >

        {/* HEADER */}

        <div
          className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between

          gap-4

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

              <CalendarClock size={14} />

              <span
                className="
                text-xs
                font-semibold
                "
              >
                Upcoming Assignments
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
              Scheduled Rides
            </h2>

            <p
              className="
              text-sm
              text-[#5D6D7E]

              mt-2
              "
            >
              Upcoming rides assigned
              by transport operators.
            </p>

          </div>

        </div>

        {/* GRID */}

        <div
          className="
          grid
          grid-cols-1
          2xl:grid-cols-2

          gap-6
          "
        >

          {scheduledRidesData.map((ride) => (

            <ScheduledRideCard
              key={ride.id}
              ride={ride}
            />

          ))}

        </div>

      </section>

      {/* HISTORY */}

      <RideHistoryTable
        rides={rideHistoryData}
      />

    </div>
  );
}

export default RideRequests;