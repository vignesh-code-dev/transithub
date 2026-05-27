import {
  MapPin,
  IndianRupee,
  TimerReset,
} from "lucide-react";
import StatusBadge from "../utils/StatusBadge";

function RideRequestCard({
  ride,
}) {

  return (

    <div
      className="
      bg-white
      rounded-xl
      border
      border-[#E0E0E0]
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
            New Ride Request
          </h2>

          <p
            className="
            text-sm
            text-[#5D6D7E]
            mt-1
            "
          >
            Nearby passenger request
          </p>
<div className="mt-3">

  <StatusBadge status="pending" />

</div>
        </div>

        {/* TIMER */}

        <div
          className="
          flex
          items-center
          gap-1

          px-3
          py-1

          rounded-full

          bg-[#FFF8E1]
          "
        >

          <TimerReset
            size={16}
            className="text-[#E65100]"
          />

          <span
            className="
            text-sm
            font-medium
            text-[#E65100]
            "
          >
            {ride.timer}s
          </span>

        </div>

      </div>

      {/* RIDE DETAILS */}

      <div className="mt-5 space-y-4">

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

      </div>

      {/* BOTTOM */}

      <div
        className="
        flex
        items-center
        justify-between

        mt-6
        "
      >

        {/* FARE */}

        <div
          className="
          flex
          items-center
          gap-2
          "
        >

          <IndianRupee
            size={18}
            className="
            text-[#1B5E20]
            "
          />

          <div>

            <p
              className="
              text-xs
              text-[#5D6D7E]
              "
            >
              Estimated Fare
            </p>

            <p
              className="
              text-sm
              font-semibold
              text-[#1A1A2E]
              "
            >
              {ride.fare}
            </p>

          </div>

        </div>

        {/* DISTANCE */}

        <div>

          <p
            className="
            text-xs
            text-[#5D6D7E]
            "
          >
            Distance
          </p>

          <p
            className="
            text-sm
            font-semibold
            text-[#1A1A2E]
            "
          >
            {ride.distance}
          </p>

        </div>

      </div>

      {/* ACTIONS */}

      <div
        className="
        flex
        gap-3
        mt-6
        "
      >

        <button
          className="
          flex-1
          h-11

          rounded-lg

          border
          border-[#E0E0E0]

          text-sm
          font-semibold
          text-[#5D6D7E]

          hover:bg-[#F5F5F5]

          transition-all
          "
        >
          Decline
        </button>

        <button
          className="
          flex-1
          h-11

          rounded-lg

          bg-[#1B5E20]

          text-sm
          font-semibold
          text-white

          hover:bg-[#2E7D32]

          transition-all
          "
        >
          Accept Ride
        </button>

      </div>

    </div>
  );
}

export default RideRequestCard;