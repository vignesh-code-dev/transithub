import {
    Wallet,
    Star,
    CarFront,
    Clock3,
    ToggleLeft,
} from "lucide-react";

import OnlineToggleCard from "../../components/driver/OnlineToggleCard";
import KpiCard from "../../components/utils/KpiCard";
import NotificationsPanel from "../../components/driver/NotificationsPanel";
import RideRequestCard from "../../components/driver/RideRequestCard";
import RecentTripsTable from "../../components/driver/RecentTripsTable";
import EarningsChart from "../../components/driver/EarningsChart";
import { earningsChartData } from "../../data/earningsChartData";

import { recentTripsData }
from "../../data/recentTripsData";

import { rideRequestsData }
from "../../data/rideRequestsData";

import { driverDashboardData }
    from "../../data/driverDashboardData";

function DriverDashboard() {

    return (

        <div>

            {/* PAGE HEADER */}


            <div className="mb-8">

                <h1
                    className="
          text-3xl
          font-bold
          text-[#1A1A2E]
          "
                >
                    Driver Dashboard
                </h1>

                <p
                    className="
          text-[#5D6D7E]
          mt-2
          "
                >
                    Monitor rides, earnings and trip activity.
                </p>


            </div>
            {/* online toggle card */}
            <OnlineToggleCard />


            {/* KPI GRID */}

            <div
                className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
        "
            >

                <KpiCard
                    title="Today's Earnings"
                    value={driverDashboardData.earningsToday}
                    subtitle="This day earnings"
                    color="#E8F5E9"
                    icon={
                        <Wallet
                            size={22}
                            className="text-[#1B5E20]"
                        />
                    }
                />

                <KpiCard
                    title="Driver Rating"
                    value={driverDashboardData.rating}
                    subtitle="Excellent performance"
                    color="#FFF8E1"
                    icon={
                        <Star
                            size={22}
                            className="text-[#F9A825]"
                        />
                    }
                />

                <KpiCard
                    title="Completed Trips"
                    value={driverDashboardData.completedTrips}
                    subtitle="Trips completed"
                    color="#E3F2FD"
                    icon={
                        <CarFront
                            size={22}
                            className="text-[#1565C0]"
                        />
                    }
                />

                <KpiCard
                    title="Online Hours"
                    value={driverDashboardData.onlineHours}
                    subtitle="Today's active time"
                    color="#F3E5F5"
                    icon={
                        <Clock3
                            size={22}
                            className="text-[#6A1B9A]"
                        />
                    }
                />

            </div>

            {/* notification pannel */}
            <div className="mt-6">

                <NotificationsPanel />

            </div>


<div className="mt-6">

  <div
    className="
    flex
    items-center
    justify-between
    mb-5
    "
  >

    <div>

      <h2
        className="
        text-2xl
        font-bold
        text-[#1A1A2E]
        "
      >
        Incoming Ride Requests
      </h2>

      <p
        className="
        text-sm
        text-[#5D6D7E]
        mt-1
        "
      >
        Nearby ride requests waiting for response.
      </p>

    </div>

  </div>

  <div
    className="
    grid
    grid-cols-1
    xl:grid-cols-2
    gap-6
    "
  >

    {rideRequestsData.map((ride) => (

      <RideRequestCard
        key={ride.id}
        ride={ride}
      />

    ))}

  </div>

  <div className="mt-6">

  <RecentTripsTable
    trips={recentTripsData}
  />

</div>
<div className="mt-6">

  <EarningsChart
    data={earningsChartData}
  />

</div>

</div>

        </div>
    );
}

export default DriverDashboard;