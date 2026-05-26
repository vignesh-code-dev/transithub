import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Layout from "./layouts/Layout";
import BusTravelsOwnerDashboard from "./pages/busTravels-owner/BusTravelsOwnerDashboard";
import BusRegistration from "./pages/busTravels-owner/BusRegistration";
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

          <Route path="buses" element={<BusRegistration />} />
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
