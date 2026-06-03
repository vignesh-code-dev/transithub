import StatusBadge
from "../utils/StatusBadge";

function EarningsTransactionsTable({
  transactions,
}) {

  return (

    <div
      className="
      bg-white

      border
      border-[#E8EDF3]

      rounded-[28px]

      shadow-[0_10px_30px_rgba(15,23,42,0.05)]

      overflow-hidden
      "
    >

      {/* HEADER */}

      <div
        className="
        px-5
        sm:px-6

        py-5

        border-b
        border-[#EEF2F6]
        "
      >

        <h2
          className="
          text-xl
          font-bold
          text-[#1A1A2E]
          "
        >
          Earnings Transactions
        </h2>

        <p
          className="
          text-sm
          text-[#5D6D7E]

          mt-2
          "
        >
          Recent earnings from completed rides.
        </p>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table
          className="
          w-full
          min-w-[850px]
          "
        >

          <thead
            className="
            bg-[#F8FAFC]
            "
          >

            <tr>

              <th
                className="
                px-6
                py-4

                text-left

                text-xs
                font-semibold

                uppercase
                tracking-wider

                text-[#64748B]
                "
              >
                Trip ID
              </th>

              <th
                className="
                px-6
                py-4

                text-left

                text-xs
                font-semibold

                uppercase
                tracking-wider

                text-[#64748B]
                "
              >
                Date
              </th>

              <th
                className="
                px-6
                py-4

                text-left

                text-xs
                font-semibold

                uppercase
                tracking-wider

                text-[#64748B]
                "
              >
                Passenger
              </th>

              <th
                className="
                px-6
                py-4

                text-left

                text-xs
                font-semibold

                uppercase
                tracking-wider

                text-[#64748B]
                "
              >
                Fare
              </th>

              <th
                className="
                px-6
                py-4

                text-left

                text-xs
                font-semibold

                uppercase
                tracking-wider

                text-[#64748B]
                "
              >
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {transactions.map((trip) => (

              <tr
                key={trip.id}
                className="
                border-t
                border-[#EEF2F6]

                hover:bg-[#FAFCFD]

                transition-all
                "
              >

                <td
                  className="
                  px-6
                  py-5

                  text-sm
                  font-semibold

                  text-[#1A1A2E]
                  font-mono
                  "
                >
                  {trip.id}
                </td>

                <td
                  className="
                  px-6
                  py-5

                  text-sm
                  text-[#5D6D7E]
                  "
                >
                  {trip.date}
                </td>

                <td
                  className="
                  px-6
                  py-5

                  text-sm
                  font-medium

                  text-[#1A1A2E]
                  "
                >
                  {trip.passenger}
                </td>

                <td
                  className="
                  px-6
                  py-5

                  text-sm
                  font-bold

                  text-[#1B5E20]
                  "
                >
                  {trip.fare}
                </td>

                <td
                  className="
                  px-6
                  py-5
                  "
                >

                  <StatusBadge
                    status={trip.status}
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default EarningsTransactionsTable;