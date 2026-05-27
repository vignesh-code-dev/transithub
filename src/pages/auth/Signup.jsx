import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Customer", // டிஃபால்ட்டாக Customer என வைக்கப்பட்டுள்ளது
  });

  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const existingUsers =
      JSON.parse(localStorage.getItem("transit_users")) || [];

    const userExists = existingUsers.some(
      (user) => user.email === formData.email,
    );

    if (userExists) {
      alert(
        "Intha Email ID la software-la account create panniyachu boss! Vera use pannunga.",
      );
      return;
    }

    const updatedUsers = [...existingUsers, formData];

    localStorage.setItem("transit_users", JSON.stringify(updatedUsers));

    console.log("Signup Data Saved Successfully with Role:", formData.role);

    // வெற்றிகரமாக சைன் அப் ஆனதும் லாகின் பக்கத்திற்கு அழைத்துச் செல்லும்
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 my-10">
      {/* Card */}
      <div className="w-full max-w-md p-8 border border-border rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.08)] bg-primaryBg">
        {/* Title */}
        <h1 className="text-[24px] leading-[32px] font-bold text-center text-bodyText mb-2">
          Create Account
        </h1>

        <p className="text-center text-secondaryText mb-6">
          Join TransitHub and start booking
        </p>

        <form onSubmit={handleSignup}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-[13px] text-sans font-medium text-bodyText mb-2">
              Username
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`
                w-full px-4 py-3 rounded border placeholder:text-placeholder outline-none transition
                focus:border-brand focus:border-2 focus:shadow-[0_0_0_3px_rgba(255,194,0,0.2)]
                ${formData.name ? "bg-inputfield border-1 border-brand" : ""}
              `}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-[13px] text-sans font-medium text-bodyText mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`
                w-full px-4 py-3 rounded border placeholder:text-placeholder outline-none transition
                focus:border-brand focus:border-2 focus:shadow-[0_0_0_3px_rgba(255,194,0,0.2)]
                ${formData.email ? "bg-inputfield border-1 border-brand" : ""}
              `}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-[13px] text-sans font-medium text-bodyText mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={`
                w-full px-4 py-3 rounded border placeholder:text-placeholder outline-none transition
                focus:border-brand focus:border-2 focus:shadow-[0_0_0_3px_rgba(255,194,0,0.2)]
                ${formData.phone ? "bg-inputfield border-1 border-brand" : ""}
              `}
              required
            />
          </div>

          {/* சேர்க்கப்பட்ட புதிய பகுதி: Role Selection Dropdown */}
          <div className="mb-4">
            <label className="block text-[13px] text-sans font-medium text-bodyText mb-2">
              Select Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`
                w-full px-4 py-3 rounded border bg-white text-bodyText outline-none transition cursor-pointer
                focus:border-brand focus:border-2 focus:shadow-[0_0_0_3px_rgba(255,194,0,0.2)]
                ${formData.role ? "bg-inputfield border-1 border-brand" : ""}
              `}
              required
            >
              <option value="Customer">Customer (Passenger)</option>
              <option value="Bus Travels Owner">BusOwner</option>
              <option value="Driver">Driver</option>
              <option value="Travels Owner">TravelsOwner</option>
              <option value="Commercial Owner">CommercialOwner</option>
              <option value="Admin">Admin</option>
              <option value="SuperAdmin">SuperAdmin</option>
            </select>
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="block text-[13px] text-sans font-medium text-bodyText mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className={`
                  w-full px-4 py-3 pr-12 rounded border border-border placeholder:text-placeholder outline-none transition
                  focus:border-brand focus:border-2 focus:shadow-[0_0_0_3px_rgba(255,194,0,0.2)]
                  ${formData.password ? "bg-inputfield border-1 border-brand" : ""}
                `}
                required
              />

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-bodyText/60 hover:text-bodyText transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="
              w-full py-3 rounded
              bg-brand hover:bg-brand/90
              text-black font-semibold
              text-[14px] leading-[24px]
              transition
            "
          >
            Sign Up
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-secondaryText text-sm mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-bodyText font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}