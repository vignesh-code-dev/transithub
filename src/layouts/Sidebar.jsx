import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, ChevronDown, ChevronRight, X } from "lucide-react";

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  menus = [],
  theme,
}) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  // Close mobile sidebar on pressing Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setMobileOpen]);

  const sidebarBg = theme?.layoutBg || "bg-[#1565C0]";
  const sidebarBorder = theme?.border || "border-[#1565C0]";
  const textColor = theme?.text || "text-white";
  const activeClass = theme?.activeBg || "bg-[#1976D2]";
  const hoverClass = theme?.hoverBg || "hover:bg-[#1976D2]/80";
  const childHoverClass = theme?.childHoverBg || "hover:bg-[#1976D2]/50";

  return (
    <>
      {/* MOBILE BACKDROP OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed
          top-16
          left-0
          h-[calc(100vh-64px)]
          transition-all duration-300
          overflow-y-auto
          z-40
          border-r
          ${sidebarBg}
          ${sidebarBorder}
          ${collapsed ? "w-16" : "w-60"}
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Responsive Desktop Switch Panel */}
        <div className={`flex items-center justify-between p-3 border-b ${sidebarBorder}`}>
          <span
            className={`text-xs font-bold tracking-wider uppercase ${textColor} ${collapsed ? "hidden" : "block"}`}
          >
            Navigation
          </span>

          {/* Mobile close trigger */}
          <button
            className={`lg:hidden p-1 rounded-lg transition ${textColor} ${hoverClass}`}
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>

          {/* Desktop collapse control toggle */}
          <button
            className={`hidden lg:block p-1 rounded-lg transition ${textColor} ${hoverClass}`}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Main Nav Tree */}
        <nav className="px-2 py-4 pb-6">
          {menus.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={item.id} className="mb-1">
                {/* Parent Row Container */}
                {hasChildren ? (
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={`
                      w-full
                      flex
                      items-center
                      justify-between
                      px-3
                      py-3
                      rounded-r-xl
                      transition-all
                      border-l-4
                      ${textColor}
                      ${
                        openMenu === item.id
                          ? `${activeClass} border-white font-semibold`
                          : `border-transparent ${hoverClass}`
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <Icon
                        size={20}
                        className={collapsed ? "mx-auto" : "mr-3"}
                      />
                      {!collapsed && (
                        <span className="font-medium text-sm">
                          {item.label}
                        </span>
                      )}
                    </div>

                    {!collapsed &&
                      (openMenu === item.id ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      ))}
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => `
                      flex
                      items-center
                      px-3
                      py-3
                      rounded-r-xl
                      transition-all
                      border-l-4
                      ${textColor}
                      ${
                        isActive
                          ? `${activeClass} border-white font-bold`
                          : `border-transparent ${hoverClass}`
                      }
                    `}
                  >
                    <Icon
                      size={20}
                      className={collapsed ? "mx-auto" : "mr-3"}
                    />
                    {!collapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </NavLink>
                )}

                {/* Sub-menu Item Children Drawer */}
                {hasChildren && openMenu === item.id && !collapsed && (
                  <div className={`ml-4 mt-1 flex flex-col gap-1 border-l pl-2 ${sidebarBorder}`}>
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;

                      return (
                        <NavLink
                          key={child.id}
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) => `
                            flex
                            items-center
                            px-3
                            py-2
                            rounded-r-xl
                            text-xs
                            transition-all
                            border-l-4
                            ${textColor}
                            ${
                              isActive
                                ? `${activeClass} border-white font-bold`
                                : `border-transparent ${childHoverClass}`
                            }
                          `}
                        >
                          <ChildIcon size={16} className="mr-2" />
                          <span>{child.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}