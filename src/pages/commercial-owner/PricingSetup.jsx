import {
  BadgeIndianRupee,
  Clock3,
  CarFront,
} from "lucide-react";

function PricingSetup() {

  return (

    <div>

      {/* PAGE HEADER */}

      <div className="mb-8">

        <h1
          className="
          text-2xl
          leading-8
          font-bold
          text-[#1A1A2E]
          "
        >
          Pricing Setup
        </h1>

        <p
          className="
          text-sm
          text-[#5D6D7E]
          mt-2
          "
        >
          Configure pricing rules,
          waiting charges and fare structures.
        </p>

      </div>

      {/* PRICING GRID */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        "
      >

        {/* BASE FARE */}

        <div
          className="
          bg-white
          border
          border-[#E0E0E0]

          rounded-2xl
          shadow-sm

          p-6
          "
        >

          <div
            className="
            w-12
            h-12

            rounded-xl

            bg-[#FFF3E0]

            flex
            items-center
            justify-center
            "
          >

            <BadgeIndianRupee
              size={22}
              className="
              text-[#BF360C]
              "
            />

          </div>

          <h2
            className="
            text-base
            font-semibold
            text-[#1A1A2E]

            mt-5
            "
          >
            Base Fare
          </h2>

          <input
            type="text"
            defaultValue="₹120"

            className="
            w-full
            h-11

            mt-4
            px-4

            rounded-md
            border
            border-[#E0E0E0]

            text-sm

            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-[#BF360C]
            "
          />

        </div>

        {/* PRICE PER KM */}

        <div
          className="
          bg-white
          border
          border-[#E0E0E0]

          rounded-2xl
          shadow-sm

          p-6
          "
        >

          <div
            className="
            w-12
            h-12

            rounded-xl

            bg-[#E8F4FD]

            flex
            items-center
            justify-center
            "
          >

            <CarFront
              size={22}
              className="
              text-[#1565C0]
              "
            />

          </div>

          <h2
            className="
            text-base
            font-semibold
            text-[#1A1A2E]

            mt-5
            "
          >
            Price Per KM
          </h2>

          <input
            type="text"
            defaultValue="₹24/km"

            className="
            w-full
            h-11

            mt-4
            px-4

            rounded-md
            border
            border-[#E0E0E0]

            text-sm

            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-[#BF360C]
            "
          />

        </div>

        {/* WAITING CHARGE */}

        <div
          className="
          bg-white
          border
          border-[#E0E0E0]

          rounded-2xl
          shadow-sm

          p-6
          "
        >

          <div
            className="
            w-12
            h-12

            rounded-xl

            bg-[#FFF8E1]

            flex
            items-center
            justify-center
            "
          >

            <Clock3
              size={22}
              className="
              text-[#F9A825]
              "
            />

          </div>

          <h2
            className="
            text-base
            font-semibold
            text-[#1A1A2E]

            mt-5
            "
          >
            Waiting Charge
          </h2>

          <input
            type="text"
            defaultValue="₹5/min"

            className="
            w-full
            h-11

            mt-4
            px-4

            rounded-md
            border
            border-[#E0E0E0]

            text-sm

            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-[#BF360C]
            "
          />

        </div>

      </div>

      {/* SAVE SECTION */}

      <div
        className="
        bg-white
        border
        border-[#E0E0E0]

        rounded-2xl
        shadow-sm

        p-6
        mt-6
        "
      >

        <h2
          className="
          text-base
          font-semibold
          text-[#1A1A2E]
          "
        >
          Surge Pricing
        </h2>

        <p
          className="
          text-sm
          text-[#5D6D7E]
          mt-2
          "
        >
          Enable dynamic pricing during
          peak demand periods.
        </p>

        <div
          className="
          flex
          items-center
          justify-between

          mt-6
          "
        >

          <div>

            <h3
              className="
              text-sm
              font-medium
              text-[#1A1A2E]
              "
            >
              Weekend Surge
            </h3>

            <p
              className="
              text-sm
              text-[#5D6D7E]
              mt-1
              "
            >
              Increase fare by 1.5x
            </p>

          </div>

          <button
            className="
            h-11
            px-5

            rounded-md

            bg-[#BF360C]

            text-white
            text-sm
            font-semibold
            "
          >
            Enabled
          </button>

        </div>

      </div>

      {/* ACTIONS */}

      <div
        className="
        flex
        justify-end
        gap-4

        mt-6
        "
      >

        <button
          className="
          h-11
          px-5

          rounded-md

          border
          border-[#E0E0E0]

          text-sm
          font-semibold
          "
        >
          Cancel
        </button>

        <button
          className="
          h-11
          px-5

          rounded-md

          bg-[#BF360C]

          text-white
          text-sm
          font-semibold

          shadow-sm
          "
        >
          Save Pricing
        </button>

      </div>

    </div>
  );
}

export default PricingSetup;