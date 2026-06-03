import {
  ArrowUpRight,
  MapPin,
} from "lucide-react";

import StatusBadge
from "../utils/StatusBadge";

function RecentTripsTable({
  trips,
}) {

  return (

    <div
      className="
      overflow-hidden
      "
    >

      {/* MOBILE CARDS */}

      <div
        className="
        grid
        grid-cols-1
        gap-4

        lg:hidden
        "
      >

        {trips.map((trip) => (

          <div
            key={trip.id}

            className="
            bg-white

            border
            border-[#EEF2F6]

            rounded-2xl

            p-5

            transition-all
            duration-300

            hover:shadow-[0_15px_35px_rgba(15,23,42,0.06)]
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
                  font-medium

                  text-[#94A3B8]
                  uppercase
                  tracking-wide
                  "
                >
                  Trip ID
                </p>

                <h3
                  className="
                  text-sm
                  font-semibold
                  text-[#1A1A2E]

                  mt-1
                  font-mono
                  "
                >
                  {trip.id}
                </h3>

              </div>

              <StatusBadge
                status={trip.status}
              />

            </div>

            {/* PASSENGER */}

            <div className="mt-5">

              <p
                className="
                text-xs
                font-medium

                text-[#94A3B8]
                uppercase
                tracking-wide
                "
              >
                Passenger
              </p>

              <p
                className="
                text-sm
                font-semibold
                text-[#1A1A2E]

                mt-1
                "
              >
                {trip.passenger}
              </p>

            </div>

            {/* PICKUP */}

            <div
              className="
              mt-5

              flex
              items-start
              gap-3
              "
            >

              <div
                className="
                w-10
                h-10

                rounded-xl

                bg-[#E8F5E9]

                flex
                items-center
                justify-center
                "
              >

                <MapPin
                  size={18}
                  className="
                  text-[#1B5E20]
                  "
                />

              </div>

              <div>

                <p
                  className="
                  text-xs
                  font-medium

                  text-[#94A3B8]
                  uppercase
                  tracking-wide
                  "
                >
                  Pickup
                </p>

                <p
                  className="
                  text-sm
                  font-medium
                  text-[#1A1A2E]

                  mt-1
                  "
                >
                  {trip.pickup}
                </p>

              </div>

            </div>

            {/* BOTTOM */}

            <div
              className="
              mt-5
              pt-5

              border-t
              border-[#EEF2F6]

              flex
              items-center
              justify-between
              "
            >

              <div>

                <p
                  className="
                  text-xs
                  font-medium
                  text-[#94A3B8]
                  "
                >
                  Fare
                </p>

                <h3
                  className="
                  text-lg
                  font-bold
                  text-[#1B5E20]

                  mt-1
                  "
                >
                  {trip.fare}
                </h3>

              </div>

              <button
                className="
                w-10
                h-10

                rounded-xl

                bg-[#F8FAFC]

                border
                border-[#E2E8F0]

                flex
                items-center
                justify-center

                text-[#5D6D7E]

                hover:bg-[#EEF2F6]

                transition-all
                "
              >

                <ArrowUpRight size={18} />

              </button>

            </div>

          </div>

        ))}

      </div>

      {/* DESKTOP TABLE */}

      <div
        className="
        hidden
        lg:block

        overflow-x-auto
        "
      >

        <table
          className="
          w-full
          min-w-[760px]
          "
        >

          <thead>

            <tr
              className="
              border-b
              border-[#EEF2F6]
              "
            >

              <th
                className="
                px-6
                py-4

                text-left

                text-xs
                font-semibold

                uppercase
                tracking-wide

                text-[#94A3B8]
                "
              >
                Trip ID
              </th>

              <th
                className="
                px-6
                py-4

                text-left

                text-xs
                font-semibold

                uppercase
                tracking-wide

                text-[#94A3B8]
                "
              >
                Passenger
              </th>

              <th
                className="
                px-6
                py-4

                text-left

                text-xs
                font-semibold

                uppercase
                tracking-wide

                text-[#94A3B8]
                "
              >
                Pickup
              </th>

              <th
                className="
                px-6
                py-4

                text-left

                text-xs
                font-semibold

                uppercase
                tracking-wide

                text-[#94A3B8]
                "
              >
                Fare
              </th>

              <th
                className="
                px-6
                py-4

                text-left

                text-xs
                font-semibold

                uppercase
                tracking-wide

                text-[#94A3B8]
                "
              >
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {trips.map((trip) => (

              <tr
                key={trip.id}

                className="
                group

                border-b
                border-[#F1F5F9]

                transition-all
                duration-300

                hover:bg-[#FAFCFD]
                "
              >

                {/* ID */}

                <td
                  className="
                  px-6
                  py-5
                  "
                >

                  <span
                    className="
                    text-sm
                    font-semibold

                    font-mono
                    text-[#1A1A2E]
                    "
                  >
                    {trip.id}
                  </span>

                </td>

                {/* PASSENGER */}

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
                      text-[#1A1A2E]
                      "
                    >
                      {trip.passenger}
                    </p>

                    <p
                      className="
                      text-xs
                      text-[#94A3B8]

                      mt-1
                      "
                    >
                      Passenger
                    </p>

                  </div>

                </td>

                {/* PICKUP */}

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
                      w-9
                      h-9

                      rounded-xl

                      bg-[#E8F5E9]

                      flex
                      items-center
                      justify-center
                      "
                    >

                      <MapPin
                        size={16}
                        className="
                        text-[#1B5E20]
                        "
                      />

                    </div>

                    <p
                      className="
                      text-sm
                      font-medium
                      text-[#1A1A2E]
                      "
                    >
                      {trip.pickup}
                    </p>

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
                    text-base
                    font-bold
                    text-[#1B5E20]
                    "
                  >
                    {trip.fare}
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
                    status={trip.status}
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentTripsTable;