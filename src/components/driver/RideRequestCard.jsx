import {
  MapPin,
  IndianRupee,
  TimerReset,
  Navigation,
  ArrowRight,
} from "lucide-react";

import StatusBadge
from "../utils/StatusBadge";

function  RideRequestCard({
  ride,
}) {

  return (

    <div
      className="
      group

      relative
      overflow-hidden

      bg-white

      border
      border-[#E8ECF2]

      rounded-[24px]

      p-5
      lg:p-6

      shadow-[0_10px_30px_rgba(15,23,42,0.05)]

      transition-all
      duration-300

      hover:-translate-y-1
      hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]
      "
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
        absolute
        top-0
        right-0

        w-40
        h-40

        bg-[#E8F5E9]

        rounded-full

        blur-3xl
        opacity-50

        translate-x-16
        -translate-y-16

        transition-all
        duration-500

        group-hover:scale-125
        "
      />

      {/* HEADER */}

      <div
        className="
        relative
        z-10

        flex
        items-start
        justify-between

        gap-4
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

            bg-[#FFF8E1]

            text-[#E65100]
            text-xs
            font-semibold

            mb-4
            "
          >

            <span
              className="
              w-2
              h-2

              rounded-full
              bg-[#FB8C00]

              animate-pulse
              "
            />

            Incoming Request

          </div>

          <h2
            className="
            text-[20px]
            leading-7

            font-semibold
            text-[#1A1A2E]
            "
          >
            New Ride Request
          </h2>

          <p
            className="
            text-sm
            text-[#5D6D7E]

            mt-1
            "
          >
            Passenger waiting nearby
          </p>

        </div>

        {/* TIMER */}

        <div
          className="
          shrink-0

          flex
          items-center
          gap-2

          px-4
          py-2

          rounded-2xl

          bg-[#FFF8E1]
          border
          border-[#FFE082]
          "
        >

          <TimerReset
            size={16}
            className="
            text-[#E65100]
            "
          />

          <span
            className="
            text-sm
            font-bold
            text-[#E65100]
            "
          >
            {ride.timer}s
          </span>

        </div>

      </div>

      {/* ROUTE SECTION */}

      <div
        className="
        relative
        z-10

        mt-7
        "
      >

        {/* LINE */}

        <div
          className="
          absolute
          left-[11px]
          top-5
          bottom-5

          w-[2px]

          bg-gradient-to-b
          from-[#1B5E20]
          to-[#C62828]
          "
        />

        <div className="space-y-6">

          {/* PICKUP */}

          <div className="flex gap-4">

            <div
              className="
              relative
              z-10

              w-6
              h-6

              rounded-full

              bg-[#E8F5E9]

              flex
              items-center
              justify-center

              border-4
              border-white
              "
            >

              <MapPin
                size={12}
                className="
                text-[#1B5E20]
                "
              />

            </div>

            <div className="flex-1">

              <p
                className="
                text-xs
                font-medium
                uppercase
                tracking-wide

                text-[#5D6D7E]
                "
              >
                Pickup Location
              </p>

              <p
                className="
                text-sm
                lg:text-[15px]

                font-semibold
                text-[#1A1A2E]

                mt-1
                "
              >
                {ride.pickup}
              </p>

            </div>

          </div>

          {/* DROP */}

          <div className="flex gap-4">

            <div
              className="
              relative
              z-10

              w-6
              h-6

              rounded-full

              bg-[#FFEBEE]

              flex
              items-center
              justify-center

              border-4
              border-white
              "
            >

              <Navigation
                size={12}
                className="
                text-[#C62828]
                "
              />

            </div>

            <div className="flex-1">

              <p
                className="
                text-xs
                font-medium
                uppercase
                tracking-wide

                text-[#5D6D7E]
                "
              >
                Drop Location
              </p>

              <p
                className="
                text-sm
                lg:text-[15px]

                font-semibold
                text-[#1A1A2E]

                mt-1
                "
              >
                {ride.drop}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* INFO GRID */}

      <div
        className="
        relative
        z-10

        grid
        grid-cols-2

        gap-4

        mt-7
        "
      >

        {/* FARE */}

        <div
          className="
          bg-[#F8FAFC]
          border
          border-[#EEF2F6]

          rounded-2xl

          p-4
          "
        >

          <div
            className="
            flex
            items-center
            gap-2
            "
          >

            <IndianRupee
              size={16}
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
              Estimated Fare
            </p>

          </div>

          <h3
            className="
            text-xl
            font-bold
            text-[#1A1A2E]

            mt-3
            "
          >
            {ride.fare}
          </h3>

        </div>

        {/* DISTANCE */}

        <div
          className="
          bg-[#F8FAFC]
          border
          border-[#EEF2F6]

          rounded-2xl

          p-4
          "
        >

          <p
            className="
            text-xs
            font-medium
            text-[#5D6D7E]
            "
          >
            Distance to Pickup
          </p>

          <h3
            className="
            text-xl
            font-bold
            text-[#1A1A2E]

            mt-3
            "
          >
            {ride.distance}
          </h3>

        </div>

      </div>

      {/* STATUS */}

      <div
        className="
        relative
        z-10

        mt-6
        "
      >

        <StatusBadge status="pending" />

      </div>

      {/* ACTIONS */}

      <div
        className="
        relative
        z-10

        flex
        gap-3

        mt-7
        "
      >

        <button
          className="
          flex-1
          h-12

          rounded-2xl

          border
          border-[#E2E8F0]

          bg-white

          text-sm
          font-semibold
          text-[#5D6D7E]

          transition-all
          duration-300

          hover:bg-[#F8FAFC]
          hover:border-[#CBD5E1]
          "
        >
          Decline
        </button>

        <button
          className="
          flex-1
          h-12

          rounded-2xl

          bg-[#1B5E20]
          shadow-[0_13px_15px_rgba(27,94,32,0.4)]
          hover:[shadow-[0_15px_35px_rgba(27,94,32,0.25)]
          text-sm
          font-semibold
          text-white

          transition-all
          duration-300

          hover:bg-[#2E7D32]


          inline-flex
          items-center
          justify-center
          gap-2
          "
        >

          Accept Ride

          <ArrowRight size={16} />

        </button>

      </div>

    </div>
  );
}

export default RideRequestCard;