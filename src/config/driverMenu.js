import {
  LayoutDashboard,
  CarFront,
  MapPinned,
  Star,
  ShieldAlert,
  Wallet,
  Bell,
  History
} from "lucide-react";

export const driverMenu = [

  {
    id: "dashboard",
    label: "Dashboard",
    path: "/driver/dashboard",
    icon: LayoutDashboard,
    children: [
      {
        id: "dashboard-overview",
        label: "Overview",
        path: "/driver/dashboard/overview",
        icon: Wallet,
      },
      {
        id: "dashboard-earnings",
        label: "Earnings",
        path: "/driver/dashboard/earnings",
        icon: Wallet,
      },
      {
        id: "dashboard-notifications",
        label: "Notifications",
        path: "/driver/dashboard/notifications",
        icon: Bell,
      }
    ]
  },

  {
    id: "ride-requests",
    label: "Ride Requests",
    path: "/driver/ride-requests",
    icon: CarFront,
    children: [
      {
        id: "ride-history",
        label: "Ride History",
        path: "/driver/ride-requests/ride-history",
        icon: History,
      }
    ]
  },

  {
    id: "navigation",
    label: "Navigation",
    path: "/driver/navigation",
    icon: MapPinned,
  },

  {
    id: "reviews",
    label: "Reviews",
    path: "/driver/reviews",
    icon: Star,
  },

  {
    id: "support",
    label: "Support",
    path: "/driver/support",
    icon: ShieldAlert,
  },

];
