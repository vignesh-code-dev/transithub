import {
  CalendarDays,
  MapPin,
  Clock3,
  ArrowRight,
} from "lucide-react";

import StatusBadge
from "../utils/StatusBadge";

function ScheduledRideCard({
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
      border-[#E8EDF3]

      rounded-[28px]

      p-4
      sm:p-5
      lg:p-6

      transition-all
      duration-300

      hover:-translate-y-1
      hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]
      "
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
        absolute
        top-0
        right-0

        w-48
        h-48

        bg-[#E8F5E9]

        rounded-full

        blur-3xl
        opacity-30

        -translate-y-20
        translate-x-20
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">

        {/* TOP */}

        <div
          className="
          flex
          items-start
          justify-between

          gap-4

          mb-6
          "
        >

          {/* LEFT */}

          <div>

            {/* SMALL BADGE */}

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

              mb-4
              "
            >

              <Clock3 size={14} />

              <span
                className="
                text-xs
                font-semibold
                "
              >
                Scheduled Ride
              </span>

            </div>

            {/* TITLE */}

            <h2
              className="
              text-lg
              sm:text-xl

              font-bold
              text-[#1A1A2E]
              "
            >
              Upcoming Booking
            </h2>

            {/* ID */}

            <p
              className="
              text-xs
              sm:text-sm

              font-mono
              text-[#5D6D7E]

              mt-2
              "
            >
              {ride.id}
            </p>

          </div>

          {/* STATUS */}

          <StatusBadge
            status={ride.status}
          />

        </div>

        {/* PASSENGER */}

        <div
          className="
          flex
          items-center
          justify-between

          rounded-2xl

          border
          border-[#EEF2F6]

          bg-[#F8FAFC]

          p-4

          mb-5
          "
        >

          <div>

            <p
              className="
              text-xs
              font-medium
              text-[#5D6D7E]
              "
            >
              Passenger
            </p>

            <h3
              className="
              text-sm
              sm:text-[15px]

              font-semibold
              text-[#1A1A2E]

              mt-1
              "
            >
              {ride.passenger}
            </h3>

          </div>

          <div
            className="
            w-11
            h-11

            rounded-2xl

            bg-white

            border
            border-[#E2E8F0]

            flex
            items-center
            justify-center
            "
          >

            <span
              className="
              text-sm
              font-bold
              text-[#1B5E20]
              "
            >
              {ride.passenger?.charAt(0)}
            </span>

          </div>

        </div>

        {/* ROUTE SECTION */}

        <div
          className="
          relative

          rounded-2xl

          border
          border-[#EEF2F6]

          bg-gradient-to-b
          from-[#FCFDFD]
          to-[#F8FAFC]

          p-4
          "
        >

          {/* PICKUP */}

          <div
            className="
            flex
            items-start
            gap-4
            "
          >

            <div
              className="
              w-11
              h-11

              rounded-2xl

              bg-[#E8F5E9]

              flex
              items-center
              justify-center

              shrink-0
              "
            >

              <MapPin
                size={18}
                className="
                text-[#1B5E20]
                "
              />

            </div>

            <div className="min-w-0">

              <p
                className="
                text-xs
                font-medium
                text-[#5D6D7E]
                "
              >
                Pickup Location
              </p>

              <p
                className="
                text-sm
                sm:text-[15px]

                leading-6

                font-semibold
                text-[#1A1A2E]

                mt-1
                "
              >
                {ride.pickup}
              </p>

            </div>

          </div>

          {/* CONNECTOR */}

          <div
            className="
            ml-5

            h-8
            w-[1.5px]

            bg-[#DCE3EA]
            "
          />

          {/* DROP */}

          <div
            className="
            flex
            items-start
            gap-4
            "
          >

            <div
              className="
              w-11
              h-11

              rounded-2xl

              bg-[#FFEBEE]

              flex
              items-center
              justify-center

              shrink-0
              "
            >

              <MapPin
                size={18}
                className="
                text-[#C62828]
                "
              />

            </div>

            <div className="min-w-0">

              <p
                className="
                text-xs
                font-medium
                text-[#5D6D7E]
                "
              >
                Drop Location
              </p>

              <p
                className="
                text-sm
                sm:text-[15px]

                leading-6

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

        {/* TIME */}

        <div
          className="
          flex
          items-center
          justify-between

          rounded-2xl

          bg-[#E8F4FD]

          border
          border-[#D7EAF8]

          p-4

          mt-5
          "
        >

          <div
            className="
            flex
            items-center
            gap-3
            "
          >

            <div
              className="
              w-11
              h-11

              rounded-2xl

              bg-white

              flex
              items-center
              justify-center
              "
            >

              <CalendarDays
                size={18}
                className="
                text-[#1565C0]
                "
              />

            </div>

            <div>

              <p
                className="
                text-xs
                font-medium
                text-[#5D6D7E]
                "
              >
                Scheduled Time
              </p>

              <p
                className="
                text-sm
                sm:text-[15px]

                font-semibold
                text-[#1A1A2E]

                mt-1
                "
              >
                {ride.time}
              </p>

            </div>

          </div>

          <ArrowRight
            size={18}
            className="
            text-[#94A3B8]
            "
          />

        </div>

        {/* ACTION */}

        <button
          className="
          group/button

          w-full
          h-12

          mt-6

          rounded-2xl

          bg-[#1B5E20]
          shadow-[0_10px_15px_rgba(27,94,32,0.4)]
          hover:[shadow-[0_15px_35px_rgba(27,94,32,0.35)]

          text-white
          text-sm
          font-semibold

          flex
          items-center
          justify-center
          gap-2

          transition-all
          duration-300

          hover:bg-[#2E7D32]
          hover:shadow-[0_12px_24px_rgba(27,94,32,0.25)]

          active:scale-[0.99]
          "
        >

          Confirm Scheduled Ride

          <ArrowRight
            size={16}
            className="
            transition-transform
            duration-300

            group-hover/button:translate-x-1
            "
          />

        </button>

      </div>

    </div>
  );
}

export default ScheduledRideCard;