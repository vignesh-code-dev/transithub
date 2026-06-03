import {
  Search,
  Upload,
  TriangleAlert,
} from "lucide-react";

import StatusBadge from "../../components/utils/StatusBadge";

import {   vehicleDocumentsData, } from "../../data/vehicleDocumentsData";

function Documents() {

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
            leading-8
            font-bold
            text-[#1A1A2E]
            "
          >
            Document Management
          </h1>

          <p
            className="
            text-sm
            text-[#5D6D7E]
            mt-2
            "
          >
            Manage RC books, insurance,
            permits and compliance documents.
          </p>

        </div>

        {/* UPLOAD BUTTON */}

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
          "
        >

          <Upload size={18} />

          Upload Document

        </button>

      </div>

      {/* WARNING CARD */}

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

          <TriangleAlert
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
            Compliance Alert
          </h2>

          <p
            className="
            text-sm
            text-[#5D6D7E]
            mt-2
            "
          >
            2 vehicle documents are expiring
            within the next 10 days.
          </p>

        </div>

      </div>

      {/* SEARCH */}

      <div
        className="
        relative
        w-full
        lg:max-w-md
        mb-6
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
          placeholder="Search documents..."

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

          <table className="w-full min-w-[900px]">

            <thead className="bg-[#BF360C] text-white">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Document ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Vehicle
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Document Type
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Expiry Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {vehicleDocumentsData.map((doc) => (

                <tr
                  key={doc.id}
                  className="
                  border-t
                  border-[#E0E0E0]

                  even:bg-[#F9F9F9]

                  hover:bg-[#FFF3E0]
                  transition-all
                  "
                >

                  <td
                    className="
                    px-6
                    py-4

                    text-sm
                    font-mono
                    "
                  >
                    {doc.id}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {doc.vehicle}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {doc.document}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {doc.expiry}
                  </td>

                  <td className="px-6 py-4">

                    <StatusBadge
                      status={doc.status}
                    />

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

export default Documents;