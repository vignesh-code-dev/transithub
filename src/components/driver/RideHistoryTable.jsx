import {
  ArrowUpRight,
  Clock3,
} from "lucide-react";

import StatusBadge
from "../utils/StatusBadge";

function RideHistoryTable({
  rides,
}) {

  return (

    <div
      className="
      bg-white

      border
      border-[#E8EDF3]

      rounded-[28px]

      overflow-hidden

      shadow-[0_10px_30px_rgba(15,23,42,0.05)]
      "
    >

      {/* HEADER */}

      <div
        className="
        flex
        flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between

        gap-4

        px-5
        sm:px-6

        py-5

        border-b
        border-[#EEF2F6]
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

            mb-3
            "
          >

            <Clock3 size={14} />

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
            Ride History
          </h2>

          <p
            className="
            text-sm
            text-[#5D6D7E]

            mt-1
            "
          >
            Track completed, cancelled
            and ongoing ride activity.
          </p>

        </div>

        {/* RIGHT */}

        <div
          className="
          flex
          items-center
          gap-2

          self-start

          px-4
          py-2.5

          rounded-2xl

          bg-[#F8FAFC]

          border
          border-[#EEF2F6]
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
            {rides.length} Total Rides
          </span>

        </div>

      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full min-w-[850px]">

          <thead>

            <tr
              className="
              bg-[#F8FAFC]
              "
            >

              <th
                className="
                text-left

                px-6
                py-4

                text-xs
                tracking-wide
                uppercase

                font-semibold
                text-[#5D6D7E]
                "
              >
                Trip ID
              </th>

              <th
                className="
                text-left

                px-6
                py-4

                text-xs
                tracking-wide
                uppercase

                font-semibold
                text-[#5D6D7E]
                "
              >
                Passenger
              </th>

              <th
                className="
                text-left

                px-6
                py-4

                text-xs
                tracking-wide
                uppercase

                font-semibold
                text-[#5D6D7E]
                "
              >
                Route
              </th>

              <th
                className="
                text-left

                px-6
                py-4

                text-xs
                tracking-wide
                uppercase

                font-semibold
                text-[#5D6D7E]
                "
              >
                Fare
              </th>

              <th
                className="
                text-left

                px-6
                py-4

                text-xs
                tracking-wide
                uppercase

                font-semibold
                text-[#5D6D7E]
                "
              >
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {rides.map((ride) => (

              <tr
                key={ride.id}

                className="
                border-t
                border-[#EEF2F6]

                transition-all
                duration-300

                hover:bg-[#FAFCFB]
                "
              >

                {/* ID */}

                <td
                  className="
                  px-6
                  py-5
                  "
                >

                  <div>

                    <p
                      className="
                      text-sm
                      font-semibold
                      font-mono

                      text-[#1A1A2E]
                      "
                    >
                      {ride.id}
                    </p>

                    <p
                      className="
                      text-xs
                      text-[#5D6D7E]

                      mt-1
                      "
                    >
                      Ride reference
                    </p>

                  </div>

                </td>

                {/* PASSENGER */}

                <td
                  className="
                  px-6
                  py-5
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

                      bg-[#E8F5E9]

                      flex
                      items-center
                      justify-center

                      text-sm
                      font-bold
                      text-[#1B5E20]
                      "
                    >
                      {ride.passenger?.charAt(0)}
                    </div>

                    <div>

                      <p
                        className="
                        text-sm
                        font-semibold
                        text-[#1A1A2E]
                        "
                      >
                        {ride.passenger}
                      </p>

                      <p
                        className="
                        text-xs
                        text-[#5D6D7E]

                        mt-1
                        "
                      >
                        Passenger
                      </p>

                    </div>

                  </div>

                </td>

                {/* ROUTE */}

                <td
                  className="
                  px-6
                  py-5
                  "
                >

                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    "
                  >

                    <span
                      className="
                      text-sm
                      font-medium
                      text-[#1A1A2E]
                      "
                    >
                      {ride.route}
                    </span>

                    <ArrowUpRight
                      size={15}
                      className="
                      text-[#94A3B8]
                      "
                    />

                  </div>

                </td>

                {/* FARE */}

                <td
                  className="
                  px-6
                  py-5
                  "
                >

                  <span
                    className="
                    text-sm
                    font-bold
                    text-[#1B5E20]
                    "
                  >
                    {ride.fare}
                  </span>

                </td>

                {/* STATUS */}

                <td
                  className="
                  px-6
                  py-5
                  "
                >

                  <StatusBadge
                    status={ride.status}
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MOBILE CARDS */}

      <div
        className="
        lg:hidden

        p-4

        space-y-4
        "
      >

        {rides.map((ride) => (

          <div
            key={ride.id}

            className="
            border
            border-[#EEF2F6]

            rounded-3xl

            p-4

            bg-[#FCFDFD]
            "
          >

            {/* TOP */}

            <div
              className="
              flex
              items-start
              justify-between

              gap-3
              "
            >

              <div>

                <p
                  className="
                  text-xs
                  font-mono
                  text-[#5D6D7E]
                  "
                >
                  {ride.id}
                </p>

                <h3
                  className="
                  text-base
                  font-bold
                  text-[#1A1A2E]

                  mt-2
                  "
                >
                  {ride.passenger}
                </h3>

              </div>

              <StatusBadge
                status={ride.status}
              />

            </div>

            {/* ROUTE */}

            <div
              className="
              mt-5

              p-4

              rounded-2xl

              bg-white

              border
              border-[#EEF2F6]
              "
            >

              <p
                className="
                text-xs
                text-[#5D6D7E]
                "
              >
                Route
              </p>

              <p
                className="
                text-sm
                font-semibold
                text-[#1A1A2E]

                mt-1
                "
              >
                {ride.route}
              </p>

            </div>

            {/* BOTTOM */}

            <div
              className="
              flex
              items-center
              justify-between

              mt-4
              "
            >

              <div>

                <p
                  className="
                  text-xs
                  text-[#5D6D7E]
                  "
                >
                  Fare
                </p>

                <p
                  className="
                  text-sm
                  font-bold
                  text-[#1B5E20]

                  mt-1
                  "
                >
                  {ride.fare}
                </p>

              </div>

              <button
                className="
                h-10

                px-4

                rounded-xl

                bg-[#F8FAFC]

                border
                border-[#EEF2F6]

                text-sm
                font-semibold
                text-[#1A1A2E]

                active:scale-[0.98]

                transition-all
                "
              >
                View
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RideHistoryTable;