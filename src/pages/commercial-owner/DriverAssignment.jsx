import {
  UserRound,
  Phone,
  CarFront,
  UserPlus,
} from "lucide-react";

import StatusBadge
from "../../components/utils/StatusBadge";

import {
  driverAssignmentsData,
} from "../../data/driverAssignmentsData";

function DriverAssignment() {

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
            Driver Assignment
          </h1>

          <p
            className="
            text-sm
            text-[#5D6D7E]
            mt-2
            "
          >
            Assign and manage drivers
            for commercial vehicles.
          </p>

        </div>

        {/* BUTTON */}

        <button
          className="
          h-11
          px-5

          inline-flex
          items-center
          justify-center
          gap-2

          rounded-md

          bg-[#BF360C]

          text-white
          text-sm
          font-semibold

          shadow-sm
          "
        >

          <UserPlus size={18} />

          Assign Driver

        </button>

      </div>

      {/* GRID */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
        "
      >

        {driverAssignmentsData.map((item) => (

          <div
            key={item.id}

            className="
            bg-white
            border
            border-[#E0E0E0]

            rounded-2xl
            shadow-sm

            p-6
            "
          >

            {/* TOP */}

            <div
              className="
              flex
              items-start
              justify-between
              gap-4
              "
            >

              <div
                className="
                flex
                items-center
                gap-4
                "
              >

                <div
                  className="
                  w-14
                  h-14

                  rounded-full

                  bg-[#FFF3E0]

                  flex
                  items-center
                  justify-center
                  "
                >

                  <UserRound
                    size={24}
                    className="
                    text-[#BF360C]
                    "
                  />

                </div>

                <div>

                  <h2
                    className="
                    text-base
                    font-semibold
                    text-[#1A1A2E]
                    "
                  >
                    {item.driver}
                  </h2>

                  <p
                    className="
                    text-sm
                    text-[#5D6D7E]
                    mt-1
                    "
                  >
                    Driver ID: {item.id}
                  </p>

                </div>

              </div>

              <StatusBadge
                status={item.status}
              />

            </div>

            {/* DETAILS */}

            <div className="mt-6 space-y-4">

              {/* VEHICLE */}

              <div
                className="
                flex
                items-center
                gap-3
                "
              >

                <CarFront
                  size={18}
                  className="
                  text-[#BF360C]
                  "
                />

                <p
                  className="
                  text-sm
                  text-[#1A1A2E]
                  "
                >
                  {item.vehicle}
                </p>

              </div>

              {/* PHONE */}

              <div
                className="
                flex
                items-center
                gap-3
                "
              >

                <Phone
                  size={18}
                  className="
                  text-[#BF360C]
                  "
                />

                <p
                  className="
                  text-sm
                  text-[#1A1A2E]
                  "
                >
                  {item.phone}
                </p>

              </div>

            </div>

            {/* ACTIONS */}

            <div
              className="
              flex
              items-center
              gap-4

              mt-6
              "
            >

              <button
                className="
                flex-1
                h-11

                rounded-md

                border
                border-[#E0E0E0]

                text-sm
                font-semibold
                "
              >
                Reassign
              </button>

              <button
                className="
                flex-1
                h-11

                rounded-md

                bg-[#BF360C]

                text-white
                text-sm
                font-semibold
                "
              >
                View Details
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default DriverAssignment;