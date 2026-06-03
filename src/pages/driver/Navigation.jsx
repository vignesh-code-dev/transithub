import {
  Navigation2,
  MapPinned,
  Route,
  Phone,
  TrafficCone,
  TimerReset,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

import { useState } from "react";

import AlternateRoutesPanel
from "../../components/driver/AlternateRoutesPanel";

import StatusBadge
from "../../components/utils/StatusBadge";

import {
  alternateRoutesData,
} from "../../data/alternateRoutesData";

import {
  navigationTripData,
} from "../../data/navigationTripData";

function Navigation() {

  const [trafficEnabled, setTrafficEnabled] =
    useState(true);

  return (

    <div
      className="
      space-y-5
      sm:space-y-6
      xl:space-y-8

      pb-6
      sm:pb-8
      "
    >

      {/* HERO */}

      <div
        className="
        relative
        overflow-hidden

        bg-white

        border
        border-[#E8EDF3]

        rounded-[28px]
        sm:rounded-[32px]

        shadow-[0_10px_30px_rgba(15,23,42,0.20)]

        p-4
        sm:p-6
        lg:p-7
        xl:p-8
        "
      >

        {/* DECOR */}

        <div
          className="
          absolute
          -top-24
          right-0

          w-72
          h-72

          rounded-full

          bg-[#E8F5E9]

          blur-3xl
          opacity-70
          "
        />

        <div
          className="
          relative
          z-10

          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between

          gap-5
          lg:gap-8
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

              mb-5
              "
            >

              <Navigation2 size={14} />

              <span
                className="
                text-xs
                font-semibold
                "
              >
                Live Navigation Active
              </span>

            </div>

            <h1
              className="
              text-2xl
              sm:text-3xl

              leading-tight

              font-bold
              text-[#1A1A2E]
              "
            >
              Navigation Center
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
              Monitor active trips, traffic updates,
              alternate routes and navigation controls
              in real-time.
            </p>

          </div>

          {/* QUICK STATS */}

          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2

            gap-4

            w-full
            sm:w-auto
            "
          >

            {/* ETA */}

            <div
              className="
              bg-[#F8FAFC]

              border
              border-[#E8EDF3]

              rounded-2xl
              sm:rounded-3xl

              p-4
              sm:p-5

              min-w-[170px]
              "
            >

              <div
                className="
                flex
                items-center
                gap-2
                "
              >

                <TimerReset
                  size={15}
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
                  Estimated ETA
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
                {navigationTripData.eta}
              </h3>

            </div>

            {/* STATUS */}

            <div
              className="
              bg-[#F8FAFC]

              border
              border-[#E8EDF3]

              rounded-2xl
              sm:rounded-3xl

              p-4
              sm:p-5

              min-w-[170px]
              "
            >

              <div
                className="
                flex
                items-center
                gap-2
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

                <p
                  className="
                  text-xs
                  font-medium
                  text-[#5D6D7E]
                  "
                >
                  Trip Status
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
                En Route
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* MAIN GRID */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-[1.5fr_0.9fr]

        gap-6
        "
      >

        {/* LEFT */}

        <div
          className="
          space-y-6
          
          "
        >

          {/* MAP */}

          <div
            className="
            relative
            overflow-hidden

            bg-[#E8F4FD]

            border
            border-[#D6ECFA]

            rounded-[28px]
            sm:rounded-[32px]

            h-[320px]
            sm:h-[420px]
            xl:h-[540px]

        shadow-[0_10px_30px_rgba(15,23,42,0.20)]
            "
          >

            {/* GRID */}

            <div
              className="
              absolute
              inset-0

              opacity-[0.08]

              bg-[linear-gradient(to_right,#1B5E20_1px,transparent_1px),linear-gradient(to_bottom,#1B5E20_1px,transparent_1px)]

              bg-[size:36px_36px]
              "
            />

            {/* CONTENT */}

            <div
              className="
              relative

              w-full
              h-full

              flex
              flex-col
              items-center
              justify-center

              text-center

              p-6
              "
            >
              

              <div
                className="
                w-20
                h-20

                rounded-[28px]

                bg-white

                flex
                items-center
                justify-center

                shadow-lg
                "
              >

                <MapPinned
                  size={34}
                  className="
                  text-[#1B5E20]
                  "
                />

              </div>

              <h2
                className="
                text-2xl
                font-bold
                text-[#1A1A2E]

                mt-6
                "
              >
                Live Navigation Map
              </h2>

              <p
                className="
                text-sm
                sm:text-base

                text-[#5D6D7E]

                mt-3
                max-w-md
                "
              >
                Real-time route tracking,
                traffic visualization and
                live driver navigation area.
              </p>

            </div>

          </div>

          {/* ROUTES */}

          <AlternateRoutesPanel
            routes={alternateRoutesData}
          />

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          {/* TRAFFIC */}

          <div
            className="
            bg-white

            border
            border-[#E8EDF3]

            rounded-3xl

            p-5

        shadow-[0_10px_30px_rgba(15,23,42,0.20)]
            "
          >

            <div
              className="
              flex
              items-start
              justify-between

              gap-4
              "
            >

              <div>

                <div
                  className="
                  w-14
                  h-14

                  rounded-2xl

                  bg-[#FFF8E1]

                  flex
                  items-center
                  justify-center

                  mb-4
                  "
                >

                  <TrafficCone
                    size={24}
                    className="
                    text-[#E65100]
                    "
                  />

                </div>

                <h2
                  className="
                  text-xl
                  font-bold
                  text-[#1A1A2E]
                  "
                >
                  Traffic Layer
                </h2>

                <p
                  className="
                  text-sm
                  text-[#5D6D7E]

                  mt-2
                  "
                >
                  Enable real-time traffic
                  overlays and congestion alerts.
                </p>

              </div>

              <button
                onClick={() =>
                  setTrafficEnabled(
                    !trafficEnabled
                  )
                }

                className="
                shrink-0
                "
              >

                {trafficEnabled ? (

                  <ToggleRight
                    size={38}
                    className="
                    text-[#43A047]
                    "
                  />

                ) : (

                  <ToggleLeft
                    size={38}
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
            border-[#E8EDF3]

            rounded-3xl

            p-5

                    shadow-[0_10px_30px_rgba(15,23,42,0.20)]

            "
          >

            {/* HEADER */}

            <div
              className="
              flex
              items-start
              justify-between

              gap-4

              mb-6
              "
            >

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

                  mb-4
                  "
                >

                  <Route size={14} />

                  <span
                    className="
                    text-xs
                    font-semibold
                    "
                  >
                    Active Trip
                  </span>

                </div>

                <h2
                  className="
                  text-xl
                  font-bold
                  text-[#1A1A2E]
                  "
                >
                  Trip Overview
                </h2>

              </div>

              <StatusBadge
                status="active"
              />

            </div>

            {/* PASSENGER */}

            <div
              className="
              flex
              items-center
              gap-4

              p-4

              rounded-3xl

              bg-[#F8FAFC]

              border
              border-[#EEF2F6]
              "
            >

              <div
                className="
                w-14
                h-14

                rounded-2xl

                bg-[#E8F5E9]

                flex
                items-center
                justify-center

                text-lg
                font-bold
                text-[#1B5E20]
                "
              >
                {navigationTripData.passenger?.charAt(0)}
              </div>

              <div className="flex-1">

                <p
                  className="
                  text-xs
                  text-[#5D6D7E]
                  "
                >
                  Passenger
                </p>

                <h3
                  className="
                  text-base
                  font-semibold
                  text-[#1A1A2E]

                  mt-1
                  "
                >
                  {navigationTripData.passenger}
                </h3>

              </div>

              <button
                className="
                w-11
                h-11

                rounded-2xl

                bg-white

                border
                border-[#EEF2F6]

                flex
                items-center
                justify-center

                transition-all
                hover:scale-105
                "
              >

                <Phone
                  size={18}
                  className="
                  text-[#1B5E20]
                  "
                />

              </button>

            </div>

            {/* LOCATIONS */}

            <div
              className="
              mt-6
              space-y-5
              "
            >

              {/* PICKUP */}

              <div
                className="
                flex
                gap-4
                "
              >

                <div
                  className="
                  flex
                  flex-col
                  items-center
                  "
                >

                  <div
                    className="
                    w-10
                    h-10

                    rounded-2xl

                    bg-[#E8F5E9]

                    flex
                    items-center
                    justify-center
                    "
                  >

                    <MapPinned
                      size={18}
                      className="
                      text-[#1B5E20]
                      "
                    />

                  </div>

                  <div
                    className="
                    w-[2px]
                    flex-1

                    bg-[#DCE7E2]

                    mt-2
                    "
                  />

                </div>

                <div className="pt-1">

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
                    font-semibold
                    text-[#1A1A2E]

                    mt-1
                    "
                  >
                    {navigationTripData.pickup}
                  </p>

                </div>

              </div>

              {/* DROP */}

              <div
                className="
                flex
                gap-4
                "
              >

                <div
                  className="
                  w-10
                  h-10

                  rounded-2xl

                  bg-[#FFEBEE]

                  flex
                  items-center
                  justify-center
                  shrink-0
                  "
                >

                  <Navigation2
                    size={18}
                    className="
                    text-[#C62828]
                    "
                  />

                </div>

                <div className="pt-1">

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
                    font-semibold
                    text-[#1A1A2E]

                    mt-1
                    "
                  >
                    {navigationTripData.drop}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ACTIONS */}

          <div
            className="
            bg-white

            border
            border-[#E8EDF3]

            rounded-3xl

            p-5

                    shadow-[0_10px_30px_rgba(15,23,42,0.20)]


            space-y-3
            pt-4
            "
          >

            <button
              className="
              w-full
              h-12
              sm:h-[52px]

              rounded-2xl

              bg-[#1B5E20]

              text-white
              text-[15px]
              font-semibold

              shadow-lg
              shadow-[#1B5E20]/50
              

              hover:bg-[#256B29]

              active:scale-[0.99]

              transition-all
              "
            >
              Start Navigation
            </button>

            <button
              className="
              w-full
              h-12
              sm:h-[52px]

              rounded-2xl

              bg-[#1565C0]

              text-white
              text-[15px]
              font-semibold

              shadow-lg
              shadow-[#1565C0]/50

              hover:bg-[#1976D2]

              active:scale-[0.99]

              transition-all
              "
            >
              Confirm Pickup
            </button>

            <button
              className="
              w-full
              h-12
              sm:h-[52px]

              rounded-2xl

              bg-[#C62828]

              text-white
              text-[15px]
              font-semibold

              shadow-lg
              shadow-[#C62828]/50

              hover:bg-[#D32F2F]

              active:scale-[0.99]

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