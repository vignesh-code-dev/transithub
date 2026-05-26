import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

/* Menu */
import { customerPortalMenu } from "./config/customer";

/* Customer Portal Pages */
import Dashboard from "./pages/customerportal/Dashboard";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Layout from "./layouts/Layout";
import BusTravelsOwnerDashboard from "./pages/busTravels-owner/BusTravelsOwnerDashboard";
import BusRegistration from "./pages/busTravels-owner/BusRegistration";
import ForgotPassword from "./pages/auth/ForgotPassword";
import "@fontsource/inter";
import "@fontsource/roboto-mono";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout menus={customerPortalMenu}>
              <Dashboard />
            </Layout>
          }
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/layout" element={<Layout></Layout>} />
        <Route
          path="/dashboard"
          element={<BusTravelsOwnerDashboard></BusTravelsOwnerDashboard>}
        />
        <Route
          path="/travels-owner/buses"
          element={<BusRegistration></BusRegistration>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
