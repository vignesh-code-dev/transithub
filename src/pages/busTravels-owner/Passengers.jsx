import { useState } from "react";
import { ArrowLeft, Download, Printer, Phone, Mail, User, ShieldAlert } from "lucide-react";

// Mock Data: குறிப்பிட்ட பஸ்/ட்ரிப்-க்கான பயணிகள் பட்டியல்
const MOCK_MANIFEST = {
  tripId: "TRIP-2026-0605",
  busNumber: "TN-01-AX-7788",
  busType: "A/C Sleeper (2+1)",
  route: "Chennai to Madurai",
  date: "2026-06-05",
  time: "10:00 PM",
  driverName: "Muthu Karuppan",
  driverPhone: "+91 98765 43210",
  passengers: [
    { seat: "L1", name: "Anand Kumar", age: 34, gender: "Male", phone: "+91 94441 23456", email: "anand@email.com", status: "Boarding" },
    { seat: "L2", name: "Kavitha Anand", age: 30, gender: "Female", phone: "+91 94441 23457", email: "kavitha@email.com", status: "Boarding" },
    { seat: "L5", name: "Suresh Raina", age: 28, gender: "Male", phone: "+91 98840 55667", email: "suresh@email.com", status: "Boarding" },
    { seat: "U1", name: "Meena Krishnan", age: 52, gender: "Female", phone: "+91 91234 56789", email: "meena@email.com", status: "Boarding" },
    { seat: "U2", name: "Rajesh Kumar", age: 55, gender: "Male", phone: "+91 91234 56780", email: "rajesh@email.com", status: "No-Show" }, // வராத பயணி
  ]
};

export default function Passengers() {
  const [manifest] = useState(MOCK_MANIFEST);

  // பிரிண்ட் எடுப்பதற்கான ஃபங்க்ஷன்
  const handlePrint = () => {
    window.print();
  };

  // CSV/Excel ஆக டவுன்லோட் செய்ய (BT-BC-02)
  const handleDownloadCSV = () => {
    const headers = ["Seat", "Passenger Name", "Age", "Gender", "Phone", "Email", "Status"];
    const rows = manifest.passengers.map(p => 
      `"${p.seat}","${p.name}","${p.age}","${p.gender}","${p.phone}","${p.email}","${p.status}"`
    );
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + `Trip Details: ${manifest.route} | Date: ${manifest.date} | Bus: ${manifest.busNumber}\n\n`
      + headers.join(",") + "\n" 
      + rows.join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Manifest_${manifest.tripId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      
      {/* மேல் பகுதி: Back & Action Buttons (Print செய்யும்போது இது மறையும்படி `@media print` CSS எழுதலாம்) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 print:hidden">
        <button 
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
          onClick={() => alert("Going back to Booking List...")}
        >
          <ArrowLeft size={16} /> Back to Bookings
        </button>

        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition shadow-sm"
          >
            <Printer size={16} /> Print List
          </button>
          <button 
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 bg-emerald-600 rounded-lg text-white hover:bg-emerald-700 transition shadow-sm"
          >
            <Download size={16} /> Download CSV
          </button>
        </div>
      </div>

      {/* பஸ் மற்றும் ட்ரிப் விவரங்கள் (Trip & Bus Meta Info) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Trip Details</span>
          <h2 className="text-xl font-bold text-gray-800 mt-1">{manifest.route}</h2>
          <p className="text-sm text-gray-500 mt-1">Date: <span className="font-semibold text-gray-700">{manifest.date}</span> at {manifest.time}</p>
          <p className="text-xs text-gray-400 font-mono mt-2">Trip ID: {manifest.tripId}</p>
        </div>

        <div className="border-t md:border-t-0 md:border-l md:pl-6 pt-4 md:pt-0">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bus & Vehicle</span>
          <h3 className="text-lg font-bold text-gray-800 mt-1">{manifest.busNumber}</h3>
          <p className="text-sm text-gray-600">{manifest.busType}</p>
          <p className="text-sm text-gray-500 mt-1">Total Booked: <span className="font-semibold text-gray-700">{manifest.passengers.length} Passenger(s)</span></p>
        </div>

        <div className="border-t md:border-t-0 md:border-l md:pl-6 pt-4 md:pt-0">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Crew Info</span>
          <h3 className="text-md font-semibold text-gray-800 mt-1 flex items-center gap-1">
            <User size={16} className="text-gray-400" /> {manifest.driverName} (Driver)
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            <Phone size={14} className="text-gray-400" /> {manifest.driverPhone}
          </p>
        </div>
      </div>

      {/* பயணிகள் பட்டியல் டேபிள் (Passenger Table) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Official Passenger Manifest</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4 w-24 text-center">Seat</th>
                <th className="p-4">Passenger Info</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
              {manifest.passengers.map((passenger, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  {/* சீட் நம்பர் */}
                  <td className="p-4 text-center font-mono font-bold text-gray-900 bg-gray-50/30">
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded text-sm">
                      {passenger.seat}
                    </span>
                  </td>
                  
                  {/* பயணி பெயர், வயது, பாலினம் */}
                  <td className="p-4">
                    <div className="font-semibold text-gray-900 text-[15px]">{passenger.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{passenger.gender} • {passenger.age} Yrs</div>
                  </td>

                  {/* போன் & மெயில் விவரங்கள் (BT-BC-02 Specific) */}
                  <td className="p-4 space-y-1">
                    <div className="flex items-center gap-1.5 text-gray-700 text-sm">
                      <Phone size={14} className="text-gray-400" />
                      <span>{passenger.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                      <Mail size={14} className="text-gray-400" />
                      <span>{passenger.email}</span>
                    </div>
                  </td>

                  {/* போர்டிங் ஸ்டேட்டஸ் */}
                  <td className="p-4 text-center">
                    {passenger.status === "Boarding" ? (
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                        Ready to Board
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-100 flex items-center justify-center gap-1 w-28 mx-auto">
                        <ShieldAlert size={12} /> No-Show
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}