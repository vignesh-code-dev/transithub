import { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Eye,
} from "lucide-react";

// Mock Data: புக்கிங் லிஸ்ட் தரவுகள்
const MOCK_BOOKINGS = [
  {
    id: "001",
    passenger: "Anand Kumar",
    date: "2026-06-05",
    route: "Chennai to Madurai",
    seat: "A1, A2",
    amount: "₹1,200",
    status: "Confirmed",
  },
  {
    id: "002",
    passenger: "Suresh Raina",
    date: "2026-06-05",
    route: "Coimbatore to Bangalore",
    seat: "B5",
    amount: "₹850",
    status: "Pending",
  },
  {
    id: "003",
    passenger: "Meena Krishnan",
    date: "2026-06-06",
    route: "Chennai to Madurai",
    seat: "A5",
    amount: "₹600",
    status: "Confirmed",
  },
  {
    id: "004",
    passenger: "Vijay Joseph",
    date: "2026-06-07",
    route: "Trichy to Chennai",
    seat: "C3, C4",
    amount: "₹1,100",
    status: "Cancelled",
  },
  {
    id: "005",
    passenger: "Priya Darshini",
    date: "2026-06-08",
    route: "Madurai to Bangalore",
    seat: "A9",
    amount: "₹950",
    status: "Confirmed",
  },
];

export default function BookingList() {
  // Filters State
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // தனித்துவமான ரூட்களை மட்டும் ஃபில்டருக்காக பிரித்தெடுத்தல்
  const uniqueRoutes = [...new Set(MOCK_BOOKINGS.map((b) => b.route))];

  // ஃபில்டர் லாஜிக் (Date, Route, Status மற்றும் Search அடிப்படையில்)
  const filteredBookings = MOCK_BOOKINGS.filter((booking) => {
    const matchesSearch =
      booking.passenger.toLowerCase().includes(search.toLowerCase()) ||
      booking.id.toLowerCase().includes(search.toLowerCase());
    const matchesDate = selectedDate ? booking.date === selectedDate : true;
    const matchesRoute = selectedRoute ? booking.route === selectedRoute : true;
    const matchesStatus = selectedStatus
      ? booking.status === selectedStatus
      : true;

    return matchesSearch && matchesDate && matchesRoute && matchesStatus;
  });

  // Status-க்கு தகுந்தபடி கலர் மாற்றுவதற்கான ஹெல்பர்
  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return (
          <span className="flex items-center justify-center gap-1 text-xs font-semibold px-1 py-1 rounded-full bg-emerald-100 text-emerald-800">
            <CheckCircle size={14} /> Confirmed
          </span>
        );
      case "Pending":
        return (
          <span className="flex items-center justify-center gap-1 text-xs font-semibold px-1 py-1 rounded-full bg-amber-100 text-amber-800">
            <Clock size={14} /> Pending
          </span>
        );
      case "Cancelled":
        return (
          <span className="flex items-center justify-center gap-1 text-xs font-semibold px-1 py-1 rounded-full bg-rose-100 text-rose-800">
            <XCircle size={14} /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  // Passenger Manifest டவுன்லோட் செய்யும் போலி ஃபங்க்ஷன் (BT-BC-02)
  const handleDownloadManifest = (route, date) => {
    alert(
      `Downloading Passenger Manifest for "${route}" on ${date} (CSV Format)...`,
    );
  };

  return (
    <div className="p-6 min-h-screen">
      {/* தலைப்புப் பகுதி */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Booking List
          </h1>
        </div>
      </div>

      {/* ஃபில்டர்கள் பகுதி (BT-BC-01) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search Passenger or Req ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Date Filter */}
        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
          />
        </div>

        {/* Route Filter */}
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
          <select
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 appearance-none bg-white"
          >
            <option value="">All Routes</option>
            {uniqueRoutes.map((route) => (
              <option key={route} value={route}>
                {route}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 appearance-none bg-white"
          >
            <option value="">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* புக்கிங் டேபிள் பட்டியல் (BT-BC-01) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b text-center border-gray-200 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">ID</th>
                <th className="p-4">Passenger Name</th>
                <th className="p-4">Journey Date</th>
                <th className="p-4">Route</th>
                <th className="p-4">Seats</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50/80 transition-colors text-center"
                  >
                    <td className="p-4 font-mono font-medium text-blue-600">
                      {booking.id}
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      {booking.passenger}
                    </td>
                    <td className="p-4 text-gray-600">{booking.date}</td>
                    <td className="p-4 text-gray-600">{booking.route}</td>
                    <td className="p-4">
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded font-mono">
                        {booking.seat}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-gray-900">
                      {booking.amount}
                    </td>
                    <td className="p-4 ">{getStatusBadge(booking.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* View Details Button */}
                        <button
                          title="View Details"
                          className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition"
                          onClick={() =>
                            alert(
                              `Redirecting to Details Page of ${booking.id}...`,
                            )
                          }
                        >
                          <Eye size={16} />
                        </button>

                        {/* Download Passenger Manifest (BT-BC-02) */}
                        <button
                          title="Download Manifest"
                          className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition"
                          onClick={() =>
                            handleDownloadManifest(booking.route, booking.date)
                          }
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="p-8 text-center text-gray-400 font-medium bg-gray-50/50"
                  >
                    No bookings found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
