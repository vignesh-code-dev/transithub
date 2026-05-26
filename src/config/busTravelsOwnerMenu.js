import {
  LayoutDashboard,
  Bus,
  Armchair,
  Route,
  Ticket,
  Map,
  Headset,
  FileText,
  IndianRupee,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

export const busTravelsOwnerMenu = [
  // Dashboard
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/bus-owner/dashboard",
  },

  // Fleet & Bus Management
  {
    id: "Bus Entry",
    label: "Bus Entry",
    icon: Bus,

    children: [
      {
        id: "bus-registration",
        label: "Bus Registration",
        icon: Bus,
        path: "/bus-owner/buses",
      },
      {
        id: "seat-layout",
        label: "Seat Layout Builder",
        icon: Armchair,
        path: "/bus-owner/seat-layout",
      },
      {
        id: "routes-schedule",
        label: "Routes & Schedule",
        icon: Route,
        path: "/bus-owner/routes",
      },
      {
        id: "pricing-rules",
        label: "Pricing Rules",
        icon: IndianRupee,
        path: "/bus-owner/pricing",
      },
      {
        id: "availability-control",
        label: "Availability Control",
        icon: AlertTriangle,
        path: "/bus-owner/availability",
      },
    ],
  },

  // Booking Management
  {
    id: "booking-management",
    label: "Booking Management",
    icon: Ticket,
    children: [
      {
        id: "booking-list",
        label: "Booking List",
        icon: Ticket,
        path: "/bus-owner/bookings",
      },
      {
        id: "passenger-manifest",
        label: "Passenger Manifest",
        icon: FileText,
        path: "/bus-owner/passengers",
      },
      {
        id: "manual-confirmation",
        label: "Manual Confirmation",
        icon: MessageSquare,
        path: "/bus-owner/manual-confirmation",
      },
      {
        id: "cancellations",
        label: "Cancellation Handling",
        icon: AlertTriangle,
        path: "/bus-owner/cancellations",
      },
      {
        id: "eticket",
        label: "E-Ticket Resend",
        icon: FileText,
        path: "/bus-owner/e-ticket",
      },
    ],
  },

  // Tracking
  {
    id: "tracking",
    label: "Tracking",
    icon: Map,
    children: [
      {
        id: "fleet-map",
        label: "Fleet Map",
        icon: Map,
        path: "/bus-owner/fleet-map",
      },
      {
        id: "trip-progress",
        label: "Trip Progress",
        icon: Route,
        path: "/bus-owner/trip-progress",
      },
      {
        id: "driver-communication",
        label: "Driver Communication",
        icon: MessageSquare,
        path: "/bus-owner/driver-chat",
      },
      {
        id: "incident-reporting",
        label: "Incident Reporting",
        icon: AlertTriangle,
        path: "/bus-owner/incidents",
      },
    ],
  },

  // Support
  {
    id: "support",
    label: "Support",
    icon: Headset,
    children: [
      {
        id: "passenger-queries",
        label: "Passenger Queries",
        icon: MessageSquare,
        path: "/bus-owner/support/passengers",
      },
      {
        id: "platform-support",
        label: "Platform Support",
        icon: Headset,
        path: "/bus-owner/support/platform",
      },
      {
        id: "documents",
        label: "Documents Centre",
        icon: FileText,
        path: "/bus-owner/documents",
      },
    ],
  },
];
