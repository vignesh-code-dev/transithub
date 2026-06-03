import {
  Activity,
  TimerReset,
  CheckCircle2,
  TrendingUp,
  Zap,
} from "lucide-react";

import RideRequestCard from "../../components/driver/RideRequestCard";

import {
  allRideRequestsData,
} from "../../data/allRideRequestsData";

function ActiveRequests() {
  return (
    <div className="space-y-8">

      {/* HERO */}

      <div
        className="
        relative
        overflow-hidden

        bg-gradient-to-br
        from-white
        via-white
        to-green-50

        border
        border-[#E8EDF3]

        rounded-[32px]

        shadow-[0_10px_30px_rgba(15,23,42,0.20)]

        p-5
        sm:p-7
        xl:p-8
        "
      >

        <div
          className="
          absolute
          -top-24
          -right-16

          w-80
          h-80

          rounded-full

          bg-[#E8F5E9]

          blur-3xl
          opacity-70
          "
        />

        <div className="relative z-10">

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
            <Zap size={14} />

            <span className="text-xs font-semibold">
              Real-Time Operations
            </span>
          </div>

          <h1
            className="
            text-2xl
            sm:text-3xl

            font-bold
            text-[#1A1A2E]
            "
          >
            Active Requests
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
            Monitor incoming ride requests,
            accept trips faster and keep your
            ride queue optimized in real-time.
          </p>

        </div>

      </div>

      {/* STATS */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4

        gap-5
        "
      >

        <div
          className="
          bg-white

          border
          border-[#E8EDF3]

          rounded-[28px]

          p-5

          shadow-[0_10px_30px_rgba(15,23,42,0.20)]
          "
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-[#5D6D7E]">
                Live Requests
              </p>

              <h2
                className="
                text-3xl
                font-bold
                text-[#1A1A2E]

                mt-3
                "
              >
                {allRideRequestsData.length}
              </h2>
            </div>

            <div
              className="
              w-14
              h-14

              rounded-2xl

              bg-[#E8F5E9]

              flex
              items-center
              justify-center
              "
            >
              <Activity
                size={24}
                className="text-[#1B5E20]"
              />
            </div>

          </div>
        </div>

        <div
          className="
          bg-[#E8F4FD]

          border
          border-[#D6ECFA]

          rounded-[28px]

          p-5

          shadow-[0_10px_30px_rgba(15,23,42,0.20)]
          "
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-[#5D6D7E]">
                Active Queue
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

              flex
              items-center
              justify-center
              "
            >
              <TimerReset
                size={24}
                className="text-[#1565C0]"
              />
            </div>

          </div>
        </div>

        <div
          className="
          bg-white

          border
          border-[#E8EDF3]

          rounded-[28px]

          p-5

          shadow-[0_10px_30px_rgba(15,23,42,0.20)]
          "
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-[#5D6D7E]">
                Accepted Today
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

              flex
              items-center
              justify-center
              "
            >
              <CheckCircle2
                size={24}
                className="text-[#1B5E20]"
              />
            </div>

          </div>
        </div>

        <div
          className="
          bg-white

          border
          border-[#E8EDF3]

          rounded-[28px]

          p-5

          shadow-[0_10px_30px_rgba(15,23,42,0.20)]
          "
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-[#5D6D7E]">
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

              flex
              items-center
              justify-center
              "
            >
              <TrendingUp
                size={24}
                className="text-[#6A1B9A]"
              />
            </div>

          </div>
        </div>

      </div>

      {/* ACTIVE REQUESTS */}

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
              Active Ride Requests
            </h2>

            <p
              className="
              text-sm
              text-[#5D6D7E]

              mt-2
              "
            >
              Passenger requests waiting
              for your response.
            </p>

          </div>

          <div
            className="
            inline-flex
            items-center
            gap-2

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
              {allRideRequestsData.length} Active
            </span>
          </div>

        </div>

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
              <RideRequestCard ride={ride} />
            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default ActiveRequests;