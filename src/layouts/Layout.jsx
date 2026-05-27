import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom"; //
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Breadcrumb from "../components/utils/Breadcrumb";
import { PORTAL_THEME } from "../config/themeConfig";

export default function Layout({ children, menus = [] }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // URL-ஐ வைத்து தற்போதைய போர்ட்டல் எது என்று கண்டறிதல்
const getPortalFromPath = () => {

  if (location.pathname.startsWith("/driver")) {
    return "driver";
  }

  if (location.pathname.startsWith("/bus-owner")) {
    return "bus-owner";
  }

  if (location.pathname.startsWith("/commercial-owner")) {
    return "commercialOwner";
  }

  if (location.pathname.startsWith("/travels-owner")) {
    return "travelsOwner";
  }

  if (location.pathname.startsWith("/admin")) {
    return "admin";
  }

  if (location.pathname.startsWith("/super-admin")) {
    return "superAdmin";
  }

  return "customer";
};

const currentPortal = getPortalFromPath();

  const theme = PORTAL_THEME[currentPortal] || PORTAL_THEME.customer;

  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A2E]">
      {/* Top Fixed Header Context */}
      <Navbar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        menus={menus}
      />

      {/* Global Collapsible Left Navigation System */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        menus={menus}
        theme={theme}
      />

      {/* Structural Outer Content Layout Framework */}
      <div
        className={`
          pt-16
          transition-all
          duration-300
          ${collapsed ? "lg:ml-16" : "lg:ml-60"}
          ml-0
        `}
      >
        <main className="bg-white min-h-[calc(100vh-64px)] p-6">
          {/* Dynamic breadcrumb navigation route tree indicator */}
          <Breadcrumb menus={menus} />

          {/* Viewport Core Injected App Engine Routes */}
          <div className="text-inherit">{children || <Outlet />}</div>
        </main>
      </div>
    </div>
  );
}
