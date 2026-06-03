import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ menus = [] }) {
  const location = useLocation();

  // URL-ன் இறுதியில் இருக்கும் தேவையற்ற ஸ்லாஷ்களை நீக்கி செக் செய்ய
  const currentPathname = location.pathname.replace(/\/$/, "") || "/";

  // Helper calculation to pull matching route path sequences recursively
  const findBreadcrumbs = (menusList, pathname, parentTrail = []) => {
    for (const menu of menusList || []) {
      // மெனு பாதையையும் சீராக்குகிறோம்
      const menuPath = menu.path?.replace(/\/$/, "") || "/";

      if (menuPath === pathname) {
        return [...parentTrail, menu];
      }
      
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

  const trail = findBreadcrumbs(menus, currentPathname) || [];

  // Home பக்கத்தில் மட்டும் Breadcrumb தெரியாமல் இருக்க (அல்லது மெனு மேட்ச் ஆகவில்லை என்றால்)
  if (currentPathname === "/" || trail.length === 0) return null;

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