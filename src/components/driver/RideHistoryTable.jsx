import StatusBadge
from "../utils/StatusBadge";

function RideHistoryTable({
  rides,
}) {

  return (

    <div
      className="
      bg-white
      border
      border-[#E0E0E0]

      rounded-md
      shadow-sm
      overflow-hidden
      "
    >

      {/* HEADER */}

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
          Ride History
        </h2>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead className="bg-[#F8FAFC]">

            <tr>

              <th
                className="
                text-left
                px-5
                py-4

                text-sm
                font-semibold
                text-[#1A1A2E]
                "
              >
                Trip ID
              </th>

              <th
                className="
                text-left
                px-5
                py-4

                text-sm
                font-semibold
                text-[#1A1A2E]
                "
              >
                Passenger
              </th>

              <th
                className="
                text-left
                px-5
                py-4

                text-sm
                font-semibold
                text-[#1A1A2E]
                "
              >
                Route
              </th>

              <th
                className="
                text-left
                px-5
                py-4

                text-sm
                font-semibold
                text-[#1A1A2E]
                "
              >
                Fare
              </th>

              <th
                className="
                text-left
                px-5
                py-4

                text-sm
                font-semibold
                text-[#1A1A2E]
                "
              >
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {rides.map((ride) => (

              <tr
                key={ride.id}
                className="
                border-t
                border-[#E0E0E0]

                hover:bg-[#FAFAFA]
                transition-all
                "
              >

                <td
                  className="
                  px-5
                  py-4

                  text-sm
                  font-medium
                  font-mono
                  text-[#1A1A2E]
                  "
                >
                  {ride.id}
                </td>

                <td
                  className="
                  px-5
                  py-4

                  text-sm
                  text-[#1A1A2E]
                  "
                >
                  {ride.passenger}
                </td>

                <td
                  className="
                  px-5
                  py-4

                  text-sm
                  text-[#1A1A2E]
                  "
                >
                  {ride.route}
                </td>

                <td
                  className="
                  px-5
                  py-4

                  text-sm
                  font-medium
                  text-[#1B5E20]
                  "
                >
                  {ride.fare}
                </td>

                <td
                  className="
                  px-5
                  py-4
                  "
                >

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
  );
}

export default RideHistoryTable;