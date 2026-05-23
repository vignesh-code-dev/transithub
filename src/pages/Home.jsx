import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Bus, Car, ShieldCheck, MapPin, Calendar, Users ,Search} from "lucide-react";
import loginBg from "../assets/images/herobus.jpg";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';


const Home = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);

  const searchFromPlaces = async (value) => {
    setFrom(value);

    if (value.length < 2) {
      setFromSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${value}`,
        {
          headers: {
            "User-Agent": "TransitHubApp/1.0 (vickyv.developer.com)",
          },
        },
      );

      const data = await res.json();
      setFromSuggestions(data);
    } catch (err) {
      console.log("API Error:", err);
      setFromSuggestions([]);
    }
  };
  const searchToPlaces = async (value) => {
    setTo(value);

    if (value.length < 2) {
      setToSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${value}`,
        {
          headers: {
            "User-Agent": "TransitHubApp/1.0 (vickyv.developer.com)",
          },
        },
      );

      const data = await res.json();
      setToSuggestions(data);
    } catch (err) {
      console.log("API Error:", err);
      setToSuggestions([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (from.length > 2) {
        searchFromPlaces(from);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [from]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
          <h1 className="text-2xl font-bold text-blue-600">TransitHub</h1>

          {/* NAVBAR */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>

            <a href="#services" className="hover:text-blue-600">
              Services
            </a>

            <a href="#about" className="hover:text-blue-600">
              About
            </a>

            <a href="#contact" className="hover:text-blue-600">
              Contact
            </a>
          </nav>

          {/* BUTTONS */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Signup
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        className="pt-32 pb-20 px-6 bg-gradient-to-r from-blue-400 to-indigo-900 text-white"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT */}
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Book Bus Tickets & Rent Vehicles Easily
            </h1>

            <p className="text-lg text-gray-200 mb-8">
              Fast, secure and affordable booking platform for your travel
              needs.
            </p>

            {/* SEARCH BOX */}
            <div className="bg-white p-5 rounded-2xl shadow-xl grid md:grid-cols-2 gap-4">
              <div className="relative flex items-center border rounded-lg px-3">
                <MapPin className="text-gray-500 mr-2" size={28} />

                <input
                  type="text"
                  value={from}
                  onChange={(e) => searchFromPlaces(e.target.value)}
                  placeholder="From"
                  className="w-full py-3 px-3 outline-none text-black"
                />

                {/* Suggestions Dropdown */}
                {fromSuggestions.length > 0 && (
                  <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto">
                    {fromSuggestions.map((place, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setFrom(place.display_name);
                          setFromSuggestions([]);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-sm"
                      >
                        {place.display_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative flex items-center border rounded-lg px-3">
                <MapPin className="text-gray-500 mr-2" size={28} />

                <input
                  type="text"
                  value={to}
                  onChange={(e) => searchToPlaces(e.target.value)}
                  placeholder="To"
                  className="w-full py-3 px-3 outline-none text-black"
                />

                {toSuggestions.length > 0 && (
                  <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto">
                    {toSuggestions.map((place, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setTo(place.display_name);
                          setToSuggestions([]);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-sm"
                      >
                        {place.display_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative flex items-center border rounded-lg px-3 bg-white">
                <Calendar className="text-gray-500 mr-2" size={18} />

                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select date"
                  className="w-full py-3 outline-none text-black"
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                <Search className="inline-block mr-2 mb-1" size={18} />
                Search buses
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center">
            <img
              src={loginBg}
              alt="Bus"
              className="rounded-3xl shadow-2xl h-[450px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14">Our Services</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CARD 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">
              <Bus className="text-blue-600 mb-5" size={40} />

              <h3 className="text-2xl font-semibold mb-3">
                Bus Ticket Booking
              </h3>

              <p className="text-gray-600">
                Book bus tickets across multiple cities with live seat
                availability.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">
              <Car className="text-blue-600 mb-5" size={40} />

              <h3 className="text-2xl font-semibold mb-3">Vehicle Rentals</h3>

              <p className="text-gray-600">
                Rent cars, bikes and vans at affordable prices for your trips.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">
              <ShieldCheck className="text-blue-600 mb-5" size={40} />

              <h3 className="text-2xl font-semibold mb-3">Secure Payments</h3>

              <p className="text-gray-600">
                Safe and secure online payment system with instant confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-blue-600 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Users size={40} className="mx-auto mb-3" />
            <h2 className="text-4xl font-bold">10K+</h2>
            <p>Happy Customers</p>
          </div>

          <div>
            <Bus size={40} className="mx-auto mb-3" />
            <h2 className="text-4xl font-bold">500+</h2>
            <p>Buses Available</p>
          </div>

          <div>
            <Car size={40} className="mx-auto mb-3" />
            <h2 className="text-4xl font-bold">300+</h2>
            <p>Rental Vehicles</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">TransitHub</h2>

            <p>
              Your trusted platform for booking tickets and renting vehicles.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>Home</li>
              <li>Services</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>

            <p>Email: support@transithub.com</p>
            <p>Phone: +91 9876543210</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-5 text-center">
          © 2026 TransitHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
