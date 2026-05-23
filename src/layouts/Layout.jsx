import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({
  children,
  menus,
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-primaryBg font-sans">

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        menus={menus}
      />

      {/* Main Area */}
      <div
        className={`
          flex flex-col flex-1
          transition-all duration-300
          ${collapsed ? "ml-16" : "ml-60"}
        `}
      >

        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 p-6 mt-16 overflow-auto">
          {children}
        </main>

      </div>
    </div>
  );
}