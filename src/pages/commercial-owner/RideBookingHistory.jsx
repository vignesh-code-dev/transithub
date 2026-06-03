import {
  Search,
  AlertTriangle,
  FileWarning,
} from "lucide-react";

import StatusBadge
from "../../components/utils/StatusBadge";

import {
  commercialRideHistoryData,
} from "../../data/commercialRideHistoryData";

function RideBookingHistory() {

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
            Ride & Booking History
          </h1>

          <p
            className="
            text-[#5D6D7E]
            mt-2
            "
          >
            View completed rides, cancellations
            and customer disputes.
          </p>

        </div>

      </div>

      {/* ANALYTICS CARDS */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-6
        mb-8
        "
      >

        {/* COMPLETED */}

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
            Completed Rides
          </p>

          <h2
            className="
            text-2xl
            font-bold
            text-[#1A1A2E]

            mt-3
            "
          >
            248
          </h2>

        </div>

        {/* CANCELLED */}

        <div
          className="
          bg-[#FFE0B2]
          border
          border-[#FFCC80]

          rounded-2xl

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

              <p
                className="
                text-sm
                text-[#E65100]
                "
              >
                Cancellation Reports
              </p>

              <h2
                className="
                text-2xl
                font-bold
                text-[#1A1A2E]

                mt-3
                "
              >
                18
              </h2>

            </div>

            <AlertTriangle
              size={28}
              className="
              text-[#E65100]
              "
            />

          </div>

        </div>

        {/* DISPUTES */}

        <div
          className="
          bg-[#E8F4FD]
          border
          border-[#AED6F1]

          rounded-2xl

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

              <p
                className="
                text-sm
                text-[#5D6D7E]
                "
              >
                Active Disputes
              </p>

              <h2
                className="
                text-2xl
                font-bold
                text-[#1A1A2E]

                mt-3
                "
              >
                4
              </h2>

            </div>

            <FileWarning
              size={28}
              className="
              text-[#BF360C]
              "
            />

          </div>

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
            placeholder="Search bookings..."

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
            All Status
          </option>

          <option>
            Completed
          </option>

          <option>
            Cancelled
          </option>

          <option>
            Pending
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

          <table className="w-full min-w-[1100px]">

            <thead className="bg-[#BF360C] text-white">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Booking ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Vehicle
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Driver
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Route
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Fare
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {commercialRideHistoryData.map((ride) => (

                <tr
                  key={ride.id}
                  className="
                  border-t
                  border-[#E0E0E0]

                  even:bg-[#F9F9F9]

                  hover:bg-[#FFF3E0]
                  transition-all
                  "
                >

                  <td className="px-6 py-4 font-mono text-sm">
                    {ride.id}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {ride.customer}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {ride.vehicle}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {ride.driver}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {ride.route}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    {ride.fare}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {ride.date}
                  </td>

                  <td className="px-6 py-4">

                    <StatusBadge
                      status={ride.status}
                    />

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
      

      {/* DISPUTE MANAGEMENT */}

<div
  className="
  bg-white
  border
  border-[#E0E0E0]

  rounded-2xl
  shadow-sm

  p-6
  mt-8
  "
>

  {/* HEADER */}

  <div
    className="
    flex
    items-center
    justify-between

    mb-6
    "
  >

    <div>

      <h2
        className="
        text-xl
        font-semibold
        text-[#1A1A2E]
        "
      >
        Customer Disputes
      </h2>

      <p
        className="
        text-sm
        text-[#5D6D7E]
        mt-1
        "
      >
        View and respond to customer complaints
        related to completed rides.
      </p>

    </div>

  </div>

  {/* DISPUTE LIST */}

  <div className="space-y-4">

    {/* ITEM */}

    <div
      className="
      border
      border-[#E0E0E0]

      rounded-xl

      p-5

      flex
      flex-col
      xl:flex-row
      xl:items-center
      xl:justify-between

      gap-5
      "
    >

      <div>

        <div
          className="
          flex
          items-center
          gap-3
          flex-wrap
          "
        >

          <h3
            className="
            text-base
            font-semibold
            text-[#1A1A2E]
            "
          >
            Fare mismatch complaint
          </h3>

          <StatusBadge
            status="pending"
          />

        </div>

        <p
          className="
          text-sm
          text-[#5D6D7E]
          mt-2
          "
        >
          Customer reported incorrect final fare
          for Chennai → Salem ride.
        </p>

        <p
          className="
          text-xs
          text-[#5D6D7E]
          mt-3
          "
        >
          Booking ID:
          <span className="font-mono ml-2">
            TXH-88201
          </span>
        </p>

      </div>

      {/* ACTIONS */}

      <div
        className="
        flex
        items-center
        gap-3
        "
      >

        <button
          className="
          h-10
          px-4

          rounded-md

          border
          border-[#E0E0E0]

          text-sm
          font-semibold
          "
        >
          Ignore
        </button>

        <button
          className="
          h-10
          px-4

          rounded-md

          bg-[#BF360C]

          text-white
          text-sm
          font-semibold
          "
        >
          Resolve
        </button>

      </div>

    </div>

    {/* ITEM */}

    <div
      className="
      border
      border-[#E0E0E0]

      rounded-xl

      p-5

      flex
      flex-col
      xl:flex-row
      xl:items-center
      xl:justify-between

      gap-5
      "
    >

      <div>

        <div
          className="
          flex
          items-center
          gap-3
          flex-wrap
          "
        >

          <h3
            className="
            text-base
            font-semibold
            text-[#1A1A2E]
            "
          >
            Driver behaviour report
          </h3>

          <StatusBadge
            status="warning"
          />

        </div>

        <p
          className="
          text-sm
          text-[#5D6D7E]
          mt-2
          "
        >
          Customer reported rude behaviour
          during trip pickup process.
        </p>

        <p
          className="
          text-xs
          text-[#5D6D7E]
          mt-3
          "
        >
          Booking ID:
          <span className="font-mono ml-2">
            TXH-77421
          </span>
        </p>

      </div>

      {/* ACTIONS */}

      <div
        className="
        flex
        items-center
        gap-3
        "
      >

        <button
          className="
          h-10
          px-4

          rounded-md

          border
          border-[#E0E0E0]

          text-sm
          font-semibold
          "
        >
          View
        </button>

        <button
          className="
          h-10
          px-4

          rounded-md

          bg-[#BF360C]

          text-white
          text-sm
          font-semibold
          "
        >
          Respond
        </button>

      </div>

    </div>

  </div>

</div>

    </div>
  );
}

export default RideBookingHistory;