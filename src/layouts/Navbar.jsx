import { Bell, Search, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { PORTAL_THEME } from "../config/themeConfig";
import { useNavigate } from 'react-router-dom';


export default function Navbar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  menus = [],
}) {
  const location = useLocation();
  const navigate = useNavigate();
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

  const findBreadcrumbs = (menusList, pathname, parentTrail = []) => {
    for (const menu of menusList || []) {
      if (menu.path === pathname) return [...parentTrail, menu];
      if (menu.children) {
        const childMatch = findBreadcrumbs(menu.children, pathname, [
          ...parentTrail,
          menu,
        ]);
        if (childMatch) return childMatch;
      }
    }
    return null;
  };

  const breadcrumbTrail = findBreadcrumbs(menus, location.pathname) || [];
  const activePageName = breadcrumbTrail.length
    ? breadcrumbTrail[breadcrumbTrail.length - 1].label
    : null;

  return (
    <header
      // 🟢 FIX 1: Modhalla string quotes mathi backticks (``) potachu. 
      // 🟢 FIX 2: Hardcoded borders mathi config values `${theme.border}` potachu.
      className={`
        fixed
        top-0
        left-0
        right-0
        h-16
        z-50
        border-b
        transition-colors duration-300
        ${theme.bg || theme.layoutBg}
        ${theme.border}
      `}
    >
      <div
        className="
          h-full
          px-3 sm:px-4 md:px-6
          flex
          items-center
          justify-between
          gap-3
        "
      >
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3 min-w-fit">
          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`
              lg:hidden
              p-2
              rounded-lg
              transition
              ${theme.text}
              ${theme.hoverBg}
            `}
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <h1
            className={`
              font-bold
              text-lg
              sm:text-xl
              whitespace-nowrap
              ${theme.text}
            `}
          >
            TransitHub
          </h1>

          {/* Active Page Context Marker */}
          {activePageName && (
            <span className={`hidden md:inline-block ml-3 text-sm font-bold ${theme.text}`}>
              {activePageName}
            </span>
          )}
        </div>

        {/* CENTER GLOBAL SEARCH */}
        <div
          className="
            hidden
            md:flex
            flex-1
            justify-center
            px-2 lg:px-6
          "
        >
          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />

            <input
              type="text"
              placeholder="Search..."
              
              className={`
                focus:outline-none
focus:ring-2
focus:ring-offset-2
focus:ring-white
                w-full
                h-10
                pl-10
                pr-4
                rounded-xl
                border
                border-gray-200
                bg-white
                text-sm
                outline-none
                focus:ring-2
                ${theme.ring}
              `}
            />
          </div>
        </div>

        {/* RIGHT METRICS & PROFILE */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Mobile Search Icon Trigger */}
          <button
            className={`
              md:hidden
              hover:opacity-80
              transition
              ${theme.text}
            `}
          >
            <Search size={21} />
          </button>

          {/* Notifications Bell */}
          <button
            className={`
              relative
              hover:opacity-80
              transition
              ${theme.text}
            `}
                      onClick={() => navigate('dashboard/notifications')}

            
          >
            <Bell size={22} />

            <span
              className="
                absolute
                -top-1
                -right-1
                w-2
                h-2
                bg-red-500
                rounded-full
              "
            />
          </button>

          {/* User Profile Avatar */}
          <div
            className="
              w-9
              h-9
              sm:w-10
              sm:h-10
              rounded-full
              overflow-hidden
              border-2
              border-white
              flex-shrink-0
            "
          >
            <img
              src="https://i.pravatar.cc/300"
              alt="Profile"
              className="
                w-full
                h-full
                object-cover
              "
            />
          </div>
        </div>
      </div>
    </header>
  );
}