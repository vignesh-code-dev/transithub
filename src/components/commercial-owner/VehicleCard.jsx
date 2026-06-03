import {
  Users,
  BadgeIndianRupee,
} from "lucide-react";

import StatusBadge
from "../utils/StatusBadge";

function VehicleCard({
  vehicle,
}) {

  return (

    <div
      className="
      bg-white
      border
      border-[#E0E0E0]

      rounded-2xl
      shadow-sm

      overflow-hidden

      hover:shadow-md
      transition-all
      "
    >

      {/* IMAGE */}

      <div
        className="
        h-52
        overflow-hidden
        "
      >

        <img
          src={vehicle.image}
          alt={vehicle.name}

          className="
          w-full
          h-full

          object-cover
          "
        />

      </div>

      {/* CONTENT */}

      <div className="p-5">

        <div
          className="
          flex
          items-start
          justify-between
          gap-4
          "
        >

          <div>

            <h2
              className="
              text-base
              font-semibold
              text-[#1A1A2E]
              "
            >
              {vehicle.name}
            </h2>

            <p
              className="
              text-sm
              text-[#5D6D7E]
              mt-1
              "
            >
              {vehicle.type}
            </p>

          </div>

          <StatusBadge
            status={vehicle.status}
          />

        </div>

        {/* INFO */}

        <div
          className="
          mt-5
          space-y-3
          "
        >

          <div
            className="
            flex
            items-center
            justify-between
            "
          >

            <span
              className="
              text-sm
              text-[#5D6D7E]
              "
            >
              Registration
            </span>

            <span
              className="
              font-mono
              text-sm
              text-[#1A1A2E]
              "
            >
              {vehicle.regNo}
            </span>

          </div>

          <div
            className="
            flex
            items-center
            justify-between
            "
          >

            <div
              className="
              flex
              items-center
              gap-2
              "
            >

              <Users
                size={16}
                className="
                text-[#BF360C]
                "
              />

              <span
                className="
                text-sm
                text-[#5D6D7E]
                "
              >
                Capacity
              </span>

            </div>

            <span
              className="
              text-sm
              font-medium
              text-[#1A1A2E]
              "
            >
              {vehicle.capacity}
            </span>

          </div>

          <div
            className="
            flex
            items-center
            justify-between
            "
          >

            <div
              className="
              flex
              items-center
              gap-2
              "
            >

              <BadgeIndianRupee
                size={16}
                className="
                text-[#BF360C]
                "
              />

              <span
                className="
                text-sm
                text-[#5D6D7E]
                "
              >
                Price
              </span>

            </div>

            <span
              className="
              text-sm
              font-medium
              text-[#1A1A2E]
              "
            >
              {vehicle.pricePerKm}
            </span>

          </div>

        </div>

        {/* ACTIONS */}

        <div
          className="
          flex
          items-center
          gap-3

          mt-6
          "
        >

          <button
            className="
            flex-1
            h-10

            rounded-md

            border
            border-[#BF360C]

            text-[#BF360C]
            text-sm
            font-semibold
            "
          >
            Edit
          </button>

          <button
            className="
            flex-1
            h-10

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

    </div>
  );
}

export default VehicleCard;