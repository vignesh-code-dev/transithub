import {
  Navigation2,
  MapPinned,
  Phone,
  CircleCheck,
   ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useState } from "react";

import AlternateRoutesPanel
from "../../components/driver/AlternateRoutesPanel";

import { alternateRoutesData }
from "../../data/alternateRoutesData";

import StatusBadge
from "../../components/utils/StatusBadge";

import { navigationTripData }
from "../../data/navigationTripData";

function Navigation() {

    const [trafficEnabled, setTrafficEnabled] =
  useState(true);
  return (

    <div>

      {/* PAGE HEADER */}

      <div className="mb-8">

        <h1
          className="
          text-3xl
          font-bold
          text-[#1A1A2E]
          "
        >
          Navigation
        </h1>

        <p
          className="
          text-[#5D6D7E]
          mt-2
          "
        >
          Manage active trip navigation and trip progress.
        </p>

      </div>

      {/* TOP GRID */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        "
      >

        {/* LEFT */}

        <div className="xl:col-span-2">

          {/* MAP PLACEHOLDER */}

          <div
            className="
            bg-[#E8F4FD]
            border
            border-[#AED6F1]

            rounded-md

            h-[500px]

            flex
            items-center
            justify-center

            text-[#1A1A2E]
            font-medium
            "
          >

            Live Navigation Map

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-6">


{/* TRAFFIC TOGGLE */}

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

  <div
    className="
    flex
    items-center
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
        Traffic Layer
      </h2>

      <p
        className="
        text-sm
        text-[#5D6D7E]
        mt-1
        "
      >
        Enable live traffic overlay.
      </p>

    </div>

    <button
      onClick={() =>
        setTrafficEnabled(
          !trafficEnabled
        )
      }
    >

      {trafficEnabled ? (

        <ToggleRight
          size={42}
          className="
          text-[#43A047]
          "
        />

      ) : (

        <ToggleLeft
          size={42}
          className="
          text-[#B0BEC5]
          "
        />

      )}

    </button>

  </div>

</div>




          {/* ACTIVE TRIP */}

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

            <div
              className="
              flex
              items-center
              justify-between
              mb-5
              "
            >

              <h2
                className="
                text-xl
                font-semibold
                text-[#1A1A2E]
                "
              >
                Active Trip
              </h2>

              <StatusBadge
                status="active"
              />

            </div>

            {/* TRIP INFO */}

            <div className="space-y-5">

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
                  {navigationTripData.passenger}
                </p>

              </div>

              <div>

                <p
                  className="
                  text-xs
                  text-[#5D6D7E]
                  "
                >
                  Pickup Location
                </p>

                <p
                  className="
                  text-sm
                  font-medium
                  text-[#1A1A2E]
                  mt-1
                  "
                >
                  {navigationTripData.pickup}
                </p>

              </div>

              <div>

                <p
                  className="
                  text-xs
                  text-[#5D6D7E]
                  "
                >
                  Drop Location
                </p>

                <p
                  className="
                  text-sm
                  font-medium
                  text-[#1A1A2E]
                  mt-1
                  "
                >
                  {navigationTripData.drop}
                </p>

              </div>

            </div>

          </div>

          {/* ETA CARD */}

          <div
            className="
            bg-[#E8F4FD]
            border
            border-[#AED6F1]

            rounded-md
            p-5
            "
          >

            <div
              className="
              flex
              items-center
              gap-3
              "
            >

              <Navigation2
                size={22}
                className="
                text-[#1B5E20]
                "
              />

              <div>

                <p
                  className="
                  text-sm
                  text-[#5D6D7E]
                  "
                >
                  Estimated Arrival
                </p>

                <h2
                  className="
                  text-2xl
                  font-bold
                  text-[#1A1A2E]
                  mt-1
                  "
                >
                  {navigationTripData.eta}
                </h2>

              </div>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="space-y-3">

            <button
              className="
              w-full
              h-11

              rounded-md

              bg-[#1B5E20]

              text-white
              text-sm
              font-semibold

              hover:bg-[#2E7D32]

              transition-all
              "
            >
              Start Navigation
            </button>

            <button
              className="
              w-full
              h-11

              rounded-md

              bg-[#1565C0]

              text-white
              text-sm
              font-semibold

              transition-all
              "
            >
              Confirm Pickup
            </button>




            <button
              className="
              w-full
              h-11

              rounded-md

              bg-[#C62828]

              text-white
              text-sm
              font-semibold

              transition-all
              "
            >
              End Trip
            </button>



          </div>

        </div>

      </div>

    </div>
  );
}

export default Navigation;