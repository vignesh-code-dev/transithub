import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Layout from "./layouts/Layout";
import BusTravelsOwnerDashboard from "./pages/busTravels-owner/BusTravelsOwnerDashboard";
import BusRegistration from "./pages/busTravels-owner/BusRegistration";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { busTravelsOwnerMenu } from "./config/busTravelsOwnerMenu";
import "@fontsource/inter";
import "@fontsource/roboto-mono";

// driver routes
import DriverDashboard from "./pages/driver/DriverDashboard";
import RideRequests from "./pages/driver/RideRequests";
import Navigation from "./pages/driver/Navigation";
import DriverReviews from "./pages/driver/DriverReviews";
import DriverSupport from "./pages/driver/DriverSupport";
import { driverMenu } from "./config/driverMenu";
import Overview from "./pages/driver/Overview";


// commercial owner routes
import CommercialOwnerDashboard from "./pages/commercial-owner/CommercialOwnerDashboard";
import VehicleManagement from "./pages/commercial-owner/VehicleManagement";
import RideBookingHistory from "./pages/commercial-owner/RideBookingHistory";
import DriverAssignment from "./pages/commercial-owner/DriverAssignment";
import PricingSetup from "./pages/commercial-owner/PricingSetup";
import Documents from "./pages/commercial-owner/Documents";
import CommercialSupport from "./pages/commercial-owner/CommercialSupport";
import { commercialOwnerMenu } from "./config/commercialOwnerMenu";
import AddVehicle from "./pages/commercial-owner/AddVehicle";
import Earnings from "./pages/driver/Earnings";
import Notification from "./pages/driver/Notification";
import RideHistory from "./pages/driver/RideHistory";
import ActiveRequests from "./pages/driver/ActiveRequests";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/bus-owner"
          element={<Layout menus={busTravelsOwnerMenu} userRole="Bus Travels Owner" />}
        >
          <Route path="/bus-owner/dashboard" element={<BusTravelsOwnerDashboard />} />

          <Route path="buses" element={<BusRegistration />} />
        </Route>

        <Route
          path="*"
          element={<div className="p-10 font-sans">Page Not Found</div>}
        />





        {/* driver routes */}

        {/* DRIVER ROUTES */}

        <Route
          path="/driver"
          element={
            <Layout
              menus={driverMenu}
              userRole="Driver"

            />
          }
        >

          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />
          <Route
            path="dashboard"
            element={<DriverDashboard />}
          />
          <Route path="dashboard/overview" element={<Overview />} />
          <Route path="dashboard/earnings" element={<Earnings />} />
          <Route path="dashboard/notifications" element={<Notification />} />

          <Route
            path="ride-requests"
            element={<RideRequests />}
          />

          <Route path="ride-requests/active-requests" element={<ActiveRequests />} />
          <Route path="ride-requests/ride-history" element={<RideHistory />} />



          <Route
            path="navigation"
            element={<Navigation />}
          />

          <Route
            path="reviews"
            element={<DriverReviews />}
          />

          <Route
            path="support"
            element={<DriverSupport />}
          />

        </Route>




        {/* COMMERCIAL OWNER ROUTES */}
        {/* 
        <Route
          path="/commercial-owner/dashboard"
          element={
            <Layout
              menus={commercialOwnerMenu}
              portal="commercialOwner"
            >
              <CommercialOwnerDashboard />
            </Layout>
          }
        />
        <Route
    index
    element={<Navigate to="dashboard" replace />}
  />

        <Route
          path="/commercial-owner/vehicles"
          element={
            <Layout
              menus={commercialOwnerMenu}
              portal="commercialOwner"
            >
              <VehicleManagement />
            </Layout>
          }
        />

        <Route
          path="/commercial-owner/rides"
          element={
            <Layout
              menus={commercialOwnerMenu}
              portal="commercialOwner"
            >
              <RideBookingHistory />
            </Layout>
          }
        />

        <Route
          path="/commercial-owner/drivers"
          element={
            <Layout
              menus={commercialOwnerMenu}
              portal="commercialOwner"
            >
              <DriverAssignment />
            </Layout>
          }
        />

        <Route
          path="/commercial-owner/pricing"
          element={
            <Layout
              menus={commercialOwnerMenu}
              portal="commercialOwner"
            >
              <PricingSetup />
            </Layout>
          }
        />

        <Route
          path="/commercial-owner/documents"
          element={
            <Layout
              menus={commercialOwnerMenu}
              portal="commercialOwner"
            >
              <Documents />
            </Layout>
          }
        />

        <Route
          path="/commercial-owner/support"
          element={
            <Layout
              menus={commercialOwnerMenu}
              portal="commercialOwner"
            >
              <CommercialSupport />
            </Layout>
          }
        />
        <Route
  path="/commercial-owner/add-vehicle"
  element={<AddVehicle />}
/> */}



        <Route
          path="/commercial-owner"
          element={
            <Layout
              menus={commercialOwnerMenu}
              portal="commercialOwner"
            />
          }
        >
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<CommercialOwnerDashboard />}
          />

          <Route
            path="vehicles"
            element={<VehicleManagement />}
          />

          <Route
            path="rides"
            element={<RideBookingHistory />}
          />

          <Route
            path="drivers"
            element={<DriverAssignment />}
          />

          <Route
            path="pricing"
            element={<PricingSetup />}
          />

          <Route
            path="documents"
            element={<Documents />}
          />

          <Route
            path="support"
            element={<CommercialSupport />}
          />
        </Route>






      </Routes>
    </BrowserRouter>
  );
}

export default App;
