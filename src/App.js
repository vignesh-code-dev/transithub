import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Layout from "./layouts/Layout";
import BusTravelsOwnerDashboard from "./pages/busTravels-owner/BusTravelsOwnerDashboard";
import BusRegistration from "./pages/busTravels-owner/BusEntry";
import SeatLayoutBuilder from "./pages/busTravels-owner/SeatLayoutBuilder";
import RouteScheduleBuilder from "./pages/busTravels-owner/RouteScheduleBuilder";
import PricingRulesBuilder from "./pages/busTravels-owner/PricingRulesBuilder";
import AvailabilityControl from "./pages/busTravels-owner/AvailabilityControl";
import BookingList from "./pages/busTravels-owner/BookingList";
import Passengers from "./pages/busTravels-owner/Passengers";
import BookingDetails from "./pages/busTravels-owner/BookingDetail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { busTravelsOwnerMenu } from "./config/busTravelsOwnerMenu";
import "@fontsource/inter";
import "@fontsource/roboto-mono";

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
          <Route path="/bus-owner/buses" element={<BusRegistration />} /> 
          <Route path="/bus-owner/seat-layout" element={<SeatLayoutBuilder />} />
          <Route path="/bus-owner/routes" element={<RouteScheduleBuilder />} />
          <Route path="/bus-owner/pricing" element={<PricingRulesBuilder />} />
          <Route path="/bus-owner/availability" element={<AvailabilityControl />} />
          <Route path="/bus-owner/bookings" element={<BookingList />} />
          <Route path="/bus-owner/passengers" element={<Passengers />} />
          <Route path="/bus-owner/bookingDetails" element={<BookingDetails />} />
        </Route>

        <Route
          path="*"
          element={<div className="p-10 font-sans">Page Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
