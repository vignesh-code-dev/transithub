import { useState } from "react";
import { useLocation } from "react-router-dom"; // 🟢 URL செக் பண்ண இம்போர்ட் செய்றோம்
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Breadcrumb from "../components/utils/Breadcrumb";
import { PORTAL_THEME } from "../config/themeConfig"; // 🟢 தீம் கான்ஃபிக் இம்போர்ட்

export default function Layout({ children, menus = [] }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // 1. URL-ஐ வச்சு தற்போதைய போர்ட்டல் எதுன்னு கண்டுபிடிக்கிறோம் (e.g., /admin, /owner)
  const currentPortal =
    Object.keys(PORTAL_THEME).find((key) =>
      location.pathname.includes(`/${key}`),
    ) || "customer";

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
        // 🟢 இங்கிருந்து போர்ட்டல் தீமை Sidebar-க்கும் அனுப்பி வைக்கிறோம்!
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
          <div className="text-inherit">{children}</div>
        </main>
      </div>
    </div>
  );
}
