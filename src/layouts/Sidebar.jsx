import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({
  collapsed,
  setCollapsed,
  menus = [],
}) {

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <aside
      className={`
        h-screen fixed left-0 top-0
        bg-[#FFC200]
        text-[#1A1A2E]
        transition-all duration-300
        ${collapsed ? "w-16" : "w-60"}
        flex flex-col
        shadow-md
        overflow-y-auto
      `}
    >

      {/* Header */}
      <div className="flex items-center justify-between p-4">

        {!collapsed && (
          <h1 className="font-bold text-lg">
            TransitHub
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Menus */}
      <nav className="flex flex-col gap-1 mt-2">

        {menus.map((item) => {

          const Icon = item.icon;
          const hasChildren = item.children;

          return (
            <div key={item.id}>

              {/* Parent Menu */}
              {hasChildren ? (

                <button
                  onClick={() => toggleMenu(item.id)}
                  className="
                    w-full
                    flex items-center justify-between
                    px-4 py-3
                    hover:bg-[#E6AD00]/70
                    transition-all
                  "
                >

                  <div className="flex items-center">

                    <Icon
                      size={20}
                      className={`${collapsed ? "mx-auto" : "mr-3"}`}
                    />

                    {!collapsed && (
                      <span className="font-medium text-left">
                        {item.label}
                      </span>
                    )}

                  </div>

                  {!collapsed && (
                    openMenu === item.id
                      ? <ChevronDown size={18} />
                      : <ChevronRight size={18} />
                  )}

                </button>

              ) : (

                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    flex items-center
                    px-4 py-3
                    transition-all

                    ${
                      isActive
                        ? "bg-[#E6AD00] border-l-4 border-white"
                        : "hover:bg-[#E6AD00]/70"
                    }
                    `
                  }
                >

                  <Icon
                    size={20}
                    className={`${collapsed ? "mx-auto" : "mr-3"}`}
                  />

                  {!collapsed && (
                    <span className="font-medium">
                      {item.label}
                    </span>
                  )}

                </NavLink>
              )}

              {/* Children */}
              {hasChildren && openMenu === item.id && !collapsed && (

                <div className="ml-4 mt-1 flex flex-col gap-1">

                  {item.children.map((child) => {

                    const ChildIcon = child.icon;

                    return (
                      <NavLink
                        key={child.id}
                        to={child.path}
                        className={({ isActive }) =>
                          `
                          flex items-center
                          px-4 py-3 rounded-l-xl
                          transition-all text-sm

                          ${
                            isActive
                              ? "bg-[#E6AD00] border-l-4 border-white"
                              : "hover:bg-[#E6AD00]/60"
                          }
                          `
                        }
                      >

                        <ChildIcon
                          size={18}
                          className="mr-3"
                        />

                        <span>
                          {child.label}
                        </span>

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
  );
}