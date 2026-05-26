import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ menus = [] }) {
  const location = useLocation();

  // Helper calculation to pull matching route path sequences recursively
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

  const trail = findBreadcrumbs(menus, location.pathname) || [];

  // Suppress rendering if level 1 base layer page view
  if (trail.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-xs font-sans text-[#5D6D7E] mb-5">
      <Link to="/" className="hover:text-[#1A1A2E] transition">
        Home
      </Link>
      
      {trail.map((node, index) => {
        const isLast = index === trail.length - 1;
        return (
          <div key={node.id || index} className="flex items-center space-x-2">
            <ChevronRight size={12} className="text-[#5D6D7E]" />
            {isLast ? (
              <span className="font-bold text-[#1A1A2E]">{node.label}</span>
            ) : (
              <Link to={node.path || "#"} className="hover:text-[#1A1A2E] transition">
                {node.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}