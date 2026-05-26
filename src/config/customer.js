import {
  LayoutDashboard,
  Bus,
  Ticket,
  MapPinned,
  Zap,
  Star,
  Headset,
} from "lucide-react";

export const customerPortalMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/customer/dashboard",
  },

  {
    id: "booking",
    label: "Book Vehicle",
    icon: Bus,
    path: "/customer/booking",
  },

  {
    id: "my-bookings",
    label: "My Bookings",
    icon: Ticket,
    path: "/customer/my-bookings",
  },

  {
    id: "tracking",
    label: "Live Tracking",
    icon: MapPinned,
    path: "/customer/tracking",
  },

  {
    id: "quickride",
    label: "Quick Ride",
    icon: Zap,
    path: "/customer/quickride",
  },

  {
    id: "reviews",
    label: "Reviews",
    icon: Star,
    path: "/customer/reviews",
  },

  {
    id: "support",
    label: "Support",
    icon: Headset,
    path: "/customer/support",
  },
];