import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    if (!formData.email || !formData.newPassword) {
      setErrors({ message: "* All fields are required!" });
      return;
    }
    if (!formData.newPassword) {
      setErrors({ message: "* New password is required!" });
    } else if (formData.newPassword.length < 6) {
      setErrors({ message: "* Password must be at least 6 characters!" });
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("transit_users")) || [];

    const userIndex = existingUsers.findIndex(
      (user) => user.email === formData.email,
    );

    if (userIndex === -1) {
      setErrors({ message: "* Invalid email address!" });
      return;
    }

    existingUsers[userIndex].password = formData.newPassword;

    localStorage.setItem("transit_users", JSON.stringify(existingUsers));

    setSuccessMessage("Password updated successfully! Redirecting to login...");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primaryBg px-4 font-sans">
      <div className="w-full max-w-md p-8 border border-border rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.08)] bg-primaryBg">
        <h1 className="text-[24px] leading-[32px] font-bold text-center text-bodyText mb-2">
          Reset Password
        </h1>
        <p className="text-center text-secondaryText mb-6">
          Enter your registered email to update password
        </p>

        <form onSubmit={handleResetPassword} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-[13px] font-medium text-bodyText mb-2">
              Registered Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded border border-border placeholder:text-placeholder outline-none transition focus:border-brand focus:border-2"
              required
            />
          </div>

          {/* New Password Input */}
          <div>
            <label className="block text-[13px] font-medium text-bodyText mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-3 pr-12 rounded border border-border placeholder:text-placeholder outline-none transition focus:border-brand focus:border-2"
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

          {/* Error & Success Alerts */}
          {errors.message && (
            <p className="text-sm text-error bg-error/10 p-2 rounded">
              {errors.message}
            </p>
          )}
          {successMessage && (
            <p className="text-sm text-green-600 bg-green-50 p-2 rounded">
              {successMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded bg-brand hover:bg-brand/90 text-black font-semibold text-[14px] transition"
          >
            Update Password
          </button>
        </form>

        <p className="text-center text-secondaryText text-sm mt-4">
          Remembered password?{" "}
          <Link to="/" className="text-bodyText font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
