import {
  ShieldAlert,
} from "lucide-react";

import StatusBadge
from "../../components/utils/StatusBadge";

import TrainingMaterialCard
from "../../components/driver/TrainingMaterialCard";

import { supportTicketsData }
from "../../data/supportTicketsData";

import { trainingMaterialsData }
from "../../data/trainingMaterialsData";

function DriverSupport() {

  return (

    <div>

      {/* HEADER */}

      <div className="mb-8">

        <h1
          className="
          text-3xl
          font-bold
          text-[#1A1A2E]
          "
        >
          Driver Support
        </h1>

        <p
          className="
          text-[#5D6D7E]
          mt-2
          "
        >
          Access support services, issue reporting,
          and training materials.
        </p>

      </div>

      {/* TOP GRID */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        mb-8
        "
      >

        {/* SOS */}

        <div
          className="
          bg-[#FFCDD2]
          border
          border-[#C62828]

          rounded-md

          p-6
          "
        >

          <div
            className="
            w-14
            h-14

            rounded-full

            bg-[#C62828]

            flex
            items-center
            justify-center

            mb-5
            "
          >

            <ShieldAlert
              size={28}
              className="
              text-white
              "
            />

          </div>

          <h2
            className="
            text-2xl
            font-bold
            text-[#1A1A2E]
            "
          >
            Emergency SOS
          </h2>

          <p
            className="
            text-sm
            text-[#1A1A2E]

            mt-3
            leading-6
            "
          >
            Send an emergency alert to the
            platform and emergency services.
          </p>

          <button
            className="
            w-full
            h-11

            mt-6

            rounded-md

            bg-[#C62828]

            text-white
            text-sm
            font-semibold
            "
          >
            Trigger SOS
          </button>

        </div>

        {/* ISSUE REPORTING */}

        <div
          className="
          xl:col-span-2

          bg-white
          border
          border-[#E0E0E0]

          rounded-md
          shadow-sm

          p-6
          "
        >

          <h2
            className="
            text-xl
            font-semibold
            text-[#1A1A2E]
            mb-6
            "
          >
            Report an Issue
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <select
              className="
              h-11
              px-4

              rounded-md
              border
              border-[#E0E0E0]

              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-[#1B5E20]
              "
            >

              <option>
                Select Issue Type
              </option>

              <option>
                Vehicle Defect
              </option>

              <option>
                Passenger Misconduct
              </option>

              <option>
                Unfair Rating
              </option>

            </select>

            <input
              type="text"
              placeholder="Trip ID"

              className="
              h-11
              px-4

              rounded-md
              border
              border-[#E0E0E0]

              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-[#1B5E20]
              "
            />

          </div>

          <textarea
            rows="5"
            placeholder="Describe the issue..."

            className="
            w-full

            mt-5
            p-4

            rounded-md
            border
            border-[#E0E0E0]

            resize-none

            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-[#1B5E20]
            "
          />

          <button
            className="
            mt-5

            h-11
            px-5

            rounded-md

            bg-[#1B5E20]

            text-white
            text-sm
            font-semibold
            "
          >
            Submit Report
          </button>

        </div>

      </div>

      {/* TICKETS */}

      <div
        className="
        bg-white
        border
        border-[#E0E0E0]

        rounded-md
        shadow-sm

        overflow-hidden
        mb-10
        "
      >

        <div
          className="
          px-5
          py-4

          border-b
          border-[#E0E0E0]
          "
        >

          <h2
            className="
            text-xl
            font-semibold
            text-[#1A1A2E]
            "
          >
            Support Tickets
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead className="bg-[#F8FAFC]">

              <tr>

                <th className="text-left px-5 py-4 text-sm font-semibold">
                  Ticket ID
                </th>

                <th className="text-left px-5 py-4 text-sm font-semibold">
                  Category
                </th>

                <th className="text-left px-5 py-4 text-sm font-semibold">
                  Date
                </th>

                <th className="text-left px-5 py-4 text-sm font-semibold">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {supportTicketsData.map((ticket) => (

                <tr
                  key={ticket.id}
                  className="
                  border-t
                  border-[#E0E0E0]
                  "
                >

                  <td className="px-5 py-4 font-mono text-sm">
                    {ticket.id}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {ticket.category}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {ticket.date}
                  </td>

                  <td className="px-5 py-4">

                    <StatusBadge
                      status={ticket.status}
                    />

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* TRAINING */}

      <div>

        <div className="mb-5">

          <h2
            className="
            text-2xl
            font-bold
            text-[#1A1A2E]
            "
          >
            Training Materials
          </h2>

          <p
            className="
            text-sm
            text-[#5D6D7E]
            mt-1
            "
          >
            Driver handbook and platform guidance.
          </p>

        </div>

        <div
          className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
          "
        >

          {trainingMaterialsData.map((material) => (

            <TrainingMaterialCard
              key={material.id}
              material={material}
            />

          ))}

        </div>

      </div>

    </div>
  );
}

export default DriverSupport;