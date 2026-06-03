import {
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import VehicleCard
from "../../components/commercial-owner/VehicleCard";

import {
  commercialVehiclesData,
} from "../../data/commercialVehiclesData";

function VehicleManagement() {

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
            font-bold
            text-[#1A1A2E]
            "
          >
            Vehicle Management
          </h1>

          <p
            className="
            text-[#5D6D7E]
            mt-2
            "
          >
            Manage commercial vehicles, pricing,
            availability and operational status.
          </p>

        </div>

        {/* ADD VEHICLE BUTTON */}

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
          hover:opacity-95
          transition-all
          "
        >

          <Plus size={18} />

          Add Vehicle

        </button>

      </div>

      {/* TOP STATS */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
        mb-8
        "
      >

        <div
          className="
          bg-white
          border
          border-[#E0E0E0]

          rounded-2xl
          shadow-sm

          p-5
          "
        >

          <p
            className="
            text-sm
            text-[#5D6D7E]
            "
          >
            Total Vehicles
          </p>

          <h2
            className="
            text-2xl
            font-bold
            text-[#1A1A2E]

            mt-3
            "
          >
            42
          </h2>

        </div>

        <div
          className="
          bg-[#E8F4FD]
          border
          border-[#AED6F1]

          rounded-2xl

          p-5
          "
        >

          <p
            className="
            text-sm
            text-[#5D6D7E]
            "
          >
            Active Vehicles
          </p>

          <h2
            className="
            text-2xl
            font-bold
            text-[#1A1A2E]

            mt-3
            "
          >
            31
          </h2>

        </div>

        <div
          className="
          bg-white
          border
          border-[#E0E0E0]

          rounded-2xl
          shadow-sm

          p-5
          "
        >

          <p
            className="
            text-sm
            text-[#5D6D7E]
            "
          >
            Pending Approval
          </p>

          <h2
            className="
            text-2xl
            font-bold
            text-[#1A1A2E]

            mt-3
            "
          >
            6
          </h2>

        </div>

        <div
          className="
          bg-white
          border
          border-[#E0E0E0]

          rounded-2xl
          shadow-sm

          p-5
          "
        >

          <p
            className="
            text-sm
            text-[#5D6D7E]
            "
          >
            Inactive Vehicles
          </p>

          <h2
            className="
            text-2xl
            font-bold
            text-[#1A1A2E]

            mt-3
            "
          >
            5
          </h2>

        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between

        gap-4
        mb-8
        "
      >

        {/* SEARCH */}

        <div
          className="
          relative
          w-full
          lg:max-w-md
          "
        >

          <Search
            size={18}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[#5D6D7E]
            "
          />

          <input
            type="text"
            placeholder="Search vehicles..."

            className="
            w-full
            h-11

            pl-11
            pr-4

            rounded-md
            border
            border-[#E0E0E0]

            bg-white
            text-sm

            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-[#BF360C]
            "
          />

        </div>

        {/* FILTERS */}

        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          <button
            className="
            h-11
            px-4

            inline-flex
            items-center
            gap-2

            rounded-md

            border
            border-[#E0E0E0]

            bg-white

            text-sm
            font-medium
            text-[#1A1A2E]
            "
          >

            <SlidersHorizontal size={18} />

            Filters

          </button>

          <select
            className="
            h-11
            px-4

            rounded-md
            border
            border-[#E0E0E0]

            bg-white
            text-sm

            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-[#BF360C]
            "
          >

            <option>
              All Status
            </option>

            <option>
              Active
            </option>

            <option>
              Pending
            </option>

            <option>
              Completed
            </option>

          </select>

        </div>

      </div>

      {/* VEHICLE GRID */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        2xl:grid-cols-3
        gap-6
        "
      >

        {commercialVehiclesData.map((vehicle) => (

          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
          />

        ))}

      </div>

    </div>
  );
}

export default VehicleManagement;