import {
  Search,
  Pencil,
  Power,
  AlertTriangle,
} from "lucide-react";

import StatusBadge
from "../../components/utils/StatusBadge";

import {
  commercialVehiclesData,
} from "../../data/commercialVehiclesData";

function VehicleOperations() {

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
          Vehicle Operations
        </h1>

        <p
          className="
          text-sm
          text-[#5D6D7E]
          mt-2
          "
        >
          Manage fleet activity, availability,
          pricing and operational status.
        </p>

      </div>

      {/* ALERT CARD */}

      <div
        className="
        bg-[#FFF3E0]
        border
        border-[#FFE0B2]

        rounded-2xl

        p-5
        mb-8

        flex
        items-start
        gap-4
        "
      >

        <div
          className="
          w-12
          h-12

          rounded-full

          bg-[#FFE0B2]

          flex
          items-center
          justify-center
          shrink-0
          "
        >

          <AlertTriangle
            size={22}
            className="
            text-[#E65100]
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
            Document Expiry Warning
          </h2>

          <p
            className="
            text-sm
            text-[#5D6D7E]
            mt-2
            "
          >
            3 vehicles have insurance or pollution
            certificates expiring within 7 days.
          </p>

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
        mb-6
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

            text-sm

            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-[#BF360C]
            "
          />

        </div>

        {/* FILTER */}

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
            All Vehicles
          </option>

          <option>
            Active
          </option>

          <option>
            Pending
          </option>

          <option>
            Inactive
          </option>

        </select>

      </div>

      {/* TABLE */}

      <div
        className="
        bg-white
        border
        border-[#E0E0E0]

        rounded-2xl
        shadow-sm

        overflow-hidden
        "
      >

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead className="bg-[#BF360C] text-white">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Vehicle
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Registration
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Capacity
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Pricing
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {commercialVehiclesData.map((vehicle) => (

                <tr
                  key={vehicle.id}
                  className="
                  border-t
                  border-[#E0E0E0]

                  even:bg-[#F9F9F9]

                  hover:bg-[#FFF3E0]
                  transition-all
                  "
                >

                  {/* VEHICLE */}

                  <td className="px-6 py-4">

                    <div
                      className="
                      flex
                      items-center
                      gap-4
                      "
                    >

                      <img
                        src={vehicle.image}
                        alt={vehicle.name}

                        className="
                        w-14
                        h-14

                        rounded-xl
                        object-cover
                        "
                      />

                      <div>

                        <h3
                          className="
                          text-sm
                          font-semibold
                          text-[#1A1A2E]
                          "
                        >
                          {vehicle.name}
                        </h3>

                        <p
                          className="
                          text-sm
                          text-[#5D6D7E]
                          mt-1
                          "
                        >
                          ID: {vehicle.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* REG */}

                  <td
                    className="
                    px-6
                    py-4

                    text-sm
                    font-mono
                    "
                  >
                    {vehicle.regNo}
                  </td>

                  {/* TYPE */}

                  <td className="px-6 py-4 text-sm">
                    {vehicle.type}
                  </td>

                  {/* CAPACITY */}

                  <td className="px-6 py-4 text-sm">
                    {vehicle.capacity}
                  </td>

                  {/* PRICE */}

                  <td
                    className="
                    px-6
                    py-4

                    text-sm
                    font-medium
                    "
                  >
                    {vehicle.pricePerKm}
                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-4">

                    <StatusBadge
                      status={vehicle.status}
                    />

                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-4">

                    <div
                      className="
                      flex
                      items-center
                      gap-3
                      "
                    >

                      <button
                        className="
                        w-10
                        h-10

                        rounded-lg

                        border
                        border-[#E0E0E0]

                        flex
                        items-center
                        justify-center

                        hover:bg-[#FFF3E0]
                        transition-all
                        "
                      >

                        <Pencil
                          size={18}
                          className="
                          text-[#BF360C]
                          "
                        />

                      </button>

                      <button
                        className="
                        w-10
                        h-10

                        rounded-lg

                        border
                        border-[#FFCDD2]

                        flex
                        items-center
                        justify-center

                        hover:bg-[#FFEBEE]
                        transition-all
                        "
                      >

                        <Power
                          size={18}
                          className="
                          text-[#C62828]
                          "
                        />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default VehicleOperations;