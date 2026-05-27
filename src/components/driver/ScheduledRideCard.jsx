import {
  CalendarDays,
  MapPin,
} from "lucide-react";

import StatusBadge
from "../utils/StatusBadge";

function ScheduledRideCard({
  ride,
}) {

  return (

    <div
      className="
      bg-white
      border
      border-[#E0E0E0]

      rounded-md
      shadow-sm

      p-5
      "
    >

      {/* TOP */}

      <div
        className="
        flex
        items-start
        justify-between
        mb-5
        "
      >

        <div>

          <h2
            className="
            text-lg
            font-semibold
            text-[#1A1A2E]
            "
          >
            Scheduled Ride
          </h2>

          <p
            className="
            text-sm
            text-[#5D6D7E]
            mt-1
            "
          >
            {ride.id}
          </p>

        </div>

        <StatusBadge
          status={ride.status}
        />

      </div>

      {/* DETAILS */}

      <div className="space-y-4">

        <div>

          <p
            className="
            text-xs
            text-[#5D6D7E]
            "
          >
            Passenger
          </p>

          <p
            className="
            text-sm
            font-medium
            text-[#1A1A2E]
            mt-1
            "
          >
            {ride.passenger}
          </p>

        </div>

        {/* PICKUP */}

        <div className="flex gap-3">

          <MapPin
            size={18}
            className="
            text-[#1B5E20]
            mt-0.5
            "
          />

          <div>

            <p
              className="
              text-xs
              text-[#5D6D7E]
              "
            >
              Pickup
            </p>

            <p
              className="
              text-sm
              font-medium
              text-[#1A1A2E]
              "
            >
              {ride.pickup}
            </p>

          </div>

        </div>

        {/* DROP */}

        <div className="flex gap-3">

          <MapPin
            size={18}
            className="
            text-[#C62828]
            mt-0.5
            "
          />

          <div>

            <p
              className="
              text-xs
              text-[#5D6D7E]
              "
            >
              Drop
            </p>

            <p
              className="
              text-sm
              font-medium
              text-[#1A1A2E]
              "
            >
              {ride.drop}
            </p>

          </div>

        </div>

        {/* TIME */}

        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          <CalendarDays
            size={18}
            className="
            text-[#1565C0]
            "
          />

          <div>

            <p
              className="
              text-xs
              text-[#5D6D7E]
              "
            >
              Schedule
            </p>

            <p
              className="
              text-sm
              font-medium
              text-[#1A1A2E]
              "
            >
              {ride.time}
            </p>

          </div>

        </div>

      </div>

      {/* ACTION */}

      <button
        className="
        w-full
        h-11

        mt-6

        rounded-md

        bg-[#1B5E20]

        text-white
        text-sm
        font-semibold

        hover:bg-[#2E7D32]

        transition-all
        "
      >
        Confirm Ride
      </button>

    </div>
  );
}

export default ScheduledRideCard;