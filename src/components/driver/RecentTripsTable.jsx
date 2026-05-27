import StatusBadge
from "../utils/StatusBadge";

function RecentTripsTable({
  trips,
}) {

  return (

    <div
      className="
      bg-white
      rounded-xl
      border
      border-[#E0E0E0]
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
          text-lg
          font-semibold
          text-[#1A1A2E]
          "
        >
          Recent Trips
        </h2>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead
            className="
            bg-[#F8FAFC]
            "
          >

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
                Pickup
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

            {trips.map((trip) => (

              <tr
                key={trip.id}
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
                  text-[#1A1A2E]
                  font-mono
                  "
                >
                  {trip.id}
                </td>

                <td
                  className="
                  px-5
                  py-4

                  text-sm
                  text-[#1A1A2E]
                  "
                >
                  {trip.passenger}
                </td>

                <td
                  className="
                  px-5
                  py-4

                  text-sm
                  text-[#1A1A2E]
                  "
                >
                  {trip.pickup}
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
                  {trip.fare}
                </td>

                <td
                  className="
                  px-5
                  py-4
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

export default RecentTripsTable;