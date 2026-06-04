import { useState } from "react";
import { ArrowLeft, Check, X, Mail, AlertTriangle, RefreshCw, Ticket, ShieldCheck } from "lucide-react";

// Mock Data: ஒரு குறிப்பிட்ட புக்கிங்கின் முழு விவரம்
const MOCK_BOOKING_DETAIL = {
  id: "BT-BC-02",
  passengerName: "Suresh Raina",
  phone: "+91 98840 55667",
  email: "suresh@email.com",
  date: "2026-06-05",
  time: "10:00 PM",
  route: "Coimbatore to Bangalore",
  busNumber: "TN-37-BY-1234",
  seatNumber: "B5 (Sleeper)",
  totalAmount: 850,
  initialStatus: "Pending" // மாற்றங்களைச் சோதிக்க State-ல் வைக்கப்படும்
};

export default function BookingDetailPage() {
  const [booking, setBooking] = useState(MOCK_BOOKING_DETAIL);
  const [loading, setLoading] = useState(false);

  // BT-BC-03: Manual Confirmation & Rejection
  const handleStatusChange = (newStatus) => {
    setLoading(true);
    setTimeout(() => {
      setBooking((prev) => ({ ...prev, status: newStatus }));
      setLoading(false);
      alert(`Booking status successfully updated to: ${newStatus}`);
    }, 1000);
  };

  // BT-BC-04: Cancellation Handling with Refund Policy
  const handleCancellation = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    setLoading(true);
    setTimeout(() => {
      // எளிய ரீஃபண்ட் கணக்கீடு (உதாரணமாக 15% கேன்சலேஷன் கட்டணம் கழித்து 85% ரீஃபண்ட்)
      const refundAmount = booking.totalAmount * 0.85;
      
      setBooking((prev) => ({ ...prev, status: "Cancelled" }));
      setLoading(false);
      
      alert(`Ticket Cancelled!\n\nRefund of ₹${refundAmount.toFixed(2)} (85%) has been processed to the passenger.\nSeat ${booking.seatNumber} is now available for booking.`);
    }, 1000);
  };

  // BT-BC-05: E-Ticket Resend
  const handleResendTicket = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`E-Ticket has been successfully resent to: ${booking.email}`);
    }, 80000 / 1000); // 1 செகண்ட் போலி லோடிங்
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      
      {/* Back Button */}
      <button 
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition mb-6"
        onClick={() => alert("Going back...")}
      >
        <ArrowLeft size={16} /> Back to Booking List
      </button>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* இடது பக்கம்: டிக்கெட் மற்றும் பயணி விவரங்கள் (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* புக்கிங் கார்டு (Main Info) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div>
                <span className="text-xs font-mono text-gray-400">Request ID</span>
                <h2 className="text-xl font-bold text-blue-600 font-mono">{booking.id}</h2>
              </div>
              <div>
                {/* Status Badges */}
                {booking.status === "Pending" && <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">Pending Approval</span>}
                {booking.status === "Confirmed" && <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">Confirmed</span>}
                {booking.status === "Cancelled" && <span className="px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-full">Cancelled</span>}
              </div>
            </div>

            {/* பயண விவரங்கள் */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-400 uppercase">Route</p>
                <p className="font-semibold text-gray-800">{booking.route}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Bus & Seat</p>
                <p className="font-semibold text-gray-800">{booking.busNumber} • <span className="text-blue-600 font-mono">{booking.seatNumber}</span></p>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-400 uppercase">Date & Time</p>
                <p className="font-semibold text-gray-800">{booking.date} at {booking.time}</p>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-400 uppercase">Fare Amount</p>
                <p className="font-bold text-lg text-gray-900">₹{booking.totalAmount}</p>
              </div>
            </div>
          </div>

          {/* பயணி காண்டாக்ட் கார்டு */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b pb-3 mb-4">Passenger Contact Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400">Name</p>
                <p className="font-medium text-gray-800">{booking.passengerName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Mobile Number</p>
                <p className="font-medium text-gray-800">{booking.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Email Address</p>
                <p className="font-medium text-gray-800">{booking.email}</p>
              </div>
            </div>
          </div>

        </div>

        {/* வலது பக்கம்: ஆக்ஷன் கண்ட்ரோல்கள் (Right Column - Actions Panel) */}
        <div className="space-y-6">
          
          {/* ஆக்ஷன் கார்டு */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-4">Operator Actions</h3>
            
            {loading ? (
              <div className="flex items-center justify-center py-6 gap-2 text-sm text-gray-500 font-medium">
                <RefreshCw size={16} className="animate-spin text-blue-600" /> Processing action...
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                
                {/* BT-BC-03: பெண்டிங்கில் இருந்தால் மட்டும் Confirm/Reject பட்டன்கள் காட்டும் */}
                {booking.status === "Pending" && (
                  <>
                    <button 
                      onClick={() => handleStatusChange("Confirmed")}
                      className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg transition shadow-sm"
                    >
                      <Check size={16} /> Manually Confirm Booking
                    </button>
                    <button 
                      onClick={() => handleStatusChange("Cancelled")}
                      className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-white border border-gray-200 hover:bg-gray-50 text-rose-600 py-2.5 rounded-lg transition shadow-sm"
                    >
                      <X size={16} /> Reject Offline Booking
                    </button>
                  </>
                )}

                {/* BT-BC-05: டிக்கெட் கன்பார்ம் ஆகி இருந்தால் மெயில் அனுப்பும் வசதி */}
                {booking.status === "Confirmed" && (
                  <button 
                    onClick={handleResendTicket}
                    className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition shadow-sm"
                  >
                    <Mail size={16} /> Resend E-Ticket to Email
                  </button>
                )}

                {/* BT-BC-04: கன்பார்ம் ஆன டிக்கெட்டை ரத்து செய்யும் வசதி */}
                {booking.status !== "Cancelled" && (
                  <button 
                    onClick={handleCancellation}
                    className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 py-2.5 rounded-lg transition border border-rose-200"
                  >
                    <AlertTriangle size={16} /> Cancel Ticket & Refund
                  </button>
                )}

                {/* டிக்கெட் கேன்சல் செய்யப்பட்டு இருந்தால் */}
                {booking.status === "Cancelled" && (
                  <div className="p-4 bg-gray-50 text-gray-500 text-xs text-center border rounded-lg font-medium">
                    This booking has been finalized. No further actions can be performed.
                  </div>
                )}

              </div>
            )}
          </div>

          {/* ரீஃபண்ட் மற்றும் சீட் கொள்கை குறிப்புகள் (Policy Info) */}
          <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
            <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-1">
              <ShieldCheck size={14} /> Quick System Rules
            </h4>
            <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside">
              <li>Manual confirmation instantly blocks the selected seats.</li>
              <li>Cancellation before 24hrs refunds 85% fare (15% policy deductions).</li>
              <li>Cancelling a ticket automatically frees up the seat on the live manifest list.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}