import {
  LayoutDashboard,
  CarFront,
  Clock3,
  Users,
  BadgeIndianRupee,
  FileText,
  Headset,
} from "lucide-react";

export const commercialOwnerMenu = [

  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/commercial-owner/dashboard",
  },

  {
    label: "Vehicle Management",
    icon: CarFront,
    path: "/commercial-owner/vehicles",
  },

  {
    label: "Ride History",
    icon: Clock3,
    path: "/commercial-owner/rides",
  },

  {
    label: "Driver Assignment",
    icon: Users,
    path: "/commercial-owner/drivers",
  },

  {
    label: "Pricing Setup",
    icon: BadgeIndianRupee,
    path: "/commercial-owner/pricing",
  },

  {
    label: "Documents",
    icon: FileText,
    path: "/commercial-owner/documents",
  },

  {
    label: "Support",
    icon: Headset,
    path: "/commercial-owner/support",
  },

];
