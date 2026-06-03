import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  const location = useLocation();

  // பக்கம் மாறும்போது மொபைல் சைடுபாரை மூடுவதற்கு
  const handleNavigation = () => {
    setMobileOpen(false);
  };

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  // தற்போதைய URL-ன் அடிப்படையில், எந்த சப்-மெனு ஓபனாக இருக்க வேண்டும் என்பதை ஆட்டோமேட்டிக்காகக் கண்டறிதல்
  useEffect(() => {
    menus.forEach((item) => {
      if (item.children && item.children.length > 0) {
        const isParentActive = location.pathname === item.path;
        const isChildActive = item.children.some((child) => location.pathname === child.path);
        
        if (isParentActive || isChildActive) {
          setOpenMenu(item.id);
        }
      }
    });
  }, [location.pathname, menus]);

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
                  <NavLink
                    to={item.path}
                    end // <--- Exact URL மேட்ச் ஆவதற்கு இது முக்கியம்
                    onClick={() => {
                      handleNavigation();
                      toggleMenu(item.id);
                    }}
                    className={({ isActive }) => `
                      w-full
                      flex
                      items-center
                      justify-between
                      px-3
                      py-3
                      rounded
                      transition-all
                      border-l-4
                      ${textColor}
                      ${
                        isActive && location.pathname === item.path
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
                        <span className="font-medium text-[14px] leading-5">
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
                  </NavLink>
                ) : (
                  <NavLink
                    to={item.path}
                    end // <--- Exact URL மேட்ச் ஆவதற்கு இது முக்கியம்
                    onClick={handleNavigation}
                    className={({ isActive }) => `
                      flex
                      items-center
                      px-3
                      py-3
                      rounded
                      transition-all
                      border-l-4
                      ${textColor}
                      ${
                        isActive && location.pathname === item.path
                          ? `${activeClass} border-white`
                          : `border-transparent ${hoverClass}`
                      }
                    `}
                  >
                    <Icon
                      size={20}
                      className={collapsed ? "mx-auto" : "mr-3"}
                    />
                    {!collapsed && (
                      <span className="text-[14px] leading-5 font-medium">{item.label}</span>
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
                          end
                          onClick={handleNavigation}
                          className={({ isActive }) => `
                            flex
                            items-center
                            px-3
                            py-2
                            rounded
                            text-[12px]
                            font-medium
                            transition-all
                            border-l-4
                            ${textColor}
                            ${
                              isActive
                                ? `${activeClass} border-white `
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