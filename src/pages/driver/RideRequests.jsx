import RideRequestCard from "../../components/driver/RideRequestCard";

import { allRideRequestsData } from "../../data/allRideRequestsData";
import ScheduledRideCard from "../../components/driver/ScheduledRideCard";
import { scheduledRidesData } from "../../data/scheduledRidesData";
import RideHistoryTable from "../../components/driver/RideHistoryTable";
import { rideHistoryData } from "../../data/rideHistoryData";

function RideRequests() {

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

  gap-5
  mt-2
mb-8
  "
>

  {/* LEFT */}

  <div>

    <h1
      className="
      text-3xl
      font-bold
      text-[#1A1A2E]
      "
    >
      Ride Requests
    </h1>

    <p
      className="
      text-[#5D6D7E]
      mt-2
      "
    >
      Manage incoming passenger ride requests.
    </p>

  </div>

  {/* RIGHT */}

  <div
    className="
    flex
    flex-col
    sm:flex-row
    gap-3
    w-full
    xl:w-auto
    "
  >

    {/* SEARCH */}

    <input
      type="text"
      placeholder="Search requests..."

      className="
      h-11
      xl:w-[260px]

      px-4

      rounded-md
      border
      border-[#E0E0E0]

      bg-white
      text-sm

      shadow-sm

      focus:outline-none
      focus:ring-2
      focus:ring-offset-2
      focus:ring-[#1B5E20]
      "
    />

    {/* FILTER */}

    <select
      className="
      h-11
      xl:w-[180px]

      px-4

      rounded-md
      border
      border-[#E0E0E0]

      bg-white
      text-sm

      shadow-sm

      focus:outline-none
      focus:ring-2
      focus:ring-offset-2
      focus:ring-[#1B5E20]
      "
    >

      <option>
        All Requests
      </option>

      <option>
        Pending
      </option>

      <option>
        Active
      </option>

      <option>
        Completed
      </option>

    </select>

  </div>

</div>


                {/* REQUEST STATS */}

<div
  className="
  grid
  grid-cols-1
  sm:grid-cols-2
  xl:grid-cols-4
  gap-5
  mt-2
mb-8
  "
>

  <div
    className="
    bg-white
    border
    border-[#E0E0E0]
    rounded-md
    p-5
    shadow-sm
    "
  >

    <p
      className="
      text-sm
      text-[#5D6D7E]
      "
    >
      Total Requests
    </p>

    <h2
      className="
      text-3xl
      font-bold
      text-[#1A1A2E]
      mt-2
      "
    >
      24
    </h2>

  </div>

  <div
    className="
    bg-[#E8F4FD]
    border
    border-[#AED6F1]
    rounded-md
    p-5
    shadow-sm
    "
  >

    <p
      className="
      text-sm
      text-[#5D6D7E]
      "
    >
      Active Requests
    </p>

    <h2
      className="
      text-3xl
      font-bold
      text-[#1A1A2E]
      mt-2
      "
    >
      8
    </h2>

  </div>

  <div
    className="
    bg-white
    border
    border-[#E0E0E0]
    rounded-md
    p-5
    shadow-sm
    "
  >

    <p
      className="
      text-sm
      text-[#5D6D7E]
      "
    >
      Completed Today
    </p>

    <h2
      className="
      text-3xl
      font-bold
      text-[#1A1A2E]
      mt-2
      "
    >
      16
    </h2>

  </div>

  <div
    className="
    bg-white
    border
    border-[#E0E0E0]
    rounded-md
    p-5
    shadow-sm
    "
  >

    <p
      className="
      text-sm
      text-[#5D6D7E]
      "
    >
      Acceptance Rate
    </p>

    <h2
      className="
      text-3xl
      font-bold
      text-[#1A1A2E]
      mt-2
      "
    >
      92%
    </h2>

  </div>

</div>


{/* REQUEST GRID */}

<div
  className="
  grid
  grid-cols-1
  xl:grid-cols-2
  gap-6
  "
>

  {allRideRequestsData.map((ride) => (

    <RideRequestCard
      key={ride.id}
      ride={ride}
    />

  ))}

</div>


{/* SCHEDULED RIDES */}

<div className="mt-10">

  <div className="mb-5">

    <h2
      className="
      text-2xl
      font-bold
      text-[#1A1A2E]
      "
    >
      Scheduled Rides
    </h2>

    <p
      className="
      text-sm
      text-[#5D6D7E]
      mt-1
      "
    >
      Upcoming assigned rides from operators.
    </p>

  </div>

  <div
    className="
    grid
    grid-cols-1
    xl:grid-cols-2
    gap-6
    "
  >

    {scheduledRidesData.map((ride) => (

      <ScheduledRideCard
        key={ride.id}
        ride={ride}
      />

    ))}

  </div>

</div>



<div className="mt-10">

  <RideHistoryTable
    rides={rideHistoryData}
  />

</div>

        </div>
    );
}

export default RideRequests;