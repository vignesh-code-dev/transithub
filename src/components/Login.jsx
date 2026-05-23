import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Simple validation
  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "* Email or phone is required";
    }

    if (!formData.password) {
      newErrors.password = "* Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "* Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const fakeRole = "customer";

    if (fakeRole === "admin") navigate("/admin");
    else if (fakeRole === "owner") navigate("/owner");
    else navigate("/customer");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primaryBg px-4 font-sans">
      
      {/* Card */}
      <div className="w-full max-w-md p-8 border border-border rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.08)] bg-primaryBg">

        {/* Title */}
        <h1 className="text-[24px] leading-[32px] font-bold text-center text-bodyText mb-2">
          TransitHub
        </h1>

        <p className="text-center text-secondaryText mb-6">
          Login to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-[13px] text-sans font-medium text-heading text-bodyText mb-4">
              Email / Phone
            </label>

            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`
                w-full px-4 py-3 rounded border placeholder:text-placeholder outline-none transition
                focus:border-brand focus:border-2 focus:shadow-[0_0_0_3px_rgba(255,194,0,0.2)]
                ${errors.email ? "border-error border-2" : "border-border"}
                ${formData.email ? "bg-inputfield border-1 border-brand" : ""}
              `}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-error">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-[13px] text-sans font-medium text-heading text-bodyText mb-4">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`
                  w-full px-4 py-3 pr-12 rounded border border-border placeholder:text-placeholder outline-none transition
                  focus:border-brand focus:border-2 focus:shadow-[0_0_0_3px_rgba(255,194,0,0.2)]
                  ${errors.password ? "border-error border-2" : "border-border"}
                  ${formData.password ? "bg-inputfield border-1 border-brand" : ""}
                `}
              />

              {/* Eye Icon Center Fix */}
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-bodyText/60 hover:text-bodyText transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-error">
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-secondaryText hover:text-bodyText transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* CTA Button */}
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
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-secondaryText text-sm">OR</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Signup */}
        <p className="text-center text-secondaryText text-sm">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-bodyText font-medium"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}