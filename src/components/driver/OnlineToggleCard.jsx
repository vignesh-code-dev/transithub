import { useState } from "react";

import {
  ToggleLeft,
  ToggleRight,
  Activity,
  Clock3,
  Navigation,
  ShieldCheck,
} from "lucide-react";

function OnlineToggleCard() {

  const [isOnline, setIsOnline] =
    useState(true);

  return (

    <div
      className="
      group

      relative
      overflow-hidden

      bg-white

      border
      border-[#E8ECF2]

      rounded-[28px]

      shadow-[0_12px_40px_rgba(15,23,42,0.15)]

      p-6
      lg:p-7

      transition-all
      duration-300

      "
    >

      {/* BACKGROUND EFFECT */}

      <div
        className="
        absolute
        top-0
        right-0

        w-72
        h-72

        rounded-full

        blur-3xl
        opacity-60

        transition-all
        duration-500

        group-hover:scale-110
        "
        style={{
          background: isOnline
            ? "#E8F5E9"
            : "#ECEFF1",
        }}
      />

      {/* GRID */}

      <div
        className="
        absolute
        inset-0

        opacity-[0.03]
        pointer-events-none
        "
        style={{
          backgroundImage:
            "linear-gradient(#1A1A2E 1px, transparent 1px), linear-gradient(to right, #1A1A2E 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* MAIN CONTENT */}

      <div
        className="
        relative
        z-10

        flex
        flex-col
        xl:flex-row
        xl:items-center
        xl:justify-between

        gap-8
        "
      >

        {/* LEFT SECTION */}

        <div className="flex-1">

          {/* STATUS CHIP */}

          <div
            className={`
            inline-flex
            items-center
            gap-2

            px-3
            py-1.5

            rounded-full

            text-xs
            font-semibold

            mb-5

            ${
              isOnline
                ? `
                  bg-[#E8F5E9]
                  text-[#1B5E20]
                `
                : `
                  bg-[#ECEFF1]
                  text-[#5D6D7E]
                `
            }
            `}
          >

            <span
              className={`
              w-2
              h-2

              rounded-full

              ${
                isOnline
                  ? `
                    bg-[#43A047]
                    animate-pulse
                  `
                  : `
                    bg-[#90A4AE]
                  `
              }
              `}
            />

            {isOnline
              ? "Driver Online"
              : "Driver Offline"}

          </div>

          {/* TITLE */}

          <h2
            className="
            text-[24px]
            leading-8

            font-bold
            text-[#1A1A2E]
            "
          >
            Driver Availability
          </h2>

          <p
            className="
            text-sm
            lg:text-base

            text-[#5D6D7E]

            mt-3
            max-w-2xl
            leading-7
            "
          >
            Control your live ride dispatch status.
            You will receive incoming ride requests
            only while your availability is active.
          </p>

          {/* STATS */}

          <div
            className="
            grid
            grid-cols-2
            lg:grid-cols-3

            gap-4

            mt-7
            "
          >

            {/* ACTIVE HOURS */}

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

                <Clock3
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
                  Active Hours
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
                08h 24m
              </h3>

            </div>

            {/* COMPLETED */}

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

                <Navigation
                  size={16}
                  className="
                  text-[#1565C0]
                  "
                />

                <p
                  className="
                  text-xs
                  font-medium
                  text-[#5D6D7E]
                  "
                >
                  Completed Trips
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
                14
              </h3>

            </div>

            {/* SAFETY */}

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

                <ShieldCheck
                  size={16}
                  className="
                  text-[#6A1B9A]
                  "
                />

                <p
                  className="
                  text-xs
                  font-medium
                  text-[#5D6D7E]
                  "
                >
                  Safety Score
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
                98%
              </h3>

            </div>

          </div>

        </div>

        {/* RIGHT CONTROL PANEL */}

        <div
          className="
          shrink-0

          w-full
          xl:w-[320px]
          "
        >

          <div
            className="
            relative

            bg-[#F8FAFC]

            border
            border-[#EEF2F6]

            rounded-[28px]

            p-6
            "
          >

            {/* LIVE STATUS */}

            <div
              className="
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
                  uppercase
                  tracking-wide

                  text-[#5D6D7E]
                  "
                >
                  Current Status
                </p>

                <h3
                  className={`
                  text-[22px]
                  leading-8

                  font-bold

                  mt-2

                  ${
                    isOnline
                      ? "text-[#1B5E20]"
                      : "text-[#5D6D7E]"
                  }
                  `}
                >
                  {isOnline
                    ? "Online"
                    : "Offline"}
                </h3>

              </div>

              <div
                className={`
                w-14
                h-14

                rounded-2xl

                flex
                items-center
                justify-center

                ${
                  isOnline
                    ? "bg-[#E8F5E9]"
                    : "bg-[#ECEFF1]"
                }
                `}
              >

                <Activity
                  size={24}
                  className={`
                  ${
                    isOnline
                      ? "text-[#1B5E20]"
                      : "text-[#90A4AE]"
                  }
                  `}
                />

              </div>

            </div>

            {/* TOGGLE BUTTON */}

            <button
              onClick={() =>
                setIsOnline(!isOnline)
              }

              className={`
              w-full
              h-14

              mt-7

              rounded-2xl

              transition-all
              duration-300

              flex
              items-center
              justify-center
              gap-3

              text-sm
              font-semibold

              

              
                    shadow-[0_20px_15px_rgba(27,94,32,0.35
                    hover:[shadow-[0_15px_35px_rgba(27,94,32,0.25)]
              

              ${
                isOnline
                  ? `
                    bg-[#1B5E20]
                    hover:bg-[#2E7D32]
                    text-white

                    shadow-[0_20px_15px_rgba(27,94,32,0.5)]
                    hover:[shadow-[0_15px_35px_rgba(27,94,32,0.25)]

                  `
                  : `
                    bg-[#ECEFF1]
                    hover:bg-[#CFD8DC]
                    text-[#1A1A2E]
                  `
              }
              `}
            >

              {isOnline ? (

                <ToggleRight size={28} />

              ) : (

                <ToggleLeft size={28} />

              )}

              {isOnline
                ? "Go Offline"
                : "Go Online"}

            </button>

            {/* FOOTER */}

            <div
              className="
              mt-5

              flex
              items-center
              justify-center
              gap-2

              text-xs
              text-[#5D6D7E]


              
              "
            >

              <span
                className={`
                w-2
                h-2

                rounded-full

                ${
                  isOnline
                    ? "bg-[#43A047]"
                    : "bg-[#90A4AE]"
                }
                `}
              />

              Dispatch system synced live

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OnlineToggleCard;