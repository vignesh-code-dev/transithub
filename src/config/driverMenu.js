import {
  LayoutDashboard,
  CarFront,
  MapPinned,
  Star,
  ShieldAlert
} from "lucide-react";

export const driverMenu = [

  {
    label: "Dashboard",
    path: "/driver/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Ride Requests",
    path: "/driver/ride-requests",
    icon: CarFront,
  },

  {
    label: "Navigation",
    path: "/driver/navigation",
    icon: MapPinned,
  },

  {
    label: "Reviews",
    path: "/driver/reviews",
    icon: Star,
  },

  {
    label: "Support",
    path: "/driver/support",
    icon: ShieldAlert,
  },

];
